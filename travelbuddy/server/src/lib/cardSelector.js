/**
 * Adaptive Card Selector — Semantic Vector Edition
 *
 * Uses dense cosine similarity between card vectors and the user's
 * semantic preference centroid (userVector) to rank candidates.
 *
 * Maintains: 75% Preferred / 25% Exploration split
 * Diversity interleave ensures consecutive cards have minimal tag overlap.
 */

const {
  getCardVector,
  cosineSimilarityDense,
  hasSignal,
} = require("./semanticVector");
const { cosineSimilarity } = require("./scoring");

const PREFERRED_RATIO = 0.75; // 75% preferred cards
const EXPLORE_RATIO = 0.25; // 25% exploration cards
const MIN_SWIPES_FOR_ADAPTIVE = 2; // need at least 2 swipes before going adaptive

const CARDS_PER_BATCH = 3;
const MAX_CARDS_PER_PHASE = 15;

/**
 * Build a tag vector from an array of tag strings → { tag: 1.0 }
 * (kept for diversity scoring which works on sparse tag vectors)
 */
function tagsToVector(tags) {
  const vec = {};
  for (const t of tags) vec[t] = 1.0;
  return vec;
}

/**
 * Calculate exploration score: novelty of card tags vs what user has already seen
 * Higher = more novel/unexplored tags
 */
function explorationScore(cardTags, seenTagCounts) {
  if (cardTags.length === 0) return 0;
  let novelty = 0;
  for (const tag of cardTags) {
    const seen = seenTagCounts[tag] || 0;
    novelty += 1.0 / (1 + seen);
  }
  return novelty / cardTags.length;
}

/**
 * Calculate diversity score: how different is this card from recent cards?
 * Higher = more diverse from recent selections
 */
function diversityScore(cardTags, recentCardTags) {
  if (recentCardTags.length === 0) return 1.0;

  const cardVec = tagsToVector(cardTags);
  let avgSimilarity = 0;
  for (const recentTags of recentCardTags) {
    avgSimilarity += cosineSimilarity(cardVec, tagsToVector(recentTags));
  }
  avgSimilarity /= recentCardTags.length;

  return 1.0 - avgSimilarity;
}

/**
 * Select next batch of cards using semantic vector ranking + 75/25 split.
 *
 * @param {Object} params
 * @param {number[]} params.userVector - user's dense semantic preference vector
 * @param {Array}  params.allCards - all available cards for this stage
 * @param {Array}  params.shownCardIds - IDs of cards already shown
 * @param {number} params.cardsShownSoFar - how many cards shown in current phase
 * @param {number} params.count - how many cards to select (default 3)
 * @returns {Array} selected card objects
 */
function selectNextCards({
  userVector = [],
  allCards = [],
  shownCardIds = [],
  cardsShownSoFar = 0,
  count = CARDS_PER_BATCH,
}) {
  // Filter out already-shown cards
  const candidates = allCards.filter((c) => !shownCardIds.includes(c.cardId));

  if (candidates.length === 0) return [];
  if (candidates.length <= count) return candidates;

  // Pre-compute dense vectors for all candidates
  const candidatesWithVectors = candidates.map((card) => ({
    card,
    vector: getCardVector(card.tags || []),
  }));

  // Build seen-tag counts from shown cards (for exploration scoring)
  const seenTagCounts = {};
  const recentCardTags = [];
  for (const card of allCards) {
    if (shownCardIds.includes(card.cardId)) {
      for (const tag of card.tags || []) {
        seenTagCounts[tag] = (seenTagCounts[tag] || 0) + 1;
      }
      recentCardTags.push(card.tags || []);
    }
  }
  const recentSlice = recentCardTags.slice(-5);

  // Check if we have meaningful user signal
  const hasUserSignal =
    hasSignal(userVector) && cardsShownSoFar >= MIN_SWIPES_FOR_ADAPTIVE;

  // Score every candidate
  const scored = candidatesWithVectors.map(({ card, vector }) => {
    // Semantic similarity between card vector and user vector
    const semanticMatch = hasUserSignal
      ? cosineSimilarityDense(userVector, vector)
      : 0;
    const explore = explorationScore(card.tags || [], seenTagCounts);
    const diverse = diversityScore(card.tags || [], recentSlice);
    return { card, semanticMatch, explore, diverse };
  });

  if (!hasUserSignal) {
    // ── Cold start: use diversity-weighted random ──
    scored.sort(
      (a, b) =>
        b.explore * 0.5 + b.diverse * 0.5 - (a.explore * 0.5 + a.diverse * 0.5),
    );
    return scored.slice(0, count).map((s) => s.card);
  }

  // ── Semantic ranking with 75/25 split ──
  // Sort by semantic similarity descending
  scored.sort((a, b) => b.semanticMatch - a.semanticMatch);

  // Top half = preferred pool, bottom half = exploration pool
  const midpoint = Math.ceil(scored.length / 2);
  const preferredPool = scored.slice(0, midpoint);
  const explorationPool = scored.slice(midpoint);

  // Apply diversity bonus within each pool
  preferredPool.sort(
    (a, b) =>
      b.semanticMatch + b.diverse * 0.3 - (a.semanticMatch + a.diverse * 0.3),
  );
  explorationPool.sort(
    (a, b) => b.explore + b.diverse * 0.5 - (a.explore + a.diverse * 0.5),
  );

  // Calculate how many from each pool
  const preferredCount = Math.round(count * PREFERRED_RATIO);
  const exploreCount = count - preferredCount;

  const selected = [
    ...preferredPool.slice(0, preferredCount).map((s) => s.card),
    ...explorationPool.slice(0, exploreCount).map((s) => s.card),
  ];

  // Shuffle so user can't tell preferred vs exploration
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  // Anti-repetition: reorder so consecutive cards have minimal tag overlap
  const interleaved = diversityInterleave(selected);

  console.log(
    `🎯 Semantic card selection: ${preferredCount} preferred + ${exploreCount} explore | pool: ${candidates.length} cards`,
  );

  return interleaved;
}

/**
 * Anti-repetition interleave: reorder cards so consecutive cards have
 * minimal tag overlap. Uses greedy "max distance from previous" approach.
 */
function diversityInterleave(cards) {
  if (cards.length <= 2) return cards;

  const result = [cards[0]];
  const remaining = cards.slice(1);

  while (remaining.length > 0) {
    const lastTags = new Set(result[result.length - 1].tags || []);
    let bestIdx = 0;
    let bestOverlap = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const candidateTags = remaining[i].tags || [];
      const overlap =
        candidateTags.filter((t) => lastTags.has(t)).length /
        Math.max(candidateTags.length, 1);
      if (overlap < bestOverlap) {
        bestOverlap = overlap;
        bestIdx = i;
      }
    }

    result.push(remaining.splice(bestIdx, 1)[0]);
  }

  return result;
}

module.exports = {
  selectNextCards,
  explorationScore,
  diversityScore,
  tagsToVector,
  CARDS_PER_BATCH,
  MAX_CARDS_PER_PHASE,
  PREFERRED_RATIO,
  EXPLORE_RATIO,
};
