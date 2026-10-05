"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { TripItinerary } from "@/data/itineraryMock";
import { SessionData } from "@/components/onboarding/SessionInit";
import { ProfileTags } from "@/components/discovery/ProfileDrawer";
import ItineraryCard from "@/components/itinerary/ItineraryCard";
import { generateMultiItineraryFromAPI, generateItineraryAIFromAPI, generateItineraryHotelAPIFromAPI } from "@/lib/api";

// ─────────────────────────────────────────────────────────────────────────────
// MODULE-LEVEL SINGLETONS
// These live outside the React lifecycle — they survive unmounts/remounts so:
//   • Back navigation instantly shows cached cards (no re-fetch of the feed)
//   • Promise cache is never accidentally wiped by cleanup functions
// ─────────────────────────────────────────────────────────────────────────────
let cachedItineraries: (TripItinerary & { shortDescription?: string })[] | null = null;
let cachedVariation = 0;

// Singleton Promise for the lightweight feed (/generate-multi).
// If the user navigates away and back mid-load, we await this same Promise
// instead of firing a brand-new request.
let feedPromiseCache: Promise<any> | null = null;

// Fast-lane cache: destinationId → Promise<aiData>
// Shared between the background pre-fetch and handleViewFull so clicking an
// already-started (or finished) card costs zero extra network calls.
export const aiPromiseMap: Map<string, Promise<any>> = new Map();

// Slow-lane cache: destinationId → Promise<hotelApiData>
// ItineraryView reads this to know when to upgrade itself once live pricing arrives.
export const hotelApiPromiseMap: Map<string, Promise<any>> = new Map();

const LOADER_STAGES = [
  "Finding perfect destinations...",
  "Optimising your trip...",
  "Clustering activities...",
  "Aligning with your budget...",
  "Almost ready...",
];

const TRAVEL_FACTS = [
  "Over 1.4 billion tourists travel internationally every year.",
  "The shortest commercial flight in the world lasts just 57 seconds — in Scotland.",
  "France is the most visited country in the world, with 90 million tourists annually.",
  "About 10% of the world's jobs are in the travel and tourism industry.",
  "The average person takes 17 seconds to fall asleep on a flight.",
  "Airports are one of the few places that still use phonetic alphabet codes developed in the 1950s.",
  "The longest non-stop commercial flight covers 17,754 km — Singapore to New York.",
]
const DETAIL_LOADER_STAGES = [
  "Loading your itinerary...",
  "Booking the best flights...",
  "Reserving your hotel...",
  "Planning day-by-day...",
  "Finalising details...",
];

interface ItinerariesPageProps {
  sessionData: SessionData | null;
  sessionId: string | null;
  profileTags: ProfileTags;
  onViewItinerary: (itinerary: TripItinerary) => void | Promise<void>;
  onBook: (itinerary: TripItinerary) => void;
}

