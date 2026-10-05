# TravelBuddy: ML Recommendation Engine — Architecture & Merge Guide

> **ATTENTION BACKEND AI AGENT:** 
> This document is your complete technical blueprint for the ML Recommendation system implemented on this branch. We are merging this ML functionality into the main backend repository. You must understand **what features this system achieves** and **how to technically implement them** to prevent breaking the core value of TravelBuddy .

---

## Part 1: Features & Goals (What We Built)

The core USP (Unique Selling Proposition) of TravelBuddy is that travelers often *do not know* what they want. Traditional travel apps ask explicit questions ("Where do you want to go?" "Do you like beaches?"), which frustrates confused users. 

TravelBuddy uses implicit behavioral analytics—specifically, a Tinder-like swiping interface—to learn what the user wants in real-time. The ML system achieves **10 major features:**

### Feature 1: Implicit Preference Extraction (No Forms)
Instead of static surveys, the system translates every swipe into mathematical signals. A user liking a picture of "Northern Lights" doesn't just mean "Go to Norway." It secretly adjusts their "Nature", "Cold", "Magical", "Remote", "Winter", and "Photography" preference scores in the backend (6 tags per card).

### Feature 2: Multi-Vector Profiling
The ML system profiles the user across three distinct stages to build a holistic profile:
1. **Vibes:** What kind of visual aesthetic draws them in? (e.g., Northern Lights, Mediterranean, Cultural, Romantic).
2. **Activities:** What do they want to *do* there? (e.g., Hiking, Food Tours, Museum Hopping, Photography).
3. **Stays:** Where do they want to sleep? (e.g., Eco Lodge, Luxury Hotel, Social Hostel, Mountain Chalet).

### Feature 3: Dynamic Adaptive Swipe Feed (The Exploration Engine)
The feed of swipe cards is not pre-determined. It adapts dynamically (`cardSelector.js`):
- **75/25 Split:** 75% of cards match the user's current preference vector (exploitation), 25% are fresh exploration cards the user hasn't indicated preference for.
- **Anti-Repetition Interleave:** A greedy diversity algorithm ensures consecutive cards never share >50% tag overlap, preventing "Beach, Beach, Beach" sequences.
- **Cross-Phase Pre-Seeding:** Learning carries forward — if a user loves "City" + "Food" vibes, the Activity phase immediately prioritizes culinary/nightlife cards via a 40% cross-stage influence weight.

### Feature 4: Dynamic Phase Quotas (Short-Circuit & Deep Exploration)
The number of cards per phase is not static — it adapts to user behavior:
- **Short-Circuit (≥70% likes after 7 swipes):** If the user clearly loves this category, the phase ends early with a 🚀 toast. The ML has enough signal.
- **Deep Exploration (≥50% dislikes after 7 swipes):** If the user isn't finding matches, the quota extends by +4 cards (up to 20 max) with a 🔍 toast, and triggers an adaptive fetch from the backend for ML-curated cards.

### Feature 5: Multi-Signal Scoring
Every swipe generates a rich, multi-dimensional signal — not just "Like" or "Dislike":

| Signal | Multiplier | What It Captures |
|---|---|---|
| **Base direction** | LIKE: +1.0, SAVE: +1.8, DISLIKE: −0.5 | Explicit preference |
| **Position decay** | 1.0 → 1.5× (later swipes) | Later decisions = more informed |
| **Swipe speed** | <400ms: 0.5×, <800ms: 0.75×, >800ms: 1.0× | Fast = uncertain, slow = deliberate |
| **Tag rarity (IDF)** | 1/√freq boost for rare tags | Rare tags = more distinctive |
| **Detail view engagement** | 1.5× if user opened card detail first | Opened detail = deeply considered |
| **Wishlist (SAVE)** | 1.8× base (strongest signal) | Explicit save = highest interest |

### Feature 6: Contextual Calibration Duels (Algorithmic Interventions)
The ML model detects chaotic or negative swiping and actively intervenes:
- **Dislike Streaks (3+):** Pops up a "Duel" asking the user to choose between opposing concepts (e.g., "City vs. Nature").
- **Tag Conflicts:** If a user swipes right on both "Party" and "Zen Retreat" (which mathematically contradict), the system pauses and forces clarification.

### Feature 7: Cross-Phase Learning
Preferences don't reset between phases:
- **Vibes → Activities:** Activity cards are pre-sorted using vibeScores at 40% weight.
- **Vibes + Activities → Stays:** Stay cards are pre-sorted using a blended vector of *both* vibe and activity scores at 40% weight.

### Feature 8: Multi-Vector Destination Ranking
Every destination in the database has its own mathematical Vibe, Activity, and Stay vectors (enriched with 35+ tags matching the card vocabulary). When planning finishes, the backend performs Cosine Similarity ranking:
- **50% Vibes** + **30% Activities** + **20% Stays**
- **±10% Budget alignment** bonus/penalty
- **ProfileTags bonus (up to +15%):** User-curated tags from the ProfileDrawer get an extra weighting boost
- Normalized to 55–99% match scores; returns top 5

### Feature 9: Micro-Personalized Itineraries
The ML model doesn't stop at picking the destination. It physically re-arranges the daily itinerary based on the user's highest Activity tags. If two users both get recommended Paris, but User A likes "Food" and User B likes "Art", User A's schedule will have Food Tours moved to Day 1, while User B's schedule will prioritize the Louvre on Day 1.

### Feature 10: Swipe Undo
Users can undo their last swipe within 3 seconds via a ↩ button. The undo:
- Re-inserts the card at the top of the stack
- Reverses the preference vector update (removes like or decrements dislike counter)
- Clears automatically after 3 seconds

