# TravelBuddy — Progress Log

> **Hackathon:** HotelAPI Tech Hackathon 2026  
> **Team:** TravelBuddy  
> **Last updated:** 24 Feb 2026 (evening)

---

## ✅ What's Done

### 1. Project Setup & Architecture
- Full-stack project initialized: **Next.js 15 (frontend)** + **Express.js (backend)**
- MongoDB Atlas + local MongoDB connected for session and destination storage
- Environment variables configured (`.env`, `.env.local`) for HotelAPI credentials and MongoDB URI
- `nodemon` dev server with hot reload; Turbopack for frontend

-------

### 2. Frontend — TravelBuddy UI (Next.js 15 / TypeScript / Tailwind v4)

#### Onboarding Flow (`SessionInit.tsx`)
- **Splash screen** with TravelBuddy branding and animated entry
- **4-step onboarding** (under 20s as per HotelAPI spec):
  1. Departure City — select from 8 Indian cities
  2. Trip Duration — 3–5 / 5–7 / 7–10 days
  3. Travelers — stepper (1–10)
  4. Budget — ₹20k–₹3L range slider + quick preset chips
- Step slide-in/out animations; animated progress bar

#### Preference Swiping (`SwipeEngine.tsx` + `SwipeCard.tsx` + `CardDetail.tsx`)
- **46 swipe cards** across 3 phases: Vibes (15) · Activities (20) · Stays (11)
- **6 tags per card** — enriched vocabulary (35+ unique tags) for richer ML signal
- **4-directional gesture system:**
  - → Right = **LIKE** (green overlay, card removed)
  - ← Left = **NOPE** (red overlay, card removed)
  - ↓ Down = **MORE INFO** (opens `CardDetail` modal, card stays)
  - ↑ Up = **SAVED** (adds to wishlist, card stays)
- Spring physics (Framer Motion `motion.div`), swipe threshold 80px / 400px/s
- Card stack renders last 3 cards with depth scaling
- `CardDetail.tsx` — bottom-sheet modal with 4-image carousel, long description, 2×2 highlights, drag-to-dismiss
- Toast notifications for wishlist saves; green badge counter; 4-direction instruction hints
- Phase transition screens between Vibes → Activities → Stays
- **Swipe Undo** — ↩ button appears for 3s after each swipe; restores card + reverses preferences

#### Adaptive ML Feed & Dynamic Quotas
- **`cardSelector.js`**: 75/25 preferred/exploration split with anti-repetition interleave (greedy max-distance ordering prevents consecutive cards with >50% tag overlap)
- **Cross-phase pre-seeding**: Activities inherit vibeScores at 40% weight; Stays inherit blended vibe+activity scores
- **Dynamic phase quotas:**
  - Short-circuit: ≥70% likes after 7 swipes → phase ends early (🚀 toast)
  - Deep exploration: ≥50% dislikes after 7 swipes → +4 cards (up to 20 max, 🔍 toast)
- **Dislike streak detection (3+)** → triggers `ContextualDuel.tsx` overlay with vertical slider between opposing concepts (up to 2 duels per phase)
- **Tag conflict detection** (e.g., Party + Zen) → forces duel clarification
- **Detail view engagement tracking** — opening card detail before swiping = 1.5× scoring weight
- Frontend tracks `swipeDurationMs`, `cardIndex`, and `detailViewed` per swipe for ML scoring

#### ProfileDrawer (`ProfileDrawer.tsx`)
- User's curated preference tags (top 3 per phase) displayed in a drawer
- Tag removal synced to backend (`POST /api/preferences/remove-tag`)
- ProfileTags used as bonus multiplier (up to +15%) in destination ranking

#### Destination Shortlist (`DestinationShortlist.tsx`)
- Top 5 AI-ranked destinations shown as cards
- Destination photo, country, cosine similarity match score %, tags, starting price
- Staggered entrance animations (100ms delay per card)
- **Back button** → returns to Preference Summary

