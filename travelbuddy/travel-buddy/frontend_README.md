# TravelBuddy Frontend — Complete Technical Reference Guide 🌍✈️

> **Purpose:** This is a comprehensive, interview-ready guide to the entire TravelBuddy frontend. It covers the purpose of every file, the important code syntax used, and the reasoning behind every architectural decision. This document is organized file-by-file so you can explain any part of the codebase with confidence.

---

## 🧭 Core Philosophy

TravelBuddy uses **one page** (`page.tsx`) as the entire application. There is no URL-based routing like `/login`, `/swipe`, `/itinerary`. Instead the entire journey (12 phases) is managed as a **React state machine** within a single file. The motivation is to give the app a native iOS/Android feel — transitions are instant, state is never lost, and there is no URL flash.

---

## 📂 Folder Structure

```
travel-buddy/src/
├── app/
│   ├── page.tsx          ← The entire app. Single-Page State Machine.
│   ├── layout.tsx        ← Root HTML wrapper + font injection
│   ├── globals.css       ← Tailwind directives, custom global CSS
│   └── providers.tsx     ← Wraps app in Next-Auth SessionProvider
├── components/
│   ├── auth/             ← Auth modals & gating logic
│   ├── discovery/        ← Swipe engine + ML preference collection
│   ├── itinerary/        ← Itinerary display, payments, booking
│   ├── onboarding/       ← First screen (budget, travelers, city)
│   ├── profile/          ← ML tag editor, user settings
│   └── ui/               ← Shared dumb components (buttons, nav)
├── data/
│   ├── mockData.ts       ← Fallback swipe cards
│   ├── itineraryMock.ts  ← Fallback itinerary payload
│   ├── tagEmbeddings.json← 768-dim ML vectors for 500+ travel tags
│   └── cityLandmarks.ts  ← Hardcoded map pins for destinations
├── lib/
│   ├── api.ts            ← All fetch() calls abstracted here
│   ├── bookingPdf.ts     ← jsPDF itinerary PDF generator
│   └── utils.ts          ← cn() Tailwind class-merging utility
└── hooks/, store/        ← Reserved stubs (unused — see page.tsx for state)
```

---

## 🗂️ FILE-BY-FILE DEEP DIVE

---

## `src/app/page.tsx` — The Orchestrator (~1300 lines)

### What it does
This file is the entire application. It holds all global state and renders the correct component based on the current `phase`.

### The Phase Type
```typescript
type Phase =
  | "splash" | "session" | "auth_gate" | "photo_upload"
  | "swipe" | "summary" | "analyzing" | "shortlist"
  | "generating" | "itinerary" | "payment" | "booked";
```
A single useState drives the entire journey:
```typescript
const [phase, setPhase] = useState<Phase>("splash");
```

### Global State Variables (No Redux needed)
```typescript
const [sessionData, setSessionData] = useState<SessionData | null>(null);
const [sessionId, setSessionId] = useState<string | null>(null);
const [preferences, setPreferences] = useState<any>(null);
const [shortlist, setShortlist] = useState<ShortlistDestination[]>([]);
const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
const [profileTags, setProfileTags] = useState<ProfileTags>({ vibes: [], activities: [], stays: [] });
```
These are passed down as props to child components — no Redux/Zustand needed because the data flow is strictly linear (wizard pattern).

### Framer Motion Transitions
```tsx
const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

<AnimatePresence mode="wait">
  {phase === "splash" && (
    <motion.div key="splash" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SplashScreen />
    </motion.div>
  )}
  {phase === "swipe" && (
    <motion.div key={`swipe-${swipeKey}`} variants={pageVariants} ...>
      <SwipeEngine ... />
    </motion.div>
  )}
</AnimatePresence>
```
`mode="wait"` means the old screen's exit animation must fully complete before the new screen enters. This is what gives the app its native-app feel.

