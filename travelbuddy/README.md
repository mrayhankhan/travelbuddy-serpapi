# 🌍 TravelBuddy — AI-Powered Travel Discovery Engine

> **HotelAPI Tech Hackathon 2026** | Team TravelBuddy  
> **Stack:** Next.js 15 · Express.js · MongoDB · HotelAPI Hotel API · Framer Motion · Gemini 2.5 Flash

TravelBuddy is a revolutionary, swipe-based AI travel discovery engine—often described as "Tinder for travel itineraries." Born during the HotelAPI Hackathon, it completely removes the friction of traditional travel planning forms. Users swipe through visually immersive cards representing "Vibes," "Activities," and "Stays." Behind the scenes, a powerful Machine Learning engine translates these gestures into a dense semantic preference vector, ranks 10s to 100s of European destinations, and dynamically generates a personalized, budget-aware itinerary via Google Gemini.

With live integrations into HotelAPI's Hotel API and Google Maps, TravelBuddy represents the future of consumer travel discovery—delivering an actionable, visually stunning, fully bookable trip in under 60 seconds.

---

## 📑 Table of Contents

1. [Product Overview & Flow](#-product-overview--flow)
2. [Comprehensive Feature List (A-Z)](#-comprehensive-feature-list-a-z)
3. [System Architecture](#-system-architecture)
4. [Machine Learning & Semantic Vector Engine](#-machine-learning--semantic-vector-engine)
5. [HotelAPI API Integrations](#-hotelApi-api-integrations)
6. [AI Pipeline (Gemini 2.5 Flash)](#-ai-pipeline-gemini-25-flash)
7. [Mapping & Interactive Modules](#-mapping--interactive-modules)
8. [Setup & Installation Instructions](#-setup--installation-instructions)
9. [API Endpoint Reference](#-api-endpoint-reference)

---

## 🗺️ Product Overview & Flow

The entire user journey operates as an incredibly fluent 8-phase state machine constructed in Next.js.

```text
Splash Screen 
  ↳ 1. Onboarding (City, Duration, Travelers, Budget)
    ↳ 2. Swipe Engine (Phase 1: Vibes → Phase 2: Activities → Phase 3: Stays)
      ↳ 3. Preference Summary & Engagement
        ↳ 4. AI Engine "Analyzing" Loader (Fun facts)
          ↳ 5. Destination Shortlist (Top 5 Matches Ranked)
            ↳ 6. Full Itinerary View (4 Tabs: Days, Flights, Hotel, Budget)
              ↳ 7. Payment Gateway Simulation
                ↳ 8. Booking Success & TravelCash Rewards
```

## ✨ Comprehensive Feature List (A-Z)

A granular breakdown of exactly what makes TravelBuddy highly intelligent and highly conversion-optimized. For a more detailed prose breakdown, see [`PRODUCT_SUMMARY_AND_FEATURES.md`](./PRODUCT_SUMMARY_AND_FEATURES.md).

* **Adaptive Card Feed:** Epsilon-greedy ML algorithm presenting a mathematically perfect 75% semantic match / 25% wildcard discovery split across 46 vivid travel cards.
* **Algorithmic Destination Ranking:** Destinations are matched conceptually using Dot Product / Cosine Similarity scoring (50% Vibes, 30% Activities, 20% Stays) against thousands of curated data points.
* **Animated Itinerary View:** 4 beautifully crafted Framer Motion tabs summarizing the day plans, simulated flight routes, a detailed hotel gallery, and a dynamically green/orange budget expenditure bar.
* **Automatic Budget Pruning:** If the AI accidentally generates an itinerary spanning beyond the user's hard budget layer, a backend worker silently slashes non-essential expensive activities until it turns green again.
* **Contextual Clarification Duels:** An intelligent listener detects if a user is randomly swiping left, or paradoxically likes conflicting tags (e.g., both "extreme luxury" and "street food"), and instantly pauses the feed to force a binary "Duel" clarification.
* **Frictionless Onboarding:** Captures exact user constraints (City, Duration, Budget, Travelers, Group constraints) in under 20 seconds.
* **Leaky Integrator Tag Formula:** Ensures changing your mind midway matters; later swipes natively override earlier swipes, and fast swipes are penalized as instinctual compared to slow, "considered" detailed swipes.
* **Macro/Micro Personalization:** Your top activity tags actually shift the final Gemini schedule—adrenaline junkies get bungee-jumping placed explicitly on Day 1 Morning.
* **Multi-Key Resilient AI Pipeline:** Zero-downtime Gemini processing utilizing exponential backoffs and multi-tier model fallbacks (Primary: Gemini 2.5 Flash, Fallback: Gemini 2.0 Flash Lite).
* **Payment Sim & TravelCash Ecosystem:** Built-in UPI, Netbanking, and Credit Card simulation that seamlessly computes GST and convenience fees, then issues tiered "TravelCash" post-booking.
* **Profile Preference Editor:** Gives users explicit control over auto-discovered tags via a Google OAuth NextAuth.js authenticated profile drawer.

---

## 🏗️ System Architecture

TravelBuddy runs a decoupled MERN+Next stack.

| Tier | Technology | Description |
|---|---|---|
| **Frontend** | `Next.js 15.1.3` | Mobile-first, utilizing Tailwind CSS v4 and Framer Motion 11 for all gesture/spring physics |
| **Backend** | `Express.js on Node 22` | API REST middleware powering algorithm crunching, state sync, and prompt orchestration |
| **Database** | `MongoDB via Mongoose 8`| High-speed NoSQL document storage managing `Session`, `SwipeCard`, and `Destination` entities |
| **AI Layer** | `Google Cloud API` | Leverages Gemini to synthesize unstructured natural plans |
| **Integrations** | `HotelAPI Hotel API` | Real-time global hotel inventory & pricing over HTTP Basic Auth |

The backend logic specifically splits into modular `/routes` (e.g., `/swipe.js`, `/session.js`, `/itineraries.js`) and `/lib` tools (e.g., `scoring.js`, `cardSelector.js`, `semanticVector.js`).

---

## 🧠 Machine Learning & Semantic Vector Engine

TravelBuddy fundamentally doesn't ask "Where do you want to go?" It extracts semantic data implicitly.

1. **Tag Embeddings in Memory:** Uses sentence embedding algorithms (`all-MiniLM-L6-v2`) via `tagEmbeddings.json` to assign a permanent 768-dimensional Float64 vector to hundreds of travel tags.
2. **Dense Semantic Tracking:** Every swipe computes the centroid vector of the swiped card's tags. A Leaky Integrator formula mathematically blends the user's permanent 768-dim `userVibeVector` dynamically by taking `0.8 × Old Vector + Base Weight × Engagement Multiplier × Position Decay × Speed Decay`.
3. **Sparse Preference Scoring (IDF):** Rare tags get boosted! If a user swipes on an extraordinarily niche card, Inverse Document Frequency logic gives that keyword a heavier score than generic keywords like “food.”
4. **Diversity Interleaver:** The Adaptive Card Selector guarantees zero visual tag fatigue by mathematically ensuring the immediate next card shown bears no massive overlap to the previous card.

---

## 🏨 HotelAPI API Integrations

**Status:** Live on the `HotelAPIHolidays_HotelAPI` staging environment.

* **REST API Tunnel:** Express contacts `http://api.example.invalid/HotelAPIHolidays_HotelAPI/` using the supplied `HOTEL_API_USERNAME` and `HOTEL_API_PASSWORD`.
* **Automated Package Pruning:** Ignores non-bookable, package-locked assets. Automatically mandates `StarRating >= 3`.
* **Price Standardization:** Queries available inventory in USD and translates raw subtotal room values precisely to INR utilizing dynamic traveler/hotel-room scalar loops (`ceil(travelers / 2)`).
* **Guaranteed Uptime:** For untracked cities without valid HotelAPI `CityCode` maps, or in the event of rate limits, TravelBuddy defaults cleanly to high-fidelity seed data allowing the itinerary shell to survive gracefully. (Currently verified on: Reykjavik, Tallinn, Bergen, Helsinki, Prague, Istanbul).

---

## 🤖 AI Pipeline (Gemini 2.5 Flash)

Generating 10 days of travel logistics sequentially is painfully slow. TravelBuddy uses **Parallel Dual-Prompt Architecture**:

1. **Prompt A (Logistics Structure):** Sent to Gemini instantly via `Promise.all`. Generates strict JSON mappings of outward flights, return flights, and transfer routes based on User Origin ↔ Destination constraints.
2. **Prompt B (Day-by-Day Schedule):** Dispatched concurrently to build the natural language day items, constrained heavily by the specific traveler's semantic tag vectors.

Once resolved, the server aggressively post-processes the array, re-assigning timestamps, pruning invalid markdown wraps, injecting accurate costs, aligning those costs per traveler count, and issuing it entirely to the Frontend.

---

## 📍 Mapping & Interactive Modules

Google Maps Platform JS and Places APIs exist completely to immerse the user.

* **CityMap Attraction Explorer:** A custom `MarkerClusterer` overlay parsing `nearbySearch` data mapping the entire destination's active museums, monuments, and points of interest. 
* **Street View Fallbacks:** Advanced `StreetViewService` integration. Plugs the hotel or geocoded sightseeing locations and checks a strict 400m outdoor radius first. Instantly links high-res 360° panoramas directly into the itinerary view. If a panorama misses, it reverts visually to a standard `google.maps.Map` layout.

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js v18+
- Active local MongoDB instance (`mongod`) running on port `27017`

### 1. Install Dependencies

```bash
# Terminal 1 — Install frontend
cd travel-buddy && npm install

# Terminal 2 — Install backend
cd server && npm install
```

### 2. Configure Environment Secrets

Create/verify your `.env` files in both directories.

**Backend (`server/.env`)**
```env
PORT=5002
MONGODB_URI=mongodb://localhost:27017/travelbuddy
HOTEL_API_USERNAME=REDACTED
HOTEL_API_PASSWORD=REDACTED
GEMINI_API_KEY=YOUR_GEMINI_STUDIO_KEY_HERE
```
*(Optionally include `GEMINI_API_KEY_2` for active rotation clustering).*

**Frontend (`travel-buddy/.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5002/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY_HERE
```

### 3. Database Initializer (Seeding)
You must inject the 46 SwipeCards, semantic structures, and fallback Destination DB elements into MongoDB. This is safe to run once.
```bash
cd server
npm run seed
# ✅ Connected to MongoDB | 📇 Seeded 46 swipe cards | 🌍 Seeded 10 destinations
```

### 4. Boot Servers Locally
```bash
# Terminal 1 — Boot backend at :5002
cd server && npm run dev

# Terminal 2 — Boot frontend via Turbopack at :3000
cd travel-buddy && npm run dev
```

> ⚠️ View `http://localhost:3000` via Chrome DevTools in Mobile Emulation mode (Target physical width: **430px**). The design system is aggressively mobile-first.

---

## 🔌 API Endpoint Reference

**Base Tunnel:** `http://localhost:5002/api`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/session` | Spawns a new Document session passing Initial Onboarding parameters |
| `GET`  | `/session/:id` | Recovers previous state |
| `POST` | `/swipe` | Logs a LIKE/NOPE/SAVE interaction, firing Dense/Sparse ML re-computations |
| `POST` | `/swipe/undo` | Safely unwinds the leaky integrator stack for the immediate last card |
| `POST` | `/cards/next` | Executes the Epsilon-Greedy feed calculation returning batches of `3` |
| `POST` | `/destinations/shortlist` | Fires dot-product destination array evaluation (Top 5 return) |
| `POST` | `/destinations/itinerary/generate` | Bootstraps HotelAPI Hotel fetch, Gemini AI Schedule fetch, and budget scaler |
| `POST` | `/calibration` | Submits User overrides directly resolving a contradictory tag lock |
| `POST` | `/itineraries/generate-multi` | Extremely lightweight Gemini summaries feeding the Shortlist pipeline |
| `POST` | `/auth-backend/profile/:email/credit-cashback` | Credits simulated TravelCash logic payload |