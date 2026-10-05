# 🚀 TravelBuddy — Backend Deep Dive

> **Entry point:** `server/src/index.js`  
> **Stack:** Express.js · Mongoose/MongoDB · Google Gemini (Vertex AI) · HotelAPI Hotel + Air API · xml2js · bcryptjs

This document is a file-by-file, system-by-system walkthrough of everything inside `server/src/`. It is the backend equivalent of the frontend deep dive — designed to make you fully literate on every non-trivial decision in the codebase.

---

## 📑 Table of Contents

1. [Server Entry Point — `index.js`](#-server-entry-point--indexjs)
2. [MongoDB Models](#-mongodb-models)
   - Session
   - User
   - Destination
   - SwipeCard
3. [Route Layer](#-route-layer)
   - `/api/session`
   - `/api/swipe`
   - `/api/cards`
   - `/api/destinations`
   - `/api/calibration`
   - `/api/itineraries`
   - `/api/chatbot`
   - `/api/auth-backend`
   - `/api/preferences`
   - `/api/photo`
4. [Library Utilities (`lib/`)](#-library-utilities-lib)
   - `semanticVector.js` — 768-dim leaky integrator
   - `scoring.js` — Destination ranking engine
   - `cardSelector.js` — Adaptive card feed
   - `geminiAuth.js` / `geminiClient.js` — AI gateway
   - `gemini.js` — Itinerary prompt builder
   - `hotelClient.js` — HotelAPI Hotel + Air API tunnel
   - `geocoder.js` — Origin resolution
   - `cityCodeMap.js` — City → HotelAPI codes
5. [Database Seeding — `seed.js`](#-database-seeding--seedjs)
6. [Complete API Reference](#-complete-api-reference)
7. [Data Flow: Swipe → Shortlist → Itinerary](#-data-flow-swipe--shortlist--itinerary)
8. [Key Design Decisions & Interview Q&A](#-key-design-decisions--interview-qa)

---

## 🏗 Server Entry Point — `index.js`

```js
// Key middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Request logger attached as middleware before routes
app.use((req, res, next) => {
    console.log(`[ISO timestamp] METHOD /url`);
    next();
});
```

**Route mounting order:**

| Prefix | File |
|---|---|
| `/api/session` | `routes/session.js` |
| `/api/cards` | `routes/cards.js` |
| `/api/swipe` | `routes/swipe.js` |
| `/api/destinations` | `routes/destination.js` |
| `/api/calibration` | `routes/calibration.js` |
| `/api/preferences` | `routes/preferences.js` |
| `/api/photo` | `routes/photo.js` |
| `/api/auth-backend` | `routes/auth.js` |
| `/api/chatbot` | `routes/chatbot.js` |
| `/api/itineraries` | `routes/itineraries.js` |

**Startup sequence:**
1. `validateGeminiConfig()` — validates Vertex AI env vars; crashes the process with `process.exit(1)` if missing (fail fast)
2. `mongoose.connect(MONGODB_URI)` — connects to MongoDB; only calls `app.listen()` inside `.then()`, so the API never accepts traffic before DB is ready

**Health endpoints:**
- `GET /` → plain text ping
- `GET /api/health` → `{ status: 'ok', timestamp }`

---

## 🗄 MongoDB Models

### `Session.js`

The session is the **entire state machine** for one user's trip planning journey. Everything the ML engine needs is embedded here.

| Field | Type | Purpose |
|---|---|---|
| `userEmail` | `String \| null` | Links anonymous session to an authenticated user post-login |
| `departureCity` | `String` | User onboarding input |
| `duration` | `Enum: 3-5, 5-7, 7-10` | Trip length bucket |
| `intendedTravelWindow` | `Enum` | within-7-days → within-6-months |
| `travelers / adults / children` | `Number` | Used by HotelAPI API for room and pax math |
| `budget` | `Number` | Total INR budget; used for 50/30/20 split |
| `vibeScores / activityScores / stayScores` | `Map<String, Number>` | Sparse tag-level preference scores (legacy scoring) |
| `userVibeVector / userActivityVector / userStayVector` | `[Number]` | **768-dim dense semantic vectors** per phase (leaky integrator) |
| `userVector` | `[Number]` | Monolithic 768-dim combined vector (legacy; still updated) |
| `likedVibes / likedActivities / likedStays` | `[String]` | Card IDs of liked/saved cards per phase |
| `likedVibeTags / likedActivityTags / likedStayTags` | `[String]` | De-duplicated tag sets from liked cards (fed to Gemini) |
| `swipeEvents` | `[SwipeEvent]` | Full swipe history with timing, direction, detail-view flag |
| `shownCards` | `[String]` | IDs of all cards already shown (prevents repeats) |
| `calibrationEvents` | Mixed | Duel and quick-tap results |
| `profileTags` | `{ vibes, activities, stays }` | User-curated tag overrides from ProfileDrawer |
| `savedItinerary / savedShortlist` | Mixed | Persisted for returning users |

**SwipeEvent sub-schema captures:**
- `cardId`, `stage` (vibes/activities/stays), `direction` (LIKE/DISLIKE/SAVE)
- `cardIndex`, `swipeDurationMs`, `detailViewed` — all used by the leaky integrator for confidence weighting

---

### `User.js`

Persistent user document across sessions. Uses `bcryptjs` for password hashing.

**Key fields:**
- `provider: 'credentials' | 'google'` — Google OAuth users get a random 32-byte hex password
- `travelCash: Number` — INR rewards balance; modified atomically via `$inc`
- `spendingStyle: 0–100` — slider: 0=Budget, 100=Luxury
- `photos: [String]` — up to 5 photo URLs for the ProfileDrawer
- `budgetRange / accommodationPref` — pre-set trip constraints

**Lifecycle hooks:**
- `pre('save')`: auto-hashes password with bcrypt salt 10 if modified
- `comparePassword()`: bcrypt compare method for login

---

### `Destination.js`

Static seed data for European cities. Acts as the source of truth for ranking and itinerary shell.

| Field | Purpose |
|---|---|
| `destinationId` | Unique slug (e.g. `"reykjavik"`) |
| `tags []` | Semantic tags used for cosine/dot-product scoring |
| `vibeVector / activityVector / stayVector` | `Map<tag, weight>` for legacy cosine scoring |
| `costLevel: 1–3` | 1=budget, 2=mid, 3=premium; used for budget alignment bonus |
| `flights[]` | Fallback seed flight data (used if HotelAPI API fails) |
| `hotel` | Fallback seed hotel data |
| `days[]` | Fallback day-by-day schedule (used if Gemini fails) |
| `breakdown` | `{ flights, stay, activities, transfers }` in INR |

**Sub-schemas:** `flightSchema`, `hotelSchema`, `transferSchema`, `activityItemSchema`, `dayPlanSchema` — all have `_id: false` (no ObjectId overhead for embedded docs)

---

### `SwipeCard.js`

Simple document, seeded once via `npm run seed`.

```js
{ cardId, type: 'vibe'|'activity'|'stay', title, description, image,
  tags[], extraImages[], longDescription, highlights[] }
```

The 46 cards are split: ~15 Vibes, ~16 Activities, ~15 Stays. Tags on each card are the raw strings that feed into `getCardVector()`.

---

## 🔌 Route Layer

### `/api/session` — `routes/session.js`

| Method | Path | Description |
|---|---|---|
| `POST` | `/` | Create new session — requires `departureCity, duration, travelers, budget` |
| `GET` | `/:id` | Fetch session state including preference scores |
| `PATCH` | `/:id/link-email` | Post-login linking — sets `userEmail` on an existing anonymous session |
| `GET` | `/by-email/:email` | Look up most recent session with meaningful preference data for a returning user |
| `GET` | `/:id/top-tags` | Returns top-5 liked tags per phase via `computeTopLikedTags()` (dot product ranked) |

**Returning user logic (`/by-email/:email`):** Uses MongoDB `$or` operator to find sessions with either non-empty `vibeScores` maps or at least one swipe event. Returns `savedItinerary` and `savedShortlist` to restore the user's last view.

---

### `/api/swipe` — `routes/swipe.js`

**The most ML-critical route.** Called on every swipe.

**Request body:**
```json
{
  "sessionId": "...", "cardId": "vib-001", "stage": "vibes",
  "direction": "LIKE", "cardIndex": 3, "totalCards": 15,
  "swipeDurationMs": 1200, "detailViewed": false
}
```

**Processing pipeline per swipe:**
1. Load session from DB
2. Find card in DB, fall back to local seed data if DB not seeded
3. Push `swipeEvent` with timing metadata
4. If LIKE or SAVE: add `cardId` to `likedVibes/Activities/Stays`, and card tags to `likedVibeTags/ActivityTags/StayTags` (de-duped)
5. **Dense vector update** via `updateUserVector()` (leaky integrator):
   - Updates phase-specific vector (`userVibeVector` etc.)
   - Also updates monolithic `userVector` (legacy fallback)
6. **Sparse vector update** via `updatePreferenceVector()`:
   - Updates `vibeScores/activityScores/stayScores` maps (used by destination ranking)

> **No undo route exists in `swipe.js`**. The README mentions `/swipe/undo` but it is not implemented in the current codebase. The frontend's undo button works by re-reading the last card from local state.

---

### `/api/cards` — `routes/cards.js`

**Request:** `POST /api/cards/next`
```json
{ "sessionId": "...", "stage": "vibes", "count": 3 }
```

**Selection logic:**
1. Fetch all cards of correct type from DB (fallback to local seed)
2. Filter out already-shown cards using `session.shownCards[]` filtered by stage prefix (`vib`, `act`, `sta`)
3. Pick the **phase-specific** vector (`userVibeVector` → vibes phase, `userActivityVector` → activities phase, etc.)
4. Call `selectNextCards()` from `cardSelector.js`
5. Atomically push new card IDs into `shownCards` using `$push: { $each: newIds }` (avoids Mongoose VersionError on concurrent requests)
6. Map internal format (`cardId`) to frontend format (`id`)

Returns `{ cards[], remaining, totalInPool }`.

---

### `/api/destinations` — `routes/destination.js`

The largest route file (594 lines). Has 4 handlers:

#### `POST /shortlist`
1. Fetches all seeded destinations
2. Filters to **HotelAPI_VALID_CITIES** — a hard-coded Set of 37 cities verified to have both HotelAPI Hotel + Air APIs available
3. Calls `rankDestinations(session, destinations, budget)` → returns top 5
4. Persists `savedShortlist` on the session

#### `POST /itinerary/generate`
The **full itinerary** generation endpoint. Fires 4 heavy I/O calls in parallel via `Promise.all`:

```text
Promise.all([
  HotelAPI Hotels (searchHotels),
  HotelAPI Flights (getLiveFlights),
  Gemini Day Schedule (generateItineraryWithGemini),
  Gemini Explanation (generateExplanationWithGemini)
])
```

Each call has its own `.catch()` so a single failure never aborts the others — they all fall back to seed data.

**50/30/20 budget split:**
- `targetFlightBudget = budget * 0.50`
- `targetHotelBudget = budget * 0.30`
- `targetActivitiesBudget = budget * 0.20`

**Multi-leg flight routing:**
If the user's city has no direct flights (or HotelAPI returns nothing), the code retries from `DEL` (Delhi) as a hub airport and prepends/appends synthetic domestic connection legs (`DC 100/101`). The domestic cost is computed as `distanceKm * 4` (min ₹2,500).

**Post-processing:**
- `personalizeItinerary()` — reorders day items by activity score match
- `pruneActivitiesByBudget()` — removes most expensive non-travel items until total cost fits

#### `POST /itinerary/generate-ai` _(Progressive Lane 1 — Fast)_
Returns only Gemini days + explanation (~10–15s). Used as the first parallel response in progressive loading on the frontend while HotelAPI data loads separately.

#### `POST /itinerary/generate-hotelApi` _(Progressive Lane 2 — Slow)_
Returns only hotel + flights + pricing (~35–55s). Includes strict budget ceiling enforcement:
- If `flights + hotel + transfers > 80% of budget`, the excess is proportionally reduced across flight legs and hotel cost so the UI budget bar turns green.

#### `GET /:id/facts`
Returns destination fun-facts from a static `data/destinationFacts.json` file. Used by the "AI Analyzing" loader screen.

---

### `/api/calibration` — `routes/calibration.js`

Handles two interruption types triggered when the ML engine detects conflicting signals:

#### **Duel** (`type: 'duel'`)
User is shown two conflicting cards and drags a slider. `position` is a signed integer:
- Negative = chose left/top card
- Positive = chose right/bottom card
- `|position|` = strength (1 = slight lean, 2 = strong lean)

Vector update formula:
```
winner_weight m: 1.0 (slight) or 2.0 (strong)
loser_weight  n: -0.5 (slight) or -1.0 (strong)
new_vec = old_vec + m*winnerVec - n*loserVec
```
Applied to both the phase-specific vector AND the monolithic `userVector`.

#### **Quick-tap** (`type: 'quicktap'`)
User explicitly selects tags. Each tag gets a `+1.5` boost directly applied to the sparse `vibeScores/activityScores/stayScores` maps.

All calibration events are logged to `session.calibrationEvents[]`.

---

### `/api/itineraries` — `routes/itineraries.js`

Used by the **ItinerariesPage** (the separate "Ready-Made Trips" flow, distinct from the main swipe flow).

#### `POST /generate-multi` _(Lightweight feed — Step 1)_
- Calls Gemini with a prompt requesting exactly **3 high-level trip concepts** for European destinations
- Prompt includes `variation` parameter — if `variation > 0`, Gemini is instructed to pick completely different destinations than previous responses (enables "Regenerate" feature)
- Returns only: `destination, country, duration, matchScore, totalCost, shortDescription, breakdown`
- Designed to respond in <15 seconds

#### `POST /generate-details` _(Full detail — Step 2)_
Fires **two parallel Gemini calls** (`Promise.all`) for a chosen destination:
- **Prompt A (Logistics):** hotel, flights (departure + return), transfers — strict JSON schema
- **Prompt B (Planner):** full day-by-day schedule with `mustDo` objects per day

Both responses are parsed via `parseGeminiJson()` (strips markdown code fences) and merged into a single response object.

**mustDo requirement:** Every day must have one iconic bucket-list experience. `alignsWithPreferences` is set `true` only if the mustDo's tags overlap with the traveler's profile tags.

---

### `/api/chatbot` — `routes/chatbot.js`

A minimal Gemini-powered Q&A endpoint for the in-itinerary chatbot widget.

```
POST /api/chatbot/ask
Body: { question, destination, country }
```

System prompt enforces:
- Max 4-6 bullet points
- No markdown formatting (no `**`, no `##`)
- Destination-specific (no generic travel advice)
- Skip greetings and AI self-disclosure

Uses `generateWithRetry('gemini-2.0-flash', ...)` — deliberately uses the lighter Flash model since responses need to be fast and conversational.

---

### `/api/auth-backend` — `routes/auth.js`

Handles credential-based auth and user profile management. **Note:** JWT is NOT used — the frontend uses NextAuth.js for session tokens; the backend auth routes are a supplementary layer for profile storage.

| Method | Path | Description |
|---|---|---|
| `POST` | `/register` | Creates user doc; returns `{ id, email, name }` (no token) |
| `POST` | `/login` | Validates credentials via `bcrypt.compare`; returns same |
| `POST` | `/google-user` | Upsert for Google OAuth users — find-or-create with a random password |
| `POST` | `/reset-password` | Direct password replacement (no email verification — hackathon scope) |
| `GET` | `/profile/:email` | Full profile fetch (20+ fields) |
| `PATCH` | `/profile/:email` | Whitelist-based partial update using `findOneAndUpdate + $set` (avoids VersionError) |
| `POST` | `/profile/:email/credit-cashback` | Atomically increments `travelCash` via `$inc` |
| `POST` | `/profile/:email/deduct-cashback` | Reads current balance, floors at 0, sets via `$set` |

**PATCH whitelist:** Only 19 specific fields can be updated. All other keys in the request body are silently ignored. This prevents mass-assignment attacks.

---

### `/api/preferences` and `/api/photo`

- **`preferences.js`**: Allows reading and updating `session.profileTags` (user-curated tag overrides from ProfileDrawer)
- **`photo.js`**: Proxies image search requests (Unsplash or similar) to avoid CORS issues from the frontend

---

## 📚 Library Utilities (`lib/`)

### `semanticVector.js` — The Core ML Engine

This is the most mathematically complex file in the backend.

**Initialization:**
```js
// Loaded once at module init — 768-dim Float64 embeddings for hundreds of travel tags
TAG_EMBEDDINGS = require('../../../tagEmbeddings.json');
EMBEDDING_LOOKUP = {}; // Lowercase normalized lookup for fuzzy matching
```

**`getTagEmbedding(tag)`** — 3-tier lookup:
1. Exact match (`TAG_EMBEDDINGS[tag]`)
2. Lowercase match (`EMBEDDING_LOOKUP[tag.toLowerCase()]`)
3. Pluralization fuzzy match (adds/removes trailing `s`)

**`getCardVector(tags[])`** → `Float64Array[768]`
- Averages the embeddings of all matched tags
- If no tags match, returns zero vector

**`cosineSimilarityDense(vecA, vecB)`** — Standard cosine similarity for dense float arrays (used in card selection)

**`dotProductDense(vecA, vecB)`** — Raw dot product (used in destination ranking and explanation generation)

**`updateUserVector()` — The Leaky Integrator:**
```
finalWeight = baseWeight × Weng × Wspeed × positionalDecay

Where:
  baseWeight   = LIKE: 1.0 | SAVE: 1.5 | DISLIKE: -0.5
  Weng         = 1.5 if user opened card detail, else 1.0
  Wspeed       = 0.5 (<400ms) | 0.75 (400–800ms) | 1.0 (>800ms)
  positionalDecay = 1.0 + 0.5 * (cardIndex / totalCards)  [range 1.0 → 1.5]

newVec = 0.8 × currentVec + finalWeight × cardVec
```

Key insight: **Later swipes override earlier ones** (positional decay increases with cardIndex). **Slow, considered swipes** carry full weight. **Opening the detail view** is a 1.5× confidence signal.

---

### `scoring.js` — Destination Ranking Engine

**`updatePreferenceVector()`** — Sparse (per-tag) scoring for `vibeScores/activityScores/stayScores` maps:
- Same position/speed/engagement multipliers as the dense leaky integrator
- **Rarity boost:** `1.0 / sqrt(tagFrequency)` — niche tags count more than generic ones like "food"
- SAVE direction uses `SAVE_BOOST = 1.8` (nearly 2× a LIKE)

**`rankDestinations(session, destinations, budget)`** — 5-stage pipeline:

```
1. Combine phase vectors:
   finalUserVec = 0.5×vibeVec + 0.3×activityVec + 0.2×stayVec

2. Compute dot product between finalUserVec and destVector (from dest.tags)

3. Sort by rawDot descending → take top 10

4. Sigmoid scale each rawDot → score ∈ [0, 1]
   scaledDot = rawDot / 10.0
   sigmoidScore = 1 / (1 + e^(-1.2 × scaledDot))

5. Apply bonuses → normalize to 55–99 integer:
   + Budget alignment bonus: +5% if costLevel matches bracket, -10% if 2 levels off
   + ProfileTags overlap bonus: up to +10% based on tag overlap ratio
```

**`personalizeItinerary()`** — Micro-personalization of day items:
- `travel` type items are "pinned" (position-fixed)
- All other items are scored by keyword overlap with `activityScores` map
- Highest-scoring items move to best time slots of the day

**`pruneActivitiesByBudget()`** — Greedy budget enforcer:
- Iterates while `activities + transfers > maxBudget`
- Each iteration finds and removes the single most expensive non-travel item

**`generateRecommendationExplanation()`** — The "Why this destination?" card:
- Builds `destVector` from destination tags
- For each liked tag in each phase: computes `dotProduct(tagEmbedding, destVector)`
- Returns top-5 tags per phase that semantically align most with the destination
- Falls back to rule-based text if Gemini call fails

---

### `cardSelector.js` — Adaptive Card Feed

**Constants:**
```js
PREFERRED_RATIO = 0.75  // 75% semantically matched cards
EXPLORE_RATIO   = 0.25  // 25% novelty/discovery cards
MIN_SWIPES_FOR_ADAPTIVE = 2  // cold start threshold
```

**`selectNextCards()`** algorithm:

**Cold start** (< 2 swipes or zero vector):
- Score = `0.5 × explorationScore + 0.5 × diversityScore`
- Pure novelty-weighted random — no personalization yet

**Adaptive mode** (≥ 2 swipes):
1. Compute `cosineSimilarityDense(userVector, cardVector)` for all unseen candidates
2. Split sorted results at midpoint → preferredPool (top 50%) + explorationPool (bottom 50%)
3. Within preferredPool: sort by `semanticMatch + 0.3×diversity`
4. Within explorationPool: sort by `explorationScore + 0.5×diversity`
5. Take `round(count × 0.75)` from preferred + remainder from exploration
6. **Fisher-Yates shuffle** so user can't tell which are preferred vs exploration
7. **`diversityInterleave()`** — greedy reorder so consecutive cards have minimal tag overlap

**`explorationScore()`** — novelty formula:
```
sum(1 / (1 + timesTagSeen)) / numTags
```
Tags the user has never been shown score 1.0; frequently shown tags score near 0.

---

### `geminiAuth.js` / `geminiClient.js` — AI Gateway

**`geminiClient.js`** — Singleton `@google/genai` client using Vertex AI credentials:
```js
const ai = new GoogleGenAI({
    vertexai: true,
    project: process.env.VERTEX_PROJECT_ID,
    location: process.env.VERTEX_LOCATION,
    apiKey: process.env.VERTEX_API_KEY,
});
```

**`geminiAuth.js`** — `generateWithRetry(preferredModel, content)`:
- Builds ordered model list: `[preferredModel, 'gemini-2.5-flash', 'gemini-2.0-flash']` (deduplicated)
- Iterates through models; catches quota errors (HTTP 429, "resource_exhausted") and tries the next model
- Wraps new SDK response shape `{ text }` into legacy shape `{ response: { text() } }` for backward compatibility across all routes

---

### `gemini.js` — Itinerary Prompt Builder

Contains `generateItineraryWithGemini()` and `generateExplanationWithGemini()`.

**Itinerary prompt key constraints:**
- Strict JSON output format — no markdown code blocks
- `durationDays` number of day objects required
- Each day item has `time, activity, description, cost, type`
- `type` enum: `travel | activity | food | relax | shopping`
- All costs in INR, realistic for European travel
- Tailor activities to user's vibe/activity/stay tags (passed directly in prompt)

**Post-processing after receiving Gemini JSON:**
- Strips markdown code fences via regex
- Validates array structure
- Re-assigns day numbers sequentially
- Clamps day count to `durationDays`

---

### `hotelClient.js` — HotelAPI Hotel + Air API Tunnel

The largest file at ~109KB. Wraps HotelAPI's REST + XML APIs.

**Hotel search (`searchHotels()`):**
- Endpoint: `http://api.example.invalid/HotelAPIHolidays_HotelAPI/HotelSearch`
- Auth: HTTP Basic (`HOTEL_API_USERNAME:HOTEL_API_PASSWORD`)
- City code lookup via `cityCodeMap.js`
- Filters: `StarRating >= 3`, excludes package-locked inventory
- Picks the best hotel by matching user preferences (stay scores): luxury tags → higher star rating preferred
- Price standardization: converts USD → INR using a scalar; `rooms = ceil(travelers / 2)`

**Flight search (`getLiveFlights()`):**
- HotelAPI Air API with departure + return leg fetching
- `AIRPORT_CODE_MAP` maps city names to IATA codes
- Returns normalized flight objects with `type: 'departure' | 'return'`, costs in INR

---

### `geocoder.js` — Origin Resolution

**`resolveOrigin(cityName)`** maps the user's typed departure city to:
- `originCode` — IATA airport code (or nearest hub)
- `needsConnection` — boolean; `true` if city has no direct international flights
- `distanceKm` — used to compute domestic connection cost

Covers 100+ Indian cities. Tier system:
- Tier 1: Metro airports with direct international flights (DEL, BOM, BLR, MAA, CCU, HYD, COK)
- Tier 2: Cities with domestic connections to DEL hub
- Fallback: defaults to DEL

---

### `cityCodeMap.js`

Maps destination city names (lowercase) to HotelAPI `CityCode` integers. Used by `hotelClient.js` to look up hotel inventory for a destination. Covers the 37 HotelAPI_VALID_CITIES plus additional mappings. Returns `null` for unmapped cities, which triggers the seed data fallback.

---

## 🌱 Database Seeding — `seed.js`

```bash
cd server && npm run seed
```

One-time script (safe to re-run — uses upserts):
1. Connects to MongoDB
2. Bulk-upserts **46 SwipeCards** from `data/swipeCards.js`
3. Bulk-upserts **10 European Destinations** from `data/destinations.js`
4. Logs: `📇 Seeded 46 swipe cards | 🌍 Seeded 10 destinations`

---

## 🔌 Complete API Reference

**Base URL:** `http://localhost:5002/api`

| Method | Endpoint | Request Body | Returns |
|---|---|---|---|
| `POST` | `/session` | `{ departureCity, duration, travelers, budget, ... }` | `{ sessionId }` |
| `GET` | `/session/:id` | — | Full session state + scores |
| `PATCH` | `/session/:id/link-email` | `{ email }` | `{ success }` |
| `GET` | `/session/by-email/:email` | — | Session + savedItinerary |
| `GET` | `/session/:id/top-tags` | — | `{ vibes[], activities[], stays[] }` |
| `POST` | `/swipe` | `{ sessionId, cardId, stage, direction, ... }` | Updated preferences |
| `POST` | `/cards/next` | `{ sessionId, stage, count }` | `{ cards[], remaining, totalInPool }` |
| `POST` | `/destinations/shortlist` | `{ sessionId }` | Top-5 ranked destinations |
| `POST` | `/destinations/itinerary/generate` | `{ sessionId, destinationId }` | Full itinerary |
| `POST` | `/destinations/itinerary/generate-ai` | `{ sessionId, destinationId }` | Days + explanation (fast lane) |
| `POST` | `/destinations/itinerary/generate-hotelApi` | `{ sessionId, destinationId }` | Hotel + flights (slow lane) |
| `GET` | `/destinations/:id/facts` | — | `{ facts[] }` |
| `POST` | `/calibration` | `{ sessionId, type, stage, ... }` | `{ success }` |
| `POST` | `/itineraries/generate-multi` | `{ departureCity, budget, profileTags, variation }` | 3 itinerary summaries |
| `POST` | `/itineraries/generate-details` | `{ destination, country, budget, profileTags }` | Full itinerary (AI-only) |
| `POST` | `/chatbot/ask` | `{ question, destination, country }` | `{ answer }` |
| `POST` | `/auth-backend/register` | `{ email, password, name }` | `{ id, email, name }` |
| `POST` | `/auth-backend/login` | `{ email, password }` | `{ id, email, name }` |
| `POST` | `/auth-backend/google-user` | `{ email, name, image }` | `{ id, email, name }` |
| `POST` | `/auth-backend/reset-password` | `{ email, newPassword }` | `{ success }` |
| `GET` | `/auth-backend/profile/:email` | — | Full user profile |
| `PATCH` | `/auth-backend/profile/:email` | Any whitelisted fields | `{ success }` |
| `POST` | `/auth-backend/profile/:email/credit-cashback` | `{ amount }` | `{ travelCash }` |
| `POST` | `/auth-backend/profile/:email/deduct-cashback` | `{ amount }` | `{ travelCash }` |

---

## 🔄 Data Flow: Swipe → Shortlist → Itinerary

```
User swipes card
     │
     ▼
POST /api/swipe
  ├── updateUserVector()       [dense, leaky integrator, phase-specific]
  └── updatePreferenceVector() [sparse, tag-level IDF scoring]
     │
     ▼
POST /api/cards/next
  └── selectNextCards()        [cosine similarity + 75/25 split + diversity interleave]
     │
     ▼
POST /api/destinations/shortlist
  └── rankDestinations()       [0.5×vibeVec + 0.3×actVec + 0.2×stayVec → dot product
                                → top 10 → sigmoid → budget/profile bonuses → top 5]
     │
     ▼
POST /api/destinations/itinerary/generate
  ├── searchHotels()           [HotelAPI Hotel API → fallback seed]
  ├── getLiveFlights()         [HotelAPI Air API → DEL hub fallback → seed]
  ├── generateItineraryWithGemini()    [Gemini 2.5 Flash → day schedule]
  └── generateExplanationWithGemini() [Gemini → "Why this destination?"]
       │
       ▼
  personalizeItinerary()       [day item reordering by activityScores]
  pruneActivitiesByBudget()    [greedy activity removal if over budget]
       │
       ▼
  JSON response → Frontend ItineraryView
```

---

## 💡 Key Design Decisions & Interview Q&A

### Q: Why two parallel scoring systems (dense vectors AND sparse maps)?

**A:** Dense 768-dim vectors (`userVibeVector` etc.) power the destination ranking and card selection — they capture semantic *meaning* (cosine distance in embedding space). Sparse tag maps (`vibeScores`) provide an interpretable signal for features like "why was this recommended" and the micro-personalization of itinerary day ordering by keyword matching. Both are updated on every swipe for backwards compatibility.

### Q: Why does the Session store both `userVector` AND three phase vectors?

**A:** The monolithic `userVector` is a legacy field from v1. Phase-specific vectors (`userVibeVector`, `userActivityVector`, `userStayVector`) were added later when the product introduced 3-phase swiping. The monolithic vector is still maintained for backwards compatibility with older sessions in the database and as a fallback in `cards.js`.

### Q: Why use `$push: { $each }` atomically instead of `session.save()`?

**A:** `cards.js` uses `findByIdAndUpdate` with `$push` for recording shown cards, rather than loading the full session and calling `.save()`. This avoids Mongoose's optimistic concurrency VersionError that can occur when multiple API calls modify the same document simultaneously (e.g., rapid-fire swipes).

### Q: What happens if both HotelAPI API and Gemini fail?

**A:** The destination route has independent `.catch()` on all 4 parallel calls. Each falls back gracefully:
- HotelAPI Hotel → `destination.hotel` from MongoDB seed
- HotelAPI Flights → `destination.flights` from MongoDB seed
- Gemini itinerary → `destination.days` from MongoDB seed
- Gemini explanation → rule-based text from `generateRecommendationExplanation()`

The response is always served — never a 500.

### Q: What is the HotelAPI_VALID_CITIES filter and why does it exist?

**A:** The seeded Destination collection may contain cities HotelAPI cannot actually fulfill (no hotel inventory or no direct flights). The shortlist route hard-codes a Set of 37 cities verified to have both HotelAPI Hotel API and HotelAPI Air API coverage. This prevents showing users destinations that would silently fall back to fake seed data for both hotel and flights.

### Q: How does the "progressive loading" pattern work between frontend and backend?

**A:** The frontend fires two parallel fetch calls simultaneously after the user picks a destination:
- `generate-ai` → fast (~10–15s) — returns AI itinerary days + explanation
- `generate-hotelApi` → slow (~35–55s) — returns live hotel + flight data

The frontend renders progressively as each resolves. The full `generate` endpoint (both combined) is still available as a single-call alternative for simpler integrations.

### Q: How does `parseBudget()` work?

**A:** Handles multiple user input formats: `"1.5L"` → 150,000; `"200k"` → 200,000; `"300000"` → 300,000. Falls back to 150,000 if unparseable. Enforces a ₹10,000 floor.

### Q: What triggers a calibration duel vs quick-tap?

**A:** This is orchestrated entirely on the **frontend** (`SwipeDeck.tsx`). The backend `calibration` route just processes whatever the frontend sends. The frontend triggers a duel when it detects contradictory high-scoring tags (e.g., both "ultra-luxury" and "budget backpacking"), and a quick-tap when it detects the user is swiping too quickly (below the speed confidence threshold) without looking carefully.

### Q: Why `bcryptjs` instead of `bcrypt`?

**A:** `bcryptjs` is a pure-JavaScript implementation — no native C++ bindings required. This removes the need for `node-gyp` compilation on Windows (the dev environment) and simplifies deployment. Slightly slower than native `bcrypt` but negligible at hackathon scale.