### The `swipeKey` Forced Remount Hack
React won't re-initialize a component if its type doesn't change. After a photo upload changes which swipe phases to skip, we need a fresh `SwipeEngine`:
```typescript
const [swipeKey, setSwipeKey] = useState(0);
// After photo extraction:
setSkipPhases(["vibes", "stays"]);
setSwipeKey((k) => k + 1); // Forces SwipeEngine to fully destroy and remount
```
The `key={`swipe-${swipeKey}`}` on the `<motion.div>` makes React unmount and remount from scratch.

### Exit Deadlock Prevention
The heavy components (`ItineraryView`, `PaymentGateway`, `BookingSuccess`) are placed **outside** `<AnimatePresence>`:
```tsx
{/* OUTSIDE AnimatePresence — prevents Framer Motion exit deadlock */}
{phase === "itinerary" && itinerary && (
  <div className="absolute inset-0 z-20">
    <ItineraryView ... />
  </div>
)}
```
If placed inside, Framer Motion waits for every sub-element to finish its exit animation before unmounting — causing a frozen screen.

### OAuth State Hydration via `sessionStorage`
Google Sign-In redirects away from the page, destroying all React state. Solution:
```typescript
// BEFORE the redirect — serialize everything to sessionStorage
sessionStorage.setItem("tb_auth_pending", JSON.stringify({
  sessionData, sessionId, preferences, profileTags, phase: "swipe"
}));
signIn("google"); // browser leaves the app

// ON RETURN — a useEffect detects the "authenticated" status
useEffect(() => {
  if (status === "authenticated") {
    const pending = sessionStorage.getItem("tb_auth_pending");
    if (pending) {
      const saved = JSON.parse(pending);
      setSessionData(saved.sessionData);
      setProfileTags(saved.profileTags);
      sessionStorage.removeItem("tb_auth_pending"); // clean up
      handleReturningUser(session.user.email);
    }
  }
}, [status]);
```

### Returning User Router (`handleReturningUser`)
```typescript
// Queries backend for what the user was doing in their last session
const history = await getLatestSession(email);

if (history.savedItinerary) {
  setReturningUserData(history);
  setPhase("auth_gate"); // Show "Welcome back" screen
} else if (history.savedShortlist) {
  setShortlist(history.savedShortlist);
  setPhase("shortlist"); // Drop them in the destination picker
} else if (history.savedPreferences) {
  setPhase("analyzing");
  const sl = await getShortlistFromAPI(sessionId, history.savedPreferences, budget);
  setTimeout(() => { setShortlist(sl); setPhase("shortlist"); }, 2500);
}
```

### Perceived-Performance Loader (`loaderStage` + `loaderFacts`)
```typescript
const LOADER_STAGES = [
  "Analyzing your preferences...", "Matching destinations...",
  "Checking flight availability...", "Optimizing routes...",
  "Aligning with your budget..."
];

// Rotates loading text every 1.8 seconds
useEffect(() => {
  if (phase !== "analyzing" && phase !== "generating") return;
  const t = setInterval(() => setLoaderStage(s => (s + 1) % LOADER_STAGES.length), 1800);
  return () => clearInterval(t);
}, [phase]);

// Fetches trivia about the destination every 5 seconds
useEffect(() => {
  if (!selectedDestinationId) return;
  const t = setInterval(() => setCurrentFactIndex(i => (i + 1) % loaderFacts.length), 5000);
  return () => clearInterval(t);
}, [loaderFacts]);
```

---

## `src/components/onboarding/SessionInit.tsx`

### What it does
The first interactive screen. Collects `departureCity`, `duration`, `intendedTravelWindow`, `adults`, `children`, and `budget` in a 4-step wizard.

### SessionData Type
```typescript
export type SessionData = {
  duration: "3-5" | "5-7" | "7-10";
  intendedTravelWindow: "within-7-days" | "within-1-month" | "within-3-months" | "within-6-months";
  travelers: number;
  adults: number;
  children: number;
  budget: number;
  departureCity: string;
  sessionDate: Date; // Snapshot of when the session started
};
```

