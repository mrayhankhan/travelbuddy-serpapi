# 🌍 TravelBuddy — AI-Powered Travel Discovery & Booking Platform

> **HotelAPI Tech Hackathon 2026** | Built with Next.js 15 · Express.js · MongoDB · Google Gemini 2.5 Flash · HotelAPI Hotel API · Framer Motion

---

## 🎯 What Is TravelBuddy?

Most travel apps start with the same frustrating question: *"Where do you want to go?"* — and then dump you into a sea of filters and forms.

**TravelBuddy flips this completely.**

Instead of asking users what they want, it *learns* what they want through gesture. Users swipe through beautiful, image-rich cards — representing abstract travel vibes, activities, and accommodation styles — and a Machine Learning engine silently builds a precise preference profile from every interaction.

In **under 60 seconds**, TravelBuddy goes from zero input to a fully personalized, AI-generated, day-by-day travel itinerary with live hotel pricing, simulated flights, route maps, and a one-click booking simulation.

> **Tagline:** *"Tinder for complete travel itineraries."*

---

## 🗺️ The Complete User Journey

The entire app is a single-page state machine with 12 distinct phases:

```
① Splash Screen
  ↳ ② Onboarding      → City, duration, traveler count, budget (< 20 sec)
    ↳ ③ Auth Gate      → Optional Google Sign-In or continue as Guest
      ↳ ④ Photo Upload  → Optional: Upload a travel photo for AI tag extraction
        ↳ ⑤ Swipe Engine → Phase A: Vibes → Phase B: Activities → Phase C: Stays
          ↳ ⑥ Summary    → Preference recap before AI processing begins
            ↳ ⑦ Analyzing → AI loader (fun facts + progress text)
              ↳ ⑧ Shortlist → Top 5 destination matches with match scores
                ↳ ⑨ Generating → Full itinerary building (parallel AI prompts)
                  ↳ ⑩ Itinerary → 4-tab view: Days · Flights · Hotel · Budget
                    ↳ ⑪ Payment  → UPI / Card / Netbanking simulation
                      ↳ ⑫ Booked  → Confirmation, PDF download, TravelCash rewards
```

---

## ✨ Features in Detail

### 1. 🧭 Frictionless Onboarding
A 4-step wizard that captures everything needed in under 20 seconds:
- **Departure City** — where the user is flying from
- **Trip Duration** — 3–5 days, 5–7 days, or 7–10 days
- **Traveler Count** — adults + children (travelers is always auto-derived, never entered directly)
- **Budget** — an interactive slider (₹90,000–₹12,00,000) with an inline tap-to-edit number field
- **Travel Window** — urgency context (within 7 days, 1 month, 3 months, or 6 months)

---

### 2. 🃏 Tinder-Style Swipe Engine
The core of the product. 46 beautifully designed discovery cards, each backed by high-resolution Unsplash imagery, spread across three sequential phases:

| Phase | Examples |
|---|---|
| **Vibes** | Zen Escape · Party & Nightlife · Romantic Getaway · Historic Wanderer |
| **Activities** | Scuba Diving · Food Tours · Museum Hopping · Bungee Jumping |
| **Stays** | Luxury Resort · Boutique Art Hotel · Cozy Hostel · Glamping |

**4-directional swipe gestures** powered by Framer Motion spring physics:

| Gesture | Action | ML Weight |
|---|---|---|
| Swipe Right | LIKE | +1.0 |
| Swipe Left | NOPE | −0.5 |
| Swipe Up / Long Press | SAVE / WISHLIST | +1.8 |
| Tap to Expand | View Details | +0.3 engagement multiplier |

All animations run at **60fps** via GPU-accelerated CSS transforms — no React re-renders during drag.

---

### 3. 🧠 Machine Learning Preference Engine

This is what makes TravelBuddy genuinely intelligent. Every swipe builds a **768-dimensional semantic preference vector** in real-time.

#### How It Works:
1. **Tag Embeddings** — Each swipe card has 6 hidden ML tags (e.g., "beach", "adventure", "zen"). Each tag maps to a pre-computed 768-dim vector from the `all-MiniLM-L6-v2` sentence embedding model.
2. **Leaky Integrator Formula** — User preference is updated continuously:
   ```
   newVector = 0.85 × oldVector + 0.15 × swipeWeight × cardVector × positionDecay × speedDecay
   ```
   - **Position Decay**: Later swipes carry slightly more weight than earlier ones (recency matters)
   - **Speed Decay**: Fast "instinct" swipes count less than slow, considered swipes
3. **Three Separate Vectors** — One each for Vibes, Activities, and Stays preference profiles
4. **Sparse IDF Scoring** — Rare, niche tags (like "adrenaline junkie") get an Inverse Document Frequency boost, ensuring unusual interests are strongly respected

