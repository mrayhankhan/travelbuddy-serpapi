/**
 * Semantic Vector Engine
 * 
 * Provides dense-vector operations for the adaptive card ordering system:
 * - Loads pre-computed 768-dim tag embeddings from tagEmbeddings.json
 * - Converts cards to dense vectors by averaging their tag embeddings
 * - Cosine similarity between dense float arrays
 * - Leaky-integrator user-vector updates (decay 0.8, like +1.0, dislike -0.5)
 */

const path = require('path');

// ── Load tag embeddings once at module init ─────────────────────────────
const embeddingsPath = path.resolve(__dirname, '..', '..', '..', 'tagEmbeddings.json');
let TAG_EMBEDDINGS = {};
let EMBEDDING_DIM = 768;

try {
    TAG_EMBEDDINGS = require(embeddingsPath);
    const keys = Object.keys(TAG_EMBEDDINGS);
    if (keys.length > 0) {
        EMBEDDING_DIM = TAG_EMBEDDINGS[keys[0]].length;
    }
    console.log(`✅ Loaded ${keys.length} tag embeddings (dim=${EMBEDDING_DIM})`);
} catch (err) {
    console.warn('⚠️ Could not load tagEmbeddings.json:', err.message);
}

// Build a lowercase lookup map for fuzzy matching (e.g., "5-Star" → "5-Stars")
const EMBEDDING_LOOKUP = {};
for (const [tag, vec] of Object.entries(TAG_EMBEDDINGS)) {
    EMBEDDING_LOOKUP[tag.toLowerCase()] = vec;
}

// ── Constants ───────────────────────────────────────────────────────────
const DECAY_FACTOR = 0.8;
const LIKE_WEIGHT = 1.0;
const DISLIKE_WEIGHT = -0.5;

/**
 * Look up the embedding for a tag, with fuzzy fallback.
 * Returns null if not found.
 */
function getTagEmbedding(tag) {
    // Exact match
    if (TAG_EMBEDDINGS[tag]) return TAG_EMBEDDINGS[tag];
    // Lowercase match
    const lower = tag.toLowerCase();
    if (EMBEDDING_LOOKUP[lower]) return EMBEDDING_LOOKUP[lower];
    // Fuzzy: try adding/removing trailing 's'
    if (EMBEDDING_LOOKUP[lower + 's']) return EMBEDDING_LOOKUP[lower + 's'];
    if (lower.endsWith('s') && EMBEDDING_LOOKUP[lower.slice(0, -1)]) {
        return EMBEDDING_LOOKUP[lower.slice(0, -1)];
    }
    return null;
}

/**
 * Compute a dense vector for a card by averaging its tag embeddings.
 * Returns a Float64Array of length EMBEDDING_DIM, or a zero vector if no tags match.
 */
function getCardVector(tags) {
    const vec = new Float64Array(EMBEDDING_DIM);
    if (!tags || tags.length === 0) return Array.from(vec);

    let matched = 0;
    for (const tag of tags) {
        const emb = getTagEmbedding(tag);
        if (emb) {
            for (let i = 0; i < EMBEDDING_DIM; i++) {
                vec[i] += emb[i];
            }
            matched++;
        }
    }

    if (matched > 0) {
        for (let i = 0; i < EMBEDDING_DIM; i++) {
            vec[i] /= matched;
        }
    }

    return Array.from(vec);
}

/**
 * Cosine similarity between two dense float arrays.
 */
