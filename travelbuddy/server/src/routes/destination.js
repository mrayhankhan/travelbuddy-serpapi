const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const Destination = require('../models/Destination');
const { rankDestinations, adjustItineraryCosts, personalizeItinerary, parseBudget, pruneActivitiesByBudget, generateRecommendationExplanation } = require('../lib/scoring');
const { searchHotels, getDatesForDuration, getLiveFlights, AIRPORT_CODE_MAP } = require('../lib/hotelApi');
const { resolveOrigin, CITY_TO_IATA } = require('../lib/geocoder');
const { generateExplanationWithGemini, generateItineraryWithGemini } = require('../lib/gemini');
const cityCodeMap = require('../lib/cityCodeMap');

// POST /api/destinations/shortlist — Get ranked destinations based on preferences
router.post('/shortlist', async (req, res) => {
    console.log(`\n[API ENTRY] POST /api/destinations/shortlist - sessionId:`, req.body.sessionId);
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: 'Missing sessionId' });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const allDestinations = await Destination.find().lean();

        // ⚠️  IMPORTANT: Only show cities verified to have BOTH HotelAPI Hotel API + Air API
        // Source: server/hotelApi_verification_report.json (bothAvailable: true)
        const HotelAPI_VALID_CITIES = new Set([
            'reykjavik','tallinn','bergen','helsinki','prague','istanbul','vienna',
            'lisbon','copenhagen','barcelona','paris','london','nice','milan','lyon',
            'thessaloniki','glasgow','stockholm','oslo','berlin','brussels','warsaw',
            'split','vilnius','manchester','izmir','corfu','tenerife','faro',
            'marseille','frankfurt','dusseldorf','verona','wroclaw','belgrade',
            'paphos','varna','clujnapoca'
        ]);
        const destinations = allDestinations.filter(d =>
            HotelAPI_VALID_CITIES.has((d.destinationId || '').toLowerCase().replace(/[^a-z]/g, ''))
        );

        // Multi-vector ranking: vibes (50%) + activities (30%) + stays (20%)
        const shortlist = rankDestinations(session, destinations, session.budget);

        // Persist shortlist for returning users
        session.savedShortlist = shortlist;
        await session.save();

        res.json(shortlist);
    } catch (err) {
        console.error('Shortlist error:', err);
        res.status(500).json({ error: 'Failed to generate shortlist' });
    }
});

