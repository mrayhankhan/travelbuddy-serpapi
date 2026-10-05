# 🐛 Issue Report: Dynamic Card Display — Only 15–20 Cards Visible Out of 46

> **Filed by:** Anshul Kumar Singh  
> **Date:** 25 Feb 2026  
> **Severity:** Critical (Core USP affected)  
> **Status:** Root Cause Identified — Fix Pending

---

## 1. Problem Statement

### Expected Behavior
The system has **46 swipe cards** seeded across 3 phases:
- **Vibes:** 15 cards
- **Activities:** 20 cards
- **Stays:** 11 cards

All 46 cards should be dynamically served to the user through the ML-based adaptive card selector (`cardSelector.js`), which implements a 75/25 preferred/exploration split, anti-repetition interleaving, and cross-phase pre-seeding. The sequence should be personalized per user based on their real-time preference vectors.

### Observed Behavior
While swiping, the user consistently sees only **15–20 cards** repeatedly. The card sequence does not appear dynamic — every user effectively sees the same small subset.

### Impact
This directly undermines TravelBuddy's core USP: **implicit behavioral analytics through swiping**. If users only see ~40% of the available card pool, the ML model receives an incomplete signal, leading to:
- Less accurate preference vectors
- Weaker destination ranking (cosine similarity operates on sparse data)
- Poor cross-phase pre-seeding (fewer tags → weaker carry-forward)
- Reduced user engagement (repetitive cards = frustration)

---

## 2. Root Cause Analysis

After a thorough code review of the full card pipeline — from frontend `SwipeEngine.tsx` → `api.ts` → backend `cards.js` route → `cardSelector.js` → `swipeCards.js` — **four distinct issues** were identified. They compound together to produce the observed behavior.

---

### 🔴 ROOT CAUSE #1: Hard-Capped Dynamic Quota — 12 Cards Per Phase

**Files affected:**
- `travel-buddy/src/components/discovery/SwipeEngine.tsx` — Lines 32, 77, 101, 154–165

**The code:**
```typescript
// Line 32 — hard constant
const BASE_CARDS_PER_PHASE = 12;

// Line 101 — reset on every phase change
maxCardsRef.current = BASE_CARDS_PER_PHASE;

// Lines 154–165 — the enforcer
const removeCard = useCallback((card: DiscoveryCard) => {
    totalSwipedRef.current += 1;
    const swiped = totalSwipedRef.current;
    const currentMax = maxCardsRef.current;

    // ── Hard cap reached → advance phase ──
    if (swiped >= currentMax) {        // ← KILLS THE PHASE AFTER 12 SWIPES
        setCards([]);
        advancePhase();
        return;
    }
    // ...
}, [phase, sessionId, advancePhase]);
```

**What happens:**
Even though ALL cards for a phase are loaded into state (e.g., all 15 vibe cards, all 20 activity cards), the `removeCard` function **forcibly ends the phase after 12 swipes** regardless of how many cards remain unseen.

**Arithmetic across all 3 phases (no short-circuit scenario):**

| Phase | Cards Available | Cards Shown (capped at 12) | Cards Never Seen |
|---|---|---|---|
| Vibes | 15 | 12 | 3 |
| Activities | 20 | 12 | 8 |
| Stays | 11 | 11 (under cap) | 0 |
| **Total** | **46** | **35** | **11** |

So even in the best case, **11 cards (24%) are never shown** due to the hard cap.

---

### 🔴 ROOT CAUSE #2: Short-Circuit Prematurely Ends Phases After Just 7 Swipes

**Files affected:**
- `travel-buddy/src/components/discovery/SwipeEngine.tsx` — Lines 33–34, 338–352

