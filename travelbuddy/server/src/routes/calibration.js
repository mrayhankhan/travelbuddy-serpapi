const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { getCardVector } = require('../lib/semanticVector');

// POST /api/calibration — process duel or quick-tap result
router.post('/', async (req, res) => {
  try {
    const { sessionId, type, stage, leftTags, rightTags, position, selectedTags, duelId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId required' });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // ── Pick the correct phase-specific vector fields ──
    const vectorField = stage === 'activities' ? 'userActivityVector'
                       : stage === 'stays' ? 'userStayVector'
                       : 'userVibeVector';

    if (type === 'duel' && position && position !== 0) {
      // Determine winner/loser sides based on slider position
      // Negative position = user slid UP = chose left/top card
      // Positive position = user slid DOWN = chose right/bottom card
      const winnerTags = position < 0 ? (leftTags || []) : (rightTags || []);
      const loserTags  = position < 0 ? (rightTags || []) : (leftTags || []);

      const strength = Math.abs(position); // 1 = slight lean, 2 = strong lean

      // m (winner weight): 1.0 for slight lean, 2.0 for strong lean
      const m = strength === 1 ? 1.0 : 2.0;
      // n (loser coefficient): -0.5 for slight lean, -1.0 for strong lean
      // Formula: new_vec = old_vec + m*vecA - n*vecB
      // Since n is negative, -n is positive (slightly boosts the loser vector)
      const n = strength === 1 ? -0.5 : -1.0;

      const winnerVec = getCardVector(winnerTags);
      const loserVec  = getCardVector(loserTags);

      const currentVec = session[vectorField] || [];
      const dim = Math.max(winnerVec.length, loserVec.length, currentVec.length);
      const updatedVec = new Array(dim);

      for (let i = 0; i < dim; i++) {
        updatedVec[i] = (currentVec[i] || 0)
          + m * (winnerVec[i] || 0)
          - n * (loserVec[i] || 0);
      }

      session[vectorField] = updatedVec;
      session.markModified(vectorField);

      // Also update the monolithic userVector
      const currentShared = session.userVector || [];
      const sharedDim = Math.max(winnerVec.length, loserVec.length, currentShared.length);
      const updatedShared = new Array(sharedDim);
      for (let i = 0; i < sharedDim; i++) {
        updatedShared[i] = (currentShared[i] || 0)
          + m * (winnerVec[i] || 0)
          - n * (loserVec[i] || 0);
      }
      session.userVector = updatedShared;
      session.markModified('userVector');

    } else if (type === 'quicktap' && selectedTags?.length) {
      // Quick-tap: boost selected tags in the vibeScores/activityScores/stayScores map
      const scoreField = stage === 'activities' ? 'activityScores'
                       : stage === 'stays' ? 'stayScores'
                       : 'vibeScores';

      const scores = session[scoreField] || new Map();
      const QUICKTAP_BOOST = 1.5;
      for (const tag of selectedTags) {
        const current = scores.get(tag) || 0;
        scores.set(tag, current + QUICKTAP_BOOST);
      }
      session[scoreField] = scores;
      session.markModified(scoreField);
    }

    // Log calibration event
    if (!session.calibrationEvents) {
      session.calibrationEvents = [];
    }
    session.calibrationEvents.push({
      type,
      stage: stage || 'vibes',
      data: type === 'duel'
        ? { duelId, position, leftTags, rightTags }
        : { selectedTags },
      timestamp: new Date(),
    });
    session.markModified('calibrationEvents');

    await session.save();

    res.json({ success: true });
  } catch (err) {
    console.error('Calibration error:', err);
    res.status(500).json({ error: 'Failed to process calibration' });
  }
});

module.exports = router;
