/**
 * Scoring & Recommendation Engine v2
 * - Multi-vector cosine similarity (vibes 50%, activities 30%, stays 20%)
 * - Position decay: later cards carry more weight
 * - Swipe speed: fast swipes = lower confidence
 * - Tag frequency normalization: rare tags get boosted
 * - Itinerary personalization: reorder activities by preference match
 */

const ALPHA = 1.0;   // weight for LIKE
const BETA = 0.5;    // penalty for DISLIKE
const SAVE_BOOST = 1.8; // wishlist save = strongest signal (nearly 2x a normal like)

// Multi-vector weights
const VIBE_WEIGHT = 0.50;
const ACTIVITY_WEIGHT = 0.30;
const STAY_WEIGHT = 0.20;

/**
 * Compute cosine similarity between two tag vectors (Maps or plain objects)
 */
function cosineSimilarity(vecA, vecB) {
    const a = vecA instanceof Map ? Object.fromEntries(vecA) : (vecA || {});
    const b = vecB instanceof Map ? Object.fromEntries(vecB) : (vecB || {});

    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    if (allKeys.size === 0) return 0;

    let dotProduct = 0;
    let magA = 0;
    let magB = 0;

    for (const key of allKeys) {
        const valA = a[key] || 0;
        const valB = b[key] || 0;
        dotProduct += valA * valB;
        magA += valA * valA;
        magB += valB * valB;
    }

    if (magA === 0 || magB === 0) return 0;
    return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Count tag frequency across all cards for normalization
 */
function computeTagFrequency(allTags) {
    const freq = {};
    for (const tagSet of allTags) {
        for (const tag of tagSet) {
            freq[tag] = (freq[tag] || 0) + 1;
        }
    }
    return freq;
}

/**
 * Update preference vector with position decay + speed + tag normalization
 * @param {Map} currentVector - current preference scores
 * @param {string[]} tags - tags from the swiped card
 * @param {string} direction - 'LIKE', 'DISLIKE', or 'SAVE'
 * @param {Object} options - { cardIndex, totalCards, swipeDurationMs, tagFrequency }
 */
function updatePreferenceVector(currentVector, tags, direction, options = {}) {
    const vec = new Map(currentVector);
    const { cardIndex = 0, totalCards = 10, swipeDurationMs = 1000, tagFrequency = {}, detailViewed = false } = options;

    // Base delta
    let baseDelta;
    switch (direction) {
        case 'LIKE': baseDelta = ALPHA; break;
        case 'SAVE': baseDelta = SAVE_BOOST; break;
        case 'DISLIKE': baseDelta = -BETA; break;
        default: baseDelta = 0;
    }

    // Position decay: later cards matter more (range 1.0 → 1.5)
    const positionMultiplier = 1.0 + (cardIndex / Math.max(totalCards, 1)) * 0.5;

    // Swipe speed: fast swipe (<400ms) = less confident, slow (>800ms) = full confidence
    const speedMultiplier = swipeDurationMs < 400 ? 0.5 : swipeDurationMs < 800 ? 0.75 : 1.0;

    // Detail view engagement: opening detail before swiping = 1.5x stronger signal
    const engagementMultiplier = detailViewed ? 1.5 : 1.0;

    for (const tag of tags) {
        // Tag frequency normalization: rare tags get boosted
        const freq = tagFrequency[tag] || 1;
        const rarityBoost = 1.0 / Math.sqrt(freq);

        const delta = baseDelta * positionMultiplier * speedMultiplier * rarityBoost * engagementMultiplier;
        const current = vec.get(tag) || 0;
        vec.set(tag, current + delta);
    }

    return vec;
}

/**
 * Multi-vector destination ranking
 * Uses dense embeddings and dot product similarity:
 * 1. Combines user phase vectors (0.5 vibe + 0.3 activity + 0.2 stay)
 * 2. Computes dot product with destination tag embeddings
 * 3. Takes top 10
 * 4. Applies sigmoid scaling and legacy budget/profile modifiers
 */
const { getCardVector, dotProductDense, sigmoidScale, EMBEDDING_DIM } = require('./semanticVector');

function mapToObj(m) {
    if (!m) return {};
    if (typeof m.toJSON === 'function') return m.toJSON();
    if (m instanceof Map) return Object.fromEntries(m);
    return m;
}

function rankDestinations(session, destinations, budget) {
    // 1. Prepare User Vectors
    // In a legacy single-vector scenario where session itself is the map, fallback gracefully.
    const isLegacy = session instanceof Map || (session && !session.userVibeVector && !session.vibeScores);
    
    // Extract base profile components (needed for bonus layer)
    let profileTags = null;
    if (!isLegacy) {
        profileTags = session.profileTags || null;
    }

    // Combine Phase Vectors
    // userVector = 0.5*userVibeVector + 0.3*userActivityVector + 0.2*userStayVector
    let finalUserVector = new Float64Array(EMBEDDING_DIM || 768);
    let hasSemanticData = false;
    
    if (!isLegacy && session.userVibeVector && session.userVibeVector.length > 0) {
        hasSemanticData = true;
        const vVibe = session.userVibeVector;
        const vAct = session.userActivityVector || [];
        const vStay = session.userStayVector || [];
        
        for (let i = 0; i < finalUserVector.length; i++) {
            finalUserVector[i] = 
                (0.5 * (vVibe[i] || 0)) + 
                (0.3 * (vAct[i] || 0)) + 
                (0.2 * (vStay[i] || 0));
        }
    }

    // Support legacy/fallback path if the dense session Arrays are not populated yet
    if (!hasSemanticData) {
        // Fallback directly to cosine logic or just return top results if no semantic data
        // For backwards compatibility we'll just sort them pseudo-randomly for now
        // if no data is available to dot-product against.
    }

    // 2. Build a flat set of all user-curated tags from ProfileDrawer
    const curatedTags = new Set();
    if (profileTags) {
        (profileTags.vibes || []).forEach(t => curatedTags.add(t.toLowerCase()));
        (profileTags.activities || []).forEach(t => curatedTags.add(t.toLowerCase()));
        (profileTags.stays || []).forEach(t => curatedTags.add(t.toLowerCase()));
    }

    // 3. Compute raw dot products for all destinations
    const scoredDests = destinations.map(dest => {
        // Convert destination tags into a unified centroid vector
        const destVector = getCardVector(dest.tags || []);
        
        // Calculate raw dot product
        const rawDot = hasSemanticData ? dotProductDense(finalUserVector, destVector) : 0;
        
        return {
            dest,
            rawDot
        };
    });

    // 4. Sort by highest dot product and take top 10
    scoredDests.sort((a, b) => b.rawDot - a.rawDot);
    const top10 = scoredDests.slice(0, 10);

    // 5. Apply Sigmoid, scaling, and bonuses to the top 10
    const budgetBracket = budget >= 200000 ? 3 : budget >= 100000 ? 2 : 1;
    
    const finalScored = top10.map(({ dest, rawDot }) => {
        // A. Sigmoid scaling. 
        // We divide rawDot by a reasonable term to scale it back so the sigmoid doesn't totally flatten at 1.0.
        // Dot products of embeddings can be wild (e.g. 5.0 to 20.0), so we normalize slightly.
        const scaledDot = rawDot / 10.0; 
        const sigmoidScore = sigmoidScale(scaledDot, 1.2); // yields ~0.5 to 0.99
        
        // B. Convert to baseline score (55 to 99 range roughly mapped from sigmoid 0 to 1)
        // If sigmoidScore goes 0.0 -> 1.0, this goes 55 -> 99
        let score = 0.55 + (sigmoidScore * 0.44);

        // C. Budget alignment bonus/penalty
        const costDiff = Math.abs(dest.costLevel - budgetBracket);
        if (costDiff === 0) {
            score += 0.05; // Was 0.1, adjusted relative to the new [0,1] bounds.
        } else if (costDiff >= 2) {
            score -= 0.10; // Was 0.15
        }

        // D. ProfileTags bonus: reward destinations whose tags overlap with user-curated preferences
        if (curatedTags.size > 0 && dest.tags && dest.tags.length > 0) {
            const destTagsLower = dest.tags.map(t => t.toLowerCase());
            const overlap = destTagsLower.filter(t => curatedTags.has(t)).length;
            const overlapRatio = overlap / Math.max(destTagsLower.length, 1);
            // Bonus up to +0.10 for perfect overlap
            score += overlapRatio * 0.10;
        }

        // E. Normalize to absolute 55–99 integer ceiling
        const matchPercent = Math.min(99, Math.max(55, Math.round(score * 100)));

        return {
            id: dest.destinationId,
            name: dest.name,
            country: dest.country,
            image: dest.image,
            score: matchPercent,
            tags: dest.tags,
            minCost: dest.totalCost,
            description: dest.description,
        };
    });

    // Final sort to make absolutely sure the bonuses didn't jumble the primary ranking
    finalScored.sort((a, b) => b.score - a.score);
    return finalScored;
}

/**
 * Personalize itinerary: reorder activities within each day
 * based on user's activity preference scores
 * - 'travel' type items stay pinned in position
 * - Other items sorted by tag overlap with user preferences
 */
function personalizeItinerary(itinerary, activityScores) {
    const result = JSON.parse(JSON.stringify(itinerary)); // deep clone
    const prefs = activityScores instanceof Map ? Object.fromEntries(activityScores) : (activityScores || {});

    if (!result.days) return result;

    for (const day of result.days) {
        if (!day.items || day.items.length <= 1) continue;

        // Separate pinned (travel) and movable items
        const pinned = [];  // { index, item }
        const movable = [];

        day.items.forEach((item, idx) => {
            if (item.type === 'travel') {
                pinned.push({ index: idx, item });
            } else {
                // Score this item by keyword overlap with activity prefs
                const itemWords = [
                    ...(item.activity || '').toLowerCase().split(/\s+/),
                    ...(item.description || '').toLowerCase().split(/\s+/),
                    item.type || '',
                ];
                let itemScore = 0;
                for (const [tag, weight] of Object.entries(prefs)) {
                    if (itemWords.some(w => w.includes(tag.toLowerCase()) || tag.toLowerCase().includes(w))) {
                        itemScore += weight;
                    }
                }
                movable.push({ index: idx, item, score: itemScore });
            }
        });

        // Sort movable items: highest score → best time slots
        movable.sort((a, b) => b.score - a.score);

        // Reconstruct the items list
        const newItems = new Array(day.items.length);
        // Place pinned items first
        for (const p of pinned) {
            newItems[p.index] = p.item;
        }
        // Fill movable items into remaining empty slots
        let movIdx = 0;
        for (let i = 0; i < newItems.length; i++) {
            if (!newItems[i] && movIdx < movable.length) {
                newItems[i] = movable[movIdx].item;
                movIdx++;
            }
        }
        day.items = newItems.filter(Boolean);
    }

    return result;
}

/**
 * Adjust itinerary costs for traveler count and duration preference
 */
function adjustItineraryCosts(itinerary, travelers, durationPref) {
    const result = JSON.parse(JSON.stringify(itinerary)); // deep clone

    if (result.flights) {
        result.flights = result.flights.map(f => ({
            ...f,
            cost: f.cost * travelers,
        }));
    }

    if (result.hotel) {
        const rooms = Math.ceil(travelers / 2);
        result.hotel.totalCost = Math.round(result.hotel.totalCost * rooms);
    }

    const flightTotal = (result.flights || []).reduce((s, f) => s + f.cost, 0);
    const transferTotal = (result.transfers || []).reduce((s, t) => s + t.cost, 0) * travelers;
    const activityTotal = (result.days || []).reduce((daySum, day) => {
        return daySum + day.items.reduce((itemSum, item) => itemSum + item.cost, 0);
    }, 0) * travelers;

    result.breakdown = {
        flights: flightTotal,
        stay: result.hotel?.totalCost || 0,
        activities: activityTotal,
        transfers: transferTotal,
    };
    result.totalCost = flightTotal + result.breakdown.stay + activityTotal + transferTotal;

    return result;
}

/**
 * Parse string budget like "1.5L", "200000", "50k" to a number.
 * Defaults to 150000 if unparseable or missing.
 */
function parseBudget(budgetStr) {
    if (!budgetStr) return 150000;
    if (typeof budgetStr === 'number') return budgetStr;
    const s = String(budgetStr).toLowerCase().replace(/[^0-9.klm]/g, '');
    let num = 150000;
    if (s.includes('l')) num = parseFloat(s) * 100000;
    else if (s.includes('k')) num = parseFloat(s) * 1000;
    else if (s.includes('m')) num = parseFloat(s) * 1000000;
    else {
        const parsed = parseInt(String(budgetStr).replace(/[^0-9]/g, ''), 10);
        if (!isNaN(parsed) && parsed > 0) num = parsed;
    }
    return Math.max(num, 10000); // at least 10k safety net
}

/**
 * Prune activities explicitly so that total extra costs (activities + transfers) do not exceed the target bucket.
 * Keeps removing the most expensive day items first.
 */
function pruneActivitiesByBudget(itinerary, maxAvailableBudgetForActivities) {
    const result = JSON.parse(JSON.stringify(itinerary));

    // Current cost of activities + transfers
    const getCurrentExtraCost = () => result.breakdown.activities + (result.breakdown.transfers || 0);

    while (getCurrentExtraCost() > maxAvailableBudgetForActivities) {
        let mostExpensive = null;
        let mostExpCoords = null;

        for (let d = 0; d < (result.days || []).length; d++) {
            const day = result.days[d];
            for (let i = 0; i < (day.items || []).length; i++) {
                const item = day.items[i];
                if (item.type !== 'travel' && item.cost > 0) {
                    if (!mostExpensive || item.cost > mostExpensive.cost) {
                        mostExpensive = item;
                        mostExpCoords = { d, i };
                    }
                }
            }
        }

        if (!mostExpCoords) break; // Nothing more to prune

        // Remove the item
        result.days[mostExpCoords.d].items.splice(mostExpCoords.i, 1);
        result.breakdown.activities -= mostExpensive.cost;
        result.totalCost -= mostExpensive.cost;
    }

    return result;
}

/**
 * Generate a "Why it got recommended" explanation for a destination.
 * 
 * For each phase (vibes, activities, stays), compute dot product of each
 * liked tag's embedding with the destination vector, pick top 5 per phase.
 * 
 * @param {Object} session - Session document with likedVibeTags, likedActivityTags, likedStayTags
 * @param {Object} destination - Destination document with tags[]
 * @returns {{ vibes: string[], activities: string[], stays: string[], text: string }}
 */
function generateRecommendationExplanation(session, destination) {
    const { getTagEmbedding, dotProductDense } = require('./semanticVector');

    // Build destination vector
    const destVector = getCardVector(destination.tags || []);

    /**
     * For a given set of liked tags, compute dot product of each tag's 
     * embedding with the destination vector, and return the top N tags.
     */
    function getTopTags(likedTags, topN = 5) {
        if (!likedTags || likedTags.length === 0) return [];

        const scored = likedTags
            .map(tag => {
                const emb = getTagEmbedding(tag);
                if (!emb) return { tag, score: -Infinity };
                const score = dotProductDense(emb, destVector);
                return { tag, score };
            })
            .filter(item => item.score > -Infinity)
            .sort((a, b) => b.score - a.score);

        return scored.slice(0, topN).map(item => item.tag);
    }

    const topVibes = getTopTags(session.likedVibeTags || [], 5);
    const topActivities = getTopTags(session.likedActivityTags || [], 5);
    const topStays = getTopTags(session.likedStayTags || [], 5);

    // Build human-readable fallback text
    const parts = [];
    if (topVibes.length > 0) {
        parts.push(`it matches the vibes of ${topVibes.join(', ')}`);
    }
    if (topActivities.length > 0) {
        parts.push(`it includes activities like ${topActivities.join(', ')}`);
    }
    if (topStays.length > 0) {
        parts.push(`it provides convenient stay options such as ${topStays.join(', ')}`);
    }

    let text = '';
    if (parts.length > 0) {
        text = 'This destination was recommended because ' + parts.join('. It also ') + '.';
    } else {
        text = 'This destination was recommended based on your overall travel preferences.';
    }

    return {
        vibes: topVibes,
        activities: topActivities,
        stays: topStays,
        text, // fallback text if AI generation fails
    };
}

/**
 * Compute the top liked tags for each phase by dot product with user's phase vectors.
 * 
 * For each tag in likedVibeTags: dot(embedding(tag), userVibeVector) → rank → top N
 * Same for activities and stays.
 * 
 * @param {Object} session - Session with likedVibeTags, likedActivityTags, likedStayTags,
 *                           userVibeVector, userActivityVector, userStayVector
 * @param {number} topN - Number of top tags to return per phase (default 5)
 * @returns {{ vibes: string[], activities: string[], stays: string[] }}
 */
function computeTopLikedTags(session, topN = 5) {
    const { getTagEmbedding, dotProductDense } = require('./semanticVector');

    function rankTags(likedTags, userVector) {
        if (!likedTags || likedTags.length === 0 || !userVector || userVector.length === 0) {
            return [];
        }

        const scored = likedTags
            .map(tag => {
                const emb = getTagEmbedding(tag);
                if (!emb) return { tag, score: -Infinity };
                const score = dotProductDense(emb, userVector);
                return { tag, score };
            })
            .filter(item => item.score > -Infinity)
            .sort((a, b) => b.score - a.score);

        return scored.slice(0, topN).map(item => item.tag);
    }

    return {
        vibes: rankTags(session.likedVibeTags || [], session.userVibeVector || []),
        activities: rankTags(session.likedActivityTags || [], session.userActivityVector || []),
        stays: rankTags(session.likedStayTags || [], session.userStayVector || []),
    };
}

module.exports = {
    cosineSimilarity,
    updatePreferenceVector,
    rankDestinations,
    personalizeItinerary,
    adjustItineraryCosts,
    parseBudget,
    pruneActivitiesByBudget,
    computeTagFrequency,
    generateRecommendationExplanation,
    computeTopLikedTags,
    ALPHA,
    BETA,
    SAVE_BOOST,
    VIBE_WEIGHT,
    ACTIVITY_WEIGHT,
    STAY_WEIGHT,
};