**The code:**
```typescript
// Lines 33–34
const MIN_SWIPES_FOR_CONFIDENCE = 7;
const SHORT_CIRCUIT_THRESHOLD = 0.70;  // ≥70% likes → end phase early

// Lines 338–352 — evaluated on EVERY left/right swipe
if (totalDecisions >= MIN_SWIPES_FOR_CONFIDENCE && !hasShortCircuitedRef.current) {
    const likeRatio = likesThisPhaseRef.current / totalDecisions;

    if (likeRatio >= SHORT_CIRCUIT_THRESHOLD) {
        hasShortCircuitedRef.current = true;
        maxCardsRef.current = totalSwipedRef.current;  // ← SETS MAX TO CURRENT
        setToast(`🚀 We've got your ${PHASE_META[phase].label.toLowerCase()} vibe! Moving on...`);
    }
}
```

**What happens:**
If the user likes **5 out of their first 7 cards** (71.4% ≥ 70%), the phase **immediately terminates**. The `maxCardsRef` is set to the current swipe count, so the very next swipe triggers `advancePhase()`.

**Worst-case arithmetic (user likes most cards — the COMMON case for an engaged user):**

| Phase | Cards Available | Swipes Before Short-Circuit | Cards Never Seen |
|---|---|---|---|
| Vibes | 15 | 7–8 | 7–8 |
| Activities | 20 | 7–8 | 12–13 |
| Stays | 11 | 7–8 | 3–4 |
| **Total** | **46** | **~21–24** | **~22–25** |

**This directly explains the "15–20 cards" observation.** A user who generally likes travel content (the typical case for someone using a travel app) will hit 70% likes quickly and get short-circuited out of every phase.

---

### 🔴 ROOT CAUSE #3: Frontend Never Uses Backend ML Card Selector as Primary Source

**Files affected:**
- `travel-buddy/src/components/discovery/SwipeEngine.tsx` — Lines 23–27, 83–88
- `travel-buddy/src/lib/api.ts` — Lines 30–45, 138–155

**The code:**
```typescript
// SwipeEngine.tsx Lines 23–27 — HARDCODED to local mock data
const PHASE_CARDS: Record<Phase, DiscoveryCard[]> = {
    vibes: VIBE_CARDS,          // imported from mockData.ts
    activities: ACTIVITY_CARDS, // imported from mockData.ts
    stays: STAY_CARDS,          // imported from mockData.ts
};

