const { generateWithRetry } = require('./geminiAuth');

/**
 * Generate a personalized reason for why a destination was recommended
 * based on the user's top tags.
 * 
 * @param {string} destinationName 
 * @param {{vibes: string[], activities: string[], stays: string[]}} tags 
 * @returns {Promise<string|null>} Response text, or null if it fails
 */
async function generateExplanationWithGemini(destinationName, tags) {
    try {
        const prompt = `You are an enthusiastic AI travel agent.
Your task is to write a short, engaging reason (2-3 sentences, maximum 45 words) explaining why you are recommending ${destinationName} to the user.

Base your reasoning on these specific tags that the user liked:
Vibes: ${(tags.vibes || []).join(', ')}
Activities: ${(tags.activities || []).join(', ')}
Stays: ${(tags.stays || []).join(', ')}

Do not list the tags formatting like a list, just weave them naturally into an exciting paragraph. Speak directly to the user (e.g., "You'll love...", "This is perfect for your..."). Ensure the explanation highlights how ${destinationName} perfectly matches these preferences.`;

        const result = await generateWithRetry('gemini-2.5-flash', [{ text: prompt }]);
        return result.response.text().trim();
    } catch (error) {
        console.error('Error generating explanation with Gemini:', error.message || error);
        return null;
    }
}

/**
 * Get the current season based on travel dates and hemisphere
 * @param {Date} travelDate 
 * @param {string} country 
 * @returns {string}
 */
function getSeason(travelDate, country) {
    const month = travelDate.getMonth(); // 0-11
    const southernHemisphere = ['Australia', 'New Zealand', 'South Africa', 'Argentina', 'Chile', 'Brazil'].includes(country);
    
    let season;
    if (month >= 2 && month <= 4) season = southernHemisphere ? 'autumn' : 'spring';
    else if (month >= 5 && month <= 7) season = southernHemisphere ? 'winter' : 'summer';
    else if (month >= 8 && month <= 10) season = southernHemisphere ? 'spring' : 'autumn';
    else season = southernHemisphere ? 'summer' : 'winter';
    
    return season;
}

/**
 * Get travel style description from budget and preferences
 * @param {number} budget 
 * @param {string[]} stayTags 
 * @returns {string}
 */
function getTravelStyle(budget, stayTags = []) {
    const stayString = stayTags.join(' ').toLowerCase();
    
    if (stayString.includes('luxury') || stayString.includes('premium') || budget >= 500000) {
        return 'luxury';
    } else if (stayString.includes('hostel') || stayString.includes('backpack') || budget < 100000) {
        return 'budget/backpacking';
    } else if (budget >= 200000) {
        return 'comfortable';
    }
    return 'mid-range';
}

/**
 * Generate a complete day-by-day itinerary using Gemini AI
 * 
 * @param {Object} params
 * @param {string} params.destinationName - City name
 * @param {string} params.country - Country name
 * @param {number} params.durationDays - Number of days
 * @param {string[]} params.vibes - User's travel vibes (e.g., ['Adventure', 'Nature', 'Mountains'])
 * @param {string[]} params.activities - User's preferred activities (e.g., ['Hiking', 'Photography', 'Wildlife'])
 * @param {string[]} params.stays - User's stay preferences (e.g., ['Eco Lodge', 'Boutique Hotel'])
 * @param {number} params.budget - Total trip budget in INR
 * @param {number} params.travelers - Number of travelers
 * @param {string} params.travelDates - Approximate travel dates (e.g., "March 2026")
 * @param {number} params.activitiesBudget - Budget allocated for activities
 * @returns {Promise<Object[]|null>} Array of day plans or null if generation fails
 */
async function generateItineraryWithGemini({
    destinationName,
    country,
    durationDays,
    vibes,
    activities,
    stays,
    budget,
    travelers,
    travelDates,
    activitiesBudget,
}) {
    try {
        const travelDate = new Date(travelDates || Date.now());
        const season = getSeason(travelDate, country);
        const travelStyle = getTravelStyle(budget, stays);
        const perDayBudget = Math.round(activitiesBudget / durationDays);
        const monthName = travelDate.toLocaleString('en-US', { month: 'long' });

        const primaryTags = [...(vibes || []).slice(0, 3), ...(activities || []).slice(0, 3)].join(', ') || 'none';

        const prompt = `Create a ${durationDays}-day itinerary for ${destinationName}, ${country}.
Traveler profile: ${travelStyle} style, ${travelers} traveler(s), ${monthName} (${season}), ₹${budget.toLocaleString()} total budget (~₹${perDayBudget.toLocaleString()}/day for activities).
Vibes: ${vibes.join(', ') || 'flexible'}. Activities: ${activities.join(', ') || 'open'}. Stay: ${stays.join(', ') || 'flexible'}.
User's PRIMARY interest tags (most important): ${primaryTags}.

Rules:
- 3-5 items/day in the "items" array. Day 1 = arrival, last day = departure.
- Mix must-see landmarks with profile-matching experiences.
- Time slots: morning 09:00-12:00, afternoon 12:00-17:00, evening 17:00-21:00. Costs in INR. Estimate realistic per-person costs (e.g. entry tickets, average meal prices, activity fees). Do NOT default to 0 unless it is a genuinely free public space.
- EVERY day MUST include a "mustDo" object — one iconic, bucket-list place/experience for that destination.
- CRITICAL PROXIMITY: the mustDo MUST be geographically close to the day's other items (same neighbourhood/zone). Do NOT pick something on the opposite side of the city.
- "alignsWithPreferences": Set to TRUE only when the mustDo DIRECTLY and STRONGLY matches the user's PRIMARY interest tags (listed above). A generic tourist landmark (e.g., a famous cathedral, old town square, panoramic viewpoint) does NOT qualify simply because it is popular — it must align with who this specific traveler is. EXPECT 40-60% of days to be FALSE. Do NOT default to true.
- Each description MUST be exactly 1 short sentence.

CRITICAL: Return ONLY a raw JSON array, no markdown, no extra text.

[{"day":1,"title":"Day title","mustDo":{"time":"12:00","activity":"Famous Landmark","description":"One sentence why it is unmissable.","cost":500,"type":"activity","alignsWithPreferences":false,"tags":["iconic","cultural"]},"items":[{"time":"09:00","activity":"Name","description":"One sentence only.","cost":500,"type":"activity|food|travel|relax|shopping"}]}]`;


        const result = await generateWithRetry('gemini-2.5-flash', [{ text: prompt }]);
        let responseText = result.response.text().trim();

        // Clean up - remove markdown code blocks if present
        responseText = responseText
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();

        const itinerary = JSON.parse(responseText);

        if (!Array.isArray(itinerary) || itinerary.length === 0) {
            console.error('Invalid itinerary structure from Gemini');
            return null;
        }

        console.log(`✅ Gemini generated ${itinerary.length}-day itinerary for ${destinationName}`);
        return itinerary;

    } catch (error) {
        console.error('Error generating itinerary with Gemini:', error.message || error);
        return null;
    }
}

module.exports = {
    generateExplanationWithGemini,
    generateItineraryWithGemini,
    getSeason,
    getTravelStyle,
};
