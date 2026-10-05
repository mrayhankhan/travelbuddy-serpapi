const express = require('express');
const router = express.Router();
const { generateWithRetry } = require('../lib/geminiAuth');

/**
 * Cleans a Gemini JSON response string and parses it.
 */
function parseGeminiJson(raw) {
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  return JSON.parse(cleaned);
}

/**
 * Build a descriptive travel window string for the prompt.
 */
function describeTravelWindow(window) {
  const map = {
    'within-7-days': 'within the next 7 days (imminent trip)',
    'within-1-month': 'within the next month',
    'within-3-months': 'within the next 3 months',
    'within-6-months': 'within the next 6 months',
  };
  return map[window] || 'within the next few months';
}

/**
 * Extract numeric day count from labels like:
 * - "3 Days, 2 Nights"
 * - "3 days / 2 nights"
 */
function extractDayCount(durationText) {
  if (!durationText || typeof durationText !== 'string') return null;
  const match = durationText.match(/(\d+)\s*day/i);
  if (!match) return null;
  const days = Number(match[1]);
  return Number.isFinite(days) && days > 0 ? days : null;
}

/**
 * Keep itinerary day content aligned to the stated duration.
 */
function normalizeItineraryDays(itinerary) {
  const expectedDays = extractDayCount(itinerary?.duration);
  if (!expectedDays || !Array.isArray(itinerary?.days)) return itinerary;

  const normalizedDays = itinerary.days.slice(0, expectedDays).map((d, idx) => ({
    ...d,
    day: idx + 1,
  }));

  return {
    ...itinerary,
    days: normalizedDays,
  };
}

/**
 * POST /api/itineraries/generate-multi
 * ─────────────────────────────────────────────────────────────────────────────
 * STEP 1 — Lightweight feed.
 * Returns 3 high-level itinerary summaries (NO flights / hotel / days).
 * Designed to respond in < 15 seconds.
 */
router.post('/generate-multi', async (req, res) => {
  console.log('\n[API ENTRY] POST /api/itineraries/generate-multi (lightweight)');
  try {
    const {
      departureCity = 'New Delhi',
      duration = '5-7',
      budget = 300000,
      travelers = 2,
      intendedTravelWindow = 'within-1-month',
      profileTags = {},
      variation = 0,
    } = req.body;

    const vibes = (profileTags.vibes || []).slice(0, 5).join(', ') || 'flexible';
    const activities = (profileTags.activities || []).slice(0, 5).join(', ') || 'open to all';
    const stays = (profileTags.stays || []).slice(0, 5).join(', ') || 'flexible';
    const travelWindowText = describeTravelWindow(intendedTravelWindow);

    const durationLabel = {
      '3-5': '4 days / 3 nights',
      '5-7': '6 days / 5 nights',
      '7-10': '8 days / 7 nights',
    }[duration] || '5 days / 4 nights';

    const variationHint = variation > 0
      ? `IMPORTANT: This is regeneration attempt #${variation}. Choose COMPLETELY DIFFERENT European destinations from any previous response. Diversify across different European countries and regions (e.g. Southern, Western, Eastern Europe, Nordic).`
      : 'Choose 3 destinations spread across different European countries and regions.';

    const prompt = `You are a concise AI travel advisor specializing in European trips from India.

${variationHint}

Generate exactly 3 high-level European trip concepts for the following traveler:

TRAVELER PROFILE:
- Departure city: ${departureCity}, India
- Trip duration: ${durationLabel}
- Total budget: ₹${Number(budget).toLocaleString()} INR (for all ${travelers} traveler${travelers > 1 ? 's' : ''} combined)
- Travel window: ${travelWindowText}
- Travel vibes: ${vibes}
- Preferred activities: ${activities}
- Stay preferences: ${stays}

CRITICAL CONSTRAINT: ALL 3 destinations MUST be in Europe only (France, Italy, Spain, Portugal, Greece, Germany, Netherlands, Czech Republic, Austria, Switzerland, Croatia, Norway, Sweden, Iceland, Hungary, Poland, Scotland, Ireland, etc.)

REQUIREMENTS:
1. Vary the 3 destinations across different European countries
2. Estimate costs realistically (long-haul flights from ${departureCity} + hotel + activities + transfers)
3. matchScore must reflect how well the destination matches the traveler vibes/activities/stays (range 70–98)

OUTPUT FORMAT — Return ONLY a valid JSON array with NO markdown, NO code blocks, NO extra text:

[
  {
    "destination": "City Name",
    "country": "Country",
    "duration": "${durationLabel}",
    "matchScore": 88,
    "totalCost": 195000,
    "shortDescription": "2-sentence punchy description of why this trip is perfect for this traveler.",
    "breakdown": {
      "flights": 95000,
      "stay": 60000,
      "activities": 25000,
      "transfers": 15000
    }
  }
]

Return exactly 3 objects. Do NOT include hotel details, flight schedules, transfers, or day-by-day plans.`;

    console.log(`🤖 Calling Gemini for 3 lightweight itinerary summaries (variation=${variation})...`);
    const result = await generateWithRetry('gemini-2.5-flash', [{ text: prompt }]);
    const rawText = result.response.text().trim();

    let itineraries;
    try {
      itineraries = parseGeminiJson(rawText);
    } catch (parseErr) {
      console.error('❌ Failed to parse Gemini JSON:', parseErr.message);
      console.error('Raw response snippet:', rawText.substring(0, 500));
      return res.status(500).json({ error: 'Failed to parse AI response', details: parseErr.message });
    }

    if (!Array.isArray(itineraries) || itineraries.length === 0) {
      return res.status(500).json({ error: 'AI returned empty or invalid itineraries' });
    }

    
        // Clamp to 3
        itineraries = itineraries.slice(0, 3);

        // Ensure totalCost is populated from breakdown if missing
        itineraries = itineraries.map((it) => {
            const normalized = normalizeItineraryDays(it);
            return {
                ...normalized,
                totalCost: normalized.totalCost || Object.values(normalized.breakdown || {}).reduce((a, b) => a + b, 0),
                budget: Number(budget),
            };
        });

        console.log(`✅ Returning ${itineraries.length} lightweight itinerary summaries`);
        res.json(itineraries);
    } catch (err) {
      console.error('Multi-itinerary generation error:', err.message || err);
      res.status(500).json({ error: 'Failed to generate itineraries', details: err.message });
    }
  });