// SwipeEngine.tsx Lines 83–88 — Phase initialization ALWAYS uses local data
useEffect(() => {
    const allCards = [...PHASE_CARDS[phase]];   // ← LOCAL MOCK DATA, NOT API
    setCards(allCards);
    seenCardIdsRef.current = new Set(allCards.map(c => c.id));
    // ...
}, [phase]);
```

**What happens:**
The backend has a sophisticated adaptive card selector (`cardSelector.js`) that implements:
- 75/25 preferred/exploration split
- Cross-phase pre-seeding at 40% weight
- Anti-repetition interleaving
- Diversity scoring
- Cold-start handling

**None of this is used as the primary card source.** The frontend loads cards from the hardcoded `mockData.ts` arrays every time a phase starts. The backend ML selector is only invoked as a *supplemental fetch* when the card stack runs low (Lines 198–216), and even then, the results arrive asynchronously and may be too late to prevent phase advancement.

**Consequence:** The ML-based personalization that is documented as "fully implemented" in `mlfeatures.md`, `ML_ARCHITECTURE.md`, and `PROGRESS.md` is **effectively dormant** during the primary card display flow. The user always sees the same cards in roughly the same order because the cards are loaded from a static array.

---

### 🟡 ROOT CAUSE #4: Supplemental API Fetch Has Race Conditions

**Files affected:**
- `travel-buddy/src/components/discovery/SwipeEngine.tsx` — Lines 197–216

**The code:**
```typescript
// Lines 197–216 — triggered ONLY when stack is low
if (stackAfter <= 2 && remaining > 0 && sessionId && !fetchingRef.current) {
    fetchingRef.current = true;
    const fetchCount = Math.min(3, remaining);
    setTimeout(() => {                               // ← 300ms DELAY
        fetchNextCards(sessionId, phase, fetchCount)
            .then(newCards => {
                fetchingRef.current = false;
                if (newCards && newCards.length > 0) {
                    const unique = newCards.filter(c => !seenCardIdsRef.current.has(c.id));
                    if (unique.length > 0) {
                        unique.forEach(c => seenCardIdsRef.current.add(c.id));
                        setCards(current => [...current, ...unique]);
                    }
                }
            })
            .catch(() => { fetchingRef.current = false; });
    }, 300);
}
```

**Issues:**
1. **300ms delay + network latency** means the fetch often completes *after* the phase has already advanced (the `removeCard` hard cap or short-circuit fires synchronously, while the fetch is asynchronous)
2. **`fetchingRef.current` guard** prevents parallel fetches, so if one fetch is in-flight when the user swipes again, no new fetch is triggered
3. **`count: 3`** — Even when the fetch succeeds, it only requests 3 cards at a time, which is insufficient for the 20-card activity phase
4. The fetched cards may arrive after `setCards([])` has already been called by `advancePhase()`, meaning they're added to an empty state that's about to be replaced

---

## 3. The Disconnect Between Documentation and Implementation

The following documents all claim ML-based dynamic card display is "✅ Complete":

| Document | Claim | Reality |
|---|---|---|
| `mlfeatures.md` (Feature #6) | "75/25 Preferred/Exploration Split" | ✅ Implemented in backend `cardSelector.js` but ❌ **never used as primary card source** |
| `mlfeatures.md` (Feature #7) | "Anti-Repetition Interleave" | ✅ Implemented in `diversityInterleave()` but ❌ **only triggered in supplemental fetch path** |
| `mlfeatures.md` (Feature #8) | "Cross-Phase Pre-Seeding" | ✅ Implemented in `selectNextCards()` with 40% weight but ❌ **not active during primary load** |
| `ML_ARCHITECTURE.md` (Feature 3) | "Dynamic Adaptive Swipe Feed" | ❌ **Feed is NOT adaptive** — loads static local mock data |
| `ML_ARCHITECTURE.md` (Feature 4) | "Dynamic Phase Quotas" | ⚠️ Partially working — deep exploration extends quota, but **short-circuit aggressively truncates** |
| `PROGRESS.md` (Line 192) | "75/25 preferred/exploration card feed with anti-repetition — ✅ Complete" | ❌ **Not active in production card flow** |

### What IS working correctly:
- ✅ Multi-signal scoring (`scoring.js` → `updatePreferenceVector()`) — updates preference vectors with position decay, speed, IDF, engagement
- ✅ Preference vectors stored in MongoDB session (vibeScores, activityScores, stayScores)
- ✅ Cosine similarity destination ranking (50/30/20 weighting)
- ✅ Calibration duels and conflict detection
- ✅ Swipe undo with preference rollback
- ✅ Profile tag sync and removal
- ✅ Micro-personalized itineraries

### What is NOT working as intended:
- ❌ Cards are NOT dynamically selected by the ML engine — they come from a static local array
- ❌ Phase quotas are too aggressive — short-circuit at 70% likes after 7 swipes hides most cards
- ❌ Anti-repetition interleaving is not applied to the primary card sequence
- ❌ Cross-phase pre-seeding does not influence the initial card order shown to the user

---

## 4. Affected Files — Quick Reference

| File | Path | Role in Bug |
|---|---|---|
| `SwipeEngine.tsx` | `travel-buddy/src/components/discovery/SwipeEngine.tsx` | **Primary culprit** — hard quota, short-circuit, local data loading |
| `mockData.ts` | `travel-buddy/src/data/mockData.ts` | Static card arrays used instead of API |
| `api.ts` | `travel-buddy/src/lib/api.ts` | API functions exist but are not called as primary source |
| `cardSelector.js` | `server/src/lib/cardSelector.js` | ML card selector — correct but unused in primary flow |
| `cards.js` | `server/src/routes/cards.js` | Backend route — correct but only hit by supplemental fetch |
| `scoring.js` | `server/src/lib/scoring.js` | Scoring engine — correct and actively used for swipe recording |
| `swipeCards.js` | `server/src/data/swipeCards.js` | 46 cards seeded — correct |

---

## 5. Reproduction Steps

1. Start the backend: `cd server && npm run dev`
2. Start the frontend: `cd travel-buddy && npm run dev`
3. Open `http://localhost:3000` in Chrome DevTools mobile viewport (430px)
4. Complete onboarding (any city, duration, travelers, budget)
5. **Swipe phase begins — observe:**
   - Vibes phase loads 15 cards
   - If you like ≥5 of your first 7 cards → phase ends at ~8 swipes (short-circuit)
   - If you don't trigger short-circuit → phase ends at 12 swipes (hard cap)
   - Same behavior for Activities and Stays
6. **Total cards seen:** 15–24 depending on like ratio (instead of 46)
7. **Repeat with a new session** — observe the **exact same cards in the same order** (no ML personalization)

---

## 6. Proposed Fixes

### Fix 1: Remove or Raise the Hard Quota Cap
```typescript
// BEFORE:
const BASE_CARDS_PER_PHASE = 12;

// OPTION A — Show all cards:
// Remove maxCardsRef enforcement entirely; let phase end when card array empties

// OPTION B — Set per-phase quotas matching actual card counts:
const PHASE_QUOTAS: Record<Phase, number> = {
    vibes: 15,
    activities: 20,
    stays: 11,
};
```

