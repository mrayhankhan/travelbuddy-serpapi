const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Session = require('../models/Session');
const SwipeCard = require('../models/SwipeCard');
const { selectNextCards } = require('../lib/cardSelector');
const localCards = require('../data/swipeCards');

const STAGE_MAP = {
    vibes: 'vibe',
    activities: 'activity',
    stays: 'stay',
};

// POST /api/cards/next — Get next batch of adaptive cards
router.post('/next', async (req, res) => {
    try {
        const { sessionId, stage, count = 3 } = req.body;

        if (!sessionId || !stage) {
            return res.status(400).json({ error: 'Missing sessionId or stage' });
        }

        if (!mongoose.Types.ObjectId.isValid(sessionId)) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Get all cards for the current stage (DB first, fallback to local seed data)
        const cardType = STAGE_MAP[stage] || stage;
        let allCards = await SwipeCard.find({ type: cardType }).lean();
        if (!allCards || allCards.length === 0) {
            // Fallback: use local seed data if DB isn't seeded
            allCards = localCards.filter(c => c.type === cardType);
        }

        // Count how many cards from this stage have been shown
        const stagePrefix = cardType.substring(0, 3);
        const stageShownIds = (session.shownCards || []).filter(id => id.startsWith(stagePrefix));

        // Select next batch of cards using the phase-specific semantic vector
        // so each phase adapts independently to the user's per-phase preferences.
        const phaseVector =
            stage === 'vibes'      ? (session.userVibeVector?.length     ? session.userVibeVector     : session.userVector) :
            stage === 'activities' ? (session.userActivityVector?.length  ? session.userActivityVector : session.userVector) :
            stage === 'stays'      ? (session.userStayVector?.length      ? session.userStayVector     : session.userVector) :
            session.userVector;

        const selectedCards = selectNextCards({
            userVector: phaseVector || [],
            allCards,
            shownCardIds: stageShownIds,
            cardsShownSoFar: stageShownIds.length,
            count: Math.min(count, 20),
        });

        // Record shown cards in session — use atomic update to avoid VersionError
        const newIds = selectedCards.map(c => c.cardId);
        await Session.findByIdAndUpdate(sessionId, {
            $push: { shownCards: { $each: newIds } },
        });

        // Map to frontend format (cardId → id)
        const cards = selectedCards.map(card => ({
            id: card.cardId,
            type: card.type === 'vibe' ? 'vibe' : card.type === 'activity' ? 'activity' : 'stay',
            title: card.title,
            description: card.description,
            image: card.image,
            tags: card.tags,
            extraImages: card.extraImages || [],
            longDescription: card.longDescription || '',
            highlights: card.highlights || [],
        }));

        res.json({
            cards,
            remaining: allCards.length - stageShownIds.length - newIds.length,
            totalInPool: allCards.length,
        });
    } catch (err) {
        console.error('Cards next error:', err);
        res.status(500).json({ error: 'Failed to select cards' });
    }
});

module.exports = router;
