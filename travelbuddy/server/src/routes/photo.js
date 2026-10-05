const express = require('express');
const router = express.Router();
const { vibeTags, activityTags, stayTags } = require('../data/tagPools');
const Session = require('../models/Session');
const { getTagEmbedding, EMBEDDING_DIM } = require('../lib/semanticVector');
const { generateWithRetry } = require('../lib/geminiAuth');

/**
 * POST /api/photo/analyze
 * Body: { image: "<base64 string>", mimeType?: "image/jpeg", sessionId?: string }
 * Returns: { vibes: [{tag, confidence}], activities: [{tag, confidence}], stays: [{tag, confidence}] }
 */
router.post('/analyze', async (req, res) => {
    try {
        const { image, mimeType = 'image/jpeg', sessionId } = req.body;
        if (!image) return res.status(400).json({ error: 'No image provided' });

        const prompt = `You are a travel preference analyzer. A user has uploaded a personal photograph (e.g. a vacation photo, wedding, scenic landscape). Your job is to analyze the image and extract relevant travel preference tags from the EXACT tag pools provided below. Only use tags from these pools — do NOT invent new ones.

VIBE TAGS (travel mood/atmosphere):
${vibeTags.join(', ')}

ACTIVITY TAGS (things to do):
${activityTags.join(', ')}

STAY TAGS (accommodation preferences):
${stayTags.join(', ')}

For each tag you identify as relevant to this image, assign a confidence score from 0.0 to 1.0 indicating how strongly this image relates to that tag.

Return ONLY valid JSON in this exact format (no markdown, no code fences):
{
  "vibes": [{"tag": "TagName", "confidence": "confidenceScore"}],
  "activities": [{"tag": "TagName", "confidence": "confidenceScore"}],
  "stays": [{"tag": "TagName", "confidence": "confidenceScore"}]
}

Rules:
- Only include tags with confidence >= 0.8
- Maximum 8 tags per category
- If the user is not doing any activity, return an empty array for activities
- If the user is not doing any stay, return an empty array for stays
- Be generous but accurate — if the image shows a beach sunset, include tags like Beach, Warm, Scenic, Relax, Romance etc.`;

        const result = await generateWithRetry('gemini-2.0-flash', [
            { text: prompt },
            {
                inlineData: {
                    mimeType,
                    data: image,
                },
            },
        ]);

        const responseText = result.response.text();

        // Parse JSON from the response (handle potential markdown fences)
        let cleaned = responseText.trim();
        if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
        }

        const parsed = JSON.parse(cleaned);

        // Validate: only allow tags that actually exist in our pools
        const vibeSet = new Set(vibeTags.map(t => t.toLowerCase()));
        const actSet = new Set(activityTags.map(t => t.toLowerCase()));
        const staySet = new Set(stayTags.map(t => t.toLowerCase()));

        const validateTags = (arr, poolSet, poolOriginal) => {
            if (!Array.isArray(arr)) return [];
            return arr
                .filter(item => item.tag && poolSet.has(item.tag.toLowerCase()) && item.confidence >= 0.3)
                .map(item => ({
                    tag: poolOriginal.find(t => t.toLowerCase() === item.tag.toLowerCase()) || item.tag,
                    confidence: Math.min(1, Math.max(0, parseFloat(item.confidence) || 0)),
                }));
        };

        const output = {
            vibes: validateTags(parsed.vibes, vibeSet, vibeTags),
            activities: validateTags(parsed.activities, actSet, activityTags),
            stays: validateTags(parsed.stays, staySet, stayTags),
        };

        console.log(`📸 Photo analyzed — vibes: ${output.vibes.length}, activities: ${output.activities.length}, stays: ${output.stays.length}`);

        // ── Update session scores, user vector, and profileTags ──
        if (sessionId) {
            try {
                const session = await Session.findById(sessionId);
                if (session) {
                    // 1. Update tag-based scores (vibeScores, activityScores, stayScores)
                    for (const { tag, confidence } of output.vibes) {
                        const current = session.vibeScores.get(tag) || 0;
                        session.vibeScores.set(tag, current + confidence);
                    }
                    for (const { tag, confidence } of output.activities) {
                        const current = session.activityScores.get(tag) || 0;
                        session.activityScores.set(tag, current + confidence);
                    }
                    for (const { tag, confidence } of output.stays) {
                        const current = session.stayScores.get(tag) || 0;
                        session.stayScores.set(tag, current + confidence);
                    }

                    // 2. Compute phase-specific vectors: avg(embedding(tag) × confidence) per category
                    //    If a category has no tags, leave its vector untouched — swipe engine will fill it.
                    const dim = EMBEDDING_DIM || 768;

                    /**
                     * Build a phase vector as the weighted average of tag embeddings.
                     * Returns null if no embeddings were found.
                     */
                    const buildPhaseVector = (tagsWithConf) => {
                        if (!tagsWithConf || tagsWithConf.length === 0) return null;
                        const vec = new Array(dim).fill(0);
                        let weightSum = 0;
                        for (const { tag, confidence } of tagsWithConf) {
                            const emb = getTagEmbedding(tag);
                            if (emb) {
                                for (let i = 0; i < dim; i++) vec[i] += emb[i] * confidence;
                                weightSum += confidence;
                            }
                        }
                        if (weightSum === 0) return null;
                        for (let i = 0; i < dim; i++) vec[i] /= weightSum;
                        return vec;
                    };

                    const vibeVec    = buildPhaseVector(output.vibes);
                    const actVec     = buildPhaseVector(output.activities);
                    const stayVec    = buildPhaseVector(output.stays);

                    if (vibeVec) {
                        session.userVibeVector = vibeVec;
                        console.log(`✅ userVibeVector set for session ${sessionId} (${output.vibes.length} tags)`);
                    } else {
                        console.log(`⚠️  userVibeVector skipped — no vibe tags (will swipe)`);
                    }
                    if (actVec) {
                        session.userActivityVector = actVec;
                        console.log(`✅ userActivityVector set for session ${sessionId} (${output.activities.length} tags)`);
                    } else {
                        console.log(`⚠️  userActivityVector skipped — no activity tags (will swipe)`);
                    }
                    if (stayVec) {
                        session.userStayVector = stayVec;
                        console.log(`✅ userStayVector set for session ${sessionId} (${output.stays.length} tags)`);
                    } else {
                        console.log(`⚠️  userStayVector skipped — no stay tags (will swipe)`);
                    }

                    // Recompose userVector = 0.5×vibe + 0.3×activity + 0.2×stay
                    // Use whatever phase vectors are available (photo-seeded or swipe-existing).
                    const finalVibeVec = session.userVibeVector?.length === dim ? session.userVibeVector : null;
                    const finalActVec  = session.userActivityVector?.length === dim ? session.userActivityVector : null;
                    const finalStayVec = session.userStayVector?.length === dim ? session.userStayVector : null;

                    if (finalVibeVec || finalActVec || finalStayVec) {
                        const composedVec = new Array(dim).fill(0);
                        for (let i = 0; i < dim; i++) {
                            composedVec[i] =
                                0.5 * (finalVibeVec ? finalVibeVec[i] : 0) +
                                0.3 * (finalActVec  ? finalActVec[i]  : 0) +
                                0.2 * (finalStayVec ? finalStayVec[i] : 0);
                        }
                        session.userVector = composedVec;
                        console.log(`✅ userVector recomposed: 0.5×vibe + 0.3×activity + 0.2×stay`);
                    }

                    // 3. Update profileTags
                    const mergeUnique = (existing, newTags) => {
                        const set = new Set(existing || []);
                        for (const t of newTags) set.add(t);
                        return [...set];
                    };
                    session.profileTags = {
                        vibes: mergeUnique(session.profileTags?.vibes, output.vibes.map(t => t.tag)),
                        activities: mergeUnique(session.profileTags?.activities, output.activities.map(t => t.tag)),
                        stays: mergeUnique(session.profileTags?.stays, output.stays.map(t => t.tag)),
                    };

                    // 4. Also seed likedVibeTags / likedActivityTags / likedStayTags
                    //    so generateRecommendationExplanation & computeTopLikedTags have data.
                    session.likedVibeTags = mergeUnique(session.likedVibeTags, output.vibes.map(t => t.tag));
                    session.likedActivityTags = mergeUnique(session.likedActivityTags, output.activities.map(t => t.tag));
                    session.likedStayTags = mergeUnique(session.likedStayTags, output.stays.map(t => t.tag));

                    await session.save();
                    console.log(`✅ Session ${sessionId} updated with photo-extracted phase vectors, profileTags, and likedTags`);
                }
            } catch (sessErr) {
                console.warn('⚠️ Failed to update session from photo:', sessErr.message);
                // Don't fail the response — photo analysis still succeeded
            }
        }

        res.json(output);
    } catch (err) {
        console.error('Photo analysis error:', err);

        const message = err?.message || 'Unknown error';
        const isConfigError = message.includes('Missing GEMINI_API_KEY')
            || message.includes('Gemini configuration')
            || message.includes('GEMINI_API_KEY');

        if (isConfigError) {
            return res.status(503).json({
                error: 'AI service is not configured on the backend',
                code: 'GEMINI_CONFIG_ERROR',
                details: message,
            });
        }

        res.status(500).json({
            error: 'Failed to analyze image',
            code: 'PHOTO_ANALYSIS_FAILED',
            details: message,
        });
    }
});

module.exports = router;