### Fix 2: Disable or Soften the Short-Circuit
```typescript
// BEFORE:
const SHORT_CIRCUIT_THRESHOLD = 0.70;
const MIN_SWIPES_FOR_CONFIDENCE = 7;

// OPTION A — Disable short-circuit entirely:
// Remove lines 347–352

// OPTION B — Raise the bar significantly:
const SHORT_CIRCUIT_THRESHOLD = 0.90;  // Only trigger if 90%+ likes
const MIN_SWIPES_FOR_CONFIDENCE = 10;  // Need 10 swipes minimum
```

### Fix 3: Use Backend ML Card Selector as Primary Source
```typescript
// SwipeEngine.tsx — Phase initialization should fetch from API when session is live
useEffect(() => {
    if (sessionId) {
        // Fetch ML-curated cards from backend
        fetchNextCards(sessionId, phase, PHASE_QUOTAS[phase])
            .then(apiCards => {
                if (apiCards && apiCards.length > 0) {
                    setCards(apiCards);
                    seenCardIdsRef.current = new Set(apiCards.map(c => c.id));
                } else {
                    // Fallback to local data
                    const allCards = [...PHASE_CARDS[phase]];
                    setCards(allCards);
                    seenCardIdsRef.current = new Set(allCards.map(c => c.id));
                }
            });
    } else {
        // No session — use local mock data (demo mode)
        const allCards = [...PHASE_CARDS[phase]];
        setCards(allCards);
        seenCardIdsRef.current = new Set(allCards.map(c => c.id));
    }
}, [phase, sessionId]);
```

### Fix 4: Increase Supplemental Fetch Batch Size
```typescript
// BEFORE:
const fetchCount = Math.min(3, remaining);

// AFTER — fetch in larger batches to prevent gaps:
const fetchCount = Math.min(8, remaining);
```

---

## 7. Missing Schema Field (Minor)

The `Session.js` Mongoose schema is missing `detailViewed` in the `swipeEventSchema`:

```javascript
// server/src/models/Session.js — swipeEventSchema
// CURRENT (missing detailViewed):
const swipeEventSchema = new mongoose.Schema({
    cardId: String,
    stage: { type: String, enum: ['vibes', 'activities', 'stays'] },
    direction: { type: String, enum: ['LIKE', 'DISLIKE', 'SAVE'] },
    cardIndex: { type: Number, default: 0 },
    swipeDurationMs: { type: Number, default: 1000 },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

// SHOULD INCLUDE:
detailViewed: { type: Boolean, default: false },
```

The frontend sends `detailViewed` in the swipe payload (Lines 314–322 of `SwipeEngine.tsx`), and the backend route (`swipe.js` Line 37) reads it and passes it to `updatePreferenceVector()`. But since the schema doesn't define it, Mongoose silently strips it before saving — meaning the 1.5× engagement multiplier from detail views is **never persisted** and only works in-memory for that single request. This is separate from the main card display issue but is a data loss bug.

---

## 8. Verification Plan

After applying fixes, verify:

| Test | Expected Result |
|---|---|
| Swipe through all Vibes | Should see all 15 vibe cards |
| Swipe through all Activities | Should see all 20 activity cards |
| Swipe through all Stays | Should see all 11 stay cards |
| Total cards across full session | Should be 46 |
| Two different users with different swipe patterns | Should see cards in **different orders** (ML personalization active) |
| User who likes "City" vibes | Activity phase should prioritize "Nightlife" and "Food" cards first (cross-phase pre-seeding) |
| Console log from `cardSelector.js` | Should show `🎯 Card selection: X preferred + Y explore` messages for every batch |
| `POST /api/cards/next` in Network tab | Should be called at phase start (not just as supplemental fetch) |
| `detailViewed` in MongoDB swipeEvents | Should be stored as `true`/`false` after fix |

---

## 9. Conclusion

The ML personalization pipeline is **correctly implemented** end-to-end in the backend (`scoring.js`, `cardSelector.js`, `cards.js` route). The mathematical models, scoring multipliers, cross-phase vectors, and diversity algorithms are all sound.

The issue is a **frontend integration gap**: the `SwipeEngine.tsx` component never delegates primary card loading to the backend's ML card selector. Combined with an overly aggressive short-circuit mechanism (70% likes after just 7 swipes), the result is that users only see ~15–20 cards out of 46, and those cards are always in the same static order regardless of user behavior.

**The fix is straightforward:** wire the frontend phase initialization to call `POST /api/cards/next` with the full phase quota, raise or remove the short-circuit threshold, and ensure the `detailViewed` field is persisted in the Session schema.
