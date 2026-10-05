const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let cachedClient = null;

/**
 * Read and validate the Vertex AI configuration from environment variables.
 */
function getVertexConfig() {
    const apiKey   = (process.env.VERTEX_API_KEY   || '').trim();
    const project  = (process.env.VERTEX_PROJECT_ID || '').trim();
    const location = (process.env.VERTEX_LOCATION   || '').trim();
    return { apiKey, project, location };
}

/**
 * Validate that all required Vertex AI configuration is present.
 * Throws clearly if any required variable is missing.
 */
function validateGeminiConfig() {
    const { apiKey, project, location } = getVertexConfig();
    if (!apiKey)   throw new Error('Missing VERTEX_API_KEY. Add it to server/.env');
    if (!project)  throw new Error('Missing VERTEX_PROJECT_ID. Add it to server/.env');
    if (!location) throw new Error('Missing VERTEX_LOCATION. Add it to server/.env');
    return { hasApiKey: true };
}

/**
 * Returns a GoogleGenAI client configured for Vertex AI.
 * The client is cached after the first call.
 */
function getGeminiClient() {
    if (!cachedClient) {
        const { apiKey, project, location } = getVertexConfig();
        if (!apiKey || !project || !location) {
            throw new Error('Missing Vertex AI configuration. Check VERTEX_API_KEY, VERTEX_PROJECT_ID and VERTEX_LOCATION in server/.env');
        }
        cachedClient = new GoogleGenAI({
            apiKey,
            vertexai: { project, location },
        });
    }
    return cachedClient;
}

module.exports = {
    getGeminiClient,
    validateGeminiConfig,
};
