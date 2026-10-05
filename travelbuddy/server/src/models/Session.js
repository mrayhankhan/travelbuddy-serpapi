const mongoose = require("mongoose");

const swipeEventSchema = new mongoose.Schema(
  {
    cardId: String,
    stage: { type: String, enum: ["vibes", "activities", "stays"] },
    direction: { type: String, enum: ["LIKE", "DISLIKE", "SAVE"] },
    cardIndex: { type: Number, default: 0 },
    swipeDurationMs: { type: Number, default: 1000 },
    detailViewed: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false },
);

const sessionSchema = new mongoose.Schema({
  userEmail: { type: String, default: null, index: true }, // links session to authenticated user
  departureCity: { type: String, required: true },
  duration: { type: String, enum: ["3-5", "5-7", "7-10"], required: true },
  intendedTravelWindow: {
    type: String,
    enum: [
      "within-7-days",
      "within-1-month",
      "within-3-months",
      "within-6-months",
    ],
    default: "within-1-month",
  },
  travelers: { type: Number, required: true, min: 1, max: 10 },
  adults: { type: Number, default: 1, min: 1, max: 9 },
  children: { type: Number, default: 0, min: 0, max: 6 },
  budget: { type: Number, required: true },

  // Preference vectors — updated on each swipe
  vibeScores: { type: Map, of: Number, default: {} },
  activityScores: { type: Map, of: Number, default: {} },
  stayScores: { type: Map, of: Number, default: {} },

  // Semantic user preference vector (dense 768-dim centroid)
  userVector: { type: [Number], default: [] },
  userVibeVector: { type: [Number], default: [] },
  userActivityVector: { type: [Number], default: [] },
  userStayVector: { type: [Number], default: [] },

  // Liked item IDs
  likedVibes: { type: [String], default: [] },
  likedActivities: { type: [String], default: [] },
  likedStays: { type: [String], default: [] },

  // Liked tags (de-duplicated sets of tags from liked/saved cards)
  likedVibeTags: { type: [String], default: [] },
  likedActivityTags: { type: [String], default: [] },
  likedStayTags: { type: [String], default: [] },

  // Full swipe history
  swipeEvents: { type: [swipeEventSchema], default: [] },

  // Adaptive card selection — track shown card IDs
  shownCards: { type: [String], default: [] },

  // Calibration duel & quick-tap events
  calibrationEvents: [
    {
      type: { type: String, enum: ["duel", "quicktap"] },
      stage: String,
      data: mongoose.Schema.Types.Mixed,
      timestamp: { type: Date, default: Date.now },
    },
  ],

  // User-curated tag preferences from ProfileDrawer ("My Preferences")
  profileTags: {
    vibes: { type: [String], default: [] },
    activities: { type: [String], default: [] },
    stays: { type: [String], default: [] },
  },

  // Persisted itinerary for returning users
  savedItinerary: { type: mongoose.Schema.Types.Mixed, default: null },
  savedShortlist: { type: [mongoose.Schema.Types.Mixed], default: [] },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", sessionSchema);