#### Itinerary View — `ItineraryView.tsx` (4-tab layout)
- **Days tab** — collapsible day accordions with timeline dots (colour-coded by type)
- **Flights tab** — outbound + return flight cards with route visualization
- **Hotel tab** — live HotelAPI hotel name, rating, per-night cost, total stay cost + transfers section
- **Budget tab** — animated budget alignment bar, breakdown bars with % fill per category
- Bottom bar: optimization chips (More Adventure / More Relaxed / Reduce Cost) + Book CTA
- **Back button** → returns to Destination Shortlist (not full reset)

#### Preference Summary (`PreferenceSummary.tsx`)
- Displays travel profile (top vibes, activities, stay preference, budget bracket)
- **Complete label mappings** for all 46 cards (15 vibes, 20 activities, 11 stays)
- CTAs: "Find My Destinations" + "Edit Preferences"

---

### 3. Backend — Express.js API (Node.js v22 / Mongoose 8)

#### Routes (Base URL: `http://localhost:5002/api`)
| Endpoint | Description |
|---|---|
| `GET /health` | Server health check |
| `POST /session` | Create a new session |
| `GET /session/:id` | Get session + preference vectors |
| `GET /cards/:stage` | Get swipe cards (vibes / activities / stays) |
| `POST /swipe` | Record swipe, update preference vector |
| `POST /destinations/shortlist` | Rank destinations via cosine similarity |
| `POST /destinations/itinerary/generate` | Build itinerary + inject live HotelAPI hotel + personalize day order |
| `POST /calibration` | Process duel or quick-tap calibration result |
| `POST /preferences/sync` | Sync curated ProfileDrawer tags |
| `POST /preferences/remove-tag` | Remove a tag from preference vectors |

#### Swipe Scoring Rules
| Direction | Base Delta | Multipliers Applied |
|---|---|---|
| `LIKE` | `+1.0` | position × speed × rarity × engagement |
| `DISLIKE` | `−0.5` | position × speed × rarity × engagement |
| `SAVE` | `+1.8` (strongest signal) | position × speed × rarity × engagement |

| Multiplier | Effect |
|---|---|
| Position decay | 1.0→1.5× (later swipes matter more) |
| Swipe speed | <400ms: 0.5×, <800ms: 0.75×, >800ms: 1.0× |
| Tag rarity (IDF) | 1/√freq boost for rare tags |
| Detail view engagement | 1.5× if user opened card detail before swiping |

#### Recommendation Engine (`server/src/lib/scoring.js`)
- **`updatePreferenceVector()`** — multi-signal scoring: position decay, speed weighting, IDF rarity normalization, detail view engagement (1.5×), SAVE boost (1.8×)
- **`cosineSimilarity()`** — angular similarity between two tag vectors
- **`rankDestinations()`** — weighted multi-vector ranking (50% Vibes · 30% Activities · 20% Stays) + ±10% budget alignment bonus + profileTags bonus (up to +15%); normalised to 55–99%; returns top 5
- **`adjustItineraryCosts()`** — scales flights/hotel/activities by traveler count
- **`personalizeItinerary()`** — re-sorts daily activities by user's top activity tags (called in `destination.js` after HotelAPI hotel injection)

#### Adaptive Card Selection (`server/src/lib/cardSelector.js`)
- **`selectNextCards()`** — 75% preferred / 25% exploration split with cross-phase pre-seeding (40% weight from previous phase scores)
- **`diversityInterleave()`** — greedy anti-repetition ordering; prevents consecutive cards with >50% tag overlap
- Exploration score: novelty of card tags vs already-seen tags
- Diversity score: how different card is from recent selections

> ⚠️ **Critical Mongoose Bug:** Use `mapToObj()` helper when reading preference Maps — never `Object.fromEntries()` (returns `{}` silently). See `ML_ARCHITECTURE.md`.

---

### 4. HotelAPI Hotel API Integration ✅ (Live)

**Endpoint:** `http://api.example.invalid/HotelAPIHolidays_HotelAPI/`  
**Auth:** HTTP Basic Auth

