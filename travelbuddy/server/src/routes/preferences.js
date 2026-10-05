const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

/**
 * POST /api/preferences/remove-tag
 * Called when the user removes a tag from the ProfileDrawer "My Preferences" panel.
 * Decrements that tag's weight in the appropriate preference vector.
 */
router.post('/remove-tag', async (req, res) => {
    try {
        const { sessionId, section, tag } = req.body;

        if (!sessionId || !section || !tag) {
            return res.status(400).json({ error: 'Missing sessionId, section, or tag' });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Map section name to the correct vector field
        const vectorField = section === 'activities' ? 'activityScores'
                          : section === 'stays' ? 'stayScores'
                          : 'vibeScores';

        // Set the tag weight to a strong negative to signal explicit user rejection
        const current = session[vectorField].get(tag) || 0;
        session[vectorField].set(tag, Math.min(current - 2.0, -1.0));
        session.markModified(vectorField);

        await session.save();

        console.log(`🏷️  Tag removed: "${tag}" from ${vectorField} (was ${current.toFixed(2)}, now ${session[vectorField].get(tag).toFixed(2)})`);
        res.json({ success: true });
    } catch (err) {
        console.error('Preference remove-tag error:', err);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
});

/**
 * POST /api/preferences/sync
 * Called to sync the user's entire curated tag list to the session.
 * Used for destination ranking as a bonus multiplier.
 */
router.post('/sync', async (req, res) => {
    try {
        const { sessionId, profileTags } = req.body;

        if (!sessionId || !profileTags) {
            return res.status(400).json({ error: 'Missing sessionId or profileTags' });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Store the user's curated tag list (used for ranking bonus)
        session.profileTags = profileTags;
        session.markModified('profileTags');
        await session.save();

        console.log(`📋 Profile tags synced:`, profileTags);
        res.json({ success: true });
    } catch (err) {
        console.error('Preference sync error:', err);
        res.status(500).json({ error: 'Failed to sync preferences' });
    }
});

module.exports = router;
