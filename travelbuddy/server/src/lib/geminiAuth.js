const { getGeminiClient, validateGeminiConfig } = require('./geminiClient');

// Primary model for all generation. On Vertex AI paid tier this will not hit rate limits.
const PRIMARY_MODEL   = 'gemini-2.5-flash';
const FALLBACK_MODEL  = 'gemini-2.0-flash';

/**
 * Returns a GoogleGenAI client authenticated via Vertex AI.
 */
function getGenAI() {
    validateGeminiConfig();
    return getGeminiClient();
}

/**
 * Build the `contents` array expected by the new @google/genai SDK from the
 * legacy-style array used throughout the app.
 *
 * Legacy format (from old @google/generative-ai SDK):
 *   [ { text: "..." }, { inlineData: { mimeType, data } } ]
 *
 * New SDK format (same for text-only; inlineData becomes an inlineData part):
 *   [ { role: 'user', parts: [ { text: "..." }, { inlineData: { mimeType, data } } ] } ]
 */
function buildContents(legacyContent) {
    // Convert each element to a proper Part object
    const parts = legacyContent.map(item => {
        if (item.text !== undefined) return { text: item.text };
        if (item.inlineData)        return { inlineData: item.inlineData };
        return item; // pass through any already-correct Part objects
    });
    return [{ role: 'user', parts }];
}

/**
 * Wrap the new SDK's response so it looks like the old SDK's response shape:
 *   result.response.text()  — string
 *
 * The new SDK returns result.text directly, but all consuming code in the app
 * calls result.response.text(), so we shim it here to avoid touching every route.
 */
function wrapResponse(newSdkResult) {
    const textValue = newSdkResult.text ?? '';
    return {
        response: {
            text: () => textValue,
        },
    };
}

/**
 * Generate content using Vertex AI via the new @google/genai SDK.
 *
 * Signature is backward-compatible with the old generateWithRetry():
 *   generateWithRetry(preferredModel, legacyContentArray)
 *
 * A single fallback model is attempted if the primary fails.
 *
 * @param {string} preferredModel  - e.g. 'gemini-2.5-flash'
 * @param {Array}  content         - legacy content parts array
 * @returns {Promise<{response: {text: () => string}}>}
 */
async function generateWithRetry(preferredModel, content) {
    const ai = getGenAI();
    const contents = buildContents(content);

    // Build an ordered list: preferred → fallback. Deduplicate.
    const modelsToTry = [
        preferredModel || PRIMARY_MODEL,
        PRIMARY_MODEL,
        FALLBACK_MODEL,
    ].filter((m, i, arr) => arr.indexOf(m) === i);

    let lastError = null;

    for (const modelName of modelsToTry) {
        try {
            const result = await ai.models.generateContent({
                model: modelName,
                contents,
            });

            console.log(`🔑 Vertex AI OK — model: ${modelName}`);
            return wrapResponse(result);
        } catch (err) {
            lastError = err;
            const msg = `${err?.message || ''}`.toLowerCase();
            const isQuota = err?.status === 429
                || msg.includes('429')
                || msg.includes('quota')
                || msg.includes('rate limit')
                || msg.includes('resource_exhausted')
                || msg.includes('too many requests');

            if (isQuota) {
                console.warn(`⚠️ Vertex AI quota on model=${modelName}. Trying fallback...`);
                continue;
            }

            // Non-quota error (model unavailable etc.) — try next model
            console.warn(`⚠️ Vertex AI error on model=${modelName}: ${String(err?.message).substring(0, 120)}. Trying next...`);
        }
    }

    throw lastError;
}

module.exports = { getGenAI, generateWithRetry, validateGeminiConfig };