#### Auto-Advance Logic:
The swipe phase skips automatically if:
- One preference dominates >90% of swipes after 5+ cards (strong signal detected)
- The user's vector stops changing significantly — it has converged

---

### 4. 🔄 Adaptive Card Feed (Epsilon-Greedy ML)
The system doesn't show cards randomly. It uses an **epsilon-greedy algorithm** to decide what card to show next:

- **75% Semantic Match**: Cards mathematically closest to the user's current preference vector
- **25% Exploration (Wildcards)**: Deliberately diverse cards to prevent echo-chamber effects
- **Diversity Interleaver**: Ensures consecutive cards have minimal tag overlap (no "tag fatigue")

The next batch is prefetched in a **dual pipeline**:
- Fast Lane: Client-side cosine similarity ranking (instant, no network)
- Heavy Lane: Backend-ranked batch (better, arrives in background and upgrades the queue)

---

### 5. ⚔️ Contextual Clarification Duels
If the ML engine detects contradictory or confused signals, it **pauses the feed** and presents a forced A/B "Duel" screen:

- **Triggered by**: Too many consecutive dislikes (confusion) OR contradictory tag approvals (e.g., user liked both "Ultra Luxury" and "Extreme Budget")
- **UI**: A vertical drag slider between two options (e.g., "City Buzz" vs. "Nature Escape")
- **Result**: A weighted override signal submitted directly to the preference vector

---

### 6. 📸 AI Photo-to-Tags (Optional Shortcut)
Before swiping, users can upload any travel-themed photo (a saved Instagram post, Pinterest screenshot, etc.):
- File is converted to **Base64** and sent to the **Gemini Vision API**
- Gemini returns an array of recognized preference tags
- `page.tsx` analyzes which swipe phases are already covered and **skips them automatically**
- The `SwipeEngine` remounts fresh with only uncovered phases remaining

---

### 7. 🌍 Destination Ranking Algorithm
After swiping, the backend scores all destinations in the database using **cosine similarity**:

| Vector Component | Weight |
|---|---|
| Vibes match | 50% |
| Activities match | 30% |
| Stays match | 20% |

Additional adjustments:
- **Budget Alignment Bonus**: ±10% score adjustment based on destination cost bracket vs. user budget
- **Explicit Profile Tag Bonus**: Multiplier if the destination matches tags from the user's permanent profile

The **Top 5 destinations** are returned as the "Shortlist", each with a match score percentage.

---

### 8. 🤖 Generative AI Itinerary Engine (Gemini 2.5 Flash)

#### Parallel Dual-Prompt Architecture:
To minimize wait time, the server fires **two simultaneous Gemini prompts** via `Promise.all`:
- **Prompt A (Logistics)**: Generates strict JSON for outward flights, return flights, and transfer routes
- **Prompt B (Day Plans)**: Generates the natural-language day-by-day activity schedule

#### Intelligence Built In:
- **Micro-Personalization**: Activities tagged with the user's top swipe interests (e.g., "diving") are pinned to **Day 1 Morning**
- **Budget Pruning**: If the generated trip exceeds the user's hard budget, a backend loop silently removes the most expensive non-essential activities until the total turns green
- **Multi-Key Resilience**: Rotating API keys with exponential backoff. Primary: Gemini 2.5 Flash → Fallback: Gemini 2.0 Flash Lite. Zero downtime.

#### AI Fun-Facts Loader:
While the 5–15 second generation runs, the app fetches **real hyper-local trivia** about the chosen destination and displays it with a rotating animation to prevent user drop-off.

---

### 9. 🏨 Live HotelAPI Hotel API Integration
The platform is directly integrated with **HotelAPI's B2B hotel inventory API**:

- Queries live availability for the exact dates and traveler count
- Fetches cheapest available room rates in USD, converted to INR dynamically
- Auto-calculates room count: `ceil(travelers / 2)`
- Filters for 3-star+ properties only; ignores non-bookable package-locked inventory
- **Graceful Fallback**: If HotelAPI has no inventory for a city (or times out), high-fidelity seed data is injected seamlessly — the UI never breaks

**Verified HotelAPI cities**: Reykjavik, Tallinn, Bergen, Helsinki, Prague, Istanbul

---

### 10. 📍 Interactive Maps & Google Street View

**CityMap Explorer:**
- Renders a full interactive map with custom marker clusters
- Pulls nearby museums, monuments, and attractions via the Google **Places API**
- Each pin deep-links to Google Maps for directions

