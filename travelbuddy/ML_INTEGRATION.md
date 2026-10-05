# ML Integration Guide — Merge Conflict  Prevention

> **For:** ML teammate integrating the recommendation/scoring model  
> **Purpose:** Clear contracts between ML output and backend code so both can work in parallel with zero merge conflicts

---

## 🧠 What the ML Model Should Produce

The backend expects a **single scoring function** that, given a user's preference vector and a destination's tag vector, returns a similarity score between 0 and 1.

Your model output should ultimately plug into this shape:

```js
// server/src/lib/scoring.js  ← ONLY file you need to touch
function scoreDestination(userVector, destinationVector) {
  // YOUR ML MODEL GOES HERE
  // Input:  two arrays of equal length (float values 0.0–1.0)
  // Output: a single float between 0.0 and 1.0
  return score; // higher = better match
}
```

---

## 📁 Files You Own (ML teammate)

**Touch only these files** — they are isolated from the frontend and API routes:

| File | Purpose |
|---|---|
| `server/src/lib/scoring.js` | **Main file to edit** — replace `scoreDestination()` with your model |
| `server/src/data/vibeVectors.json` | Destination vibe tag weight definitions (if you want to tune them) |
| `server/ml/` *(new folder you can create)* | Your training scripts, model weights, notebooks — isolated |

---

## 🚫 Files NOT to Touch (to avoid conflicts)

| File | Owner | Why |
|---|---|---|
| `server/src/lib/hotelClient.js` | API team | HotelAPI hotel integration — completely separate |
| `server/src/routes/destination.js` | API team | Calls `scoring.js` but you don't need to modify it |
| `server/src/routes/session.js` | API team | Session management |
| `server/src/models/` | API team | MongoDB schemas |
| `travel-buddy/src/` | Frontend team | UI components |
| `server/src/data/destinations.json` | Shared | **Coordinate before editing** |

---

## 📐 The Interface Contract

### Input — User Preference Vector

The backend passes this into your function. It's built from swipe history:

```json
{
  "adventure": 0.9,
  "relaxation": 0.3,
  "culture": 0.7,
  "foodie": 0.5,
  "nature": 0.8,
  "urban": 0.2,
  "budget": 0.6,
  "luxury": 0.4,
  "solo": 0.1,
  "social": 0.7
}
```
*(10 dimensions — one per vibe category)*

### Input — Destination Tag Vector

Each destination in MongoDB has a matching `vibeScores` field (same 10 dimensions).

Example for Tromsø:
```json
{
  "adventure": 0.95,
  "relaxation": 0.4,
  "culture": 0.5,
  "foodie": 0.2,
  "nature": 1.0,
  "urban": 0.1,
  "budget": 0.5,
  "luxury": 0.5,
  "solo": 0.6,
  "social": 0.4
}
```

### Output — Score

A **float between 0.0 and 1.0** (or 0–100 — just be consistent).

---

## 🔌 How to Plug In Your Model

### Option A — Replace the scoring function directly (simplest)

Open `server/src/lib/scoring.js` and replace the `rankDestinations` function body:

```js
// Current implementation (cosine similarity):
function rankDestinations(userVibeScores, destinations, budget) {
  return destinations
    .map(dest => ({
      ...dest,
      score: cosineSimilarity(userVibeScores, dest.vibeScores)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
```

Replace `cosineSimilarity(...)` with your model call. Keep the `.map()` and `.sort()` structure the same so the API routes don't break.

### Option B — Load a trained model from a file

```js
// At the top of scoring.js
const yourModel = require('../ml/model');  // your exported model

function rankDestinations(userVibeScores, destinations, budget) {
  return destinations
    .map(dest => ({
      ...dest,
      score: yourModel.predict(userVibeScores, dest.vibeScores)  // your fn
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
```

Put `model.js` (and any weights files) in a new `server/src/ml/` folder — this is fully isolated.

---

## 🔢 Vector Dimensions Reference

```
Index  Dimension      Swipe Category
────────────────────────────────────
  0    adventure      Adventure vibes cards
  1    relaxation     Chill/spa/beach cards
  2    culture        Museums, history cards
  3    foodie         Food/restaurants cards
  4    nature         Outdoors/hiking cards
  5    urban          City/nightlife cards
  6    budget         Budget-focused cards
  7    luxury         Luxury stays/resorts
  8    solo           Solo-travel cards
  9    social         Group/party cards
```

---

## 📌 Git Workflow to Minimize Conflicts

1. **Pull before you start working:**
   ```bash
   git pull origin main
   ```

2. **Create your own branch:**
   ```bash
   git checkout -b feat/ml-scoring
   ```

3. **Only commit your own files** (`scoring.js`, `server/src/ml/`)

4. **Before merging back:**
   ```bash
   git fetch origin
   git rebase origin/main   # rebase (not merge) to keep history clean
   ```

5. **If `scoring.js` has conflicts** — the conflict will always be inside the `cosineSimilarity` or `rankDestinations` function body only. The function *signatures* and *exports* won't change from the API side.

---

## ✅ Checklist Before Merging ML Branch

- [ ] `rankDestinations(userVibeScores, destinations, budget)` still exported from `scoring.js`
- [ ] Returns array of destination objects with `score` field (0–100 or 0–1)
- [ ] Array is sorted descending by `score`
- [ ] Maximum 5 results returned (`.slice(0, 5)`)
- [ ] No new `require()` imports that need `npm install` (or update `package.json` and tell API team)
- [ ] `adjustItineraryCosts()` function in `scoring.js` is **unchanged** (API team uses it)
