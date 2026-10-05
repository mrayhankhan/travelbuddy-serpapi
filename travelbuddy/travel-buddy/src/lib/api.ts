import { SessionData } from '@/components/onboarding/SessionInit';
import { DiscoveryCard } from '@/data/mockData';
import { TripItinerary, ShortlistDestination, getShortlist, generateItinerary } from '@/data/itineraryMock';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

/**
 * Try API call, fall back to mock data if backend is unavailable.
 * This ensures the frontend always works even without the backend running.
 */

// Create a new planning session
export async function createSession(data: SessionData): Promise<string | null> {
    try {
        const res = await fetch(`${API_BASE}/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Session API failed');
        const json = await res.json();
        return json.sessionId;
    } catch {
        console.warn('⚠️ Backend unavailable — using mock mode');
        return null; // null = use mock mode
    }
}

// Get initial swipe cards for a stage (uses adaptive POST /cards/next endpoint)
export async function getCardsFromAPI(stage: string, sessionId?: string | null): Promise<DiscoveryCard[] | null> {
    // If no real sessionId exists, skip the API call and use local mock data
    if (!sessionId) return null;
    try {
        const res = await fetch(`${API_BASE}/cards/next`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, stage, count: 10 }),
        });
        if (!res.ok) throw new Error('Cards API failed');
        const data = await res.json();
        return data.cards || null;
    } catch {
        return null; // fallback to local mock data
    }
}

// Record a swipe event (with enhanced timing data for ML scoring)
export async function recordSwipe(
    sessionId: string,
    cardId: string,
    stage: string,
    direction: string,
    cardIndex: number = 0,
    totalCards: number = 10,
    swipeDurationMs: number = 1000,
    detailViewed: boolean = false,
): Promise<void> {
    try {
        await fetch(`${API_BASE}/swipe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, cardId, stage, direction, cardIndex, totalCards, swipeDurationMs, detailViewed }),
        });
    } catch {
        // Silently fail — swipes still work on frontend
    }
}

// Get ranked destination shortlist
export async function getShortlistFromAPI(
    sessionId: string | null,
    preferences: any,
    budget: number,
): Promise<ShortlistDestination[]> {
    if (sessionId) {
        try {
            const res = await fetch(`${API_BASE}/destinations/shortlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId }),
            });
            if (!res.ok) throw new Error('Shortlist API failed');
            const data = await res.json();
            // Validate: backend must return a non-empty array, otherwise fall through to mock
            if (Array.isArray(data) && data.length > 0) return data;
            throw new Error('Shortlist response was not a valid array');
        } catch {
            // fall through to mock
        }
    }
    return getShortlist(preferences, budget);
}


// Generate full itinerary
export async function generateItineraryFromAPI(
    sessionId: string | null,
    destinationId: string,
    budget: number,
): Promise<TripItinerary> {
    if (sessionId) {
        try {
            const res = await fetch(`${API_BASE}/destinations/itinerary/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, destinationId }),
            });
            if (!res.ok) throw new Error('Itinerary API failed');
            return await res.json();
        } catch {
            // fall through to mock
        }
    }
    return generateItinerary(destinationId, budget);
}

// Submit calibration duel or quick-tap result
export async function submitCalibration(
    sessionId: string,
    payload: {
        type: 'duel' | 'quicktap';
        stage: string;
        duelId?: string;
        position?: number;
        leftTags?: string[];
        rightTags?: string[];
        selectedTags?: string[];
    },
): Promise<void> {
    try {
        await fetch(`${API_BASE}/calibration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, ...payload }),
        });
    } catch {
        // Silently fail — calibration still works on frontend
    }
}

// Fetch next batch of adaptive cards from the ML card selector
export async function fetchNextCards(
    sessionId: string,
    stage: string,
    count: number = 3,
): Promise<DiscoveryCard[] | null> {
    try {
        const res = await fetch(`${API_BASE}/cards/next`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, stage, count }),
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.cards || null;
    } catch {
        return null; // Fallback to local cards
    }
}

// Signal backend when user explicitly removes a tag from "My Preferences"
export async function removePreferenceTag(
    sessionId: string,
    section: string,
    tag: string,
): Promise<void> {
    try {
        await fetch(`${API_BASE}/preferences/remove-tag`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, section, tag }),
        });
    } catch {
        // Silently fail
    }
}

// Sync the full curated tag list to backend for ranking bonuses
export async function syncProfileTags(
    sessionId: string,
    profileTags: { vibes: string[]; activities: string[]; stays: string[] },
): Promise<void> {
    try {
        await fetch(`${API_BASE}/preferences/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, profileTags }),
        });
    } catch {
        // Silently fail
    }
}

// Check if a returning user has an existing session with preferences
export async function getLatestSession(
    email: string,
): Promise<{
    sessionId: string;
    hasPreferences: boolean;
    budget: number;
    profileTags: any;
    savedItinerary: any | null;
    savedShortlist: any[];
} | null> {
    try {
        const res = await fetch(`${API_BASE}/session/by-email/${encodeURIComponent(email)}`);
        if (!res.ok) return null;
        const data = await res.json();
        return {
            sessionId: data.sessionId,
            hasPreferences: data.hasPreferences,
            budget: data.budget,
            profileTags: data.profileTags,
            savedItinerary: data.savedItinerary || null,
            savedShortlist: data.savedShortlist || [],
        };
    } catch {
        return null;
    }
}