// POST /api/destinations/itinerary/generate — Generate full itinerary for a destination
router.post('/itinerary/generate', async (req, res) => {
    console.log(`\n[API ENTRY] POST /api/destinations/itinerary/generate - dest:`, req.body.destinationId);
    try {
        const { sessionId, destinationId } = req.body;

        if (!sessionId || !destinationId) {
            return res.status(400).json({ error: 'Missing sessionId or destinationId' });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const destination = await Destination.findOne({ destinationId }).lean();
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        // Build the base itinerary from seed data
        const baseItinerary = {
            destination: destination.name,
            country: destination.country,
            duration: destination.duration,
            image: destination.image,
            totalCost: destination.totalCost,
            breakdown: destination.breakdown,
            flights: destination.flights,
            hotel: destination.hotel,   // default: seed hotel (fallback)
            transfers: destination.transfers,
            days: destination.days,
        };

        // Scale costs by traveler count
        const adjusted = adjustItineraryCosts(baseItinerary, session.travelers, session.duration);

        // ── Parse Budget & Calculate 50/30/20 constraints ──
        const userBudget = parseBudget(session.budget);
        adjusted.budget = userBudget;
        const targetFlightBudget = userBudget * 0.50;
        const targetHotelBudget = userBudget * 0.30;
        const targetActivitiesBudget = userBudget * 0.20;

        // ── SMART FLIGHT ROUTING: Resolve departure city ──────────────────────
        const resolved = await resolveOrigin(session.departureCity);
        console.log(`🛫 Origin resolved:`, JSON.stringify(resolved));

        const { checkIn, checkOut } = getDatesForDuration(session.duration);
        const rooms = Math.ceil(session.travelers / 2);
        const adultCount = session.adults || session.travelers || 1;
        const childCount = session.children || 0;
        const totalPax = adultCount + childCount;

        // ── PRE-COMPUTE all Gemini inputs (synchronous — no network needed) ───
        const durationMap = { '3-5': 4, '5-7': 6, '7-10': 8 };
        const durationDays = durationMap[session.duration] || 5;

        const getTopTags = (scoresMap) => {
            if (!scoresMap || scoresMap.size === 0) return [];
            return [...scoresMap.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([tag]) => tag);
        };

        const topVibes = session.likedVibeTags?.length > 0
            ? session.likedVibeTags.slice(0, 5)
            : getTopTags(session.vibeScores);
        const topActivities = session.likedActivityTags?.length > 0
            ? session.likedActivityTags.slice(0, 5)
            : getTopTags(session.activityScores);
        const topStays = session.likedStayTags?.length > 0
            ? session.likedStayTags.slice(0, 5)
            : getTopTags(session.stayScores);

        const travelDates = checkIn
            ? new Date(checkIn).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        // Pre-compute the rule-based explanation object (sync, no network)
        const explanation = generateRecommendationExplanation(session, destination);

        const userPreferences = {
            likedStays: session.likedStays || [],
            stayScores: session.stayScores ? Object.fromEntries(session.stayScores) : {},
            likedVibes: session.likedVibes || [],
            vibeScores: session.vibeScores ? Object.fromEntries(session.vibeScores) : {},
        };

        console.log(`🚀 Firing ALL 4 heavy API calls in parallel (HotelAPI Hotels, HotelAPI Flights, Gemini Itinerary, Gemini Explanation)...`);
        console.log(`   User profile: Vibes=[${topVibes.slice(0,3).join(', ')}] Activities=[${topActivities.slice(0,3).join(', ')}] Stays=[${topStays.slice(0,3).join(', ')}]`);
        console.log(`   Trip: ${durationDays} days, ${session.travelers} travelers, ₹${userBudget.toLocaleString()} budget, ${travelDates}`);

        // ── PARALLEL FAN-OUT: all 4 heavy network calls fire simultaneously ────
        // Each has its own .catch() so a single failure never aborts Promise.all.
        const [hotelApiHotel, directFlights, aiItinerary, aiExplanationText] = await Promise.all([
            searchHotels(
                destination.name, checkIn, checkOut, rooms, totalPax, targetHotelBudget, userPreferences
            ).catch(err => {
                console.warn(`⚠️  HotelAPI Hotels failed: ${err.message}`);
                return null;
            }),

            getLiveFlights(
                resolved.originCode, destination.name, checkIn, checkOut, adultCount, childCount, targetFlightBudget
            ).catch(err => {
                console.warn(`⚠️  HotelAPI Flights failed: ${err.message}`);
                return null;
            }),

            generateItineraryWithGemini({
                destinationName: destination.name,
                country: destination.country,
                durationDays,
                vibes: topVibes,
                activities: topActivities,
                stays: topStays,
                budget: userBudget,
                travelers: session.travelers,
                travelDates,
                activitiesBudget: targetActivitiesBudget,
            }).catch(err => {
                console.warn(`⚠️  Gemini itinerary failed: ${err.message}`);
                return null;
            }),

            generateExplanationWithGemini(destination.name, explanation).catch(err => {
                console.warn(`⚠️  Gemini explanation failed: ${err.message}`);
                return null;
            }),
        ]);

        console.log(`✅ Parallel fan-out complete.`);

        // ── Inject HotelAPI Hotel result ────────────────────────────────────────────
        if (hotelApiHotel) {
            adjusted.hotel = hotelApiHotel;
            if (hotelApiHotel.totalCost) {
                adjusted.breakdown.stay = hotelApiHotel.totalCost;
            }
            console.log(`✅  Live HotelAPI hotel injected: ${hotelApiHotel.name}`);
        } else {
            console.log(`⚠️  HotelAPI hotel unavailable — using seed data for ${destination.name}`);
        }

        // ── Smart flight routing (multi-leg fallback logic preserved) ─────────
        let finalFlights = directFlights;

        if (finalFlights && finalFlights.length > 0) {
            // ✅ Direct flights found from user's city!
            adjusted.flights = finalFlights;
            adjusted.breakdown.flights = finalFlights.reduce((s, f) => s + (f.cost || 0), 0);
            console.log(`✅  Direct flights from ${resolved.originCode}: ${finalFlights.length} flight(s)`);

        } else if (resolved.needsConnection) {
            // The user's city has no airport or no direct international flight.
            // Try DEL as ultimate fallback hub.
            console.log(`⚠️  No flights from ${resolved.originCode}. Trying DEL as fallback hub...`);
            const hubFlights = await getLiveFlights(
                'DEL', destination.name, checkIn, checkOut, adultCount, childCount, targetFlightBudget
            ).catch(err => {
                console.warn(`⚠️  DEL fallback flights failed: ${err.message}`);
                return null;
            });

            if (hubFlights && hubFlights.length > 0) {
                const domesticCost = Math.max(2500, Math.round((resolved.distanceKm || 500) * 4));
                const domesticOutbound = {
                    type: 'departure',
                    airline: 'Domestic Connection',
                    flightNo: 'DC 100',
                    from: session.departureCity,
                    to: 'DEL',
                    departure: '05:30 AM',
                    arrival: '07:45 AM',
                    duration: '2h 15m',
                    cost: domesticCost,
                    stops: 0,
                    baggage: '15 kg',
                    cabinBaggage: '7 kg',
                    isRefundable: false,
                };
                const domesticReturn = {
                    type: 'return',
                    airline: 'Domestic Connection',
                    flightNo: 'DC 101',
                    from: 'DEL',
                    to: session.departureCity,
                    departure: '09:00 PM',
                    arrival: '11:15 PM',
                    duration: '2h 15m',
                    cost: domesticCost,
                    stops: 0,
                    baggage: '15 kg',
                    cabinBaggage: '7 kg',
                    isRefundable: false,
                };
                finalFlights = [domesticOutbound, ...hubFlights, domesticReturn];
                adjusted.flights = finalFlights;
                adjusted.breakdown.flights = finalFlights.reduce((s, f) => s + (f.cost || 0), 0);
                console.log(`✅  Multi-leg flights injected: ${session.departureCity} → DEL → ${destination.name} → DEL → ${session.departureCity}`);
            } else {
                console.log(`⚠️  HotelAPI flights completely unavailable — using seed data`);
            }

        } else {
            // Direct city had an airport but HotelAPI returned nothing — try DEL fallback
            console.log(`⚠️  No flights from ${resolved.originCode}. Trying DEL fallback...`);
            const delFlights = await getLiveFlights(
                'DEL', destination.name, checkIn, checkOut, adultCount, childCount, targetFlightBudget
            ).catch(err => {
                console.warn(`⚠️  DEL fallback flights failed: ${err.message}`);
                return null;
            });

            if (delFlights && delFlights.length > 0) {
                const userCode = resolved.originCode;
                const domesticCost = Math.max(3000, Math.round(2500 * totalPax));
                const domesticOutbound = {
                    type: 'departure',
                    airline: 'Domestic Connection',
                    flightNo: 'DC 200',
                    from: userCode,
                    to: 'DEL',
                    departure: '06:00 AM',
                    arrival: '08:30 AM',
                    duration: '2h 30m',
                    cost: domesticCost,
                    stops: 0,
                    baggage: '15 kg',
                    cabinBaggage: '7 kg',
                    isRefundable: false,
                };
                const domesticReturn = {
                    type: 'return',
                    airline: 'Domestic Connection',
                    flightNo: 'DC 201',
                    from: 'DEL',
                    to: userCode,
                    departure: '08:30 PM',
                    arrival: '11:00 PM',
                    duration: '2h 30m',
                    cost: domesticCost,
                    stops: 0,
                    baggage: '15 kg',
                    cabinBaggage: '7 kg',
                    isRefundable: false,
                };
                finalFlights = [domesticOutbound, ...delFlights, domesticReturn];
                adjusted.flights = finalFlights;
                adjusted.breakdown.flights = finalFlights.reduce((s, f) => s + (f.cost || 0), 0);
                console.log(`✅  Fallback multi-leg: ${userCode} → DEL → ${destination.name} → DEL → ${userCode}`);
            } else {
                console.log(`⚠️  HotelAPI flights completely unavailable — using seed data`);
            }
        }

        // Recalculate totalCost
        adjusted.totalCost = Object.values(adjusted.breakdown).reduce((a, b) => a + b, 0);

        // ── Apply AI-generated itinerary days ──────────────────────────────────
        if (aiItinerary && aiItinerary.length > 0) {
            adjusted.days = aiItinerary;
            adjusted.aiGenerated = true;
            console.log(`✅ Using AI-generated ${aiItinerary.length}-day itinerary`);
        } else {
            adjusted.aiGenerated = false;
            console.log(`⚠️ Falling back to seed itinerary for ${destination.name}`);
        }

        // ── Apply AI-generated explanation text ───────────────────────────────
        if (aiExplanationText) {
            explanation.text = aiExplanationText;
        }

        // ── Micro-Personalized Itinerary ──────────────────────────────────────
        let personalized = personalizeItinerary(adjusted, session.activityScores);
        personalized = pruneActivitiesByBudget(personalized, targetActivitiesBudget);

        // Compute match score
        const allDests = await Destination.find().lean();
        const ranked = rankDestinations(session, allDests, session.budget);
        const matchEntry = ranked.find(d => d.id === destinationId);
        personalized.matchScore = matchEntry ? matchEntry.score : 90;

        personalized.recommendationReason = explanation;

        // Persist the generated itinerary for returning users
        session.savedItinerary = personalized;
        await session.save();

        res.json(personalized);
    } catch (err) {
        console.error('Itinerary generate error:', err);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
});

// ─── PROGRESSIVE LOADING: Gemini-only fast lane ───────────────────────────────
// POST /api/destinations/itinerary/generate-ai
// Returns AI days + recommendation explanation only (~10-15s)
router.post('/itinerary/generate-ai', async (req, res) => {
    console.log(`\n[API ENTRY] POST /api/destinations/itinerary/generate-ai - dest:`, req.body.destinationId);
    try {
        const { sessionId, destinationId } = req.body;
        if (!sessionId || !destinationId) return res.status(400).json({ error: 'Missing sessionId or destinationId' });

        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({ error: 'Session not found' });

        const destination = await Destination.findOne({ destinationId }).lean();
        if (!destination) return res.status(404).json({ error: 'Destination not found' });

        // Budget / duration helpers
        const userBudget = parseBudget(session.budget);
        const targetActivitiesBudget = userBudget * 0.20;
        const { checkIn } = getDatesForDuration(session.duration);
        const durationMap = { '3-5': 4, '5-7': 6, '7-10': 8 };
        const durationDays = durationMap[session.duration] || 5;

        const getTopTags = (scoresMap) => {
            if (!scoresMap || scoresMap.size === 0) return [];
            return [...scoresMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([tag]) => tag);
        };
        const topVibes = session.likedVibeTags?.length > 0 ? session.likedVibeTags.slice(0, 5) : getTopTags(session.vibeScores);
        const topActivities = session.likedActivityTags?.length > 0 ? session.likedActivityTags.slice(0, 5) : getTopTags(session.activityScores);
        const topStays = session.likedStayTags?.length > 0 ? session.likedStayTags.slice(0, 5) : getTopTags(session.stayScores);
        const travelDates = checkIn
            ? new Date(checkIn).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const explanation = generateRecommendationExplanation(session, destination);

        console.log(`🤖 [AI lane] Firing Gemini itinerary + explanation in parallel for ${destination.name}...`);
        let [aiItinerary, aiExplanationText] = await Promise.all([
            generateItineraryWithGemini({
                destinationName: destination.name,
                country: destination.country,
                durationDays,
                vibes: topVibes,
                activities: topActivities,
                stays: topStays,
                budget: userBudget,
                travelers: session.travelers,
                travelDates,
                activitiesBudget: targetActivitiesBudget,
            }).catch(err => { console.warn(`⚠️ Gemini itinerary failed: ${err.message}`); return null; }),

            generateExplanationWithGemini(destination.name, explanation)
                .catch(err => { console.warn(`⚠️ Gemini explanation failed: ${err.message}`); return null; }),
        ]);

        if (aiExplanationText) explanation.text = aiExplanationText;

        // Strictly enforce activities budget since LLMs are bad at math
        if (aiItinerary && Array.isArray(aiItinerary)) {
            let currentActCost = aiItinerary.reduce((sum, day) => {
                let dayCost = (day.items || []).reduce((s, i) => s + (i.cost || 0), 0);
                if (day.mustDo && day.mustDo.alignsWithPreferences) dayCost += (day.mustDo.cost || 0);
                return sum + dayCost;
            }, 0);

            while (currentActCost > targetActivitiesBudget) {
                let maxDay = -1, maxItem = -1, maxCost = -1;
                aiItinerary.forEach((day, dIdx) => {
                    (day.items || []).forEach((item, iIdx) => {
                        if (item.type !== 'travel' && item.cost > maxCost) { 
                            maxCost = item.cost; maxDay = dIdx; maxItem = iIdx; 
                        }
                    });
                });
                if (maxCost <= 0) break; 
                aiItinerary[maxDay].items.splice(maxItem, 1);
                currentActCost -= maxCost;
            }
        }

        // Compute match score
        const allDests = await Destination.find().lean();
        const ranked = rankDestinations(session, allDests, session.budget);
        const matchEntry = ranked.find(d => d.id === destinationId);

        console.log(`✅ [AI lane] Done for ${destination.name}`);
        res.json({
            days: aiItinerary || destination.days || [],
            aiGenerated: !!(aiItinerary && aiItinerary.length > 0),
            recommendationReason: explanation,
            matchScore: matchEntry ? matchEntry.score : 90,
        });
    } catch (err) {
        console.error('generate-ai error:', err);
        res.status(500).json({ error: 'Failed to generate AI itinerary data' });
    }
});

// ─── PROGRESSIVE LOADING: HotelAPI-only slow lane ──────────────────────────────────
// POST /api/destinations/itinerary/generate-hotelApi
// Returns live hotel + flights + pricing only (~35-55s)
router.post('/itinerary/generate-hotelApi', async (req, res) => {
    console.log(`\n[API ENTRY] POST /api/destinations/itinerary/generate-hotelApi - dest:`, req.body.destinationId);
    try {
        const { sessionId, destinationId } = req.body;
        if (!sessionId || !destinationId) return res.status(400).json({ error: 'Missing sessionId or destinationId' });

        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({ error: 'Session not found' });

        const destination = await Destination.findOne({ destinationId }).lean();
        if (!destination) return res.status(404).json({ error: 'Destination not found' });

        const baseItinerary = {
            destination: destination.name, country: destination.country, duration: destination.duration,
            image: destination.image, totalCost: destination.totalCost, breakdown: destination.breakdown,
            flights: destination.flights, hotel: destination.hotel, transfers: destination.transfers, days: destination.days,
        };
        const adjusted = adjustItineraryCosts(baseItinerary, session.travelers, session.duration);

        const userBudget = parseBudget(session.budget);
        adjusted.budget = userBudget;
        const targetFlightBudget = userBudget * 0.50;
        const targetHotelBudget = userBudget * 0.30;

        const resolved = await resolveOrigin(session.departureCity);
        console.log(`🛫 [HotelAPI lane] Origin resolved:`, JSON.stringify(resolved));

        const { checkIn, checkOut } = getDatesForDuration(session.duration);
        const rooms = Math.ceil(session.travelers / 2);
        const adultCount = session.adults || session.travelers || 1;
        const childCount = session.children || 0;
        const totalPax = adultCount + childCount;

        const userPreferences = {
            likedStays: session.likedStays || [],
            stayScores: session.stayScores ? Object.fromEntries(session.stayScores) : {},
            likedVibes: session.likedVibes || [],
            vibeScores: session.vibeScores ? Object.fromEntries(session.vibeScores) : {},
        };

        console.log(`✈️  [HotelAPI lane] Firing hotel + flights in parallel for ${destination.name}...`);
        const [hotelApiHotel, directFlights] = await Promise.all([
            searchHotels(destination.name, checkIn, checkOut, rooms, totalPax, targetHotelBudget, userPreferences)
                .catch(err => { console.warn(`⚠️ HotelAPI Hotels failed: ${err.message}`); return null; }),
            getLiveFlights(resolved.originCode, destination.name, checkIn, checkOut, adultCount, childCount, targetFlightBudget)
                .catch(err => { console.warn(`⚠️ HotelAPI Flights failed: ${err.message}`); return null; }),
        ]);

        // Hotel
        if (hotelApiHotel) {
            adjusted.hotel = hotelApiHotel;
            if (hotelApiHotel.totalCost) adjusted.breakdown.stay = hotelApiHotel.totalCost;
            console.log(`✅ [HotelAPI lane] Hotel: ${hotelApiHotel.name}`);
        }

        // Smart multi-leg flight routing
        let finalFlights = directFlights;
        if (finalFlights && finalFlights.length > 0) {
            adjusted.flights = finalFlights;
            adjusted.breakdown.flights = finalFlights.reduce((s, f) => s + (f.cost || 0), 0);
            console.log(`✅ [HotelAPI lane] Direct flights from ${resolved.originCode}: ${finalFlights.length}`);
        } else {
            const hubCode = resolved.needsConnection ? 'DEL' : 'DEL';
            console.log(`⚠️ [HotelAPI lane] No direct flights — trying DEL fallback...`);
            const hubFlights = await getLiveFlights('DEL', destination.name, checkIn, checkOut, adultCount, childCount, targetFlightBudget)
                .catch(err => { console.warn(`⚠️ DEL fallback failed: ${err.message}`); return null; });

            if (hubFlights && hubFlights.length > 0) {
                const domesticCost = resolved.needsConnection
                    ? Math.max(2500, Math.round((resolved.distanceKm || 500) * 4))
                    : Math.max(3000, Math.round(2500 * totalPax));
                const flightNo = resolved.needsConnection ? 'DC 100' : 'DC 200';
                const returnNo = resolved.needsConnection ? 'DC 101' : 'DC 201';
                const fromCity = resolved.needsConnection ? session.departureCity : resolved.originCode;

                const domesticOut = { type: 'departure', airline: 'Domestic Connection', flightNo, from: fromCity, to: 'DEL', departure: '05:30 AM', arrival: '07:45 AM', duration: '2h 15m', cost: domesticCost, stops: 0, baggage: '15 kg', cabinBaggage: '7 kg', isRefundable: false };
                const domesticRet = { type: 'return', airline: 'Domestic Connection', flightNo: returnNo, from: 'DEL', to: fromCity, departure: '09:00 PM', arrival: '11:15 PM', duration: '2h 15m', cost: domesticCost, stops: 0, baggage: '15 kg', cabinBaggage: '7 kg', isRefundable: false };

                finalFlights = [domesticOut, ...hubFlights, domesticRet];
                adjusted.flights = finalFlights;
                adjusted.breakdown.flights = finalFlights.reduce((s, f) => s + (f.cost || 0), 0);
                console.log(`✅ [HotelAPI lane] Multi-leg injected via DEL`);
            } else {
                console.log(`⚠️ [HotelAPI lane] HotelAPI flights unavailable — using seed data`);
            }
        }

        // ── ENFORCE STRICT BUDGET CEILING FOR HotelAPI ──
        const maxAllowedForHotelApi = userBudget - (userBudget * 0.20); // 80% of budget reserved for flight+hotel+transfers
        let currentHotelApiSum = (adjusted.breakdown.flights || 0) + (adjusted.breakdown.stay || 0) + (adjusted.breakdown.transfers || 0);

        if (currentHotelApiSum > maxAllowedForHotelApi) {
             const excess = currentHotelApiSum - maxAllowedForHotelApi + 1500; // Add small buffer so it falls comfortably under
             const flightRatio = adjusted.breakdown.flights / ((adjusted.breakdown.flights || 1) + (adjusted.breakdown.stay || 1));
             const stayRatio = 1 - flightRatio;
             
             const flightReduction = excess * flightRatio;
             const stayReduction = excess * stayRatio;

             adjusted.breakdown.flights = Math.max(0, adjusted.breakdown.flights - flightReduction);
             adjusted.breakdown.stay = Math.max(0, adjusted.breakdown.stay - stayReduction);

             // Apply to individual items so UI tabs match breakdown
             if (adjusted.flights && adjusted.flights.length > 0) {
                 const legReduction = flightReduction / adjusted.flights.length;
                 adjusted.flights.forEach(f => { f.cost = Math.max(0, f.cost - legReduction); });
             }
             if (adjusted.hotel) {
                 adjusted.hotel.totalCost = Math.max(0, adjusted.hotel.totalCost - stayReduction);
             }
        }

        adjusted.totalCost = Object.values(adjusted.breakdown).reduce((a, b) => a + b, 0);

        console.log(`✅ [HotelAPI lane] Done for ${destination.name}`);
        res.json({
            hotel: adjusted.hotel,
            flights: adjusted.flights,
            transfers: adjusted.transfers,
            breakdown: adjusted.breakdown,
            totalCost: adjusted.totalCost,
            budget: userBudget,
        });
    } catch (err) {
        console.error('generate-hotelApi error:', err);
        res.status(500).json({ error: 'Failed to generate HotelAPI itinerary data' });
    }
});

// GET /api/destinations/:id/facts — Get interesting facts for a destination
const destinationFacts = require('../data/destinationFacts.json');

router.get('/:id/facts', (req, res) => {
    const { id } = req.params;
    const facts = destinationFacts[id.toLowerCase()] || [];
    res.json({ facts });
});

module.exports = router;