**Immersive Street View:**
- Users can open 360° Street View panoramas for their matched hotel and individual landmarks
- Smart radius expansion: tries 400m outdoor-only first → expands to 600m general if no panorama found
- Falls back to a standard map view on remote nature sites that have no street coverage

---

### 11. 📊 4-Tab Itinerary View
Once the itinerary is generated, it's displayed across four beautiful tabs:

| Tab | Content |
|---|---|
| **Days** | Collapsible day-by-day accordion. Each activity has time, cost, and description |
| **Flights** | Outbound + return legs with airline, route, duration, and cost per traveler |
| **Hotel** | Gallery view with star rating, amenities, room type, Street View link |
| **Budget** | Live visual bar showing spend vs. limit. Turns orange if over budget, green if safe |

A live **Budget Bar** sticks to the top of every tab, showing exact spend vs. the user's limit in real time.

While HotelAPI hotel/flight data loads (it can take time), the tabs show **skeleton loaders** that exactly match the shape of the final content — no jarring layout jumps.

---

### 12. 🛒 Payment Gateway Simulation
A fully branded checkout modal with:
- **Payment methods**: UPI, Netbanking, Credit/Debit Card, Wallet
- **Automatic fee calculation**: 2% Convenience Fee + 18% GST applied on the final subtotal
- **TravelCash redemption**: Users can apply their cashback balance as an instant discount before paying
- **Transaction IDs**: Dynamically generated on each payment attempt

---

### 13. 🎉 Booking Confirmation & TravelCash Rewards
After a successful payment:
- **Lottie confetti animation** plays on the success screen
- Destination-specific **partner discount codes** are revealed (e.g., "15% off at Café Reykjavik")
- User earns **TravelCash** (tiered cashback) credited to their profile
- A **downloadable PDF booking confirmation** is generated via `jsPDF` containing the full itinerary

---

### 14. 👤 Profile, Auth & State Persistence

**Google OAuth (via NextAuth.js)**:
- One-click sign-in. State is serialized to `sessionStorage` before the Google redirect so the app resumes exactly where the user left off after returning.

**Returning User Experience**:
The app checks the user's last saved state on sign-in:
1. Has a saved itinerary → Shows "Welcome Back" screen, jumps directly to itinerary
2. Has a saved shortlist → Drops the user at the destination picker
3. Has saved swipe preferences → Skips directly to AI analysis

**Profile Editor**:
- Edit display name, dietary restrictions, flight class preference
- View and delete ML-derived preference tags (vibes, activities, stays)
- Review past saved trips

**TravelCash Ecosystem**:
- Real-time earn / burn cashback system
- Balance visible in profile and deductible at checkout

---

### 15. 🤖 In-App Travel Chatbot
A floating AI assistant (powered by Gemini) available during and after itinerary viewing. The destination is pre-loaded as context, so users can ask questions like:
- "What's the best time to visit this city?"
- "Are there any vegan restaurants near my hotel?"

---

## 🏗️ Technical Architecture

TravelBuddy is a decoupled **MERN + Next.js** stack.

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND — Next.js 15 (Mobile-First, 430px)            │
│  Framer Motion 11 · Tailwind CSS v4 · NextAuth.js       │
│  Single-Page State Machine (12 phases, no URL routing)  │
└──────────────────────┬──────────────────────────────────┘
                       │ REST API (localhost:5002/api)
┌──────────────────────▼──────────────────────────────────┐
│  BACKEND — Express.js on Node 22                        │
│  Modular routes: /swipe · /session · /itineraries       │
│  Lib: scoring.js · cardSelector.js · semanticVector.js  │
└───────┬────────────────┬───────────────────┬────────────┘
        │                │                   │