export default function ItinerariesPage({
  sessionData,
  sessionId,
  profileTags,
  onViewItinerary,
  onBook,
}: ItinerariesPageProps) {
  // Initialise from module cache → instant render on back navigation
  const [itineraries, setItineraries] = useState<
    (TripItinerary & { shortDescription?: string })[]
  >(cachedItineraries ?? []);
  const [loading, setLoading] = useState(cachedItineraries === null);
  const [loaderStage, setLoaderStage] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  // const [variation, setVariation] = useState(0);
  const [variation, setVariation] = useState(cachedVariation);
  const [error, setError] = useState<string | null>(null);

  // Per-card detail loading UI
  const [loadingDetailsFor, setLoadingDetailsFor] = useState<string | null>(null);
  const [detailLoaderStage, setDetailLoaderStage] = useState(0);
  const [detailFactIndex, setDetailFactIndex] = useState(0);

  // Sequential background pre-fetch index (0 → 1 → 2 → done)
  const [prefetchIndex, setPrefetchIndex] = useState(0);

  // ── Fetch the lightweight feed ────────────────────────────────────────────
  const fetchItineraries = useCallback(
    async (varSeed: number) => {
      // Clear detail caches and reset sequential pre-fetch
      aiPromiseMap.clear();
      hotelApiPromiseMap.clear();
      cachedItineraries = null;
      cachedVariation = varSeed;
      setPrefetchIndex(0);

      setLoading(true);
      setLoaderStage(0);
      setError(null);

      const stageInterval = setInterval(() => {
        setLoaderStage((s) => (s < LOADER_STAGES.length - 1 ? s + 1 : s));
      }, 1800);

      try {
        // ── Feed singleton: if a request is already in-flight (e.g. user
        // switched tabs and came back), just await the existing Promise instead
        // of firing a duplicate /generate-multi call.
        if (!feedPromiseCache) {
          feedPromiseCache = generateMultiItineraryFromAPI(
            sessionId,
            sessionData,
            profileTags,
            varSeed,
          );
        }
        const results = await feedPromiseCache;
        const typed = results as (TripItinerary & { shortDescription?: string })[];
        cachedItineraries = typed; // stash for back navigation
        setItineraries(typed);
      } catch {
        feedPromiseCache = null; // allow retry on failure
        setError("Couldn't load itineraries. Please try again.");
      } finally {
        clearInterval(stageInterval);
        setLoading(false);
      }
    },
    [sessionId, sessionData, profileTags],
  );

  // On mount: only call the API when the module cache is empty
  useEffect(() => {
    if (cachedItineraries === null) {
      fetchItineraries(cachedVariation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rotate facts while loading
  useEffect(() => {
    if (!loading) return;
    setCurrentFactIndex(0);
    const interval = setInterval(() => {
      setCurrentFactIndex((i) => (i + 1) % TRAVEL_FACTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  // Rotate facts while detail-loading
  useEffect(() => {
    if (loadingDetailsFor === null) return;
    setDetailFactIndex(0);
    const interval = setInterval(() => {
      setDetailFactIndex((i) => (i + 1) % TRAVEL_FACTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loadingDetailsFor]);
  // ── Sequential background pre-fetch: Card 0 → 1 → 2 ─────────────────────
  //
  // How it works:
  //   • prefetchIndex drives this effect. It starts at 0 and increments only
  //     after the current card's AI promise settles (success OR failure).
  //   • The module-level aiPromiseMap acts as the single source of truth for
  //     "has this card been dispatched?" — checking it synchronously before
  //     firing prevents duplicate fetches even in React StrictMode.
  //   • If the user clicks a card before the background task reaches it,
  //     handleViewFull stores the promise in the map first. The background task
  //     will find `aiPromiseMap.has(destId)` === true and skip forward instantly.
  useEffect(() => {
    if (loading || itineraries.length === 0 || !sessionId) return;
    if (prefetchIndex >= itineraries.length) return; // all cards done

    const card = itineraries[prefetchIndex];
    const destId: string =
      (card as any).destinationId ||
      card.destination.toLowerCase().replace(/\s+/g, '');

    // ── Duplicate guard ──────────────────────────────────────────────────────
    // Another trigger (user click or StrictMode double-fire) already dispatched
    // this card → advance immediately without firing a new request.
    if (aiPromiseMap.has(destId)) {
      console.log(`⏩ Card ${prefetchIndex} (${card.destination}) already in-flight — skipping`);
      setPrefetchIndex((i) => i + 1);
      return;
    }

    console.log(`🔄 Background prefetch → Card ${prefetchIndex}: ${card.destination}`);

    // ── AI fast lane ────────────────────────────────────────────────────────
    const aiPromise = generateItineraryAIFromAPI(sessionId, destId);
    aiPromiseMap.set(destId, aiPromise);

    // ── HotelAPI slow lane (fire-and-forget, does NOT block the sequence) ────────
    if (!hotelApiPromiseMap.has(destId)) {
      const hotelApiPromise = generateItineraryHotelAPIFromAPI(sessionId, destId);
      hotelApiPromiseMap.set(destId, hotelApiPromise);
      hotelApiPromise
        .then(() => console.log(`✅ HotelAPI prefetch done for ${card.destination}`))
        .catch((err) => {
          console.warn(`⚠️ HotelAPI prefetch failed for ${card.destination}:`, err?.message);
          hotelApiPromiseMap.delete(destId); // allow retry on click
        });
    }

    // Advance to next card ONLY after AI settles — keeps one card in-flight at a time
    aiPromise
      .then(() => console.log(`✅ AI prefetch done for ${card.destination}`))
      .catch((err) => {
        console.warn(`⚠️ AI prefetch failed for ${card.destination}:`, err?.message);
        aiPromiseMap.delete(destId); // allow retry on click
      })
      .finally(() => {
        setPrefetchIndex((i) => i + 1);
      });

    // No cleanup needed — promises are stored in module-level maps and must
    // outlive this component's lifecycle.
  }, [prefetchIndex, itineraries, loading, sessionId]);

  const handleRegenerate = () => {
    const next = variation + 1;
    setVariation(next);
    feedPromiseCache = null; // force a fresh /generate-multi call
    fetchItineraries(next);
  };

  const handleViewFull = useCallback(
    async (itin: TripItinerary & { shortDescription?: string }) => {
      if (loadingDetailsFor) return;

      const destination = itin.destination;
      const destinationId: string =
        (itin as any).destinationId ||
        destination.toLowerCase().replace(/\s+/g, '');

      setLoadingDetailsFor(destination);
      setDetailLoaderStage(0);

      const stageInterval = setInterval(() => {
        setDetailLoaderStage((s) => (s < DETAIL_LOADER_STAGES.length - 1 ? s + 1 : s));
      }, 600);

      try {
        // ── HotelAPI slow lane ─────────────────────────────────────────────────────
        // Reuse cached promise if the prefetch already started it.
        // ItineraryView reads hotelApiPromiseMap to upgrade itself once it resolves.
        if (!hotelApiPromiseMap.has(destinationId)) {
          const hotelApiPromise = generateItineraryHotelAPIFromAPI(sessionId, destinationId);
          hotelApiPromiseMap.set(destinationId, hotelApiPromise);
          hotelApiPromise.catch(() => hotelApiPromiseMap.delete(destinationId));
        }

        // ── AI fast lane ──────────────────────────────────────────────────────
        // If the prefetch is already running (or finished), await that same promise.
        // Cache hit → instant navigation on back/revisit.
        if (!aiPromiseMap.has(destinationId)) {
          const aiPromise = generateItineraryAIFromAPI(sessionId, destinationId);
          aiPromiseMap.set(destinationId, aiPromise);
          aiPromise.catch(() => aiPromiseMap.delete(destinationId));
        }

        const aiData = await aiPromiseMap.get(destinationId);

        const merged = {
          ...itin,
          destinationId,
          days: aiData?.days ?? itin.days ?? [],
          aiGenerated: aiData?.aiGenerated ?? false,
          ...(aiData?.recommendationReason && { recommendationReason: aiData.recommendationReason }),
          ...(aiData?.matchScore != null && { matchScore: aiData.matchScore }),
        } as TripItinerary;

        await onViewItinerary(merged);
      } catch (err) {
        console.error('Failed to load AI details:', err);
        await onViewItinerary(itin as TripItinerary);
      } finally {
        clearInterval(stageInterval);
        setLoadingDetailsFor(null);
        setDetailLoaderStage(0);
      }
    },
    [loadingDetailsFor, onViewItinerary, sessionId],
  );

  const showDetailLoader = loadingDetailsFor !== null;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      {/* Fixed header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md px-5 pt-5 pb-3 border-b border-[#F2F2F7]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#1A1A1A] leading-tight">
              Recommended Trips
            </h1>
            <p className="text-[13px] text-[#8E8E93] mt-0.5">
              Based on your travel preferences
            </p>
          </div>
          {!loading && !showDetailLoader && (
            <motion.button
              id="itineraries-regenerate-all"
              whileTap={{ scale: 0.9 }}
              onClick={handleRegenerate}
              className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-full text-[12px] font-semibold text-[#6B6B6B] shadow-sm border border-[#E5E5EA]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate
            </motion.button>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 px-4 pt-4 pb-36 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ── Initial feed loading ── */}
          {loading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center min-h-[80vh] px-8 pt-6 pb-6"
            >
              {/* Center: GIF + facts */}
              <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[320px]">
                {/* GIF */}
                <div className="flex flex-col items-center mb-8">
                  <img
                    src="/anim.gif"
                    alt="Loading animation"
                    className="w-40 h-40 object-contain mt-[-16px]"
                  />
                </div>

                {/* Rotating fact card */}
                <div className="w-full flex flex-col items-center">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-[#8E8E93] mb-4">
                    ✦ Did you know?
                  </p>
                  <div className="relative w-full min-h-[110px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFactIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center"
                      >
                        <p className="text-[17px] font-semibold text-[#1A1A1A] leading-snug tracking-tight">
                          {TRAVEL_FACTS[currentFactIndex]}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Fact dots */}
                  <div className="flex gap-1.5 mt-6">
                    {TRAVEL_FACTS.map((_, i) => (
                      <div
                        key={i}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === currentFactIndex ? 18 : 6,
                          height: 6,
                          background: i === currentFactIndex ? "#1A1A1A" : "#D1D1D6",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: animated single stage text */}
              <div className="w-full flex flex-col items-center pb-2">
                <div className="relative h-8 flex items-center justify-center overflow-hidden w-full">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loaderStage}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute text-[13px] font-medium text-[#3C3C43]/70"
                    >
                      {LOADER_STAGES[loaderStage]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <p className="text-[10px] text-[#8E8E93]/45 mt-2 tracking-wide">
                  Powered by HotelAPI · Real-time availability
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Detail loading overlay ── */}
          {!loading && showDetailLoader && (
            <motion.div
              key="detail-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center min-h-[80vh] px-8 pt-6 pb-6"
            >
              {/* Center: GIF + facts */}
              <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[320px]">
                {/* GIF */}
                <div className="flex flex-col items-center mb-8">
                  <img
                    src="/anim.gif"
                    alt="Loading animation"
                    className="w-40 h-40 object-contain mt-[-16px]"
                  />
                </div>

                {/* Destination name */}
                <p className="text-[18px] font-bold text-[#1A1A1A] mb-6">
                  {loadingDetailsFor}
                </p>

                {/* Rotating fact card */}
                <div className="w-full flex flex-col items-center">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-[#8E8E93] mb-4">
                    ✦ Did you know?
                  </p>
                  <div className="relative w-full min-h-[110px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={detailFactIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center"
                      >
                        <p className="text-[17px] font-semibold text-[#1A1A1A] leading-snug tracking-tight">
                          {TRAVEL_FACTS[detailFactIndex]}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Fact dots */}
                  <div className="flex gap-1.5 mt-6">
                    {TRAVEL_FACTS.map((_, i) => (
                      <div
                        key={i}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === detailFactIndex ? 18 : 6,
                          height: 6,
                          background: i === detailFactIndex ? "#1A1A1A" : "#D1D1D6",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: animated single stage text */}
              <div className="w-full flex flex-col items-center pb-2">
                <div className="relative h-8 flex items-center justify-center overflow-hidden w-full">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={detailLoaderStage}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute text-[13px] font-medium text-[#3C3C43]/70"
                    >
                      {DETAIL_LOADER_STAGES[detailLoaderStage]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <p className="text-[10px] text-[#8E8E93]/45 mt-2 tracking-wide">
                  Powered by HotelAPI · Real-time availability
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Error state ── */}
          {!loading && !showDetailLoader && error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-8"
            >
              <p className="text-[40px]">✈️</p>
              <p className="text-[16px] font-bold text-[#1A1A1A]">Something went wrong</p>
              <p className="text-[13px] text-[#8E8E93]">{error}</p>
              <button
                onClick={handleRegenerate}
                className="px-6 py-3 bg-[#FFD233] text-[#1A1A1A] rounded-full font-semibold text-[14px]"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* ── Cards feed ── */}
          {!loading && !showDetailLoader && !error && (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {itineraries.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
                  <p className="text-[40px]">🗺️</p>
                  <p className="text-[15px] font-bold text-[#1A1A1A]">No itineraries generated</p>
                  <p className="text-[13px] text-[#8E8E93]">Tap Regenerate to try again</p>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {/* Time-of-day greeting */}
                  <div className="px-1 pt-1 pb-0">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E93] mb-0.5">
                      {(() => {
                        const h = new Date().getHours();
                        return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
                      })()}
                    </p>
                    <h2 className="text-[20px] font-bold text-[#1A1A1A] leading-tight">
                      Handpicked trips for you:
                    </h2>
                  </div>

                  {itineraries.map((itin, index) => (
                    <ItineraryCard
                      key={`${itin.destination}-${variation}-${index}`}
                      itinerary={itin}
                      budget={sessionData?.budget ?? 300000}
                      index={index}
                      onViewFull={() => handleViewFull(itin)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
