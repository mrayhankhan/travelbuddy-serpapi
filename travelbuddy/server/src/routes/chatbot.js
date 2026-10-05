const express = require('express');
const router = express.Router();
const { generateWithRetry } = require('../lib/geminiAuth');

/**
 * POST /api/chatbot/ask
 * Body: { question: string, destination: string, country: string }
 * Returns: { answer: string }
 */
router.post('/ask', async (req, res) => {
    try {
        const { question, destination, country } = req.body;

        if (!question || !destination) {
            return res.status(400).json({ error: 'question and destination are required' });
        }

        const systemPrompt = `You are TravelBuddy, a friendly travel assistant. The user is planning a trip to ${destination}, ${country || ''}.

RULES — follow these strictly:
1. Keep answers SHORT — maximum 4-6 bullet points or 2-3 very short sentences.
2. Be specific to ${destination} — no generic advice.
3. Use bullet points with • for lists. Keep each bullet to ONE line.
4. Do NOT use any markdown formatting — no **, no ##, no *, no _.
5. Do NOT use headers or numbered lists.
6. Be direct — skip greetings, intros, and filler phrases like "Great question!".
7. Do NOT mention you are an AI.

Example of ideal response length:
• Pack layers — weather changes fast
• Comfortable walking shoes are essential
• Rain jacket is a must year-round
• Sunscreen even on cloudy days`;

        const result = await generateWithRetry('gemini-2.0-flash', [
            { text: systemPrompt },
            { text: question },
        ]);

        const answer = result.response.text().trim();

        console.log(`💬 Chatbot — Q: "${question.substring(0, 50)}..." → ${answer.length} chars`);

        res.json({ answer });
    } catch (err) {
        console.error('Chatbot error:', err);
        res.status(500).json({ error: 'Failed to get answer', details: err.message });
    }
});

module.exports = router;