### CSS `display: none` vs `AnimatePresence` — Intentional Design Decision
All 4 steps are always mounted in the DOM, just hidden:
```tsx
{/* Steps are NOT AnimatePresence-mounted — see comment below */}
<div style={{ display: step === 0 ? "flex" : "none" }}>
  {/* Departure City Picker */}
</div>
<div style={{ display: step === 1 ? "flex" : "none" }}>
  {/* Duration Picker */}
</div>
```
**Why?** `AnimatePresence mode="wait"` has a documented React StrictMode race condition where the entering step can get stuck at `opacity: 0`. CSS `display` toggling is 100% reliable and runs synchronously.

### Budget Slider with Inline Edit
```typescript
const BUDGET_MIN = 90000;
const BUDGET_MAX = 1200000;
const BUDGET_SLIDER_STEP = 1000;

// The slider's fill uses a computed CSS linear-gradient
<input type="range"
  style={{
    background: `linear-gradient(to right, 
      #FFD233 ${((data.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%, 
      #E5E5EA ${((data.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%)`
  }}
/>
```
The editable number display swaps between a styled `<button>` (display) and a raw `<input>` (editing):
```typescript
const [isBudgetEditing, setIsBudgetEditing] = useState(false);
const budgetInputRef = useRef<HTMLInputElement | null>(null);

// Auto-focus when entering edit mode
useEffect(() => {
  if (!isBudgetEditing) return;
  budgetInputRef.current?.focus();
  budgetInputRef.current?.select(); // highlights current value
}, [isBudgetEditing]);
```

### Traveler Count — Derived State
`travelers` is always derived from `adults + children`, never set directly:
```typescript
setData(d => {
  const adults = Math.max(1, d.adults - 1); // min 1 adult
  return { ...d, adults, travelers: adults + d.children };
});
```

---

## `src/components/discovery/SwipeEngine.tsx` (~48KB, most complex file)

### What it does
The core ML preference engine. Manages 3 swipe phases (vibes → activities → stays). Does NOT handle swipe physics directly — that's `SwipeCard.tsx`.

### Client-Side ML — The Leaky Integrator
User preference is tracked as a 768-dimensional vector stored in a `useRef` (not `useState`) to avoid re-renders during active dragging:
```typescript
const userVectorRef = useRef<number[]>(new Array(768).fill(0));

function updateUserVectorLocal(cardId: string, swipeDirection: string) {
  const cardVector = getCardVector(cardId); // from tagEmbeddings.json
  if (!cardVector) return;
  const weight = swipeDirection === "LIKE" ? 1 : (swipeDirection === "SUPERLIKE" ? 1.5 : -0.5);
  
  // Leaky Integrator: decay old vector, blend in new card
  userVectorRef.current = userVectorRef.current.map(
    (v, i) => 0.85 * v + 0.15 * weight * cardVector[i]
  );
}
```
**Why `useRef` and not `useState`?** `useState` triggers a React re-render on every update. Since this fires with every pixel the user drags the card, it would drop the framerate to ~10fps. `useRef` mutates the data invisibly.

### Adaptive Background Prefetching (The "Double Pipeline")
As the user swipes, the component fires two simultaneous background requests:
```typescript
const pendingCardsRef = useRef<DiscoveryCard[]>([]);

async function prefetchNextBatch() {
  // FAST LANE: Rank local cards client-side using cosine similarity
  const localRanked = rankCardsLocally(allLocalCards, userVectorRef.current);
  pendingCardsRef.current = localRanked.slice(0, 5);

  // HEAVY LANE: Fetch backend-ranked cards (uses server-side vector math)
  const apiCards = await fetchNextCards(sessionId, currentPhase, 5);
  if (apiCards) pendingCardsRef.current = apiCards; // upgrade to better results
}
```
The `pendingCardsRef` allows seamless card injection without causing a re-render.

### Short-Circuit Logic (Auto-Advance)
```typescript
// Auto-advance if one preference dominates >90%
const dominance = Math.max(...tagCounts.values()) / totalSwipes;
if (dominance > 0.9 && totalSwipes >= 5) advancePhase();