#### Discovery Process
- Tested SOAP endpoint (`HotelAPI_V7`) — confirmed structurally but staging had no inventory
- Switched to **REST/JSON endpoint** (`HotelAPIHolidays_HotelAPI`) — confirmed working ✅
- `/CityList` → discovered `CityCode` per destination; `/HotelAPIHotelCodeList` → `HotelCode` per city; `/Search` → live pricing

#### Confirmed Live Destinations (Staging)
| Destination | HotelAPI City Code | Hotels Available |
|---|---|---|
| Reykjavik | 135090 | 3 |
| Tallinn | 140287 | 4 |
| Bergen | 111457 | 3 |
| Helsinki | 120663 | 4 |
| Prague | 131864 | 3 |
| Istanbul | 122727 | 4 |

#### Behavior
- ✅ Always picks **cheapest available hotel** from HotelAPI and injects into itinerary
- ✅ Price converted USD → INR (83× exchange rate)
- ✅ Graceful fallback to seed data if HotelAPI returns no hotels (Tromsø, Santorini, Bali, Kyoto)
- ✅ `isHotelAPILive: true` flag on live hotel objects

#### Key Files
- `server/src/lib/hotelClient.js` — HotelAPI REST client
- `server/src/lib/cityCodeMap.js` — Confirmed REST API city codes

---

### 5. Google Maps & AI Integrations ✅ (Live)

#### Interactive Mapping
- **LocationStreetViewModal / HotelStreetViewModal**: Configured 360° panoramas seamlessly working natively in the itinerary interface for both hotels, and individual sightseeing/restaurant locations.
- **City Explorer Map**: Built a `CityMap` component leveraging the Google Places API to visually explore nearby monuments, restaurants, and historical attractions.

#### Resilient AI Engine (Gemini)
- Replaced mock destination generation with dynamic parallel execution via **Gemini 2.5 Flash**.
- Developed an edge-resilient multi-key rotation and multi-model fallback strategy to eliminate rate-limit rejections (429s).
- Generates precise day-by-day plans, realistic flight logistics, and tailors scheduling based on user vibes.

### 6. User Profiles & Authentication ✅
- Researched and resolved Google OAuth `403: disallowed_useragent` flow issues.
- Implemented **Profile Photo Uploads**, direct Tag Editing via `ProfileEditor`, and proper session retrieval.

### 7. Database & Seeding

- **10 destinations** seeded into MongoDB:  
  Tromsø · Reykjavik · Tallinn · Bergen · Helsinki · Santorini · Prague · Istanbul · Bali · Kyoto
- Each destination: enriched vibeVector + activityVector + stayVector (matching 35+ card tag vocabulary), days itinerary, flights, hotel (seed fallback), transfers, cost breakdown
- Destination tags enriched from 3 → 6 tags each
- **46 swipe cards** seeded (16 vibes, 16 activities, 14 stays) — 6 tags per card
- Seed script: `server/src/seed.js`

---

### 6. Frontend–Backend Integration

File: `travel-buddy/src/lib/api.ts` — wraps all API calls with automatic fallback to mock data.

| Frontend action | API call | Fallback |
|---|---|---|
| Onboarding complete | `POST /session` | null (mock mode) |
| SwipeEngine loads | `GET /cards/:stage` | `mockData.ts` |
| Every swipe | `POST /swipe` | Silent fail |
| "Find My Destinations" | `POST /destinations/shortlist` | `itineraryMock.ts` |
| Select destination | `POST /destinations/itinerary/generate` | `itineraryMock.ts` |

---

## ✅ ML System — Fully Implemented

