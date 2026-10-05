# 🧠 TravelBuddy — ML Deep Dive

> **Files:** `server/src/lib/semanticVector.js` · `server/src/lib/scoring.js` · `server/src/lib/cardSelector.js` · `travel-buddy/src/components/discovery/SwipeEngine.tsx` · `tagEmbeddings.json`

This document is a complete, end-to-end technical walkthrough of every machine learning component in TravelBuddy — what it does, where it lives, the exact formulas, and how the pieces connect.

---

## 📑 Table of Contents

1. [System Overview — The 3-Layer ML Stack](#-system-overview--the-3-layer-ml-stack)
2. [The Tag Embedding Foundation](#-the-tag-embedding-foundation)
3. [Layer 1 — Signal Capture (Per Swipe)](#-layer-1--signal-capture-per-swipe)
   - Multi-Signal Weighting Formula
   - Dense Vector Update (Leaky Integrator)
   - Sparse Vector Update (IDF-Boosted Tag Scores)
4. [Layer 2 — Adaptive Card Feed](#-layer-2--adaptive-card-feed)
   - Cold Start vs Adaptive Mode
   - The 75/25 Preferred/Exploration Split
   - Diversity Interleaving
   - Dynamic Phase Quotas (Frontend)
   - Vector Convergence Auto-Advance
5. [Layer 3 — Destination Ranking & Itinerary Personalization](#-layer-3--destination-ranking--itinerary-personalization)
   - Multi-Vector Destination Ranking
   - Itinerary Micro-Personalization
   - Budget Pruning
6. [Calibration System (Duels & Quick-Taps)](#-calibration-system-duels--quick-taps)
7. [Cross-Phase Learning](#-cross-phase-learning)
8. [Photo Feature Extraction (ML Pre-Seeding)](#-photo-feature-extraction-ml-pre-seeding)
9. [Where ML Lives — File Map](#-where-ml-lives--file-map)
10. [Complete Data Flow: Swipe → Destination](#-complete-data-flow-swipe--destination)
11. [All Constants Reference](#-all-constants-reference)
12. [Interview Q&A](#-interview-qa)

---

## 🗺 System Overview — The 3-Layer ML Stack

TravelBuddy's ML system is **fully implicit** — users never fill a preference form. The system extracts semantic intent purely from behavioral signals (swipes, timing, detail views) across a 3-phase swiping interface.

```
Phase 1: Vibes →  Phase 2: Activities →  Phase 3: Stays
    │                     │                     │
    ▼                     ▼                     ▼
[userVibeVector]  [userActivityVector]  [userStayVector]
    ↕ updated on every swipe via Leaky Integrator
    │
    ▼
Adaptive Card Feed (75/25 epsilon-greedy)
    │
    ▼
Destination Ranking (dot product + sigmoid + bonuses → top 5)
    │
    ▼
Itinerary Personalization (day-item reordering by activity affinity)
```

**Two parallel scoring representations are maintained simultaneously:**

| Representation | Type | Dimensions | Used For |
|---|---|---|---|
| **Dense semantic vectors** (`userVibeVector` etc.) | `number[]` 768-dim | High-dimensional float array | Card selection, destination ranking |
| **Sparse tag scores** (`vibeScores` etc.) | `Map<string, number>` | Variable (one entry per tag seen) | Itinerary personalization, explanations |

Both are updated on every swipe. The dense vectors represent *meaning* in embedding space. The sparse maps represent *explicit tag preferences* in human-readable form.

---

## 🔡 The Tag Embedding Foundation

**File:** `tagEmbeddings.json` (loaded at server startup AND bundled into the frontend)  
**Model:** `sentence-transformers/all-MiniLM-L6-v2`  
**Dimension:** 768-dim Float64 per tag

```json
{
  "Adventure": [0.023, -0.118, 0.045, ...],   // 768 values
  "Urban":     [0.071, 0.034, -0.092, ...],
  "Luxury":    [...],
  ...
}
```

This JSON is the **fixed foundation** of the entire ML system. Each travel tag (e.g., "Romantic", "Hiking", "Street Food", "Eco Lodge") has been pre-embedded into a 768-dimensional semantic space by a sentence transformer. Tags that are semantically similar (e.g., "Adventure" and "Hiking") have small cosine distance between their vectors.

**The file is loaded in two places:**
- **Backend** — `server/src/lib/semanticVector.js` (module-level `require()` — loaded once at process start)
- **Frontend** — `SwipeEngine.tsx` (bundled as a Next.js import via `@/data/tagEmbeddings.json`)

Both sides maintain identical fuzzy-match lookup logic:

```js
function getTagEmbedding(tag) {
    if (TAG_EMBEDDINGS[tag]) return TAG_EMBEDDINGS[tag];        // exact match
    const lower = tag.toLowerCase();
    if (EMBEDDING_LOOKUP[lower]) return EMBEDDING_LOOKUP[lower]; // lowercase
    if (EMBEDDING_LOOKUP[lower + 's']) return EMBEDDING_LOOKUP[lower + 's']; // pluralization
    if (lower.endsWith('s') && EMBEDDING_LOOKUP[lower.slice(0,-1)]) return ...; // de-plural
    return null;
}
```

**`getCardVector(tags[])` → 768-dim array:**
Averages the embeddings of all matched tags. If a card has tags `["Adventure", "Hiking", "Photography"]`, its vector is the mean of those 3 embeddings.

```js
function getCardVector(tags) {
    const vec = new Float64Array(768);
    let matched = 0;
    for (const tag of tags) {
        const emb = getTagEmbedding(tag);
        if (emb) { /* element-wise add */ matched++; }
    }
    if (matched > 0) { /* divide each element by matched */ }
    return Array.from(vec);
}
```

---

## ⚡ Layer 1 — Signal Capture (Per Swipe)

### Multi-Signal Weighting Formula

Every swipe is not just a binary LIKE/DISLIKE. It produces a **composite weight** that encodes 5 signals:

```
finalWeight = baseWeight × Weng × Wspeed × positionalDecay

Where:
  baseWeight      = LIKE: +1.0 | SAVE: +1.5 (backend) / +1.8 (sparse scoring) | DISLIKE: −0.5
  Weng            = 1.5  if user opened card detail before swiping, else 1.0
  Wspeed          = 0.5  if swipeTime < 400ms (fast/instinctual)
                  = 0.75 if swipeTime < 800ms (moderate)
                  = 1.0  if swipeTime ≥ 800ms (slow/deliberate)
  positionalDecay = 1.0 + 0.5 × (cardIndex / max(1, totalCards))
                    → ranges from 1.0 (first card) to 1.5 (last card)
```

**Why positional decay is additive, not decreasing:**  
Later cards carry MORE weight because the user is now more informed. Card 1 in a phase is a cold-start guess. Card 15 in a phase is a deliberate choice with context.

**Why slow swipes matter:**  
A swipe that takes <400ms is likely instinctual (based purely on the image). A swipe taking 1200ms means the user read the description and considered the choice. The speed multiplier encodes this confidence.

**Why `detailViewed` gives 1.5×:**  
Opening the card detail modal is an explicit engagement signal. The user looked at extra images, read the long description, checked highlights — and then still swiped. This is a 1.5× confidence boost.

---

### Dense Vector Update — Leaky Integrator

**File:** `server/src/lib/semanticVector.js` · `SwipeEngine.tsx` (replicated)

```
newVec = 0.8 × currentVec + finalWeight × cardVec
```

This is a **leaky integrator** — a classical signal processing concept. The `0.8` decay factor ("leak") means old preferences gradually fade. New swipes dominate the user vector over time. The system naturally **forgets early, exploratory swipes** and weights recent, deliberate choices higher.

**Full function signature:**
```js
function updateUserVector(currentVec, cardVec, direction, options) {
    // direction: 'LIKE' | 'DISLIKE' | 'SAVE'
    // options: { cardIndex, totalCards, swipeDurationMs, detailViewed, decay }
    const finalWeight = baseWeight * Weng * Wspeed * positionalDecay;

    if (currentVec.length === 0) {
        return cardVec.map(v => finalWeight * v); // cold start: just scaled cardVec
    }
    return currentVec.map((v, i) => 0.8 * v + finalWeight * (cardVec[i] || 0));
}
```

**Three phase-specific vectors are maintained independently:**

| Vector | Updated When | Used For |
|---|---|---|
| `session.userVibeVector` | Any swipe in Phase 1 | Card selection for Phase 1; contributes 50% to destination ranking |
| `session.userActivityVector` | Any swipe in Phase 2 | Card selection for Phase 2; contributes 30% to destination ranking |
| `session.userStayVector` | Any swipe in Phase 3 | Card selection for Phase 3; contributes 20% to destination ranking |
| `session.userVector` | Every swipe (all phases) | Legacy monolithic vector; fallback when phase vectors are empty |

**The frontend runs a local copy:**  
`SwipeEngine.tsx` calls `updateUserVectorLocal()` (identical math) on every swipe to immediately re-rank the local card deck **without waiting for the backend API round-trip**. The backend is updated asynchronously via `recordSwipe()`.

---

### Sparse Vector Update — IDF-Boosted Tag Scores

**File:** `server/src/lib/scoring.js` → `updatePreferenceVector()`

In parallel with the dense leaky integrator, a sparse Map of tag → score is also updated:

```js
// For each tag on the swiped card:
const rarityBoost = 1.0 / Math.sqrt(tagFrequency[tag] || 1);

delta = baseDelta × positionMultiplier × speedMultiplier × rarityBoost × engagementMultiplier;
vec.set(tag, (vec.get(tag) || 0) + delta);
```

**IDF (Inverse Document Frequency) rarity boost:**  
If a tag appears on many cards (e.g., "Travel"), it's worth less as a signal — its rarity boost is low (`1/sqrt(high_freq)` → small). If a user swipes on a niche card with tag "Fjord Photography", that very rare tag gets a large boost (`1/sqrt(1)` = 1.0). This is the same intuition as TF-IDF in information retrieval — rare terms are more informative.

**SAVE_BOOST = 1.8:**  
A SAVE (wishlist swipe up) uses `1.8` as the base delta (vs `1.0` for LIKE). Saving to a wishlist is the strongest explicit signal — the user wants to remember it.

---

## 🃏 Layer 2 — Adaptive Card Feed

**File:** `server/src/lib/cardSelector.js` + `SwipeEngine.tsx`

### Cold Start vs Adaptive Mode

```js
const hasUserSignal = hasSignal(userVector) && cardsShownSoFar >= MIN_SWIPES_FOR_ADAPTIVE;
// MIN_SWIPES_FOR_ADAPTIVE = 2
```

**Cold start** (0-1 swipes, or zero vector): Score = `0.5 × explorationScore + 0.5 × diversityScore`  
A pure diversity/novelty ranking — shows the most varied set of cards possible to maximize information gain quickly.

**Adaptive mode** (≥2 swipes): Uses cosine similarity against the user's semantic vector.

---

### The 75/25 Preferred/Exploration Split

**This is epsilon-greedy exploration** — a classic bandit algorithm:

```
PREFERRED_RATIO = 0.75   // exploitation
EXPLORE_RATIO   = 0.25   // exploration
```

**Full selection pipeline:**

```
1. Filter out already-shown cards
2. Compute cosine_similarity(userVector, cardVector) for each candidate
3. Sort all candidates by cosine similarity (descending)
4. Split at midpoint: top 50% → preferredPool, bottom 50% → explorationPool
5. Within preferredPool: sort by (semanticMatch + 0.3 × diversityScore)
6. Within explorationPool: sort by (explorationScore + 0.5 × diversityScore)
7. Take round(count × 0.75) from preferredPool
   Take (count - round(count × 0.75)) from explorationPool
8. Fisher-Yates shuffle (user can't tell which cards are preferred vs exploration)
9. Diversity interleave (greedy reorder to minimize consecutive tag overlap)
```

**`explorationScore(card, seenTagCounts)`:**
```
score = sum(1 / (1 + timesTagSeen)) / numTags
```
A tag seen 0 times → contributes 1.0. A tag seen 5 times → contributes 0.17. This forces novel tag combinations to surface in the exploration bucket.

**`diversityScore(card, recentCardTags)`:**
```
score = 1.0 - avgCosineSimilarity(card, last 5 shown cards)
```
Cards maximally different from recent cards score highest in diversity.

---

### Diversity Interleaving — `diversityInterleave()`

After the 75/25 selection, the batch is passed through a greedy reorder that ensures **consecutive cards share minimal tags**:

```js
function diversityInterleave(cards) {
    const result = [cards[0]];
    const remaining = cards.slice(1);
    while (remaining.length > 0) {
        const lastTags = new Set(result[result.length - 1].tags);
        let bestIdx = 0, bestOverlap = Infinity;
        for (let i = 0; i < remaining.length; i++) {
            const overlap = candidateTags.filter(t => lastTags.has(t)).length
                          / Math.max(candidateTags.length, 1);
            if (overlap < bestOverlap) { bestOverlap = overlap; bestIdx = i; }
        }
        result.push(remaining.splice(bestIdx, 1)[0]);
    }
    return result;
}
```

This prevents "Beach, Beach, Beach" fatigue sequences even if the user loves beach content.

---

### Dynamic Phase Quotas (Frontend — `SwipeEngine.tsx`)

The number of swipes per phase is **not fixed**. Two intelligent short-circuits can end a phase early:

#### Short-Circuit 1: Tag Confidence (≥90% dominance)
```js
const TAG_CONFIDENCE_THRESHOLD = 0.90;
const MIN_SWIPES_FOR_CONFIDENCE = 5;

// After every swipe, project userVector onto all tag embeddings:
function getTagDistribution() {
    const affinities = Object.entries(TAG_EMBEDDINGS).map(([tag, emb]) => 
        [tag, cosineSimilarityDense(userVector, emb)]
    ).filter(([,sim]) => sim > 0);
    // Normalize to get percentage share per tag
    const totalPositive = sum(affinities.map(([,v]) => v));
    return affinities.map(([tag, score]) => [tag, score / totalPositive]);
}

// If one tag's share ≥ 90% of all positive affinity → we have enough signal
if (topTagShare >= TAG_CONFIDENCE_THRESHOLD) {
    toast("We see you love ${topTag}! Moving on...");
    advancePhase();
}
```
The user's preference vector is projected back onto every tag embedding. If one tag absorbs 90%+ of all positive affinity mass, the ML has extracted enough signal to move forward.

#### Short-Circuit 2: Vector Convergence
```js
const VECTOR_CONVERGENCE_THRESHOLD = 0.9;   // cosine similarity threshold
const VECTOR_CONVERGENCE_STREAK = 3;         // consecutive stable swipes needed

// After each swipe, compare old vector to new vector:
const sim = cosineSimilarityDense(prevVectorSnapshot, newUserVector);
if (sim >= 0.9) stableSwipeCount++;   // vector barely moved
if (stableSwipeCount >= 3) showConvergencePopup();  // ask if user wants to proceed
```
If 3 consecutive swipes cause the user vector to shift less than 10% (cosine sim ≥ 0.9), the user's preferences have stabilized — more cards won't meaningfully change the model.

**Base quotas per phase:**
```js
const PHASE_QUOTAS = { vibes: 20, activities: 28, stays: 18 };  // 66 total
const ABSOLUTE_MAX_PER_PHASE = 30;
```

**Consecutive dislike duel trigger:**
```js
const CONSECUTIVE_DISLIKES_THRESHOLD = 3;
// After 3 left swipes in a row → trigger a calibration duel
```

---

## 🏆 Layer 3 — Destination Ranking & Itinerary Personalization

### Multi-Vector Destination Ranking

**File:** `server/src/lib/scoring.js` → `rankDestinations(session, destinations, budget)`

Called by `POST /api/destinations/shortlist` after all swiping is complete.

**Step 1 — Build combined user vector:**
```js
finalUserVec[i] = (0.5 × userVibeVector[i])
                + (0.3 × userActivityVector[i])
                + (0.2 × userStayVector[i])
```
Vibes are the strongest signal (50%) because they capture the emotional/aesthetic pull. Activities are secondary (30%). Stays (20%) are often the most constrained by budget so get less weight.

**Step 2 — Compute raw dot products:**
```js
const destVector = getCardVector(dest.tags);   // average tag embeddings of destination
const rawDot = dotProductDense(finalUserVec, destVector);
```
Uses raw dot product (not cosine similarity) so that the magnitude of `finalUserVec` encodes confidence — users who swiped many times have larger magnitude vectors, giving stronger differentiation.

**Step 3 — Sort and take top 10:**
```js
scoredDests.sort((a, b) => b.rawDot - a.rawDot);
const top10 = scoredDests.slice(0, 10);
```

**Step 4 — Sigmoid scaling:**
```js
const scaledDot = rawDot / 10.0;  // normalize (dot products range ~5-20)
const sigmoidScore = 1 / (1 + Math.exp(-1.2 × scaledDot));  // yields ~0.5 to 0.99
let score = 0.55 + (sigmoidScore × 0.44);  // map to 0.55–0.99 baseline
```

**Step 5 — Apply bonuses and normalize to 55–99:**

| Bonus | Condition | Effect |
|---|---|---|
| Budget alignment | `dest.costLevel === userBudgetBracket` | +5% |
| Budget mismatch | `|costLevel - bracket| >= 2` | −10% |
| ProfileTags overlap | `overlap / dest.tags.length > 0` | up to +10% |

```js
const budgetBracket = budget >= 200000 ? 3 : budget >= 100000 ? 2 : 1;
const costDiff = Math.abs(dest.costLevel - budgetBracket);
// ProfileTags overlap bonus
const overlap = destTagsLower.filter(t => curatedTags.has(t)).length;
score += (overlap / destTags.length) * 0.10;
// Normalize to integer 55–99
const matchPercent = Math.min(99, Math.max(55, Math.round(score * 100)));
```

**Only the hardcoded `HotelAPI_VALID_CITIES` set (37 cities) is ranked.** This prevents showing destinations that would silently fall back to fake seed data for both hotel AND flights.

---

### Itinerary Micro-Personalization

**File:** `scoring.js` → `personalizeItinerary(itinerary, activityScores)`

Once a destination is selected, the same user data re-orders the day-by-day schedule:

```js
for (const day of itinerary.days) {
    const pinned = items.filter(i => i.type === 'travel');   // fixed positions
    const movable = items.filter(i => i.type !== 'travel');  // reorderable

    // Score each activity by keyword overlap with activityScores map
    movable.forEach(item => {
        const keywords = [...item.activity.split(/\s+/), ...item.description.split(/\s+/)];
        item.score = 0;
        for (const [tag, weight] of activityScores) {
            if (keywords.some(w => w.includes(tag.toLowerCase()))) {
                item.score += weight;
            }
        }
    });

    // Highest-scored activities get the best (earliest) time slots
    movable.sort((a, b) => b.score - a.score);
    // Reconstruct: travel items stay pinned, movable items fill remaining slots
}
```

**Example:** Two users both get Paris. User A has high "food" activityScore. User B has high "art" activityScore. User A's Day 1 will surface "Food Market Tour" first. User B's Day 1 will surface "Louvre Visit" first.

---

### Budget Pruning

**File:** `scoring.js` → `pruneActivitiesByBudget(itinerary, maxBudget)`

After Gemini generates the day schedule (which may not respect budget math precisely), a greedy pruner enforces hard budget caps:

```js
while (activitiesCost + transfersCost > maxActivitiesBudget) {
    // Find the single most expensive non-travel item across all days
    const mostExpensive = findMostExpensiveItem(days);
    // Remove it
    days[mostExpensive.dayIdx].items.splice(mostExpensive.itemIdx, 1);
    activitiesCost -= mostExpensive.cost;
}
```

This runs silently and ensures the budget bar in the UI always goes green.

---

## 🥊 Calibration System (Duels & Quick-Taps)

**Backend:** `server/src/routes/calibration.js`  
**Frontend:** `SwipeEngine.tsx` → `handleDuelResolve()`

### When Calibration Triggers

Two automatic interventions:
1. **3 consecutive dislikes** → a Duel is shown
2. **Tag conflict** (contradictory tags accumulate) → Duel or Quick-tap

### Duel Resolution Math

The user drags a calibration slider between two opposing cards. The signed `position` value encodes both direction and strength:
- `position < 0` → user picked left/top card (winner = leftTags)
- `position > 0` → user picked right/bottom card (winner = rightTags)
- `|position|` = 1 (slight lean) or 2 (strong lean)

**Vector update formula:**
```
m = 1.0 (slight lean) or 2.0 (strong lean)
n = −0.5 (slight lean) or −1.0 (strong lean)

new_vec[i] = old_vec[i] + m × winnerVec[i] - n × loserVec[i]
```

Since `n` is negative, `-n` is positive — this **slightly boosts the loser vector too**. The intent: the loser card wasn't completely wrong, just less preferred. This avoids overcorrecting the vector.

The duel update is applied to:
1. The phase-specific vector (`userVibeVector` / `userActivityVector` / `userStayVector`)
2. The monolithic `userVector`
3. The current card deck is immediately re-sorted: `setCards(prev => rankCardsByRelevance(prev))`

### Quick-Tap Resolution

When the user taps explicit tags (no vector math needed — direct sparse boost):
```js
const QUICKTAP_BOOST = 1.5;
for (const tag of selectedTags) {
    scores.set(tag, (scores.get(tag) || 0) + QUICKTAP_BOOST);
}
```

---

## 🔗 Cross-Phase Learning

Preferences **don't reset between phases**. The `userVectorRef` in the frontend accumulates signal across all three phases:

```js
// In SwipeEngine.tsx:
// Note: userVectorRef is NOT reset between phases - cumulative learning
```

**Practical effect:** If a user loves "Urban" and "City" vibes in Phase 1, by the time they reach Phase 2 (Activities), the `userVector` already has strong signal in the urban/nightlife direction. The card selector uses this vector to prioritize "Nightlife", "Food Tours", and "Street Art" cards over "Hiking" or "Wildlife" cards at the very start of Phase 2 — before even one Activity swipe has occurred.

On the backend, `cards.js` implements phase-specific vector prioritization:
```js
const phaseVector =
    stage === 'vibes'      ? (session.userVibeVector?.length     ? session.userVibeVector     : session.userVector) :
    stage === 'activities' ? (session.userActivityVector?.length ? session.userActivityVector : session.userVector) :
    stage === 'stays'      ? (session.userStayVector?.length     ? session.userStayVector     : session.userVector) :
    session.userVector;
```
For Phase 2, once `userActivityVector` has signal, it switches to the independent activity vector. But before enough activity swipes, it falls back to `userVector` — incorporating Vibe phase learning.

---

## 📸 Photo Feature Extraction (ML Pre-Seeding)

**File:** `travel-buddy/src/app/page.tsx` (orchestrator) + photo route

TravelBuddy supports an optional camera/photo upload feature. When used, photos are analyzed and the extracted tags **pre-seed the user's preference vector before swiping even begins**:

```js
// In SwipeEngine.tsx — runs once on mount if initialProfileTags is provided:
useEffect(() => {
    if (!initialProfileTags) return;
    // Seed profileTags state from photo-extracted tags
    setProfileTags(pt => ({ vibes: [...pt.vibes, ...initialProfileTags.vibes], ... }));

    // Build a seed userVector by averaging all extracted tag embeddings
    const allTags = [...vibes, ...activities, ...stays];
    const seedVec = new Array(768).fill(0);
    let count = 0;
    for (const tag of allTags) {
        const emb = getTagEmbedding(tag);
        if (emb) { /* add to seedVec */ count++; }
    }
    if (count > 0) {
        seedVec.forEach((_, i) => seedVec[i] /= count);
        userVectorRef.current = seedVec;  // hot-start the ML model
    }
}, []);
```

If all three phases have enough photo-extracted tags, the app can **skip swiping entirely** (`allSkipped = true`) and call `onComplete()` immediately with the photo-derived preferences. The ML model runs on photos-as-swipes.

---

## 📂 Where ML Lives — File Map

| File | Layer | What it does |
|---|---|---|
| `tagEmbeddings.json` | Foundation | 768-dim sentence-transformer embeddings for every travel tag |
| `server/src/lib/semanticVector.js` | L1+L2 | `getCardVector`, `updateUserVector` (leaky integrator), `cosineSimilarityDense`, `dotProductDense` |
| `server/src/lib/scoring.js` | L1+L3 | `updatePreferenceVector` (IDF sparse scoring), `rankDestinations` (sigmoid + multi-vec), `personalizeItinerary`, `pruneActivitiesByBudget`, `generateRecommendationExplanation` |
| `server/src/lib/cardSelector.js` | L2 | `selectNextCards` (75/25 epsilon-greedy), `diversityInterleave`, `explorationScore`, `diversityScore` |
| `server/src/routes/swipe.js` | L1 | Updates both dense + sparse vectors on every swipe event |
| `server/src/routes/cards.js` | L2 | Calls `selectNextCards` with phase-specific vector |
| `server/src/routes/destination.js` | L3 | Calls `rankDestinations`, `personalizeItinerary`, `pruneActivitiesByBudget` |
| `server/src/routes/calibration.js` | L1 | Applies duel vector math and quick-tap boosts |
| `travel-buddy/src/components/discovery/SwipeEngine.tsx` | L1+L2 | Client-side leaky integrator, convergence detection, tag confidence short-circuit, duel vector update |
| `server/src/models/Session.js` | Storage | Persists all vectors + sparse maps + swipe history to MongoDB |

---

## 🔄 Complete Data Flow: Swipe → Destination

```
USER swipes RIGHT on "Northern Lights" card
    Tags: ["Nature", "Winter", "Photography", "Remote", "Magical", "Cold"]
    swipeDurationMs: 1850ms (slow → deliberate)
    cardIndex: 8, totalCards: 20
    detailViewed: true (user opened detail before swiping)

─────────────────────────────────────────────
WEIGHT COMPUTATION (both frontend + backend)
─────────────────────────────────────────────
  baseWeight   = 1.0   (LIKE)
  Weng         = 1.5   (detail viewed)
  Wspeed       = 1.0   (swipeDurationMs > 800ms)
  positionalDecay = 1 + 0.5 × (8/20) = 1.2

  finalWeight  = 1.0 × 1.5 × 1.0 × 1.2 = 1.8

─────────────────────────────────────────────
FRONTEND (SwipeEngine.tsx — immediate, local)
─────────────────────────────────────────────
  cardVec = avg(emb("Nature"), emb("Winter"), emb("Photography"), ...)
  userVectorRef = 0.8 × oldVec + 1.8 × cardVec
  → card deck re-ranked: cosine_sim(newUserVec, each card's vec)
  → Cards about "Arctic", "Winter Sports", "Landscape Photography"
     bubble to top of remaining deck

─────────────────────────────────────────────
BACKEND (async, via recordSwipe API call)
─────────────────────────────────────────────
  POST /api/swipe → swipe.js
    ├── session.userVibeVector = updateUserVector(oldVec, cardVec, 'LIKE',
    │       { cardIndex:8, totalCards:20, swipeDurationMs:1850, detailViewed:true })
    │   → 0.8 × oldVibeVec + 1.8 × cardVec
    │
    ├── session.userVector = same update (monolithic legacy vector)
    │
    └── session.vibeScores (sparse IDF map):
        "Nature":      score += 1.0 × 1.5 × 1.0 × 1.2 × (1/√freq_nature)
        "Winter":      score += 1.0 × 1.5 × 1.0 × 1.2 × (1/√freq_winter)
        "Photography": score += 1.0 × 1.5 × 1.0 × 1.2 × (1/√freq_photo)
        ...

─────────────────────────────────────────────
CARD SELECTION (POST /api/cards/next)
─────────────────────────────────────────────
  selectNextCards({ userVector: session.userVibeVector, ... })
    75% preferred: top cosine-similar cards to userVibeVector
    25% explore:  novelty-weighted candidates
    → Fisher-Yates shuffle
    → Diversity interleave (no consecutive similar tags)

─────────────────────────────────────────────
DESTINATION RANKING (POST /api/destinations/shortlist)
─────────────────────────────────────────────
  finalVec = 0.5 × userVibeVec + 0.3 × userActivityVec + 0.2 × userStayVec

  For each destination (filtered to 37 HotelAPI valid cities):
    destVec = getCardVector(dest.tags)
    rawDot = dotProduct(finalVec, destVec)

  Sort by rawDot → top 10
  Apply sigmoid + budget bonus/penalty + profileTags bonus
  Normalize to 55–99 integer
  Return top 5

─────────────────────────────────────────────
ITINERARY PERSONALIZATION
─────────────────────────────────────────────
  personalizeItinerary(aiGeneratedSchedule, session.activityScores)
  → Day items with "Photography" in activity/description float to top slots
  → "Wildlife Photography" tour on Day 1 morning
  → "Landscape Photography" workshop on Day 2 afternoon
  pruneActivitiesByBudget → remove most expensive item if still over 20% budget

─────────────────────────────────────────────
RECOMMENDATION EXPLANATION (Gemini enhanced)
─────────────────────────────────────────────
  generateRecommendationExplanation(session, destination)
  → For each likedVibeTags tag: dotProduct(tagEmb, destVec) → sort → top 5
  → "Recommended because it matches Nature, Winter, Photography vibes"
  → Passed to Gemini for human-readable prose version
```

---

## 📊 All Constants Reference

```js
// ── semanticVector.js ─────────────────────────────────────────────
DECAY_FACTOR      = 0.8        // leaky integrator memory decay (80% retention)
LIKE_WEIGHT       = 1.0        // base weight for LIKE direction
DISLIKE_WEIGHT    = -0.5       // base weight for DISLIKE direction
// SAVE uses LIKE_WEIGHT × 1.5 in semanticVector.js

// ── scoring.js ────────────────────────────────────────────────────
ALPHA             = 1.0        // sparse scoring: LIKE base delta  
BETA              = 0.5        // sparse scoring: DISLIKE penalty magnitude
SAVE_BOOST        = 1.8        // sparse scoring: SAVE base delta (strongest)
VIBE_WEIGHT       = 0.50       // destination ranking: vibe phase contribution
ACTIVITY_WEIGHT   = 0.30       // destination ranking: activity phase contribution
STAY_WEIGHT       = 0.20       // destination ranking: stay phase contribution

// ── cardSelector.js ───────────────────────────────────────────────
PREFERRED_RATIO            = 0.75    // 75% exploiting user preferences
EXPLORE_RATIO              = 0.25    // 25% novelty exploration
MIN_SWIPES_FOR_ADAPTIVE    = 2       // minimum before enabling personalization
CARDS_PER_BATCH            = 3       // default batch size per API call

// ── SwipeEngine.tsx ───────────────────────────────────────────────
PHASE_QUOTAS               = { vibes: 20, activities: 28, stays: 18 }
ABSOLUTE_MAX_PER_PHASE     = 30
MIN_SWIPES_FOR_CONFIDENCE  = 5       // minimum swipes before tag confidence check
TAG_CONFIDENCE_THRESHOLD   = 0.90    // one tag >= 90% affinity → short-circuit
MIN_SWIPES_FOR_CONVERGENCE = 5       // minimum before checking convergence
VECTOR_CONVERGENCE_THRESHOLD = 0.9   // cos_sim(oldVec, newVec) >= 0.9 → stable
VECTOR_CONVERGENCE_STREAK  = 3       // consecutive stable swipes → show popup
CONSECUTIVE_DISLIKES_THRESHOLD = 3   // consecutive dislikes → trigger duel
DECAY_FACTOR (local)       = 0.8     // mirrors backend value exactly
```

---

## 💬 Interview Q&A

### Q: What ML model does TravelBuddy use?

**A:** Two techniques:
1. **Sentence embeddings** — `all-MiniLM-L6-v2` (external, pre-trained) converts travel tags into 768-dimensional vectors. This is the only pre-trained neural model; its weights are in `tagEmbeddings.json`.
2. **Custom real-time learning algorithm** — a leaky integrator (recursive exponential smoothing) updates a user preference centroid vector on every swipe. No training required — it's a closed-form update formula.

---

### Q: Why not use a recommendation system trained on user data?

**A:** Cold-start problem. TravelBuddy is a hackathon product with no historical user data at launch. The embedding-based approach requires zero training data — the semantic similarity comes from the pre-trained `all-MiniLM-L6-v2` model, which already understands that "Adventure" and "Hiking" are semantically related.

---

### Q: What prevents the user vector from being dominated by the first swipe?

**A:** The leaky integrator decay factor of 0.8. After 5 swipes, the original vector has decayed to `0.8^5 ≈ 32%` of its original influence. After 10 swipes, `0.8^10 ≈ 10%`. Recent swipes dominate. Additionally, the positional decay bonus (later swipes = 1.0→1.5× weight) further ensures the system is responsive to late-stage preference changes.

---

### Q: How is the frontend ML kept in sync with the backend?

**A:** The frontend runs its own local copy of `updateUserVectorLocal()` on every swipe for **immediate UI responsiveness** (instant card re-ranking). The backend is updated asynchronously via `recordSwipe()` which calls `POST /api/swipe`. Both use identical constants (`DECAY_FACTOR = 0.8`, same weighting formula). The backend version is the ground truth that persists to MongoDB.

---

### Q: Why use dot product for destination ranking but cosine similarity for card selection?

**A:** Intentional choice:
- **Card selection** uses cosine similarity (normalized). This gives equal weight to all cards regardless of how many have been swiped. A user with 2 swipes and a user with 15 swipes should both get well-ranked cards.
- **Destination ranking** uses raw dot product. The magnitude of `finalUserVec` encodes **confidence** — users who swiped many cards (high-magnitude vector) get more differentiated scores. It's analogous to weighting experts more than novices.

---

### Q: What happens to the ML model if a user skips a whole phase?

**A:** The phase vector remains empty (`[]`). In `rankDestinations()`, the combination formula still works but that phase contributes zero:
```js
finalVec = 0.5 × vibeVec + 0.3 × activityVec + 0.2 × stayVec
         = 0.5 × [] + 0.3 × activityVec + 0.2 × stayVec
         ≈ 0.3 × activityVec + 0.2 × stayVec   (effectively)
```
The ranking still works — just with less signal. Card selection for skipped phases falls back to `userVector` (the monolithic combined vector).

---

### Q: How does the "Why this destination?" explanation work?

**A:** `generateRecommendationExplanation(session, destination)` in `scoring.js`:
1. Builds `destVec = getCardVector(destination.tags)` — the destination's embedding centroid
2. For each tag in `session.likedVibeTags`: computes `dotProduct(tagEmbedding, destVec)`
3. Ranks tags by how semantically aligned they are with the destination
4. Returns top-5 tags per phase as the rule-based explanation
5. Passes this to Gemini to generate human-readable prose: "Recommended because it matches your love of Nature, Winter, and Photography vibes"

---

### Q: What is the Calibration Duel mathematically?

**A:** It's a forced binary preference signal to resolve contradictions in the user vector. The slider position encodes a soft preference (not a hard binary). The formula `new_vec = old_vec + m×winnerVec - n×loserVec` where `n` is negative means the loser vector gets **added** with a smaller coefficient:

```
new_vec = old_vec + 2.0×winnerVec + 1.0×loserVec   (strong lean, n=-1.0, so -n=+1.0)
```

The system acknowledges the user prefers A over B, but doesn't completely reject B. This prevents extreme vector values from a single duel interaction.