// Auto-advance if the vector has converged (stopped changing)
const vectorDelta = cosineSimilarity(prevVector, userVectorRef.current);
if (vectorDelta > 0.99 && totalSwipes >= 7) advancePhase();
```

### `skipPhases` prop (from Photo Upload)
When `page.tsx` derives that the photo analysis covered "vibes" and "stays", it passes:
```typescript
<SwipeEngine skipPhases={["vibes", "stays"]} />
```
The `SwipeEngine` simply starts at "activities" and skips the rest, using `useEffect` on mount:
```typescript
useEffect(() => {
  const firstPhase = ["vibes", "activities", "stays"].find(p => !skipPhases.includes(p));
  setCurrentPhase(firstPhase || "vibes");
}, []);
```

---

## `src/components/discovery/SwipeCard.tsx`

### What it does
Renders a single swipe card and handles the drag physics at 60fps using Framer Motion's `useMotionValue` — **not** React state.

### Motion-Value-Based Physics
```typescript
const x = useMotionValue(0); // tracks horizontal drag position
const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
const likeOpacity = useTransform(x, [50, 150], [0, 1]);
const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);
```
These are GPU-accelerated CSS transforms. `x`, `rotate`, and opacity all update at 60fps without a single React re-render.

### Velocity-Aware Swipe Detection
```typescript
function handleDragEnd(_, info) {
  const velocity = info.velocity.x;   // pixels/second
  const offset = info.offset.x;       // total displacement
  
  if (Math.abs(velocity) >= 500 || Math.abs(offset) >= 150) {
    const dir = offset > 0 ? "LIKE" : "NOPE";
    flyOffScreen(dir);
    onSwipe(dir); // notify SwipeEngine
  } else {
    // snap back to center
    animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
  }
}
```

---

## `src/components/discovery/ContextualDuel.tsx`

### What it does
The intelligent fallback. If `SwipeEngine` detects too many consecutive dislikes (user is confused), it pauses swiping and shows an A/B "Duel" screen.

### Vertical Slider Constraint
```typescript
// The slider thumb is constrained to a vertical track
const y = useMotionValue(0);
const preference = useTransform(y, [-100, 100], [1, -1]); // maps drag to preference score

<motion.div
  drag="y"
  dragConstraints={{ top: -100, bottom: 100 }}
  style={{ y }}
/>
```
When released, the final `preference` value (between -1.0 and 1.0) is submitted to update the user vector with a weighted signal.

---

## `src/components/discovery/PhotoUpload.tsx`

### What it does
An optional shortcut before swiping. The user uploads any travel-themed photo. Gemini Vision analyzes it and returns preference tags automatically.

### Base64 + Gemini Vision Flow
```typescript
async function analyzePhoto(file: File) {
  // Convert File to base64 string
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const base64 = (reader.result as string).split(",")[1]; // strip data:image/...;base64,
    
    const response = await fetch(`${API_BASE}/photo/analyze`, {
      method: "POST",
      body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
    });
    const { tags } = await response.json();
    onComplete(tags); // pass tags up to page.tsx
  };
}
```
`page.tsx` receives `tags`, derives `skipPhases`, bumps `swipeKey` to force a fresh `SwipeEngine`.

---

## `src/components/itinerary/ItinerariesPage.tsx`

### What it does
The "Ready Trips" feed. Shows 3 AI-generated itinerary cards. Manages the module-level Promise caches that prevent all duplicate API calls.

### Module-Level Promise Caches (THE most important pattern)
```typescript
// Defined OUTSIDE the React component so they survive unmounts
export const aiPromiseMap = new Map<string, Promise<any>>();
export const hotelApiPromiseMap = new Map<string, Promise<any>>();
let cachedItineraries: any[] | null = null; // feed-level cache
let feedPromiseCache: Promise<any> | null = null; // deduplicates the initial feed fetch
```

### Sequential Background Prefetch
Uses `prefetchIndex` state to trigger one card at a time:
```typescript
const [prefetchIndex, setPrefetchIndex] = useState(0);