// Link the current anonymous session to an authenticated user's email
export async function linkSessionToEmail(
    sessionId: string,
    email: string,
): Promise<void> {
    try {
        await fetch(`${API_BASE}/session/${sessionId}/link-email`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
    } catch {
        // Silently fail
    }
}

// Analyze a photo via Gemini to extract travel preference tags
export async function analyzePhoto(
    sessionId: string | null,
    base64Image: string,
    mimeType: string = 'image/jpeg',
): Promise<{
    vibes: { tag: string; confidence: number }[];
    activities: { tag: string; confidence: number }[];
    stays: { tag: string; confidence: number }[];
} | null> {
    try {
        const res = await fetch(`${API_BASE}/photo/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Image, mimeType, sessionId }),
        });
        if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            throw new Error(errBody.error || errBody.details || `Photo analysis failed (${res.status})`);
        }
        return await res.json();
    } catch (err) {
        console.error('Photo analysis error:', err);
        throw err;
    }
}

// Fetch dot-product-ranked top tags per phase for the Travel Profile summary
export async function getTopTags(
    sessionId: string,
): Promise<{ vibes: string[]; activities: string[]; stays: string[] } | null> {
    try {
        const res = await fetch(`${API_BASE}/session/${sessionId}/top-tags`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}
// Ask the Gemini-powered travel chatbot a question about a destination
export async function askChatbot(
    question: string,
    destination: string,
    country: string,
): Promise<{ answer: string }> {
    const res = await fetch(`${API_BASE}/chatbot/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, destination, country }),
    });
    if (!res.ok) throw new Error('Chatbot API failed');
    return res.json();
}

// Generate 3 personalized itineraries via Gemini (Ready Itineraries tab)
export async function generateMultiItineraryFromAPI(
    sessionId: string | null,
    sessionData: any,
    profileTags: { vibes: string[]; activities: string[]; stays: string[] },
    variation: number = 0,
): Promise<TripItinerary[]> {
    try {
        const res = await fetch(`${API_BASE}/itineraries/generate-multi`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId,
                departureCity: sessionData?.departureCity || 'New Delhi',
                duration: sessionData?.duration || '5-7',
                budget: sessionData?.budget || 300000,
                travelers: sessionData?.travelers || 2,
                intendedTravelWindow: sessionData?.intendedTravelWindow || 'within-1-month',
                profileTags,
                variation,
            }),
        });
        if (!res.ok) throw new Error(`Multi-itinerary API failed: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
        throw new Error('Empty response from multi-itinerary API');
    } catch (err) {
        console.warn('⚠️ Multi-itinerary API unavailable — using mock fallback', err);
        // Fallback: return 3 mock itineraries from itineraryMock
        const { getShortlist, generateItinerary } = await import('@/data/itineraryMock');
        const shortlist = getShortlist(null, sessionData?.budget || 300000);
        return shortlist.slice(0, 3).map((dest) =>
            generateItinerary(dest.id, sessionData?.budget || 300000),
        );
    }
}

/**
 * STEP 2: Fetch deep trip details (flights, hotel, days, transfers)
 * for a single chosen destination. Called only when the user taps
 * "View Full Itinerary" — keeps the initial feed load lightweight.
 * Pass an AbortSignal to cancel in-flight background prefetch requests.
 */
export async function generateItineraryDetailsFromAPI(
    destination: string,
    country: string,
    sessionData: any,
    profileTags: { vibes: string[]; activities: string[]; stays: string[] },
    signal?: AbortSignal,
): Promise<{ hotel: any; flights: any[]; transfers: any[]; days: any[] }> {
    const res = await fetch(`${API_BASE}/itineraries/generate-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            destination,
            country,
            duration: sessionData?.duration || '5-7',
            budget: sessionData?.budget || 300000,
            travelers: sessionData?.travelers || 2,
            departureCity: sessionData?.departureCity || 'New Delhi',
            profileTags,
        }),
        signal,
    });
    if (!res.ok) throw new Error(`Itinerary details API failed: ${res.status}`);
    return res.json();
}

/**
 * PROGRESSIVE LOADING — AI fast lane (~10-15s)
 * Fetches Gemini-generated days + recommendation explanation.
 * Call this simultaneously with generateItineraryHotelAPIFromAPI so the
 * user sees the Days tab as soon as this resolves.
 */
export async function generateItineraryAIFromAPI(
    sessionId: string | null,
    destinationId: string,
): Promise<{ days: any[]; aiGenerated: boolean; recommendationReason: any; matchScore: number } | null> {
    if (!sessionId) return null;
    try {
        const res = await fetch(`${API_BASE}/destinations/itinerary/generate-ai`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, destinationId }),
        });
        if (!res.ok) throw new Error(`AI lane failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn('⚠️ generate-ai API failed:', err);
        return null;
    }
}

/**
 * PROGRESSIVE LOADING — HotelAPI slow lane (~35-55s)
 * Fetches live hotel, flights, and pricing. Call this at the same time as
 * generateItineraryAIFromAPI and merge the result into ItineraryView when it resolves.
 */
export async function generateItineraryHotelAPIFromAPI(
    sessionId: string | null,
    destinationId: string,
): Promise<{ hotel: any; flights: any[]; transfers: any[]; breakdown: any; totalCost: number; budget: number } | null> {
    if (!sessionId) return null;
    try {
        const res = await fetch(`${API_BASE}/destinations/itinerary/generate-hotelApi`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, destinationId }),
        });
        if (!res.ok) throw new Error(`HotelAPI lane failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn('⚠️ generate-hotelApi API failed:', err);
        return null;
    }
}