| Feature | Status |
|---|---|
| Multi-signal scoring (position decay, speed, IDF, engagement) | ✅ Complete |
| Multi-vector profiling (vibeScores / activityScores / stayScores) | ✅ Complete |
| 75/25 preferred/exploration card feed with anti-repetition | ✅ Complete |
| Cross-phase pre-seeding (40% weight carry-forward) | ✅ Complete |
| Dynamic quotas (short-circuit + deep exploration) | ✅ Complete |
| Detail view engagement bonus (1.5× multiplier) | ✅ Complete |
| Wishlist signal boost (SAVE_BOOST = 1.8) | ✅ Complete |
| Calibration duels (dislike streaks + tag conflicts) | ✅ Complete |
| ProfileDrawer with tag removal synced to backend | ✅ Complete |
| ProfileTags bonus in destination ranking (+15%) | ✅ Complete |
| Enriched card tags (3→6 per card, 46 cards) | ✅ Complete |
| Enriched destination vectors (matching card vocabulary) | ✅ Complete |
| Swipe undo (3s button, restores card + reverses preferences) | ✅ Complete |
| Cosine similarity destination ranking (50/30/20) | ✅ Complete |
| Micro-personalized itineraries (activity reordering) | ✅ Complete |

## 🔄 What's In Progress / Outstanding

| Feature | Status |
|---|---|
| Flight API integration | ❌ Not available (HotelAPI staging only provides Hotel API) |
| HotelAPI Sightseeing & Transfers API | ❌ Not integrated — hardcoded data used |
| Itinerary regeneration chips (More Adventure / Reduce Cost) | Styled only — not wired to backend |
| Full itinerary data for Bergen & Helsinki | ⚠️ Uses generated AI fallback data |
| Budget recalculation after selecting itinerary | Uses hardcoded ₹1.5L base — should use `sessionData.budget` |
| Date-aware pricing | Not started |
| Production deployment | Not started |
| Demo mode (skip swipes, jump to polished itinerary) | Not started |
| Demo mode (skip swipes, jump to polished itinerary) | Not started |
| Real hotel images from HotelAPI | Not available in staging — Unsplash placeholders used |
| Error boundary UI (budget too low, no flights, etc.) | Not started |
| Image loading skeletons | Not started |
| Accessibility (ARIA, keyboard nav) | Not started |
| Testing (unit + integration) | No tests exist |
| Add logging throughout for demo visibility | Not started |
| Handle edge case where `sessionId` is null gracefully | Not started |

---

## 🗂 Project Structure

```
TravelAgent_HotelAPI/
├── travel-buddy/              ← Next.js 15 frontend
│   └── src/
│       ├── app/               ← page.tsx (8-phase state machine)
│       ├── components/
│       │   ├── onboarding/    ← SessionInit.tsx
│       │   ├── discovery/     ← SwipeEngine, SwipeCard, CardDetail, ContextualDuel
│       │   ├── itinerary/     ← ItineraryView.tsx
│       │   └── ui/            ← button.tsx
│       ├── data/              ← mockData.ts, itineraryMock.ts
│       └── lib/               ← api.ts, utils.ts
│
├── server/                    ← Express.js backend
│   └── src/
│       ├── index.js           ← App entry + MongoDB connect
│       ├── routes/            ← session, cards, swipe, destination, calibration, preferences
│       ├── lib/               ← hotelClient.js ⭐, scoring.js ⭐, cardSelector.js ⭐, cityCodeMap.js
│       ├── models/            ← Session.js, Destination.js, SwipeCard.js
│       └── data/              ← swipeCards.js, destinations.js
│
├── ML_ARCHITECTURE.md         ← ML system design + merge guide
├── ML_INTEGRATION.md          ← Scoring interface contracts
├── README.md                  ← Project overview (see this file)
└── PROGRESS.md                ← This file
```

---

## 🚀 How to Run

```bash
# Terminal 1 — Seed database (once)
cd server && npm run seed

# Terminal 2 — Backend
cd server && npm run dev    # starts on :5002

# Terminal 3 — Frontend
cd travel-buddy && npm run dev    # starts on :3000
```

Open **http://localhost:3000** — use Chrome DevTools mobile viewport (430px) for best experience.

### Verify
- `http://localhost:5002/api/health` → `{ "status": "ok" }`
- `http://localhost:5002/api/cards/vibes` → array of 15 cards