useEffect(() => {
  if (prefetchIndex >= itineraries.length) return;
  const card = itineraries[prefetchIndex];
  const destId = card.destinationId;
  
  if (aiPromiseMap.has(destId)) {
    // Already dispatched — skip forward
    setPrefetchIndex(i => i + 1);
    return;
  }
  
  // Fire AI and HotelAPI fetches simultaneously
  const aiPromise = generateItineraryAIFromAPI(sessionId, destId);
  aiPromiseMap.set(destId, aiPromise);
  
  const hotelApiPromise = generateItineraryHotelAPIFromAPI(sessionId, destId);
  hotelApiPromiseMap.set(destId, hotelApiPromise);
  
  // Only advance to next card AFTER current AI call settles
  aiPromise.finally(() => setPrefetchIndex(i => i + 1));
  
}, [prefetchIndex, itineraries, loading, sessionId]);
```

### Click Handler — Zero Duplicate Requests
```typescript
async function handleViewFull(card) {
  const destId = card.destinationId;
  
  // Check if AI call already started (prefetch or previous click)
  if (!aiPromiseMap.has(destId)) {
    aiPromiseMap.set(destId, generateItineraryAIFromAPI(sessionId, destId));
  }
  if (!hotelApiPromiseMap.has(destId)) {
    hotelApiPromiseMap.set(destId, generateItineraryHotelAPIFromAPI(sessionId, destId));
  }
  
  setLoadingDetailsFor(destId); // show skeleton
  const aiData = await aiPromiseMap.get(destId); // awaits already-running promise
  const merged = { ...card, ...aiData };
  onViewItinerary(merged); // go to ItineraryView
}
```

---

## `src/components/itinerary/ItineraryView.tsx` (~83KB, largest file)

### What it does
The full itinerary display. Renders the AI day-by-day plan immediately, then progressively hydrates flight and hotel data from the HotelAPI API as it arrives.

### Progressive Hydration on Mount
```typescript
useEffect(() => {
  const hotelApiPromise = hotelApiPromiseMap.get(destinationId);
  if (!hotelApiPromise) return;
  
  setHotelApiLoading(true); // skeleton loaders appear on Flights/Hotel tabs
  
  hotelApiPromise.then((hotelApiData) => {
    // Silently patches in live data when HotelAPI finally resolves
    setItinerary(prev => ({
      ...prev,
      flights: hotelApiData.flights,
      hotels: hotelApiData.hotels,
      totalCost: hotelApiData.totalCost
    }));
    setHotelApiLoading(false); // skeletons replaced with real data
  }).catch(() => {
    setHotelApiLoading(false); // show fallback mock data on error
  });
}, [destinationId]);
```

### Tab Architecture
5 tabs managed by a single `activeTab` state:
```typescript
type TabId = "days" | "flights" | "hotels" | "budget" | "map";
const [activeTab, setActiveTab] = useState<TabId>("days");
```
Each tab renders conditionally. The "Flights" and "Hotels" tabs show Framer Motion skeleton loaders while `hotelApiLoading` is true:
```tsx
{hotelApiLoading ? (
  <div className="animate-pulse bg-gray-200 rounded-2xl h-24 w-full" />
) : (
  <FlightCard flight={itinerary.flights[0]} />
)}
```

### Skeleton Loader Pattern
Uses simple CSS `animate-pulse` with gray placeholder blocks that exactly match the shape of the final data cards.

---

## `src/components/itinerary/ItineraryCard.tsx`
Small presentation component. Renders one itinerary card in the feed. Receives all data as props from `ItinerariesPage`. Displays destination image, name, country flag, duration, estimated cost, and match score percentage.

---

## `src/components/itinerary/PaymentGateway.tsx`

### What it does
The mock checkout experience. Supports "Apple Pay", "Credit/Debit Card", and "TravelCash" discount redemption.

### TravelCash Discount Deduction
```typescript
// Applied in page.tsx after onSuccess callback
if (details.travelCashUsed > 0 && session?.user?.email) {
  fetch(`${API_BASE}/auth-backend/profile/${email}/deduct-cashback`, {
    method: "POST",
    body: JSON.stringify({ amount: details.travelCashUsed }),
  });
  setTravelCashBalance(prev => Math.max(0, prev - details.travelCashUsed));
}
```

---

## `src/components/itinerary/BookingSuccess.tsx`
Final confirmation screen. Displays Lottie confetti animation, trip summary, and the "Download PDF" button which triggers `bookingPdf.ts`.

---

## `src/components/itinerary/TravelChatbot.tsx`
Floating AI assistant available only during the `itinerary` and `booked` phases. Sends conversational messages to the backend Gemini agent with the destination pre-loaded as context.

---

## `src/components/itinerary/CityMap.tsx`
Renders an interactive map using Leaflet (or Google Maps). Drops pins based on `cityLandmarks.ts` for each day's activities. Handles day-by-day route visualization.

---

## `src/components/auth/PreSwipeAuth.tsx`

### What it does
The "Gatekeeper" — the optional sign-in wall shown before swiping. Has 3 paths:
1. **Sign In** → triggers Google OAuth (saves state to sessionStorage first)
2. **Continue as Guest** → proceeds directly to `phase = "swipe"`
3. **Continue Existing Trip** → if `returningUser` prop is set, shows "Welcome back" CTA

---

## `src/components/auth/AuthModal.tsx`
A generic pop-up modal for authentication when a guest tries to save their trip post-generation. Uses `next-auth` `signIn()` internally.

---

## `src/components/profile/ProfileEditor.tsx`
Full-page modal for signed-in users. Allows editing of:
- Display name, dietary restrictions, flight class preference
- View and delete current ML profile tags (vibes, activities, stays)
- See saved past trips

---

## `src/components/ui/BottomNav.tsx`
Sticky bottom navigation bar with `Discover | Itineraries | Profile` tabs visible after the swipe phase. Built as a simple 3-button row using Lucide icons.

### Tab switching and conditional render
The `mainTab` state lives in `page.tsx`. When `mainTab === "itineraries"`, `ItinerariesPage` renders as an overlay:
```tsx
{mainTab === "itineraries" && showBottomNav && (
  <div className="absolute inset-0 z-10"><ItinerariesPage ... /></div>
)}
```

---

## `src/lib/api.ts` — The Resilience Layer

### What it does
Every `fetch()` call in the app goes through this file. It attempts the real backend, and if it fails (timeout, server offline, 500 error), it silently falls back to hardcoded mock data. This ensures the frontend never crashes during demo or development.

### Pattern: Try → Fallback
```typescript
export async function getShortlistFromAPI(sessionId, preferences, budget) {
  if (sessionId) {
    try {
      const res = await fetch(`${API_BASE}/destinations/shortlist`, {
        method: "POST",
        body: JSON.stringify({ sessionId }),
      });
      if (!res.ok) throw new Error("Shortlist API failed");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error("Empty response");
    } catch {
      // silently fall through
    }
  }
  // FALLBACK — use local mock data
  return getShortlist(preferences, budget);
}
```

### Key exported functions
| Function | Endpoint | Purpose |
|---|---|---|
| `createSession()` | `POST /session` | Init Mongo session doc |
| `getCardsFromAPI()` | `POST /cards/next` | Adaptive ML card fetch |
| `recordSwipe()` | `POST /swipe` | Log swipe for server ML |
| `getShortlistFromAPI()` | `POST /destinations/shortlist` | Rank cities by vector |
| `generateItineraryAIFromAPI()` | `POST /destinations/itinerary/ai` | Gemini day-plan (fast) |
| `generateItineraryHotelAPIFromAPI()` | `POST /destinations/itinerary/hotelApi` | Live flights + hotels (slow) |
| `fetchNextCards()` | `POST /cards/next` | Background adaptive fetch |
| `submitCalibration()` | `POST /calibration` | Submit ContextualDuel result |

---

## `src/data/tagEmbeddings.json` — The ML Brain (1.6 MB)
A dictionary mapping 500+ travel-related words to their 768-dimensional float array vectors, pre-computed from a language model. Used by:
- `SwipeEngine.tsx` (client-side): Cosine similarity to rank which cards to show next
- `server/semanticVector.js` (backend): To compute destination match scores

```json
{ "beach": [0.023, -0.451, 0.103, ...], "adventure": [0.187, 0.034, -0.22, ...] }
```

---

## `src/data/mockData.ts`
Array of `DiscoveryCard` objects used as swipe cards if the backend is offline. Each card has:
```typescript
type DiscoveryCard = {
  id: string;
  title: string;
  tags: string[];      // Used for vector lookup in tagEmbeddings.json
  image: string;
  stage: "vibes" | "activities" | "stays";
};
```

---

## `src/data/itineraryMock.ts`
Fallback itinerary generator. Defines the full `TripItinerary` type which all backend responses must conform to:
```typescript
type TripItinerary = {
  destination: string; country: string; duration: string;
  days: ItineraryDay[];
  flights: FlightLeg[];
  hotels: HotelOption[];
  totalCost: number;
  matchScore: number;
};
```

---

## `src/lib/bookingPdf.ts`
Uses `jsPDF` to programmatically generate a downloadable PDF of the booking confirmation. Draws hotel name, flight details, day-by-day plan, and total cost using canvas-style coordinate math.

---

## 💻 Setup & Development

### 1. Install
```bash
npm install
```

### 2. Environment Variables
Create `.env.local` with:
```env
NEXT_PUBLIC_API_URL=http://localhost:5002/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### 3. Run Dev Server
```bash
npm run dev
# App runs on http://localhost:3000
```