/**
 * POST /api/itineraries/generate-details
 * ─────────────────────────────────────────────────────────────────────────────
 * STEP 2 — Deep dive for a single chosen destination.
 * Uses PARALLEL Gemini calls (Promise.all) to halve generation time:
 *   • Call A (Logistics) → hotel, flights, transfers
 *   • Call B (Planner)   → full day-by-day plan
 */
router.post('/generate-details', async (req, res) => {
  console.log('\n[API ENTRY] POST /api/itineraries/generate-details (parallel)');
  try {
    const {
      destination,
      country,
      duration = '5-7',
      budget = 300000,
      travelers = 2,
      departureCity = 'New Delhi',
      profileTags = {},
    } = req.body;

    if (!destination || !country) {
      return res.status(400).json({ error: 'destination and country are required' });
    }

    const vibes = (profileTags.vibes || []).slice(0, 5).join(', ') || 'flexible';
    const activities = (profileTags.activities || []).slice(0, 5).join(', ') || 'open to all';
    const stays = (profileTags.stays || []).slice(0, 5).join(', ') || 'flexible';

    const durationLabel = {
      '3-5': '4 days / 3 nights',
      '5-7': '6 days / 5 nights',
      '7-10': '8 days / 7 nights',
    }[duration] || '5 days / 4 nights';

    const nights = parseInt(durationLabel.split('/')[1]) || 4;
    const numDays = parseInt(durationLabel.split('/')[0]) || 5;

    // ── PROMPT A: Logistics (hotel, flights, transfers) ───────────────────
    const logisticsPrompt = `You are a travel logistics expert. Generate realistic logistics for ONE specific trip.

TRIP:
- Destination: ${destination}, ${country}
- Departure: ${departureCity}, India
- Duration: ${durationLabel}
- Budget: ₹${Number(budget).toLocaleString()} INR for ${travelers} traveler${travelers > 1 ? 's' : ''}
- Stay preferences: ${stays}

Return ONLY valid JSON (NO markdown, NO code blocks, NO extra text) with this EXACT structure:

{
  "hotel": {
    "name": "Hotel Name",
    "rating": 4,
    "location": "Neighbourhood, ${destination}",
    "distanceToCenter": "0.8 km",
    "totalCost": 60000,
    "image": "https://images.unsplash.com/photo-REAL_PHOTO_ID?w=400&q=80",
    "nights": ${nights}
  },
  "flights": [
    {
      "type": "departure",
      "airline": "Airline Name",
      "flightNo": "XX 123",
      "from": "DEL",
      "to": "DEST_IATA",
      "departure": "22:00",
      "arrival": "06:30 +1",
      "duration": "8h 30m",
      "cost": 47500
    },
    {
      "type": "return",
      "airline": "Airline Name",
      "flightNo": "XX 124",
      "from": "DEST_IATA",
      "to": "DEL",
      "departure": "14:00",
      "arrival": "01:30 +1",
      "duration": "9h",
      "cost": 47500
    }
  ],
  "transfers": [
    { "from": "Airport", "to": "Hotel", "type": "Taxi", "cost": 2500 },
    { "from": "Hotel", "to": "Airport", "type": "Taxi", "cost": 2500 }
  ]
}

Rules:
- Use the real IATA airport code for ${destination}
- All costs in INR, realistic for flights from ${departureCity} to Europe
- Use a real Unsplash hotel photo URL with a valid photo ID`;

    // ── PROMPT B: Planner (full day-by-day schedule) ──────────────────────
    const plannerPrompt = `You are a creative travel day-planner. Build a detailed day-by-day itinerary for ONE trip.

TRIP:
- Destination: ${destination}, ${country}
- Duration: ${durationLabel} (${numDays} full days)
- Travel vibes: ${vibes}
- Preferred activities: ${activities}
- Traveler profile tags (vibes + activities + stays): ${[...((profileTags.vibes)||[]), ...((profileTags.activities)||[]), ...((profileTags.stays)||[])].join(', ') || 'none'}

Return ONLY valid JSON (NO markdown, NO code blocks, NO extra text) with this EXACT structure:

{
  "days": [
    {
      "day": 1,
      "title": "Arrival & First Impressions",
      "mustDo": {
        "activity": "Eiffel Tower",
        "description": "Paris's most iconic landmark — truly unmissable.",
        "cost": 2500,
        "type": "activity",
        "alignsWithPreferences": true,
        "tags": ["iconic", "cultural", "sightseeing"]
      },
      "items": [
        { "time": "14:00", "activity": "Arrive & check in", "description": "Settle into hotel, freshen up", "cost": 0, "type": "travel" },
        { "time": "17:00", "activity": "Evening walk", "description": "Explore the neighbourhood", "cost": 0, "type": "activity" },
        { "time": "20:00", "activity": "Welcome dinner", "description": "Local cuisine restaurant", "cost": 3000, "type": "food" }
      ]
    }
  ]
}

Rules:
- EXACTLY ${numDays} day objects (day 1 through day ${numDays})
- Each day must have 3–5 items with realistic times
- Costs in INR, types from: travel | activity | food | hotel
- Tailor activities specifically to the traveler's vibes and activities preferences
- Make each day title descriptive and unique
- EVERY day MUST have a "mustDo" object — this is a single iconic, bucket-list place or experience for that destination
- CRITICAL PROXIMITY RULE: the mustDo MUST be geographically close to the day's other items — do NOT recommend something on the other side of the city
- Set "alignsWithPreferences" to true ONLY if the mustDo activity or its tags overlap with the traveler's profile tags listed above; otherwise set it to false
- The mustDo cost must be realistic in INR for visiting that place`;

    console.log(`🤖 Firing PARALLEL Gemini calls for ${destination} (logistics + planner)...`);

    // ── Fire both calls simultaneously ────────────────────────────────────
    const [logisticsResult, plannerResult] = await Promise.all([
      generateWithRetry('gemini-2.5-flash', [{ text: logisticsPrompt }]),
      generateWithRetry('gemini-2.5-flash', [{ text: plannerPrompt }]),
    ]);

    // ── Parse logistics ───────────────────────────────────────────────────
    let parsedLogistics;
    try {
      parsedLogistics = parseGeminiJson(logisticsResult.response.text().trim());
    } catch (parseErr) {
      console.error('❌ Failed to parse LOGISTICS JSON:', parseErr.message);
      throw new Error(`Logistics parsing failed: ${parseErr.message}`);
    }

    // ── Parse planner ─────────────────────────────────────────────────────
    let parsedPlanner;
    try {
      parsedPlanner = parseGeminiJson(plannerResult.response.text().trim());
    } catch (parseErr) {
      console.error('❌ Failed to parse PLANNER JSON:', parseErr.message);
      throw new Error(`Planner parsing failed: ${parseErr.message}`);
    }

    // ── Merge into the single expected shape & respond ────────────────────
    const merged = {
      ...parsedLogistics,
      days: parsedPlanner.days ?? [],
    };

    console.log(`✅ Parallel details ready for ${destination} (${merged.days?.length ?? 0} days)`);
    res.json(merged);

  } catch (err) {
    console.error('Itinerary details generation error:', err.message || err);
    res.status(500).json({ error: 'Failed to generate itinerary details', details: err.message });
  }
});

module.exports = router;