┌───────▼──────┐  ┌──────▼──────┐  ┌────────▼────────────┐
│  MongoDB     │  │ Google      │  │  HotelAPI Hotel API       │
│  (Mongoose 8)│  │ Gemini 2.5  │  │  (Live Inventory)    │
│  Sessions    │  │ Flash + 2.0 │  │  example.invalid    │
│  SwipeCards  │  │ Flash Lite  │  │                      │
│  Destinations│  │ + Vision    │  │                      │
└──────────────┘  └─────────────┘  └──────────────────────┘
```

### Key Design Decisions
| Decision | Reason |
|---|---|
| Single-page state machine (no URL routing) | Preserves in-memory React state (ML vectors, session data) across the entire journey; gives native-app feel with zero URL flashes |
| `useRef` for ML vectors in SwipeEngine | `useState` triggers re-renders; updating a 768-dim vector ~20x/sec during dragging would drop FPS to ~10. `useRef` mutates invisibly |
| Module-level Promise cache for API calls | Storing the live `Promise` object in a `Map` means navigating away and back simply attaches `.then()` to the already-running request — zero duplicate API calls |
| Components outside `<AnimatePresence>` | Heavy components (ItineraryView, PaymentGateway) with deep DOM trees cause Framer Motion "exit deadlocks" if placed inside. Using `absolute inset-0` overlays instead |
| `sessionStorage` for OAuth state | Google redirect destroys all React state. Serializing it before redirect and restoring on return is the only way to survive the page navigation |

---

## 🔌 API Endpoint Reference

**Base URL:** `http://localhost:5002/api`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/session` | Create a new session with onboarding data |
| `GET` | `/session/:id` | Restore a previous session |
| `POST` | `/swipe` | Log a LIKE/NOPE/SAVE, triggers ML vector update |
| `POST` | `/swipe/undo` | Undo the last swipe |
| `POST` | `/cards/next` | Epsilon-greedy adaptive card fetch (batch of 3) |
| `POST` | `/destinations/shortlist` | Rank all destinations → return top 5 |
| `POST` | `/destinations/itinerary/generate` | Full itinerary: HotelAPI hotels + Gemini AI plan |
| `POST` | `/itineraries/generate-multi` | Lightweight Gemini summaries for shortlist cards |
| `POST` | `/calibration` | Submit a Contextual Duel result |
| `POST` | `/auth-backend/profile/:email/credit-cashback` | Credit TravelCash to user |

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB running locally on port `27017`

### 1. Install Dependencies
```bash
# Frontend
cd travel-buddy && npm install

# Backend
cd server && npm install
```

### 2. Environment Variables

**`server/.env`**
```env
PORT=5002
MONGODB_URI=mongodb://localhost:27017/travelbuddy
HOTEL_API_USERNAME=your_hotelApi_username
HOTEL_API_PASSWORD=your_hotelApi_password
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY_2=your_second_gemini_key   # optional, for rotation
```

**`travel-buddy/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5002/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 3. Seed the Database
Run once to populate MongoDB with the 46 swipe cards and destination data:
```bash
cd server
npm run seed
# ✅ Connected to MongoDB | 📇 Seeded 46 swipe cards | 🌍 Seeded 10 destinations
```

### 4. Start the Servers
```bash
# Terminal 1 — Backend (port 5002)
cd server && npm run dev

# Terminal 2 — Frontend (port 3000)
cd travel-buddy && npm run dev
```

> ⚠️ **Mobile-first design**: Open `http://localhost:3000` in Chrome DevTools with Device Toolbar enabled (Ctrl+Shift+M), set to **iPhone 14 Pro (430px width)** for the intended experience.

---

## 📂 Frontend Folder Structure

```
travel-buddy/src/
├── app/
│   ├── page.tsx          ← The entire app — 12-phase state machine (~1300 lines)
│   ├── layout.tsx        ← Root HTML, font injection
│   ├── globals.css       ← Global styles + Tailwind directives
│   └── providers.tsx     ← NextAuth SessionProvider wrapper
├── components/
│   ├── auth/             ← Google OAuth gate, Auth modal
│   ├── discovery/        ← SwipeEngine, SwipeCard, ContextualDuel, PhotoUpload
│   ├── itinerary/        ← ItinerariesPage, ItineraryView, PaymentGateway, BookingSuccess
│   ├── onboarding/       ← SessionInit (4-step wizard)
│   ├── profile/          ← ProfileEditor (tags, past trips, settings)
│   └── ui/               ← BottomNav, shared UI primitives
├── data/
│   ├── mockData.ts       ← Fallback swipe cards (46 cards)
│   ├── itineraryMock.ts  ← Fallback itinerary + full TripItinerary type definition
│   ├── tagEmbeddings.json← 768-dim ML vectors for 500+ travel tags (1.6 MB)
│   └── cityLandmarks.ts  ← Hardcoded map pins for all destinations
└── lib/
    ├── api.ts            ← All fetch() calls; try-real → fallback-to-mock pattern
    ├── bookingPdf.ts     ← jsPDF booking confirmation generator
    └── utils.ts          ← Tailwind class-merging utility
```

---

## 🧪 Resilience & Fallback Strategy

TravelBuddy is built to **never crash**, even if every external API is down:

| Failure Point | Fallback |
|---|---|
| Backend offline | `api.ts` catches all errors and returns local mock data |
| HotelAPI API timeout / no inventory | Injects rich pre-seeded hotel data seamlessly |
| Gemini rate limit | Rotates to backup API keys; falls back to Gemini 2.0 Flash Lite |
| Google Street View no panorama | Expands search radius; falls back to standard map view |
| MongoDB session lost | Regenerates session from client-side data |

---

*TravelBuddy — shifting the burden of exhaustive travel research onto AI, leaving users with only the joy of exploration.*