### 4. Testing in Mobile View
This is a **mobile-first** app. Use Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M) and select iPhone 14 Pro for the intended experience.

---

## 🎯 Critical Interview Q&A

**Q: Why not use Next.js page routing?**
> URL routing causes page reloads or component re-mounts that destroy React state. By using a single-page state machine, we can hold the user's budget, swipe vectors, and session data in memory throughout the entire journey without ever losing it.

**Q: Why `useRef` instead of `useState` in SwipeEngine?**
> `useState` triggers a React reconciliation and re-render on every update. The vector math updates 10-20 times per second while a card is being dragged. Using `useRef` lets us mutate the math in-place with zero rendering overhead, keeping the animation at 60fps.

**Q: How do you prevent duplicate API calls when navigating back and forth?**
> We store the raw JavaScript `Promise` object in a module-level `Map` the moment it's dispatched. If the user navigates away and returns, we check `hotelApiPromiseMap.get(destId)` — if a Promise exists, we simply attach `.then()` to the already-running one. A JavaScript Promise that resolves while you're away is "settled," so the `.then()` fires instantly with cached data. This means the heavy 40-second HotelAPI call only fires once per destination.

**Q: How does photo upload skip swipe phases?**
> Gemini Vision returns an array of preference tags. `page.tsx` analyzes which of the 3 swipe categories (vibes, activities, stays) were covered. It sets `skipPhases` array and increments `swipeKey` — the integer bound to `key={}` on the `SwipeEngine` div — which forces React to fully destroy and remount the component with the new skip config.

**Q: Why are `ItineraryView` and `PaymentGateway` outside `<AnimatePresence>`?**
> These components contain hundreds of nested DOM nodes and their own internal animations. Placing them inside `AnimatePresence` would cause a "deadlock" where Framer Motion waits for every child element's exit animation to complete before unmounting, often freezing the screen blank. Rendering them as `absolute inset-0` overlays with high `z-index` bypasses this entirely.
