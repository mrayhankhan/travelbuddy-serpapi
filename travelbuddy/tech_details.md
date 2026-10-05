# TravelBuddy — Comprehensive Technical Specification

> **Version:** 2.0 (March 2026) | **Stack:** Next.js 15 · Express.js · MongoDB · Google Cloud · Gemini 2.5 Flash

---

## Table of Contents
1. [System Architecture](#1-system-architecture)
2. [Frontend Architecture](#2-frontend-architecture)
3. [Backend Architecture](#3-backend-architecture)
4. [Database Schema](#4-database-schema)
5. [Semantic Vector Engine](#5-semantic-vector-engine)
6. [ML Scoring & Preference Engine] (#6-ml-scoring--preference-engine)
7. [Adaptive Card Selection System](#7-adaptive-card-selection-system)
8. [Destination Ranking Algorithm](#8-destination-ranking-algorithm)
9. [Generative AI Pipeline](#9-generative-ai-pipeline)
10. [HotelAPI Hotel API Integration](#10-hotelApi-hotel-api-integration)
11. [Google Maps & Location Services](#11-google-maps--location-services)
12. [Payment Gateway](#12-payment-gateway)
13. [Authentication & User Management](#13-authentication--user-management)
14. [API Reference](#14-api-reference)
15. [Error Handling & Fallback Strategy](#15-error-handling--fallback-strategy)
16. [Data Flow Diagrams](#16-data-flow-diagrams)

---

## 1. System Architecture

TravelBuddy is a two-service, mobile-first web application:

| Tier | Technology | Port |
|---|---|---|
| **Frontend** | Next.js 15.1.3 (App Router, RSC, Turbopack) | `3000` |
| **Backend** | Express.js 4 on Node.js v22 | `5002` |
| **Database** | MongoDB 7 via Mongoose 8 | `27017` |
| **AI** | Google Gemini 2.5 Flash / 2.0 Flash Lite | Cloud |
| **Mapping** | Google Maps Platform v3 | Cloud |
| **Auth** | NextAuth.js (Google OIDC) | Cloud |

### 1.1 Frontend State Machine

The entire user journey is managed by a **8-phase state machine** in `travel-buddy/src/app/page.tsx`. State is held in React `useState`; there is no Redux or Zustand.

```
splash → session → auth_gate → photo_upload → swipe → summary → analyzing → shortlist → itinerary → payment → booked
```

Phase transitions trigger `window.scrollTo(0, 0)` via a `useEffect` to reset scroll on every view change.

**Special concurrent overlays (rendered outside `AnimatePresence`):**
- `phase === "itinerary"` → `ItineraryView` at `z-20`
- `phase === "payment"` → `PaymentGateway` at `z-30`
- `phase === "booked"` → `BookingSuccess` at `z-30`
- Global profile button at `z-50` — conditionally hidden for phases: `splash`, `session`, `auth_gate`, `photo_upload`, `swipe`, `payment`

### 1.2 Bottom Navigation Logic

```js
const showBottomNav = ["swipe", "summary", "analyzing", "shortlist", "itinerary", "booked"].includes(phase);
```

---

## 2. Frontend Architecture

### 2.1 Key Component Tree

```
page.tsx (state machine)
├── SessionInit.tsx         ← onboarding (4 steps, <20s)
├── PreSwipeAuth.tsx        ← returning user gate
├── PhotoUpload.tsx         ← AI photo-to-tags feature
├── SwipeEngine.tsx         ← card stack manager
│   ├── SwipeCard.tsx       ← individual Framer Motion card
│   ├── CardDetail.tsx      ← bottom-sheet expand modal
│   └── ContextualDuel.tsx  ← preference clarification duels
├── PreferenceSummary.tsx   ← top vibes/activities/stays display
├── DestinationShortlist.tsx← ranked top-5 cards
├── ItineraryView.tsx       ← 4-tab itinerary layout
│   ├── ItineraryCard.tsx   ← card-level summary
│   ├── FullItineraryModal.tsx
│   ├── LocationStreetViewModal.tsx ← sightseeing panoramas
│   ├── HotelStreetViewModal.tsx    ← hotel panoramas
│   └── CityMap.tsx         ← Google Places explorer
├── PaymentGateway.tsx      ← full payment UI
└── BookingSuccess.tsx      ← post-booking rewards screen
```

### 2.2 Framer Motion Usage

All page transitions use shared `pageVariants`:
```ts
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
};
```

Swipe cards use `useMotionValue` + `useTransform` to derive:
- **Rotation** from `x` position: `x / 20` degrees
- **Overlay opacity**: `Math.abs(x) / 150`
- **Drag threshold**: `|x| > 80px` OR `|velocity| > 400px/s`

### 2.3 API Abstraction Layer (`api.ts`)

All backend calls route through `travel-buddy/src/lib/api.ts`. Every function wraps its `fetch()` in a `try/catch`. On failure, it silently returns a local mock (from `itineraryMock.ts` or `mockData.ts`). This ensures zero fatal crashes during demos.

```ts
// Example pattern used throughout
try {
  const res = await fetch(`${API_BASE}/destinations/shortlist`, { method: 'POST', ... });
  return await res.json();
} catch {
  return MOCK_SHORTLIST; // local fallback
}
```

### 2.4 `deriveDurationLabel` Utility

Located in `travel-buddy/src/lib/utils.ts`. Normalises duration display from either:
- An array of `Day` objects: counts `days.length` and computes nights as `n - 1`.
- A string like `"6 days / 5 nights"`: parsed by regex.

---

## 3. Backend Architecture

### 3.1 Express.js Route Map

Base URL: `http://localhost:5002/api`

| Method | Path | Handler File | Description |
|---|---|---|---|
| `GET` | `/health` | `index.js` | Server liveness check |
| `POST` | `/session` | `session.js` | Create session with onboarding data |
| `GET` | `/session/:id` | `session.js` | Fetch session + vectors |
| `POST` | `/session/:id/link-email` | `session.js` | Link session to authenticated user |
| `GET` | `/cards/:stage` | `cards.js` | Fetch seed cards for a phase |
| `POST` | `/cards/next` | `cards.js` | Adaptive batch selection (uses `cardSelector.js`) |
| `POST` | `/swipe` | `swipe.js` | Record swipe; update sparse + dense vectors |
| `POST` | `/swipe/undo` | `swipe.js` | Reverse last swipe from history |
| `POST` | `/destinations/shortlist` | `destination.js` | Rank destinations via dot-product |
| `POST` | `/destinations/itinerary/generate` | `destination.js` | Full itinerary + HotelAPI hotel injection |
| `GET` | `/destinations/:id/facts` | `destination.js` | AI-generated fun facts for loader screen |
| `POST` | `/calibration` | `calibration.js` | Duel / quick-tap result processing |
| `POST` | `/preferences/sync` | `preferences.js` | Sync ProfileDrawer tags to session |
| `POST` | `/preferences/remove-tag` | `preferences.js` | Remove a single tag from all vectors |
| `POST` | `/itineraries/generate-multi` | `itineraries.js` | Gemini: 3 lightweight summaries |
| `POST` | `/itineraries/generate-full` | `itineraries.js` | Gemini: full day-by-day itinerary |
| `GET`  | `/auth-backend/profile/:email` | `authBackend.js` | Fetch user profile + TravelCash balance |
| `POST` | `/auth-backend/profile/:email/credit-cashback` | `authBackend.js` | Add TravelCash after booking |
| `POST` | `/auth-backend/profile/:email/deduct-cashback` | `authBackend.js` | Deduct TravelCash when used in payment |

### 3.2 Key Middleware

- `express.json({ limit: '10mb' })` — accepts large profile-tag payloads.
- `cors({ origin: 'http://localhost:3000' })` — locked to local frontend in dev.
- MongoDB connected at startup; the server exits with a clear error if connection fails.

---

## 4. Database Schema

### 4.1 `Session` Document (Mongoose)

The central document that tracks one user journey end-to-end.

```js
sessionSchema = {
  // Onboarding input
  userEmail:             String,          // linked on OAuth sign-in
  departureCity:         String,          // "Mumbai", "Bangalore", etc.
  duration:              "3-5"|"5-7"|"7-10",
  intendedTravelWindow:  "within-7-days"|"within-1-month"|"within-3-months"|"within-6-months",
  travelers:             Number,          // 1–10
  adults:                Number,          // 1–9
  children:              Number,          // 0–6
  budget:                Number,          // INR

  // ── Sparse preference vectors ──────────────────────────────────
  // Mongoose Map(String → Float) — updated per swipe by scoring.js
  vibeScores:            Map<String, Number>,
  activityScores:        Map<String, Number>,
  stayScores:            Map<String, Number>,

  // ── Dense semantic vectors ─────────────────────────────────────
  // Float64[] of length 768 — updated per swipe by semanticVector.js
  userVector:            [Number],        // blended vector (legacy)
  userVibeVector:        [Number],        // 768-dim centroid for vibes phase
  userActivityVector:    [Number],        // 768-dim centroid for activities phase
  userStayVector:        [Number],        // 768-dim centroid for stays phase

  // ── Tag sets (de-duplicated) ───────────────────────────────────
  likedVibes:            [String],        // cardIds liked in vibe phase
  likedActivities:       [String],        // cardIds liked in activities phase
  likedStays:            [String],        // cardIds liked in stays phase
  likedVibeTags:         [String],        // tag strings from liked vibe cards
  likedActivityTags:     [String],        // tag strings from liked activity cards
  likedStayTags:         [String],        // tag strings from liked stay cards

  // ── Swipe history ──────────────────────────────────────────────
  swipeEvents: [{
    cardId, stage, direction, cardIndex, swipeDurationMs, detailViewed, timestamp
  }],
  shownCards:            [String],        // deduplication set for card selector

  // ── Calibration ───────────────────────────────────────────────
  calibrationEvents: [{
    type: "duel"|"quicktap", stage, data(Mixed), timestamp
  }],

  // ── Profile drawer tags ────────────────────────────────────────
  profileTags: {
    vibes:      [String],
    activities: [String],
    stays:      [String],
  },

  // ── Persisted state for returning users ───────────────────────
  savedItinerary:  Mixed,
  savedShortlist:  [Mixed],

  createdAt: Date,
}
```

> **⚠️ Critical Mongoose Map Bug:** When reading `vibeScores`, `activityScores`, or `stayScores` from a hydrated Mongoose document, you MUST use the `mapToObj()` helper defined in `scoring.js`:
> ```js
> function mapToObj(m) {
>   if (!m) return {};
>   if (typeof m.toJSON === 'function') return m.toJSON();
>   if (m instanceof Map) return Object.fromEntries(m);
>   return m;
> }
> ```
> Calling `Object.fromEntries(session.vibeScores)` directly on a Mongoose Map **silently returns `{}`** due to internal Mongoose internals.

### 4.2 `SwipeCard` Document

Holds the 46 swipe cards seeded once via `npm run seed`.

```js
{
  cardId:       String,   // unique "vibes-001", "activities-012", etc.
  stage:        "vibes"|"activities"|"stays",
  title:        String,   // display headline
  description:  String,   // long description (in CardDetail)
  tags:         [String], // 6 curated semantic tags per card
  image:        String,   // Unsplash CDN URL
  icon:         String,   // emoji
  highlights:   [{title, description}], // 4 bullet highlights for CardDetail
}
```

### 4.3 `Destination` Document

```js
{
  destinationId: String,  // slug e.g. "reykjavik"
  name:          String,
  country:       String,
  image:         String,
  description:   String,
  tags:          [String],   // 6–10 tags matching card vocabulary
  vibeVector:    Map,
  activityVector: Map,
  stayVector:    Map,
  costLevel:     1|2|3,      // 1=budget, 2=mid, 3=premium
  totalCost:     Number,     // baseline INR for 2 travelers
  days:          [...],      // seed itinerary days
  flights:       [...],      // seed flight data
  hotel:         {...},      // seed hotel data
  transfers:     [...],
  breakdown:     {...},
}
```

---

## 5. Semantic Vector Engine

**File:** `server/src/lib/semanticVector.js`

### 5.1 Tag Embeddings

At module load, `tagEmbeddings.json` (≈ 2MB) is read into memory. This file contains **pre-computed 768-dimensional float vectors** for every tag in the system, generated externally using a sentence embedding model (e.g., `all-MiniLM-L6-v2` class).

```js
EMBEDDING_DIM = 768
TAG_EMBEDDINGS = { "zen": [0.021, -0.043, ...], "adrenaline": [...], ... }
```

A case-insensitive lookup map `EMBEDDING_LOOKUP` is also built at init for fuzzy matching (handles `"5-Stars"` → `"5-star"` etc.).

### 5.2 Card Vector Computation

```
getCardVector(tags[]) → Float64Array[768]
```

A card's vector is the **centroid (arithmetic mean)** of its tag embeddings:

```
cardVec = (sum of embedding(tag_i) for all matched tags) / (number of matched tags)
```

If no tags match the embedding lookup, a zero vector is returned.

### 5.3 Leaky Integrator User Vector Update

Every time the user swipes, the **dense user vector** for that phase is updated with a leaky integrator formula:

```
newVec = decay × currentVec + finalWeight × cardVec

where:
  decay         = 0.8  (preserves 80% of previous knowledge on each update)
  finalWeight   = baseWeight × Weng × Wspeed × positionalDecay

  baseWeight:
    LIKE    → +1.0
    SAVE    → +1.5
    DISLIKE → -0.5

  Weng (engagement):
    user opened CardDetail  → 1.5x
    else                    → 1.0x

  Wspeed (swipe speed):
    < 400ms (instinct)      → 0.5x
    400–800ms               → 0.75x
    > 800ms (considered)    → 1.0x

  positionalDecay:
    1.0 + 0.5 × (cardIndex / max(1, totalCards))
    (ranges 1.0 → 1.5 — later cards matter more)
```

This updates three separate phase vectors (`userVibeVector`, `userActivityVector`, `userStayVector`) simultaneously in the appropriate route.

### 5.4 Vector Operations

| Function | Description |
|---|---|
| `cosineSimilarityDense(a, b)` | Angular similarity: `dot(a,b) / (‖a‖ × ‖b‖)` |
| `dotProductDense(a, b)` | Raw dot product `Σ aᵢ × bᵢ` |
| `sigmoidScale(x, k=1.2)` | `1 / (1 + e^(-k×x))` — maps raw dot to [0, 1] |
| `hasSignal(vec)` | `true` if any `|vᵢ| > 1e-9` |

---

## 6. ML Scoring & Preference Engine

**File:** `server/src/lib/scoring.js`

### 6.1 Sparse Preference Vector Update

Alongside the dense vector, each swipe also updates a **sparse tag score map** (`vibeScores`, `activityScores`, `stayScores`). This is used for recommendation explanation generation and ProfileDrawer display.

```
For each tag in swiped card:
  rarity = 1 / √(frequency of this tag across all 46 cards)   ← IDF boost

  delta = baseDelta × positionMultiplier × speedMultiplier × rarity × engagementMultiplier

  tagScore[tag] += delta
```

Where:
- `baseDelta`: `LIKE` = `+1.0`, `SAVE` = `+1.8`, `DISLIKE` = `-0.5`
- `positionMultiplier`: `1.0 + (cardIndex / totalCards) × 0.5`
- `speedMultiplier`: same 3-tier system as dense vector
- `engagementMultiplier`: `1.5` if `detailViewed`, else `1.0`
- `rarity`: `1 / √(freq[tag])` — rare tags get proportionally larger updates

### 6.2 Budget Pruning (`pruneActivitiesByBudget`)

After itinerary cost scaling, if `activities + transfers > maxBudget`:
- Iterates all day items, identifies the **most expensive non-travel item**.
- Removes it and subtracts its cost from `breakdown.activities` and `totalCost`.
- Repeats until budget constraint is satisfied or no more pruneable items remain.

### 6.3 Recommendation Explanation (`generateRecommendationExplanation`)

For each destination, computes per-phase "why" explanations:
1. Takes `likedVibeTags`, `likedActivityTags`, `likedStayTags` from session.
2. For each liked tag, computes `dot(embedding(tag), destVector)`.
3. Returns the top 5 tags per phase as the explanation signals.
4. Builds a human-readable fallback string: *"This destination was recommended because it matches the vibes of zen, adventure..."*

### 6.4 `computeTopLikedTags`

Ranks the user's own liked tags by their alignment with their phase vector using dot product:
```
score(tag) = dot(embedding(tag), userVibeVector)
```
Returns top N tags per phase — used in `PreferenceSummary.tsx` display.

---

## 7. Adaptive Card Selection System

**File:** `server/src/lib/cardSelector.js`

Constants:
```js
PREFERRED_RATIO       = 0.75  // 75% semantically matched cards
EXPLORE_RATIO         = 0.25  // 25% exploration/novelty cards
MIN_SWIPES_FOR_ADAPTIVE = 2    // cold start until 2 swipes recorded
CARDS_PER_BATCH       = 3     // returned per API call
MAX_CARDS_PER_PHASE   = 15    // hard cap per phase
```

### 7.1 `selectNextCards` Algorithm

**Inputs:** `userVector[] (768-dim)`, `allCards[]`, `shownCardIds[]`, `cardsShownSoFar`

**Step 1 — Filter:** Remove all cards in `shownCardIds` from candidates.

**Step 2 — Cold Start (< 2 swipes):** Sort by `0.5 × explorationScore + 0.5 × diversityScore`. Return top N shuffled.

**Step 3 — Semantic Mode (≥ 2 swipes):**
1. Pre-compute `getCardVector(card.tags)` for every candidate.
2. Score each card:
   ```
   semanticMatch = cosineSimilarityDense(userVector, cardVec)
   explore       = explorationScore(card.tags, seenTagCounts)
   diverse       = diversityScore(card.tags, recentCardTags[-5:])
   ```
3. Sort all by `semanticMatch` descending.
4. Split at midpoint: **top half = preferredPool**, **bottom half = explorationPool**.
5. Re-rank `preferredPool` by `semanticMatch + 0.3 × diverse`.
6. Re-rank `explorationPool` by `explore + 0.5 × diverse`.
7. Take `ceil(count × 0.75)` from preferred + remainder from exploration.
8. **Fisher-Yates shuffle** the combined list (hides the 75/25 seam from the user).
9. Run `diversityInterleave()`.

### 7.2 Exploration & Diversity Scoring

```js
explorationScore(tags, seenTagCounts):
  // Novelty: how many of the card's tags are unseen?
  Σ (1 / (1 + seenCount[tag])) / tags.length

diversityScore(tags, recentCardTags):
  // How different is this card vs the last 5 shown?
  1 - avgCosineSimilarity(cardTagVec, recentTagVecs)
```

### 7.3 `diversityInterleave` (Anti-Repetition)

Greedy algorithm that prevents consecutive cards with high tag overlap:
1. Start with `result = [cards[0]]`.
2. For each remaining card, pick the one with the **lowest tag overlap** with the last card in `result`.
3. `overlap = matchingTags.length / card.tags.length`
4. This ensures no two adjacent cards share more than the minimum possible tags.

---

## 8. Destination Ranking Algorithm

**File:** `server/src/lib/scoring.js → rankDestinations()`

### 8.1 Pipeline

```
1. Build finalUserVector = 0.5 × userVibeVector + 0.3 × userActivityVector + 0.2 × userStayVector

2. For each destination:
   destVec = getCardVector(dest.tags)
   rawDot  = dot(finalUserVector, destVec)

3. Sort by rawDot descending → keep top 10.

4. For each of top 10:
   a. Sigmoid normalisation:
       scaledDot     = rawDot / 10.0
       sigmoidScore  = 1 / (1 + e^(-1.2 × scaledDot))  → [0, 1]
       score         = 0.55 + 0.44 × sigmoidScore        → [0.55, 0.99]

   b. Budget alignment (costLevel 1=budget, 2=mid, 3=premium):
       match (costDiff = 0)  → score += 0.05
       far off (costDiff ≥ 2) → score -= 0.10

   c. ProfileTags bonus (curated user tags from ProfileDrawer):
       overlapRatio = tags overlap with dest.tags / dest.tags.length
       score += overlapRatio × 0.10   (up to +10%)

   d. Normalise to integer [55, 99]

5. Final sort by score descending → return top 5.
```

### 8.2 Legacy Fallback

If `userVibeVector` is empty (e.g., skipped swiping), `hasSemanticData = false`. The ranking degrades gracefully with `rawDot = 0` for all, letting budget and profileTags determine the order.

---

## 9. Generative AI Pipeline

**Files:** `server/src/lib/geminiAuth.js`, `server/src/routes/itineraries.js`, `server/src/routes/destination.js`

### 9.1 Multi-Key Rate-Limit Router (`geminiAuth.js`)

```js
GEMINI_KEYS = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_2, ...]
PRIMARY_MODEL   = "gemini-2.5-flash"
FALLBACK_MODEL  = "gemini-2.0-flash-lite"
```

`generateWithRetry(model, parts, maxRetries=5)`:
1. Cycles through available API keys.
2. If HTTP `429` received: sleeps with **exponential backoff** (`2s → 4s → 8s`) and rotates to the next key.
3. If all keys for the primary model are exhausted: falls back to `FALLBACK_MODEL`.
4. If fallback also fails: throws error (caught by route → 500 response).

### 9.2 Lightweight Itinerary Feed (`/api/itineraries/generate-multi`)

**Purpose:** Fast `< 15s` summary of 3 destinations (no days/flights/hotel).

**Prompt variables injected:** `departureCity`, `durationLabel`, `budget`, `travelers`, `travelWindowText`, `vibes`, `activities`, `stays`, `variationHint` (on regeneration: instructs Gemini to pick completely different destinations).

**Response schema (validated and parsed):**
```json
[
  {
    "destination": "Prague",
    "country": "Czech Republic",
    "duration": "6 days / 5 nights",
    "matchScore": 88,
    "totalCost": 195000,
    "shortDescription": "2 sentence description",
    "breakdown": { "flights": 95000, "stay": 60000, "activities": 25000, "transfers": 15000 }
  }
]
```

Post-processing:
- Clamped to 3 results.
- Each run through `normalizeItineraryDays(it)` to enforce correct day count.
- `totalCost` auto-filled from `breakdown` values if missing.
- `budget` (user's stated budget) attached to each object.

### 9.3 Full Itinerary Generation (`/api/itineraries/generate-full`)

**Two parallel Gemini calls fired concurrently via `Promise.all`:**
using parallel prompt architecture 
**Call 1 — Logistics Prompt:** Generates structured flight routes (outbound + return), hotel name/cost, transfers.
```json
{ "flights": [...], "hotel": {...}, "transfers": [...] }
```

**Call 2 — Day Plan Prompt:** Generates structured day-by-day schedule.
```json
{ "days": [{ "day": 1, "items": [{ "time": "09:00", "activity": "...", "type": "sightseeing", "cost": 1500, "duration": "2 hours" }] }] }
```

**Merge & Post-Process:**
1. Calls merged into one `itinerary` object.
2. `fillFlightDefaults()` ensures all flight fields present.
3. `adjustItineraryCosts(itinerary, travelers, duration)` scales by traveler count:
   - Flight costs: `× travelers`
   - Hotel rooms: `ceil(travelers / 2)`
   - Activities and transfers: `× travelers`
4. `pruneActivitiesByBudget()` removes expensive day items if total exceeds budget.
5. `personalizeItinerary(itinerary, activityScores)` reorders day items.

### 9.4 Itinerary Personalization (`personalizeItinerary`)

Within each day:
1. Items with `type === "travel"` are **pinned** at their original index.
2. All other items are scored by **keyword overlap** with `activityScores`:
   - Tokenizes `item.activity` and `item.description` into words.
   - Sums the activityScores weight for each matching tag keyword.
3. Movable items sorted by score descending and placed into available slots.
4. Result: user's highest-scoring activity type appears earlier in the day.

### 9.5 Prompt Sanitization (`parseGeminiJson`)

Strips Gemini markdown wrapper before parsing:
```js
raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim()
```

---

## 10. HotelAPI Hotel API Integration

**File:** `server/src/lib/hotelClient.js`

### 10.1 Authentication

```
Base URL: http://api.example.invalid/HotelAPIHolidays_HotelAPI
Auth:     HTTP Basic Auth (username: REDACTED | password from HOTEL_API_PASSWORD env)
```

All requests use `axios` with `auth: { username, password }`.

### 10.2 Hotel Search Flow

```
POST /Search  →  receive availability array
↓
Filter: IsPackageRate === false (no bundled packages)
        StarRating >= 3
↓
Sort by cheapest room rate (ascending)
↓
Pick index [0] (cheapest available)
↓
Convert: USD × 83 → INR (static exchange rate)
```

### 10.3 City-Hotel Map (`CITY_HOTEL_MAP`)

46 European cities are statically mapped in `hotelClient.js`:

| Field | Description |
|---|---|
| `cityCode` | HotelAPI internal city identifier |
| `cityName` | Display name |
| `country` | ISO 2-letter code |
| `hotelCodes[]` | Up to 5 known HotelAPI `HotelCode` values |
| `hotelNames{}` | `HotelCode → display name` lookup |
| `description` | City description injected into itinerary |
| `attractions[]` | Top 5 attractions for prompt enrichment |
| `facilities[]` | Common hotel facilities for display |

### 10.4 Hotel Gallery Image Strategy

The HotelAPI Staging API (`/HotelDetails`) is blocked for all known hotel codes. To maintain a premium UI, `hotelClient.js` contains `HOTEL_GALLERY_IMAGES`: a static map of `HotelCode → [5 curated Unsplash URLs]`. These are injected into the hotel card to simulate a real photo gallery.

Additionally, `CITY_IMAGES` provides 6 city-specific Unsplash photos per destination for fallback/general use.

### 10.5 Confirmed Live Inventory (Staging)

| City | HotelAPI City Code | Verified Hotels |
|---|---|---|
| Reykjavik | 135090 | 5 hotels (Keahotels, 22 Hill, Centerhotel, Welcome, Fosshotels) |
| Tallinn | 140287 | 5 hotels (Metropol, MyCityHotel, TownHall Sq, Gotthard, Viimsi Spa) |
| Bergen | 111457 | 5 hotels (Augustin, P-Hotels, Scandic, Comfort, Kokstad) |
| Helsinki | 120663 | 5 hotels (Radisson Blu x2, Hilton, Holiday Inn, Scandic Aviapolis) |
| Prague | 131864 | 5 hotels (Andant, MGallery, pentahotel, Zlata Praha, Vienna House) |
| Istanbul | 122727 | 5 hotels (Expocity, Aprilis, Abel, Germir Palas, Baron) |

**All other cities** (Amsterdam, Vienna, Barcelona, Rome, Paris, London, etc.) use the city-code map for display but fall back to seed hotel data.

---

## 11. Google Maps & Location Services

### 11.1 `LocationStreetViewModal.tsx` (Sightseeing Street View)

**Geocoding Strategy (ordered by priority):**
1. Try `locationName` globally (e.g., `"Gullfoss Waterfall"`)
2. Try `locationName + ", " + cityName` (e.g., `"Charles Bridge, Prague"`)
3. Try `locationDescription` if provided
4. If all fail → render fallback static Maps image

**Panorama Search (`StreetViewService.getPanorama`):**
- First attempt: 400m radius, source `OUTDOOR` only
- Second attempt: 600m radius, source `DEFAULT` (includes indoor)

**Distance Sanity Check:**
```
if (haversineDistance(geocodedCoords, foundPanoCoords) > 800m) → discard panorama
```
This prevents nature landmarks (e.g., waterfalls 50km from the city) from snapping to the city centre's generic panorama.

**Final fallback:** A Google Static Maps image centered on the geocoded lat/lng with a 15×15 degree zoom, overlaid with "Map View (Street View unavailable)" label.

### 11.2 `HotelStreetViewModal.tsx` (Hotel Street View)

Uses the hotel's `name + cityName` as the geocoding input. Simpler flow — no outdoor-source restriction. Falls back to static map on failure.

### 11.3 `CityMap.tsx` (Attraction Explorer)

**Google Maps JS API usage:**
- Initialised with `google.maps.Map` centered on the destination city.
- Uses **Places API** `nearbySearch` with:
  - `types: ['tourist_attraction', 'museum', 'park', 'point_of_interest']`
  - `radius: 3000m` from city center
- Results rendered as `google.maps.Marker` instances.
- Custom marker clusters using `MarkerClusterer` (prevents DOM thrashing on dense cities).
- Clicking a marker opens a custom `InfoWindow` with place name, rating, and a "Get Directions" deep link to `maps.google.com`.

### 11.4 Environment Variable

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<key>
```
Loaded in `_app` as a Google Maps `<Script>` tag with `strategy="afterInteractive"`.

---

## 12. Payment Gateway

**File:** `travel-buddy/src/components/itinerary/PaymentGateway.tsx`

### 12.1 Fee Calculation

```
tripCost       = itinerary.totalCost
convenienceFee = round(tripCost × 0.02)       ← 2%
gst            = round(convenienceFee × 0.18)  ← 18% GST on fee
subtotal       = tripCost + convenienceFee + gst
appliedDiscount= useTravelCash ? travelCashBalance : 0
totalAmount    = max(0, subtotal - appliedDiscount)
```

### 12.2 Payment Methods & Validation

| Method | Validation Rule |
|---|---|
| UPI | `upiId.includes('@')` |
| Card | 16-digit number + `MM/YY` expiry + 3-digit CVV + name `> 2 chars` |
| Netbanking | `selectedBank !== null` |
| Wallet | `selectedWallet !== null` |

### 12.3 Transaction ID Generation

```js
const ts   = Date.now().toString().slice(-10);
const rand = Math.floor(1000 + Math.random() * 9000);
transactionId = `TBPAY-${ts}-${rand}`;
```

### 12.4 Payment Processing Flow

1. User clicks "Pay" → `isProcessing = true` → spinner overlay shown.
2. `setTimeout(2500ms)` simulates payment gateway latency.
3. `paymentDone = true` → success animation.
4. `setTimeout(1500ms)` → auto-redirect to `BookingSuccess`.
5. `PaymentSuccessDetails` object emitted via `onSuccess(details)` callback.

### 12.5 TravelCash Integration

- **Earning:** `calculateTravelCash(tripCost)` → `₹1500 / ₹2500 / ₹3500` based on trip cost tiers.
- **Awarding:** `POST /auth-backend/profile/:email/credit-cashback` called fire-and-forget from `BookingSuccess`.
- **Deduction:** If TravelCash is applied in payment, `POST .../deduct-cashback` called in `page.tsx` after successful payment.
- **Destination Reward Cards:** `DESTINATION_REWARDS` map in `BookingSuccess.tsx` provides per-city offers (restaurants, experiences, cafés).

---

## 13. Authentication & User Management

### 13.1 NextAuth.js Configuration

- **Provider:** `GoogleProvider` (OIDC)
- Returns `session.user.email`, `session.user.name`, `session.user.image`
- **JWT strategy** — token stored client-side (no session DB needed)
- **Callback — session:** Attaches `accessToken` to session for potential scoped API calls.

### 13.2 `linkSessionToEmail`

After Google OAuth, the anonymous session is linked:
```
POST /session/:id/link-email  { email }
→ Session.findByIdAndUpdate({ userEmail: email })
```
This enables returning-user detection on next visit.

### 13.3 Returning User Flow

On app boot, if `session.user.email` exists and no active session:
- `GET /auth-backend/profile/:email` fetches saved session, shortlist, itinerary.
- `returningUserData` is displayed in `PreSwipeAuth.tsx`.
- User can **resume previous trip** or **start fresh**.

### 13.4 Profile Management (`ProfileEditor.tsx`)

- **Photo Upload:** Uploads directly to backend; stored as base64 or URL.
- **Tag Editing:** Full CRUD for vibes/activities/stays preference tags.
- **Budget/Traveler Count:** Editable fields.
- **Tag sync:** `POST /preferences/sync` pushes curated tags to the backend Session document.

---

## 14. API Reference

### Critical Notes on Request/Response

**`POST /swipe`** Request body:
```json
{
  "sessionId": "...",
  "cardId": "vibes-001",
  "stage": "vibes",
  "direction": "LIKE",
  "cardIndex": 3,
  "swipeDurationMs": 850,
  "detailViewed": false
}
```

**`POST /destinations/shortlist`** Request body:
```json
{
  "sessionId": "...",
  "preferences": { "vibes": [...], "activities": [...], "stays": [...] },
  "budget": 200000,
  "profileTags": { "vibes": [...], "activities": [...], "stays": [...] }
}
```

**`POST /itineraries/generate-full`** Request body:
```json
{
  "sessionId": "...",
  "destination": "Prague",
  "country": "Czech Republic",
  "duration": "6 days / 5 nights",
  "budget": 200000,
  "travelers": 2,
  "departureCity": "Mumbai",
  "profileTags": { ... },
  "intendedTravelWindow": "within-1-month"
}
```

---

## 15. Error Handling & Fallback Strategy

| Layer | Error Type | Fallback |
|---|---|---|
| Frontend `api.ts` | Any network/HTTP error | Returns local mock data from `itineraryMock.ts` or `mockData.ts` |
| Gemini `generateWithRetry` | HTTP 429 (rate limit) | Rotate key → exponential backoff → model demotion |
| Gemini JSON parse | Malformed JSON | Returns `500` with `{ error: "Failed to parse AI response" }` |
| HotelAPI API `/Search` | No inventory | Falls back to seed hotel in destination data |
| Street View geocoding | No geocoding result | Falls back to Google Static Maps image |
| Street View panorama | No panorama within radius | Falls back to Google Static Maps image |
| Street View distance check | Panorama > 800m away | Discards panorama, falls back to map |
| Mongoose Map read | Returns `{}` silently | Always use `mapToObj()` helper |

---

## 16. Data Flow Diagrams

### Full User Journey Data Flow

```
User inputs budget/city/travelers
  → POST /session → Session document created (MongoDB)

User swipes card
  → POST /swipe
    → updatePreferenceVector() updates vibeScores/activityScores/stayScores (sparse)
    → updateUserVector() updates userVibeVector (dense, 768-dim, leaky integrator)
    → selectNextCards() chooses next batch using cosine similarity

User completes swiping
  → POST /destinations/shortlist
    → rankDestinations():
         finalUserVec = 0.5×vibeVec + 0.3×activityVec + 0.2×stayVec
         rawDot = dot(finalUserVec, destVec) for each destination
         sigmoid + budget + profileTags adjustments
         → returns top 5 with matchScore %

User selects destination
  → POST /itineraries/generate-full
    → Promise.all([Gemini logistics, Gemini day plan])
    → adjustItineraryCosts() scales by travelers
    → pruneActivitiesByBudget() if needed
    → personalizeItinerary() reorders day items by activityScores
    → HotelAPI /Search → cheapest hotel injected (USD×83 → INR)
    → Itinerary returned to frontend

User pays
  → PaymentGateway.tsx computes fees
  → onSuccess() called with PaymentSuccessDetails
  → POST .../credit-cashback (fire-and-forget)
  → BookingSuccess.tsx displays rewards + download PDF option
```

---

*This document is auto-maintained alongside the codebase. Last updated: March 2026.*