---

## Part 2: Technical Implementation (How To Merge It)

The following mathematical formulas, models, and routes **must be preserved exactly** from this branch into the main backend.

### 1. The Core Architecture: Vector Space Modeling
- Vectors are stored as `type: Map, of: Number` in Mongoose.
- 66 swipe cards with 6 tags each (40+ unique tags across the vocabulary).
- 10 destinations with enriched vibeVector, activityVector, stayVector matching the card tag vocabulary.

#### 🚨 CRITICAL MONGODB BUG WARNING 🚨
When the AI fetches these Maps to perform math in `scoring.js` or `cards.js`, **DO NOT** convert them to JavaScript objects using `Object.fromEntries(m)`. Mongoose hides the actual Map data inside `_doc`. `Object.fromEntries` will return `{}` and silently destroy all the user's preferences, breaking the ML model completely so every destination matches at 0%.
**You MUST use this exact helper function:**
```javascript
function mapToObj(m) {
    if (!m) return {};
    if (typeof m.toJSON === 'function') return m.toJSON();
    if (m instanceof Map) return Object.fromEntries(m);
    return m;
}
```

### 2. Files to Migrate

#### A. The Core ML Libraries (`src/lib`)
1. **`scoring.js`**: The mathematical heart of the app. Contains:
   - `updatePreferenceVector(...)`: Multi-signal scoring with position decay, speed weighting, IDF normalization, detail view engagement (1.5×), and SAVE boost (1.8×).
   - `rankDestinations(session, destinations, budget)`: Cosine similarity ranking (50% Vibes, 30% Activities, 20% Stays) + budget alignment + profileTags bonus (up to +15%).
   - `personalizeItinerary(itinerary, activityScores)`: The dynamic day-by-day scheduler.
2. **`cardSelector.js`**: The 75/25 preferred/exploration logic with anti-repetition interleave.

#### B. Mongoose Models (`src/models`)
1. **`Session.js`**: Requires `vibeScores`, `activityScores`, `stayScores` (Maps), `swipeEvents` array (includes `detailViewed` flag, `swipeDurationMs`, `cardIndex`), and `calibrationEvents`.
2. **`Destination.js`**: Requires enriched `vibeVector`, `activityVector`, `stayVector` (Maps) with the new tag vocabulary. 
3. **`SwipeCard.js`**: The 66-card seed database with 6 tags each.

#### C. The Endpoints (`src/routes`)
- **`POST /api/swipe` (`swipe.js`)**: Captures `cardIndex`, `swipeDurationMs`, and `detailViewed` from the body and passes them into `updatePreferenceVector()`.
- **`POST /api/cards/next` (`cards.js`)**: Uses `mapToObj()` on the Mongoose maps, builds cross-stage vectors (vibeScores for activities, blended vibe+activity for stays), and passes to `selectNextCards()`.
- **`POST /api/calibration` (`calibration.js`)**: Handles duel results and quick-tap tag boosts.
- **`POST /api/preferences/sync`**: Syncs user's curated ProfileDrawer tags to the session.
- **`POST /api/preferences/remove-tag`**: Removes a specific tag from the user's profile.
- **`POST /api/destinations/shortlist`**: Calls `rankDestinations()`.
- **`POST /api/destinations/itinerary/generate`**: Calls `adjustItineraryCosts()`, `personalizeItinerary()` (micro-personalizes daily activity order), and injects live HotelAPI hotel data.

---

## Part 3: Scoring Constants Reference

```javascript
const ALPHA = 1.0;       // weight for LIKE
const BETA = 0.5;        // penalty for DISLIKE
const SAVE_BOOST = 1.8;  // wishlist save = strongest signal (nearly 2x a normal like)

// Multi-vector weights for destination ranking
const VIBE_WEIGHT = 0.50;
const ACTIVITY_WEIGHT = 0.30;
const STAY_WEIGHT = 0.20;

// Dynamic quota constants (SwipeEngine.tsx)
const BASE_CARDS_PER_PHASE = 12;
const MIN_SWIPES_FOR_CONFIDENCE = 7;
const SHORT_CIRCUIT_THRESHOLD = 0.70;  // ≥70% likes → end phase early
const DEEP_EXPLORE_THRESHOLD = 0.50;   // ≥50% dislikes → extend phase
const DEEP_EXPLORE_EXTENSION = 4;
const ABSOLUTE_MAX_PER_PHASE = 28;

// Cross-stage influence weight (cardSelector.js)
const CROSS_STAGE_WEIGHT = 0.40;       // 40% influence from previous phases

// Detail view engagement multiplier (scoring.js)
const ENGAGEMENT_MULTIPLIER = 1.5;     // 1.5x when user opened detail before swiping
```

---

## Part 4: Merge Checklist

When the backend merge is complete, run a local script or use the frontend to verify:
1. **Serialization Check:** Ensure `POST /api/swipe` does not wipe out `vibeScores` to `{}`.
2. **Ranking Check:** Ensure `POST /api/destinations/shortlist` returns different mathematical percentage scores. If all scores are identical, the Cosine Similarity calculation is broken due to empty vectors.
3. **Sort Check:** Ensure `POST /api/destinations/itinerary/generate` returns an itinerary where the top items in `Day 1` change depending on the user's `activityScores`.
4. **Cross-Phase Check:** Verify that swiping right on "City" cards in Vibes causes "Nightlife" and "Food" cards to appear earlier in Activities.
5. **Tag Vocabulary Check:** Ensure destination vectors contain tags that match card tags (e.g., `Urban`, `Trendy`, `Coastal`, `Photography`, `Warm`).
