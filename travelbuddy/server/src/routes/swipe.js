const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const SwipeCard = require('../models/SwipeCard');
const localCards = require('../data/swipeCards');
const { updatePreferenceVector } = require('../lib/scoring');
const { getCardVector, updateUserVector } = require('../lib/semanticVector');

// POST /api/swipe — Record a swipe and update preference vector
router.post('/', async (req, res) => {
    console.log(`\n[API ENTRY] POST /api/swipe - cardId:`, req.body.cardId, ' direction:', req.body.direction);
    try {
        const {
            sessionId, cardId, stage, direction,
            cardIndex = 0, totalCards = 10, swipeDurationMs = 1000,
            detailViewed = false
        } = req.body;

        if (!sessionId || !cardId || !stage || !direction) {
            return res.status(400).json({ error: 'Missing required fields: sessionId, cardId, stage, direction' });
        }

        if (!['LIKE', 'DISLIKE', 'SAVE'].includes(direction)) {
            return res.status(400).json({ error: 'Invalid direction. Use: LIKE, DISLIKE, SAVE' });
        }

        // Find the session
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Find the card to get its tags (DB first, then local fallback)
        let card = await SwipeCard.findOne({ cardId }).lean();
        if (!card) {
            // Fallback: use local seed data if DB isn't seeded
            card = localCards.find(c => c.cardId === cardId);
        }
        if (!card) {
            console.warn(`⚠️ Card not found in DB or local data: ${cardId}`);
            return res.status(404).json({ error: 'Card not found' });
        }

        // Record the swipe event (with enhanced timing data)
        session.swipeEvents.push({
            cardId,
            stage,
            direction,
            cardIndex,
            swipeDurationMs,
            detailViewed,
            timestamp: new Date(),
        });

        // Update liked lists (only for LIKE and SAVE)
        if (direction === 'LIKE' || direction === 'SAVE') {
            const cardTags = (card.tags || []);
            switch (stage) {
                case 'vibes':
                    if (!session.likedVibes.includes(cardId)) {
                        session.likedVibes.push(cardId);
                    }
                    // Collect tags into the set (de-duplicated)
                    for (const t of cardTags) {
                        if (!session.likedVibeTags.includes(t)) {
                            session.likedVibeTags.push(t);
                        }
                    }
                    break;
                case 'activities':
                    if (!session.likedActivities.includes(cardId)) {
                        session.likedActivities.push(cardId);
                    }
                    for (const t of cardTags) {
                        if (!session.likedActivityTags.includes(t)) {
                            session.likedActivityTags.push(t);
                        }
                    }
                    break;
                case 'stays':
                    if (!session.likedStays.includes(cardId)) {
                        session.likedStays.push(cardId);
                    }
                    for (const t of cardTags) {
                        if (!session.likedStayTags.includes(t)) {
                            session.likedStayTags.push(t);
                        }
                    }
                    break;
            }
        }

        // ── Semantic Vector Update (leaky integrator) ──
        const tags = card.tags || [];
        const cardVector = getCardVector(tags);
        
        // Always update the monolithic legacy vector
        session.userVector = updateUserVector(
            session.userVector || [],
            cardVector,
            direction,
            { cardIndex, totalCards, swipeDurationMs, detailViewed },
        );
        console.log(`🧠 Updated legacy userVector (norm=${Math.sqrt(session.userVector.reduce((s, v) => s + v * v, 0)).toFixed(4)})`);
        
        // ── Phase-Specific Vector Updates ──
        switch (stage) {
            case 'vibes':
                session.userVibeVector = updateUserVector(
                    session.userVibeVector || [],
                    cardVector,
                    direction,
                    { cardIndex, totalCards, swipeDurationMs, detailViewed }
                );
                break;
            case 'activities':
                session.userActivityVector = updateUserVector(
                    session.userActivityVector || [],
                    cardVector,
                    direction,
                    { cardIndex, totalCards, swipeDurationMs, detailViewed }
                );
                break;
            case 'stays':
                session.userStayVector = updateUserVector(
                    session.userStayVector || [],
                    cardVector,
                    direction,
                    { cardIndex, totalCards, swipeDurationMs, detailViewed }
                );
                break;
        }

        // ── Legacy per-tag scoring (still used by rankDestinations) ──
        const options = { cardIndex, totalCards, swipeDurationMs, detailViewed };
        switch (stage) {
            case 'vibes':
                session.vibeScores = updatePreferenceVector(session.vibeScores, tags, direction, options);
                break;
            case 'activities':
                session.activityScores = updatePreferenceVector(session.activityScores, tags, direction, options);
                break;
            case 'stays':
                session.stayScores = updatePreferenceVector(session.stayScores, tags, direction, options);
                break;
        }

        await session.save();

        res.json({
            success: true,
            preferences: {
                likedVibes: session.likedVibes,
                likedActivities: session.likedActivities,
                likedStays: session.likedStays,
            },
            vibeScores: Object.fromEntries(session.vibeScores),
        });
    } catch (err) {
        console.error('Swipe error:', err);
        res.status(500).json({ error: 'Failed to record swipe' });
    }
});

module.exports = router;
