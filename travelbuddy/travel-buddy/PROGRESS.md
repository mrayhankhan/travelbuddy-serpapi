# TravelBuddy — Development Progress & Handoff Document

> **Last updated:** Feb 18, 2026 (Iteration 3)  
> **Status:** Frontend MVP — Functional with mock data, 4-directional swipe, wishlist, card detail expansion  
> **Purpose:** This document is for the next developer (or their coding agent) to understand everything built so far, how it works, and what remains.

---

## 1. Product Context

**TravelBuddy** is a swipe-based, AI-assisted travel discovery engine for a **HotelAPI Hackathon**. Think "Tinder for travel." The user swipes through travel vibes, activities, and stay types, and the system generates a budget-aligned European itinerary using HotelAPI APIs (Flights, Hotels, Transfers).

### Core User Flow

```
Splash Screen → Session Init (4 steps) → Swipe Engine (3 phases) → Preference Summary → Analyzing Loader → Destination Shortlist → Generating Loader → Full Itinerary View
```

### Design Philosophy

- **Mobile-first** (430px max width, centered on desktop)
- **Swipe-driven** — no filters, no dropdowns, no search
- **Visual-heavy** — large immersive images, minimal text
- **Budget-aware** — cost shown everywhere, budget alignment tracking
- **Warm aesthetic** — yellow (#FFD233) primary, lavender (#F5F3FF) background

### Reference Documents

These PDFs in the repo root describe the full product spec:
- `HotelAPI_for development agent.pdf` — Full product brief with all features & requirements
- `HotelAPI features list.pdf` — Detailed feature checklist
- `HotelAPI (1).pdf` — Overview document
- `HotelAPI SRS.pdf` — SRS document
- `HotelAPI presentation.pdf` — Presentation

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 15.1.3 | App Router, `"use client"` for interactive pages |
| Language | TypeScript | ^5.7.0 | Strict mode |
| Styling | Tailwind CSS | v4.0.0 | Via `@tailwindcss/postcss`, NOT the classic Tailwind setup |
| CSS Processing | PostCSS | ^8.4.49 | Config in `postcss.config.js` using `@tailwindcss/postcss` plugin |
| Animations | Framer Motion | ^11.15.0 | Page transitions, drag gestures, spring animations |
| Icons | Lucide React | ^0.468.0 | Tree-shakeable SVG icons |
| UI Primitives | Radix UI | ^1.1.0 | Only `react-slot` used (for Button component) |
| Utility | clsx + tailwind-merge + class-variance-authority | various | CVA for variant-based component styling |
| Font | Inter | Google Fonts | Loaded via `next/font/google` in `layout.tsx` |
| Dev Server | Turbopack | built-in | `next dev --turbopack` |

### Important: Tailwind v4 Setup

This project uses **Tailwind CSS v4**, which has a different configuration model than v3:

- `postcss.config.js` uses `@tailwindcss/postcss` (NOT `tailwindcss` + `autoprefixer`)
- `globals.css` starts with `@import "tailwindcss"` and `@config "../../tailwind.config.ts"`
- `tailwind.config.ts` still works but is optional in v4; we use it for custom theme tokens

---

## 3. Project Structure

```
travel-buddy/
├── package.json                  # Dependencies (see Tech Stack above)
├── postcss.config.js             # PostCSS → @tailwindcss/postcss
├── tailwind.config.ts            # Custom theme tokens (colors, shadows, radii)
├── tsconfig.json                 # TypeScript config with @/ path alias
├── next.config.ts                # Next.js config (minimal)
├── .gitignore
│
├── src/
│   ├── app/
│   │   ├── globals.css           # Design tokens, CSS reset, range slider styling
│   │   ├── layout.tsx            # Root layout, Inter font, metadata
│   │   └── page.tsx              # ★ Main orchestrator — 8-phase state machine
│   │
│   ├── components/
│   │   ├── onboarding/
│   │   │   └── SessionInit.tsx   # 4-step onboarding (city → duration → travelers → budget)
│   │   │
│   │   ├── discovery/
│   │   │   ├── SwipeCard.tsx     # 4-directional swipeable card (←skip →like ↓expand ↑wishlist)
│   │   │   ├── SwipeEngine.tsx   # Card stack manager + wishlist + detail modal + toasts
│   │   │   ├── CardDetail.tsx    # ★ [NEW] Full-screen detail modal (image carousel, highlights)
│   │   │   ├── PreferenceSummary.tsx  # Travel profile display after swiping
│   │   │   └── DestinationShortlist.tsx  # Top 5 destination results list
│   │   │
│   │   ├── itinerary/
│   │   │   └── ItineraryView.tsx # ★ 4-tab itinerary (Days, Flights, Hotel, Budget)
│   │   │
│   │   └── ui/
│   │       └── button.tsx        # CVA-styled button (yellow default, black circle variant)
│   │
│   ├── data/
│   │   ├── mockData.ts           # 66 swipe cards + extraImages, longDescription, highlights per card
│   │   └── itineraryMock.ts      # 3 full destinations with flights, hotels, transfers, day plans
│   │
│   └── lib/
│       └── utils.ts              # cn() utility (clsx + tailwind-merge)
```

---

## 4. Detailed Implementation — What's Built

### 4.1 Page Orchestrator (`page.tsx`)

The entire app runs as a **single-page React app** with an 8-phase state machine:

```typescript
type Phase = 'splash' | 'session' | 'swipe' | 'summary' | 'analyzing' | 'shortlist' | 'generating' | 'itinerary';
```

**State management:** Plain React `useState` hooks. No external state library.

**Page transitions:** Framer Motion `AnimatePresence` with shared `pageVariants`:
- Enter: fade in + slide up (0.45s, cubic-bezier [0.22, 1, 0.36, 1])
- Exit: fade out + slide up (0.3s)

**Key state flows:**
- `splash` → `session`: User clicks "Plan My Trip"
- `session` → `swipe`: `SessionInit.onComplete(data)` fires with `{duration, travelers, budget, departureCity}`
- `swipe` → `summary`: `SwipeEngine.onComplete(preferences)` fires with `{likedVibes[], likedActivities[], likedStays[]}`
- `summary` → `analyzing` → `shortlist`: 2.5s simulated delay, calls `getShortlist()`
- `shortlist` → `generating` → `itinerary`: User selects a destination, 3.5s delay, calls `generateItinerary()`

**Staged loader:** Both `analyzing` and `generating` phases show the same animated loader with 5 sequential stages:
```
✈️ Matching flights... → 🗺️ Optimizing routes... → 🎯 Clustering activities... → 💰 Aligning with budget... → ✨ Almost there...
```
Each stage reveals after 600ms, with a checkmark (✓) replacing the emoji once complete.

---

### 4.2 Session Initialization (`SessionInit.tsx`)

**4-step onboarding flow** (under 20 seconds as per HotelAPI spec):

| Step | Input | Implementation |
|---|---|---|
| 1. Departure City | Select from 8 Indian cities | Scrollable list of buttons, yellow highlight for active |
| 2. Trip Duration | 3–5 / 5–7 / 7–10 days | 3 cards with emoji + description |
| 3. Travelers | 1–10 counter | Stepper with − / + buttons, animated number display |
| 4. Budget | ₹20k–₹3L slider | HTML range with yellow-filled track, quick preset chips |

**Exports `SessionData` type:**
```typescript
type SessionData = {
  duration: '3-5' | '5-7' | '7-10';
  travelers: number;
  budget: number;
  departureCity: string;
};
```

**Animations:** Each step slides in from right (x: 40 → 0), slides out to left on next. Progress bar fills with animated yellow `motion.div`.

---

### 4.3 Swipe Engine (`SwipeEngine.tsx` + `SwipeCard.tsx` + `CardDetail.tsx`)

**3 discovery phases** as per HotelAPI spec:

| Phase | Cards | Content Source |
|---|---|---|
| Vibes | 20 | `VIBE_CARDS` from mockData.ts |
| Activities | 28 | `ACTIVITY_CARDS` from mockData.ts |
| Stays | 18 | `STAY_CARDS` from mockData.ts |

**SwipeCard.tsx — 4-directional gesture system (Iteration 3):**
- Uses `motion.div` with `drag={true}` (both axes) and `dragElastic={0.6}`
- Dominant-axis detection prevents diagonal conflicts
- Swipe threshold: 80px offset OR 400px/s velocity on dominant axis
- **→ Right swipe** → "LIKE" overlay (green text + green tint) → card liked + removed
- **← Left swipe** → "NOPE" overlay (red text + red tint) → card skipped + removed
- **↓ Down swipe** → "MORE INFO" overlay (blue) → opens `CardDetail` modal (card stays)
- **↑ Up swipe** → "SAVED!" overlay (green bookmark) → adds to wishlist (card stays in stack)
- Snap-back: `type: 'spring', mass: 0.8, stiffness: 350, damping: 28`
- Bottom bar has explicit Save, Skip, Like, and Info buttons for tap interaction
- GPU-accelerated with `will-change: transform`
- Wishlisted cards show green bookmark badge

**CardDetail.tsx — Expanded card detail modal (Iteration 3, NEW):**
- Bottom-sheet modal slides up from bottom with spring animation
- Drag-down to dismiss (threshold 150px)
- Horizontal image carousel with snap scrolling + dot indicators (4 images: hero + 3 extras)
- Type label (✨ Travel Vibe / 🤸 Activity / 🏨 Stay Type)
- Long description (80-120 words)
- 2x2 highlight grid with yellow dot indicators
- Tags section
- Bottom CTAs: "Skip" and "Like" buttons

**SwipeEngine.tsx — Stack management + wishlist (Iteration 3):**
- Renders last 3 cards from array with depth scaling (`1 - depth * 0.035`)
- Only the top card is interactive (others are visual placeholders)
- **Wishlist system:** swipe-up adds card to `wishlist: string[]` without removing it
- Green badge counter shows wishlist count in header
- **Toast notifications:** animated black pill toasts for wishlist saves (1.8s auto-dismiss)
- Phase transition screen shows between phases with spring animation
- Question-style phase headers (e.g., "What kind of trip excites you?")
- Overall progress bar tracks total cards swiped across all phases (accurate per-phase count)
- Phase chips with emoji: black (current), yellow (completed), gray (upcoming)
- 4-direction instruction hints: "← skip · like → · ↓ details · ↑ save"

//
**Preference tracking:**
```typescript
{
  likedVibes: string[],      // IDs of right-swiped vibe cards
  likedActivities: string[], // IDs of right-swiped activity cards
  likedStays: string[],      // IDs of right-swiped stay cards
}
```

**Adaptive ML Feed & Calibration (Iteration 4, NEW):**
- **Adaptive Fetching:** Instead of loading 10 predefined cards, the phase starts with `INITIAL_CARDS_TO_LOAD` (3). As the user swipes and the stack drops to 2, it triggers `fetchMoreCards()`.
- **Database Synchronization:** A deliberate 300ms delay is added before fetching new cards to ensure the previous swipe is fully registered by the backend ML scoring engine first.
- **Enhanced Data Capture:** The frontend now tracks `swipeStartTimeRef` to compute `swipeDurationMs` (time spent looking at the card) and `cardIndex` to inform the backend ML model's confidence and position decay weightings.

### 4.4 ML Feature: Contextual Calibration Duels (Implementation Details)

To solve the "cold start" problem where a user's swipes are too chaotic or entirely negative, the frontend now features autonomous **Algorithmic Interventions**. These interrupt the standard swipe flow to force clarification.

**1. Triggers (When they appear):**
- **Dislike Streaks:** If the user swipes left (Reject) on 3+ cards consecutively, the `SwipeEngine` calculates that the current batch of cards is entirely missing the mark.
- **Tag Conflicts:** If the user likes two theoretically opposing cards in close succession (e.g., Liking a "Party" card and a "Zen Retreat" card), the engine detects a semantic conflict.

**2. The Duel UI (`ContextualDuel.tsx`):**
Whenever these triggers hit, the swipe deck is paused and an overlay appears:
- Displaying a horizontal slider between the two conflicting concepts (e.g., City ↔ Nature).
- Pushing the slider forcefully resolves the conflict by injecting a massive +2.0 weight to the winning tags and a -2.0 penalty to the losing tags into the backend preference vector.

**3. Quick Tap Override:**
If the user selects the "None of these" button during a Duel, it opens the **Quick Tap Overlay**.
- This presents 8 explicit emoji tag chips (e.g., 🍷 Wine, 🏛️ Ruins, 🎿 Snow).
- The user can select 1-3 chips that *actually* represent what they want.
- Clicking "Continue" immediately forces a `+1.5` score injection into those specific tags in the backend via the `/api/calibration/quick-tap` route, effectively resetting the ML model onto the correct path.

---

### 4.5 Preference Summary (`PreferenceSummary.tsx`)

Displays the user's **travel profile** before generating destinations:

- **Travel Style** — top 3 liked vibes (mapped from IDs to labels)
- **Top Activities** — top 3 liked activities
- **Stay Preference** — first liked stay type
- **Budget Bracket** — formatted with label (Budget-Friendly / Comfortable / Premium)

Two CTAs: "Find My Destinations" (continues flow) and "Edit Preferences" (returns to swipe).

---

### 4.5 Destination Shortlist (`DestinationShortlist.tsx`)

Shows **5 European destinations** as ranked cards:
- Thumbnail image with rank badge (#1, #2, etc.)
- Destination name + country
- Match score (yellow pill badge with star icon)
- Description text
- Tag chips
- Starting price
- Yellow arrow button to select

Staggered entrance animation (100ms delay per card).

---

### 4.6 Itinerary View (`ItineraryView.tsx`) — Most Complex Component

**4-tab layout** with `layoutId`-animated yellow tab indicator:

#### Tab: Days
- **Collapsible day accordions** — each day has a header with day number badge, title, activity count
- Click to expand/collapse with `height: auto` animation
- Each activity has:
  - Timeline dot (color-coded by type: blue=travel, yellow=activity, red=food, green=relax)
  - Left border (timeline line connecting activities)
  - Icon, time, name, description, cost
- Activity type colors: `travel: #5B8FB9`, `activity: #FFD233`, `food: #FF6B6B`, `relax: #34C759`

#### Tab: Flights
- Outbound and return flight cards
- Route visualization: `DEL ——✈️—— TOS` with airport codes, times
- Airline name, flight number, duration, cost
- Total flight cost summary

#### Tab: Hotel
- Hotel card with image, star rating badge, name, location, distance to center
- Per-night cost calculation
- **Transfers section** below hotel: airport↔hotel shuttle cards with type and cost

#### Tab: Budget
- Dark card showing total trip cost
- Animated **budget alignment bar** (green if within budget, orange if above)
- "Within Budget" / "Slightly Above" indicator with savings amount
- Breakdown items: Flights, Accommodation, Activities, Transfers — each with proportional fill bar and percentage

**Bottom bar (fixed):**
- Optimization chips: "More Adventure" ⚡, "More Relaxed" 🍃, "Reduce Cost" 📉
- Yellow CTA: "Book This Trip · ₹X"
- "Start Over" reset button

---

### 4.7 Mock Data (`mockData.ts` + `itineraryMock.ts`)

**Swipe Cards (66 total — 20 vibes + 28 activities + 18 stays):**
All use reliable Unsplash URLs with `w=800&q=80` parameters.

**(Iteration 3)** Each card now includes:
- `extraImages: string[]` — 3 additional Unsplash URLs for the image carousel in CardDetail
- `longDescription: string` — 80-120 word detailed description
- `highlights: string[]` — 4 key highlights shown in 2x2 grid

**Destinations (3 full itineraries):**

| Destination | Country | Duration | Total Cost | Days | Activities |
|---|---|---|---|---|---|
| Tromsø | Norway | 5D/4N | ₹1,25,000 | 5 | 15 activities |
| Reykjavik | Iceland | 6D/5N | ₹1,45,000 | 6 | 16 activities |
| Tallinn | Estonia | 4D/3N | ₹72,000 | 4 | 14 activities |

Each destination includes:
- 2 flights (outbound + return) with airline, flight number, route, times, duration, cost
- 1 hotel with name, rating, location, distance, per-night cost, image
- 2-3 transfers with from/to, type, cost
- 4-6 days of activities with time, description, cost, type

**Shortlist (5 destinations):**
Tromsø (96%), Reykjavik (91%), Tallinn (87%), Bergen (84%), Helsinki (82%)
— Only the first 3 have full itineraries; Bergen and Helsinki will show Tromsø's itinerary as fallback.

---

### 4.8 Design System

**Color Palette:**
| Token | Value | Usage |
|---|---|---|
| `primary` | `#FFD233` | CTAs, active states, budget bars, badges |
| `primary-dark` | `#F5A623` | Step labels, hover states |
| `background` | `#F5F3FF` | Page background (lavender) |
| `surface` | `#FFFFFF` | Cards, modals |
| `black` | `#1A1A1A` | Text, dark elements |
| `gray-400` | `#8E8E93` | Secondary text |
| `gray-200` | `#E5E5EA` | Borders, inactive progress |
| `gray-100` | `#F2F2F7` | Subtle backgrounds |
| `danger` | `#FF3B30` | NOPE overlay, reject button |
| `success` | `#34C759` | LIKE overlay, within-budget |

**Typography:** Inter (Google Fonts), loaded via `next/font/google`.

**Shadows:**
- Cards: `0 1px 8px rgba(0,0,0,0.05)`
- Elevated: `0 8px 40px rgba(0,0,0,0.12)` (swipe cards)
- Yellow CTA: `0 4px 16px rgba(255,210,51,0.3)`

**Layout:** Mobile shell = `max-w-[430px] mx-auto`, page background `#F5F3FF`, cards have `rounded-2xl` to `rounded-3xl`.

---

## 5. What Has NOT Been Built Yet (Pending Tasks)

### Priority 1 — Critical for Hackathon Demo

- [ ] **Backend integration with HotelAPI APIs** — Currently all data is mock. Need real API calls to:
  - HotelAPI Flights API (search, pricing)
  - HotelAPI Hotels API (search, availability, pricing)
  - HotelAPI Transfers API (search, pricing)
  - Build a FastAPI backend with weighted scoring engine
- [ ] **Real destination matching** — Currently `getShortlist()` returns hardcoded results. Need actual preference vector → destination ranking algorithm.
- [ ] **Real itinerary generation** — Currently `generateItinerary()` returns mock data. Need API-driven itinerary builder that respects budget constraints.
- [x] **Swipe Down → Expand card** — Shows CardDetail modal with extra images, long description, highlights. Swipe Up → Wishlist save. *(Implemented in Iteration 3)*
- [ ] **Edge case handling UI** — What happens when budget is too low, no flights available, etc. Show actionable options:
  - "Budget too low" → offer to increase budget or change destination
  - "Flights unavailable" → suggest alternate dates or airports
  - "Hotel too far" → suggest alternate hotel with map warning

### Priority 2 — Feature Completions

- [ ] **Itinerary regeneration** — The "More Adventure", "More Relaxed", "Reduce Cost" chips in the bottom bar are styled but not wired to any logic. They should modify the preference weights and regenerate.
- [ ] **Budget recalculation** — User should be able to adjust budget AFTER seeing the itinerary and instantly regenerate.
- [ ] **Full destination itineraries for Bergen and Helsinki** — These shortlist items currently fall back to Tromsø's itinerary. Need unique data or API-generated content.
- [ ] **Demo mode** — HotelAPI spec asks for a "Demo itinerary" button and preloaded Northern Lights example for hackathon presentation. Should skip all swipes and jump straight to a polished itinerary.
- [ ] **Preference editing** — "Edit Preferences" on the summary screen currently restarts swipes from scratch, even though a real UX should let you toggle individual preferences.

### Priority 3 — Nice-to-Haves

- [ ] **Map previews** in day-wise itinerary (optional per HotelAPI spec)
- [ ] **Profile & memory system** — Store budget, previous trips, preference profile in localStorage. Show "Welcome back" message.
- [ ] **Animated swipe demo on landing page** (optional per HotelAPI spec)
- [ ] **Example Europe itinerary preview** on landing page
- [ ] **Save itinerary** functionality (download as PDF or save to profile)
- [ ] **Bottom navigation bar** (Home, Search, Trips, Profile) for multi-page feel
- [ ] **PWA support** for installable mobile experience
- [ ] **Image loading states** — Skeleton placeholders while Unsplash images load
- [ ] **Error boundaries** — React error boundaries for graceful crash handling

### Priority 4 — Polish & Optimization

- [ ] **Performance** — Pre-load images for next swipe card, optimize re-renders in swipe engine
- [ ] **Accessibility** — ARIA labels on swipe cards, keyboard navigation support
- [ ] **Analytics** — Track swipe rates, conversion funnel
- [ ] **SEO** — Currently a SPA; would benefit from server-rendered landing page
- [ ] **Testing** — No tests exist. Add unit tests for preference scoring, integration tests for flow

---

## 6. Known Issues & Gotchas

1. **Tailwind v4 compatibility** — This project uses Tailwind v4 via `@tailwindcss/postcss`. If you run into build errors about Tailwind, make sure you're NOT mixing v3 and v4 patterns. The `postcss.config.js` must use `@tailwindcss/postcss`, not `tailwindcss`.

2. **`globals.css` uses `@import "tailwindcss"`** — This is the Tailwind v4 way. Don't change it to `@tailwind base/components/utilities`.

3. **All styling is inline Tailwind** — Components use Tailwind utility classes directly (no CSS modules, no separate CSS files per component). The `globals.css` is minimal — just tokens, reset, and range slider styling.

4. **No state management library** — Everything is local React state passed via props. If the app grows, consider Zustand (was originally listed as a dep but removed since it wasn't used).

5. **Images are from Unsplash** — All image URLs use `images.unsplash.com` with `w=800&q=80` params. These are reliable public URLs but may occasionally be slow. For production, these should be replaced with locally hosted or CDN-cached images.

6. **Budget alignment uses hardcoded ₹1.5L base** — In `ItineraryView.tsx`, `budgetDiff = 150000 - itinerary.totalCost`. This should use the actual user's budget from `sessionData.budget` (requires passing it down as a prop or using a state management solution).

---

## 7. How to Run (Put in terminal)

```bash
cd travel-buddy
npm install
npm run dev
```

Opens at `http://localhost:3000`. For best experience, use Chrome DevTools mobile viewport (375px or 430px width).

### Build for production:
```bash
npm run build
npm start
```

---

## 8. Quick Reference for Modifying

| To change... | Edit this file |
|---|---|
| Colors / design tokens | `tailwind.config.ts` + `globals.css` |
| App flow / phase order | `page.tsx` (Phase type + handler functions) |
| Onboarding steps | `SessionInit.tsx` |
| Swipe card content | `mockData.ts` (VIBE_CARDS, ACTIVITY_CARDS, STAY_CARDS) |
| Swipe gesture behavior | `SwipeCard.tsx` (threshold, spring, overlays, 4-dir gestures) |
| Card detail modal | `CardDetail.tsx` (image carousel, highlights, CTAs) |
| Wishlist logic | `SwipeEngine.tsx` (wishlist state, toast, badge) |
| Destination data | `itineraryMock.ts` (DESTINATIONS object + SHORTLIST_DB) |
| Itinerary layout | `ItineraryView.tsx` (tabs, day accordion, flight/hotel cards) |
| Fonts | `layout.tsx` (change `Inter` to another Google Font) |
| Page metadata / SEO | `layout.tsx` (metadata export) |

---

## 9. Backend Architecture (Added Feb 20, 2026)

> **Last updated:** Feb 20, 2026  
> **Status:** Backend MVP — Live and connected to MongoDB, all 6 API endpoints working  
> **Port:** `http://localhost:5002`

### 9.1 Overview

The backend is a **Node.js + Express + MongoDB (Mongoose)** REST API server. It replaces the frontend's mock data functions (`getShortlist`, `generateItinerary`) with real database queries and a preference-based recommendation engine.

**Core responsibilities:**
1. Create and manage **user sessions** (stores departure city, duration, travelers, budget)
2. Track **swipe events** in real-time and build a **preference vector** per user
3. **Rank destinations** against user preferences using cosine similarity
4. Return **full itinerary data** with cost adjusted for traveler count

---

### 9.2 Backend Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Runtime | Node.js v22 | CommonJS modules |
| Framework | Express.js ^4.18 | REST API |
| Database | MongoDB (local) | `mongodb://localhost:27017/travelbuddy` |
| ODM | Mongoose ^8.x | Schema validation + query helpers |
| Dev Server | Nodemon ^3.x | Auto-restart on file changes |
| Environment | dotenv ^16 | `.env` file for secrets |
| CORS | cors ^2.8 | Allows requests from `localhost:3000` |

---

### 9.3 Server Folder Structure

```
server/
├── .env                        # Environment variables (PORT, MONGODB_URI)
├── .gitignore                  # Ignores node_modules + .env
├── package.json                # npm scripts + dependencies
├── node_modules/
└── src/
    ├── index.js                # ★ Express app entry point — mounts all routes
    ├── seed.js                 # Script to populate MongoDB with initial data
    │
    ├── models/                 # Mongoose schemas (database table definitions)
    │   ├── SwipeCard.js        # 26 discovery cards (vibes, activities, stays)
    │   ├── Destination.js      # 10 destinations with full itinerary + vibe vector
    │   └── Session.js          # User session — stores preferences + swipe history
    │
    ├── routes/                 # Express route handlers (the API endpoints)
    │   ├── session.js          # POST /api/session, GET /api/session/:id
    │   ├── cards.js            # GET /api/cards/:stage
    │   ├── swipe.js            # POST /api/swipe
    │   └── destination.js      # POST /api/destinations/shortlist + /itinerary/generate
    │
    ├── lib/
    │   └── scoring.js          # ★ Recommendation brain — cosine similarity + preference updates
    │
    └── data/                   # Seed data files (raw JS arrays loaded once into MongoDB)
        ├── swipeCards.js       # All 26 swipe cards (same content as frontend mockData.ts)
        └── destinations.js     # 10 destinations with vibe vectors + full itinerary data
```

---

### 9.4 Database Models (Mongoose Schemas)

#### `SwipeCard` — The 26 discovery cards

```js
{
  cardId: String,          // e.g. "vibe-1", "act-3", "stay-2"
  type: String,            // "vibe" | "activity" | "stay"
  title: String,           // e.g. "Northern Lights"
  description: String,
  image: String,           // Unsplash URL
  tags: [String],          // ★ Used for preference vector updates e.g. ["Nature","Cold","Magical"]
  extraImages: [String],   // 3 additional images for CardDetail modal
  longDescription: String, // 80-120 word description
  highlights: [String],    // 4 bullet highlights
}
```

#### `Destination` — 10 travel destinations

```js
{
  destinationId: String,   // e.g. "tromsø", "santorini"
  name: String,
  country: String,
  image: String,
  tags: [String],
  duration: String,        // e.g. "5 Days, 4 Nights"
  costLevel: Number,       // 1=budget, 2=mid, 3=premium
  totalCost: Number,       // Base cost in INR for 1 person

  // ★ THE KEY FIELD — used for cosine similarity matching
  vibeVector: Map<String, Number>,  // e.g. { Nature: 0.9, Cold: 0.8, Magical: 0.9 }

  breakdown: {
    flights: Number,
    stay: Number,
    activities: Number,
    transfers: Number,
  },
  flights: [FlightSchema],       // departure + return flights
  hotel: HotelSchema,            // 1 hotel per destination
  transfers: [TransferSchema],   // airport/city transfers
  days: [DaySchema],             // full day-by-day itinerary with activity items
}
```

#### `Session` — A user's planning session

```js
{
  _id: ObjectId,           // ← this becomes the "sessionId" on the frontend

  // From onboarding
  departureCity: String,
  duration: String,        // "3-5" | "5-7" | "7-10"
  travelers: Number,
  budget: Number,

  // Preference vectors — updated on every swipe using alpha/beta scoring
  vibeScores: Map<String, Number>,      // e.g. { Nature: 2.0, Beach: -0.5 }
  activityScores: Map<String, Number>,
  stayScores: Map<String, Number>,

  // Which cards were liked/saved
  likedVibes: [String],
  likedActivities: [String],
  likedStays: [String],

  // Full audit log of every swipe
  swipeEvents: [{
    cardId: String,
    stage: String,         // "vibes" | "activities" | "stays"
    direction: String,     // "LIKE" | "DISLIKE" | "SAVE"
    timestamp: Date,
  }]
}
```

---

### 9.5 API Endpoints — Full Reference

**Base URL:** `http://localhost:5002/api`

#### `GET /api/health`
Health check — confirms server is running.
```json
// Response
{ "status": "ok", "timestamp": "2026-02-20T00:24:28.243Z" }
```

---

#### `POST /api/session` — Create a planning session
Called when the user finishes onboarding.
```json
// Request body
{
  "departureCity": "Delhi",
  "duration": "5-7",
  "travelers": 2,
  "budget": 150000
}

// Response
{ "sessionId": "65a3f7b2c9d4e5f6a7b8c9d0" }
```

---

#### `GET /api/session/:id` — Get session details
```json
// Response
{
  "sessionId": "65a3f...",
  "departureCity": "Delhi",
  "travelers": 2,
  "budget": 150000,
  "vibeScores": { "Nature": 2.0, "Beach": -0.5 },
  "preferences": {
    "likedVibes": ["vibe-1", "vibe-3"],
    "likedActivities": ["act-5"],
    "likedStays": ["stay-2"]
  }
}
```

---

#### `GET /api/cards/:stage` — Get swipe cards for a phase
`:stage` must be `vibes`, `activities`, or `stays`.
```json
// GET /api/cards/vibes
// Response (array of 10 cards)
[
  {
    "id": "vibe-1",
    "type": "vibe",
    "title": "Northern Lights",
    "tags": ["Nature", "Cold", "Magical"],
    "image": "https://...",
    "description": "...",
    "extraImages": ["...", "...", "..."],
    "longDescription": "...",
    "highlights": ["Best Sept–March", "Tromsø & Abisko", "Husky sledding", "Sami culture"]
  },
  ...
]
```

---

#### `POST /api/swipe` — Record a swipe ★ (most important)
Called on every single card interaction. Updates the session's preference vector in real-time.
```json
// Request body
{
  "sessionId": "65a3f...",
  "cardId": "vibe-1",
  "stage": "vibes",
  "direction": "LIKE"    // "LIKE" | "DISLIKE" | "SAVE"
}

// Response
{
  "success": true,
  "vibeScores": { "Nature": 1.0, "Cold": 1.0, "Magical": 1.0 },
  "preferences": {
    "likedVibes": ["vibe-1"],
    "likedActivities": [],
    "likedStays": []
  }
}
```

**Preference update rules:**
| Direction | Effect on each tag in the card |
|---|---|
| `LIKE` | `score += 1.0` (alpha boost) |
| `DISLIKE` | `score -= 0.5` (beta penalty) |
| `SAVE` | `score += 1.2` (stronger than LIKE) |

---

#### `POST /api/destinations/shortlist` — Ranked destination list ★
Called after the user finishes swiping and clicks "Find My Destinations".
```json
// Request body
{ "sessionId": "65a3f..." }

// Response (top 5 destinations, sorted by match score)
[
  { "id": "tromsø", "name": "Tromsø", "country": "Norway", "score": 96, "image": "...", "description": "...", "tags": [...], "totalCost": 125000 },
  { "id": "reykjavik", "name": "Reykjavik", "score": 91, ...},
  { "id": "bergen", "score": 84, ... },
  { "id": "kyoto", "score": 78, ... },
  { "id": "santorini", "score": 72, ... }
]
```

---

#### `POST /api/destinations/itinerary/generate` — Full trip itinerary
Called when user selects a destination from the shortlist.
```json
// Request body
{
  "sessionId": "65a3f...",
  "destinationId": "tromsø"
}

// Response — matches TripItinerary interface in frontend
{
  "destination": "Tromsø",
  "country": "Norway",
  "duration": "5 Days, 4 Nights",
  "matchScore": 96,
  "totalCost": 250000,        // ← adjusted for 2 travelers
  "breakdown": { "flights": 104000, "stay": 36000, "activities": 56000, "transfers": 18000 },
  "flights": [...],
  "hotel": { ... },
  "transfers": [...],
  "days": [ { "day": 1, "title": "Arrival & Arctic Welcome", "items": [...] }, ... ]
}
```

---

### 9.6 The Recommendation Engine (`scoring.js`)

The file `server/src/lib/scoring.js` contains all the recommendation math.

#### `updatePreferenceVector(currentVector, tags, direction)`
Updates a user's `vibeScores` Map based on a swipe:
```js
// If user LIKES "Northern Lights" (tags: ["Nature", "Cold", "Magical"])
// vibeScores["Nature"] += 1.0
// vibeScores["Cold"]   += 1.0
// vibeScores["Magical"]+= 1.0
```

#### `cosineSimilarity(vecA, vecB)`
Measures the angular similarity between two tag vectors.  
Score of 1.0 = perfect match, 0 = no overlap, -1 = complete opposite.

```
userPrefs     = { Nature: 2.0, Cold: 1.0, Adventure: 1.5, Beach: -0.5 }
Tromsø vibe   = { Nature: 0.9, Cold: 0.8, Scenic: 0.7, Adventure: 0.5 }
Santorini vibe= { Beach: 0.9, Sun: 0.9, Relax: 0.8, Romance: 0.8 }

cosineSimilarity(userPrefs, Tromsø)    → 0.87  ← high match
cosineSimilarity(userPrefs, Santorini) → -0.12 ← low match (beach was disliked)
```

#### `rankDestinations(preferenceVector, destinations, budget)`
Runs cosine similarity on all 10 destinations, applies ±10% budget alignment bonus, normalizes scores to 55–99% range, returns top 5.

#### `adjustItineraryCosts(itinerary, travelers, duration)`
Scales all prices for the traveler count:
- Flights: `cost × travelers`
- Hotel: `cost × ceil(travelers / 2)` rooms
- Activities, transfers: `cost × travelers`

---

### 9.7 The 10 Destinations in the Database

| # | Destination | Country | Cost Level | Total Cost (1 person) | Key Tags |
|---|---|---|---|---|---|
| 1 | Tromsø | Norway | Premium | ₹1,25,000 | Nature, Cold, Magical |
| 2 | Reykjavik | Iceland | Premium | ₹1,45,000 | Nature, Adventure, Scenic |
| 3 | Tallinn | Estonia | Budget | ₹72,000 | Culture, History, Heritage |
| 4 | Bergen | Norway | Mid | ₹1,10,000 | Scenic, Nature, Peaceful |
| 5 | Helsinki | Finland | Mid | ₹95,000 | City, Culture, Relax, Spa |
| 6 | Santorini | Greece | Mid | ₹1,15,000 | Beach, Sun, Relax, Romance |
| 7 | Prague | Czech Republic | Budget | ₹68,000 | Culture, History, Nightlife |
| 8 | Istanbul | Turkey | Budget | ₹78,000 | Culture, History, Food |
| 9 | Bali | Indonesia | Budget | ₹85,000 | Beach, Spiritual, Nature |
| 10 | Kyoto | Japan | Mid | ₹1,30,000 | Culture, Spiritual, Heritage |

All 10 have complete data: 2 flights, 1 hotel, 2-3 transfers, and 4-6 days of activities.

---

### 9.8 Frontend–Backend Integration

**File:** `travel-buddy/src/lib/api.ts`  
This service layer wraps all backend calls with **automatic fallback to mock data** — so the frontend always works even if the backend is offline.

| Frontend action | API call | Fallback |
|---|---|---|
| Onboarding complete | `POST /api/session` | null (mock mode) |
| SwipeEngine loads | `GET /api/cards/:stage` | `VIBE_CARDS` from `mockData.ts` |
| Every swipe | `POST /api/swipe` | Silent fail (frontend still works) |
| "Find My Destinations" | `POST /api/destinations/shortlist` | `getShortlist()` from `itineraryMock.ts` |
| Select destination | `POST /api/destinations/itinerary/generate` | `generateItinerary()` from `itineraryMock.ts` |

**Environment variable:**  
`travel-buddy/.env.local` → `NEXT_PUBLIC_API_URL=http://localhost:5002/api`

---

## 10. How to Install & Run (Full Stack)

### Prerequisites
- Node.js v18+
- MongoDB running locally (```mongod```)

### Step 1 — Install frontend dependencies
```bash
cd travel-buddy
npm install
```

### Step 2 — Install backend dependencies
```bash
cd server
npm install
```

### Step 3 — Seed the database (run once, or after clearing data)
```bash
cd server
npm run seed
```
Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
📇 Seeded 26 swipe cards
🌍 Seeded 10 destinations
✨ Seed complete!
```

### Step 4 — Start the backend server
```bash
cd server
npm run dev
```
Expected output:
```
[nodemon] starting `node src/index.js`
✅ Connected to MongoDB
🚀 TravelBuddy API running on port 5002
   Health: http://localhost:5002/api/health
```

### Step 5 — Start the frontend (separate terminal)
```bash
cd travel-buddy
npm run dev
```
Expected output:
```
▲ Next.js 15.1.3 (Turbopack)
- Local: http://localhost:3000
```

### Verify everything is working
Open in browser:
- Backend health: `http://localhost:5002/api/health` → should return `{ "status": "ok" }`
- Vibe cards: `http://localhost:5002/api/cards/vibes` → should return 10 card objects
- Frontend: `http://localhost:3000`

### npm Scripts Reference

**Backend (`server/`):**
| Script | Command | Use |
|---|---|---|
| `npm run dev` | `nodemon src/index.js` | Development with auto-restart |
| `npm start` | `node src/index.js` | Production |
| `npm run seed` | `node src/seed.js` | Populate database |

**Frontend (`travel-buddy/`):**
| Script | Command | Use |
|---|---|---|
| `npm run dev` | `next dev --turbopack` | Development |
| `npm run build` | `next build` | Production build |
| `npm start` | `next start` | Serve production build |

---

## 11. Backend Quick Reference — What to Modify

| To change... | Edit this file |
|---|---|
| Server port | `server/.env` (change `PORT=5002`) |
| MongoDB URL | `server/.env` (change `MONGODB_URI`) |
| API endpoint logic | `server/src/routes/*.js` |
| Recommendation scoring | `server/src/lib/scoring.js` |
| Swipe card content | `server/src/data/swipeCards.js` + re-run seed |
| Destination data / itineraries | `server/src/data/destinations.js` + re-run seed |
| Add new destinations | Add to `destinations.js` array + re-run seed |
| Frontend API URL | `travel-buddy/.env.local` |
| Mock fallback behaviour | `travel-buddy/src/lib/api.ts` |

---

## 12. Pending Backend Tasks

- [ ] **Integrate HotelAPI Hotel API** — Replace hardcoded hotel data with real live search by city + dates
- [ ] **Integrate HotelAPI Flight API** — Replace hardcoded flights with real fares from user's departure city
- [ ] **Integrate HotelAPI Sightseeing API** — Replace hardcoded day activities with real bookable tours
- [ ] **Integrate HotelAPI Transfer API** — Replace hardcoded transfers with real options
- [ ] **AI-generated itineraries** — Use Gemini/OpenAI to generate dynamic day plans from the user's preference vector + available HotelAPI activities
- [ ] **Date-aware pricing** — Let user pick travel dates; pass them into HotelAPI API calls for accurate pricing
- [ ] **Itinerary regeneration** — Wire "More Adventure", "More Relaxed", "Reduce Cost" chips in `ItineraryView.tsx` to hit the backend and re-rank

