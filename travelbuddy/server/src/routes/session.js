const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// POST /api/session — Create a new planning session
router.post("/", async (req, res) => {
  console.log(`\n[API ENTRY] POST /api/session - Req:`, req.body);
  try {
    const {
      departureCity,
      duration,
      intendedTravelWindow,
      travelers,
      budget,
      adults,
      children,
    } = req.body;

    if (!departureCity || !duration || !travelers || !budget) {
      return res
        .status(400)
        .json({
          error:
            "Missing required fields: departureCity, duration, travelers, budget",
        });
    }

    const session = await Session.create({
      departureCity,
      duration,
      intendedTravelWindow: intendedTravelWindow || "within-1-month",
      travelers: Number(travelers),
      adults: Number(adults) || Number(travelers) || 1,
      children: Number(children) || 0,
      budget: Number(budget),
      userEmail: req.body.userEmail || null,
    });

    res.status(201).json({ sessionId: session._id });
  } catch (err) {
    console.error("Session create error:", err);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// GET /api/session/:id — Get session data + preferences
router.get("/:id", async (req, res) => {
  console.log(`\n[API ENTRY] GET /api/session/${req.params.id}`);
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({
      sessionId: session._id,
      departureCity: session.departureCity,
      duration: session.duration,
      intendedTravelWindow: session.intendedTravelWindow,
      travelers: session.travelers,
      adults: session.adults || session.travelers,
      children: session.children || 0,
      budget: session.budget,
      preferences: {
        likedVibes: session.likedVibes,
        likedActivities: session.likedActivities,
        likedStays: session.likedStays,
      },
      vibeScores: Object.fromEntries(session.vibeScores),
      activityScores: Object.fromEntries(session.activityScores),
      stayScores: Object.fromEntries(session.stayScores),
    });
  } catch (err) {
    console.error("Session get error:", err);
    res.status(500).json({ error: "Failed to get session" });
  }
});

// PATCH /api/session/:id/link-email — Link a session to an authenticated user
router.patch("/:id/link-email", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Missing email" });
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    session.userEmail = email.toLowerCase();
    await session.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Link email error:", err);
    res.status(500).json({ error: "Failed to link email" });
  }
});

// GET /api/session/by-email/:email — Get latest session with preferences for a returning user
router.get("/by-email/:email", async (req, res) => {
  console.log(`\n[API ENTRY] GET /api/session/by-email/${req.params.email}`);
  try {
    const email = req.params.email.toLowerCase();
    // Find the most recent session that has meaningful preference data
    const session = await Session.findOne({
      userEmail: email,
      $or: [
        { vibeScores: { $exists: true, $ne: {} } },
        { "swipeEvents.0": { $exists: true } },
      ],
    }).sort({ createdAt: -1 });

    if (!session) {
      return res.status(404).json({ error: "No existing session found" });
    }

    // Check if user actually has meaningful preferences (at least a few swipes)
    const hasPrefs =
      (session.vibeScores && session.vibeScores.size > 0) ||
      (session.activityScores && session.activityScores.size > 0) ||
      (session.stayScores && session.stayScores.size > 0);

    if (!hasPrefs) {
      return res.status(404).json({ error: "No preference data found" });
    }

    res.json({
      sessionId: session._id,
      departureCity: session.departureCity,
      duration: session.duration,
      intendedTravelWindow: session.intendedTravelWindow,
      travelers: session.travelers,
      adults: session.adults || session.travelers,
      children: session.children || 0,
      budget: session.budget,
      hasPreferences: true,
      swipeCount: session.swipeEvents?.length || 0,
      profileTags: session.profileTags || {
        vibes: [],
        activities: [],
        stays: [],
      },
      savedItinerary: session.savedItinerary || null,
      savedShortlist: session.savedShortlist || [],
    });
  } catch (err) {
    console.error("Session by-email error:", err);
    res.status(500).json({ error: "Failed to look up session" });
  }
});

// GET /api/session/:id/top-tags — Compute top liked tags per phase via dot product
router.get("/:id/top-tags", async (req, res) => {
  console.log(`\n[API ENTRY] GET /api/session/${req.params.id}/top-tags`);
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const { computeTopLikedTags } = require("../lib/scoring");
    const topTags = computeTopLikedTags(session, 5);

    res.json(topTags);
  } catch (err) {
    console.error("Top tags error:", err);
    res.status(500).json({ error: "Failed to compute top tags" });
  }
});

module.exports = router;