function cosineSimilarityDense(vecA, vecB) {
    if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0;
    const len = Math.min(vecA.length, vecB.length);

    let dot = 0, magA = 0, magB = 0;
    for (let i = 0; i < len; i++) {
        const a = vecA[i] || 0;
        const b = vecB[i] || 0;
        dot += a * b;
        magA += a * a;
        magB += b * b;
    }

    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Raw Dot product between two dense float arrays.
 */
function dotProductDense(vecA, vecB) {
    if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0;
    const len = Math.min(vecA.length, vecB.length);

    let dot = 0;
    for (let i = 0; i < len; i++) {
        dot += (vecA[i] || 0) * (vecB[i] || 0);
    }
    return dot;
}

/**
 * Sigmoid scaling function for top 10 bounds.
 * Modifies an input raw score based on the mathematical curve.
 * 1 / (1 + e^-x) - Can be scaled or shifted as needed.
 */
function sigmoidScale(x, k = 1.2) {
    // A standard sigmoid wrapper, scaling input by 'k' to adjust curve steepness
    return 1 / (1 + Math.exp(-k * x));
}

/**
 * Leaky-integrator update for the user preference vector.
 * 
 * newVec = decay * currentVec + finalWeight * cardVec
 * 
 * finalWeight = baseWeight * Weng * Wspeed * positionalDecay
 * 
 * - baseWeight:      LIKE = +1.0, DISLIKE = -0.5, SAVE = +1.5
 * - Weng:            1.5 if user opened detail view, else 1.0
 * - Wspeed:          0.5 if <400ms, 0.75 if 400–800ms, 1.0 if >800ms
 * - positionalDecay: 1 + 0.5 * (cardIndex / max(1, totalCards))
 * 
 * @param {number[]} currentVec - current user vector (may be empty)
 * @param {number[]} cardVec - dense vector for the swiped card
 * @param {string} direction - 'LIKE', 'DISLIKE', or 'SAVE'
 * @param {Object} options - optional modifiers
 * @param {number} [options.cardIndex=0] - 0-based index of the swiped card
 * @param {number} [options.totalCards=10] - total cards in the current phase
 * @param {number} [options.swipeDurationMs=1000] - time user spent before swiping
 * @param {boolean} [options.detailViewed=false] - whether user opened detail view
 * @param {number} [options.decay] - decay factor override (default 0.8)
 * @returns {number[]} updated user vector
 */
function updateUserVector(currentVec, cardVec, direction, options = {}) {
    const {
        cardIndex = 0,
        totalCards = 10,
        swipeDurationMs = 1000,
        detailViewed = false,
        decay = DECAY_FACTOR,
    } = options;

    // Determine base weight from swipe direction
    let baseWeight;
    switch (direction) {
        case 'LIKE': baseWeight = LIKE_WEIGHT; break;
        case 'SAVE': baseWeight = LIKE_WEIGHT * 1.5; break;  // Save = stronger like
        case 'DISLIKE': baseWeight = DISLIKE_WEIGHT; break;
        default: baseWeight = 0;
    }

    // Engagement weight: detail view = stronger signal
    const Weng = detailViewed ? 1.5 : 1.0;

    // Speed weight: fast swipes = lower confidence
    const Wspeed = swipeDurationMs < 400 ? 0.5 : swipeDurationMs < 800 ? 0.75 : 1.0;

    // Positional decay: later cards carry more weight (range 1.0 → 1.5)
    const positionalDecay = 1.0 + 0.5 * (cardIndex / Math.max(1, totalCards));

    const finalWeight = baseWeight * Weng * Wspeed * positionalDecay;

    const dim = cardVec.length || EMBEDDING_DIM;

    // If user has no vector yet, initialize from the card vector
    if (!currentVec || currentVec.length === 0) {
        return cardVec.map(v => finalWeight * v);
    }

    // Leaky integrator: decay old preferences, add new signal
    const result = new Array(dim);
    for (let i = 0; i < dim; i++) {
        result[i] = decay * (currentVec[i] || 0) + finalWeight * (cardVec[i] || 0);
    }
    return result;
}

/**
 * Check if a user vector has meaningful signal (not all zeros).
 */
function hasSignal(userVector) {
    if (!userVector || userVector.length === 0) return false;
    return userVector.some(v => Math.abs(v) > 1e-9);
}

module.exports = {
    getCardVector,
    getTagEmbedding,
    cosineSimilarityDense,
    updateUserVector,
    hasSignal,
    dotProductDense,
    sigmoidScale,
    EMBEDDING_DIM,
    DECAY_FACTOR,
    LIKE_WEIGHT,
    DISLIKE_WEIGHT,
};
