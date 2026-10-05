"use client";

import { useState, useEffect, useRef } from "react";
import { hotelApiPromiseMap } from "@/components/itinerary/ItinerariesPage";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, MapPin, Clock, Star, Plane, Hotel, Car, Camera,
  Utensils, Music, RefreshCw, ArrowRight, Zap, Leaf, TrendingUp,
  TrendingDown, AlertTriangle, ChevronDown, ChevronUp, Sparkles, Map
} from "lucide-react";
import { TripItinerary, MustDoActivity } from "@/data/itineraryMock";
import { SessionData } from "@/components/onboarding/SessionInit";
import CityMap from "@/components/itinerary/CityMap";
import HotelStreetViewModal from "@/components/itinerary/HotelStreetViewModal";
import LocationStreetViewModal, { LocationType } from "@/components/itinerary/LocationStreetViewModal";
import { getCityMapData } from "@/data/cityLandmarks";
import { deriveDurationLabel } from "@/lib/utils";

const TYPE_ICONS: Record<string, any> = {
  travel: Plane, activity: Camera, food: Utensils, relax: Music,
};
const TYPE_COLORS: Record<string, string> = {
  travel: '#5B8FB9', activity: '#FFD233', food: '#FF6B6B', relax: '#34C759',
};

export default function ItineraryView({
  itinerary: initialItinerary,
  onReset,
  onBack,
  onBook,
  sessionData,
  travelCashBalance = 0,
  destinationId,
}: {
  itinerary: TripItinerary;
  onReset: () => void;
  onBack?: () => void;
  onBook?: () => void;
  sessionData?: SessionData | null;
  travelCashBalance?: number;
  destinationId?: string;
}) {
  // Progressive loading: start from AI data, upgrade with HotelAPI when it arrives
  const [itinerary, setItinerary] = useState<TripItinerary>(initialItinerary);
  const [hotelApiLoading, setHotelApiLoading] = useState(false);
  const hotelApiSubscribed = useRef(false);

  useEffect(() => {
    if (hotelApiSubscribed.current) return;
    const key = destinationId || initialItinerary.destination?.toLowerCase().replace(/\s+/g, '');
    if (!key) return;
    const hotelApiPromise = hotelApiPromiseMap.get(key);
    if (!hotelApiPromise) return;
    hotelApiSubscribed.current = true;
    setHotelApiLoading(true);
    hotelApiPromise
      .then((hotelApiData) => {
        if (hotelApiData) {
          setItinerary((prev) => ({
            ...prev,
            hotel: hotelApiData.hotel ?? prev.hotel,
            flights: hotelApiData.flights ?? prev.flights,
            transfers: hotelApiData.transfers ?? prev.transfers,
            breakdown: hotelApiData.breakdown ?? prev.breakdown,
            totalCost: hotelApiData.totalCost ?? prev.totalCost,
            budget: hotelApiData.budget ?? prev.budget,
          }));
        }
      })
      .catch(() => { /* keep seed data on HotelAPI failure */ })
      .finally(() => {
        setHotelApiLoading(false);
        hotelApiPromiseMap.delete(key);
      });
  // Only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [activeTab, setActiveTab] = useState<'days' | 'flights' | 'hotel' | 'budget' | 'map'>('days');
  const [activeDay, setActiveDay] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [activeHotelIdx, setActiveHotelIdx] = useState(0);
  const [hotelDetailOpen, setHotelDetailOpen] = useState(false);
  const [streetViewHotel, setStreetViewHotel] = useState<{
    name: string;
    locationText: string;
  } | null>(null);
  const [streetViewLocation, setStreetViewLocation] = useState<{
    name: string;
    description: string;
    type: LocationType;
  } | null>(null);
  const [flightDetailIdx, setFlightDetailIdx] = useState<number | null>(null);
  const [wikiImage, setWikiImage] = useState<string | null>(null);
  const [isReasonExpanded, setIsReasonExpanded] = useState(false);
  // Must Do: track which day indices the user has manually added (non-aligned must-dos)
  const [addedMustDos, setAddedMustDos] = useState<Set<number>>(new Set());
  // Track which cards are expanded to show full description
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      return next;
    });
  };

  useEffect(() => {
    if (itinerary?.destination) {
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(itinerary.destination)}`)
        .then(res => res.json())
        .then(data => {
          if (data.thumbnail?.source) {
            setWikiImage(data.thumbnail.source);
          }
        })
        .catch(() => { });
    }
  }, [itinerary?.destination]);

  // Defensive null-safety for API-returned data that may have different shapes
  const days = itinerary?.days ?? [];
  const durationLabel = deriveDurationLabel(days, itinerary?.duration ?? "");
  const flights = itinerary?.flights ?? [];
  const transfers = itinerary?.transfers ?? [];
  // Guard every breakdown field individually - backend may omit any of them
  const rawBreakdown = itinerary?.breakdown ?? {};
  
  // Dynamically calculate activities cost from the generated itinerary days
  const dynamicActivitiesCost = days.reduce((sum, day) => {
    let daySum = (day.items || []).reduce((s, item) => s + (item.cost || 0), 0);
    if (day.mustDo && day.mustDo.alignsWithPreferences) {
      daySum += (day.mustDo.cost || 0); // Aligned must-dos are part of the base plan
    }
    return sum + daySum;
  }, 0);

  const breakdownActivities = dynamicActivitiesCost > 0 ? dynamicActivitiesCost : ((rawBreakdown as any)?.activities || 0);

  const breakdown = {
    flights: (rawBreakdown as any)?.flights || 0,
    stay: (rawBreakdown as any)?.stay || 0,
    activities: breakdownActivities,
    transfers: (rawBreakdown as any)?.transfers || 0,
  };
  
  // Recalculate total cost to ensure it matches sum of breakdowns exactly
  const totalCost = breakdown.flights + breakdown.stay + breakdown.activities + breakdown.transfers;

  // Extra cost from manually-added non-aligned Must Dos
  const mustDoExtraCost = days.reduce((sum, day, idx) => {
    if (addedMustDos.has(idx) && day.mustDo && !day.mustDo.alignsWithPreferences) {
      return sum + (day.mustDo.cost || 0);
    }
    return sum;
  }, 0);
  const displayedTotalCost = Math.max(0, totalCost + mustDoExtraCost);

  // Budget alignment
  const userBudget = itinerary?.budget || 150000;
  const budgetDiff = userBudget - displayedTotalCost;
  const budgetStatus = budgetDiff >= 0
    ? { label: 'Within Budget', color: '#34C759', icon: TrendingDown }
    : { label: 'Slightly Above', color: '#FF9500', icon: TrendingUp };

  const TABS = [
    { key: 'days' as const, label: 'Days' },
    { key: 'flights' as const, label: 'Flights' },
    { key: 'hotel' as const, label: 'Hotel' },
    { key: 'budget' as const, label: 'Budget' },
    { key: 'map' as const, label: 'Map' },
  ];

  // Always have a valid back handler.
  // We no longer delay this or manipulate internal UI state, as that caused a
  // 'double-exit' condition that worsened Framer Motion's unmount freeze.
  const handleBack = onBack ?? onReset;

  // Build human-readable traveler label e.g. "2 Adults, 1 Child"
  const travelerLabel = (() => {
    const adults = sessionData?.adults ?? sessionData?.travelers ?? 2;
    const children = sessionData?.children ?? 0;
    const parts: string[] = [];
    if (adults > 0) parts.push(`${adults} ${adults === 1 ? 'Adult' : 'Adults'}`);
    if (children > 0) parts.push(`${children} ${children === 1 ? 'Child' : 'Children'}`);
    return parts.length > 0 ? parts.join(', ') : null;
  })();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F5F3FF]">

      {/* ═══ HERO ═══ */}
      <div className="relative h-[220px] flex-shrink-0">
        <motion.button initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} onClick={handleBack}
          className="absolute top-5 left-4 flex items-center gap-1.5 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[13px] font-bold text-[#1A1A1A] shadow-sm z-20">
          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Suggestions
        </motion.button>
        <img
          src={wikiImage || 'https://images.unsplash.com/photo-1499856374114-f0e1a1b0e4b8?w=800&q=80'}
          alt={itinerary.destination}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute bottom-4 left-5 right-5 z-10">
          <p className="text-white/70 text-[11px] font-medium mb-0.5">{itinerary.country}</p>
          <h1 className="text-[24px] font-bold text-white drop-shadow-lg leading-tight">{itinerary.destination}</h1>
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <div className="bg-white px-5 py-3.5 flex items-center gap-3 border-b border-[#F2F2F7]">
        {[
          { icon: Clock, label: durationLabel, color: '#8E8E93' },
          { icon: Star, label: `${itinerary?.matchScore ?? 0}% match`, color: '#FFD233', fill: true },
          { icon: budgetStatus.icon, label: budgetStatus.label, color: budgetStatus.color },
          ...(mustDoExtraCost > 0 ? [{ icon: Sparkles, label: `+₹${mustDoExtraCost.toLocaleString()} added`, color: '#A855F7' }] : []),
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
            <s.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: s.color }}
              {...(s.fill ? { fill: s.color } : {})} />
            <p className="text-[11px] font-semibold text-[#1A1A1A] truncate">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ═══ WHY RECOMMENDED ═══ */}
      {(itinerary as any)?.recommendationReason?.text && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-4 mt-3"
        >
          <button
            onClick={() => setIsReasonExpanded(!isReasonExpanded)}
            className="w-full bg-gradient-to-r from-[#FFFBEA] to-[#FFF8E1] border border-[#FFE082]/40 rounded-2xl px-4 py-3.5 shadow-[0_1px_4px_rgba(255,210,51,0.08)] text-left flex flex-col gap-2 relative overflow-hidden active:scale-[0.98] transition-all"
          >
            {/* Header row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                <p className="text-[12px] font-bold text-[#B8860B] uppercase tracking-wider">Why this was recommended</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#FFE082]/30 flex items-center justify-center flex-shrink-0">
                <motion.div
                  animate={{ rotate: isReasonExpanded ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ChevronDown className="w-3.5 h-3.5 text-[#B8860B]" strokeWidth={2.5} />
                </motion.div>
              </div>
            </div>

            {/* Expandable text */}
            <AnimatePresence initial={false}>
              {isReasonExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="overflow-hidden"//
                >
                  <div className="pt-1 border-t border-[#FFE082]/30 mt-1">
                    <p className="text-[12px] text-[#6B6B6B] leading-relaxed">
                      {(itinerary as any).recommendationReason.text}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      )}

      {/* ═══ TABS ═══ */}
      <div className="bg-white flex border-b border-[#F2F2F7]">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`relative flex-1 py-3 text-[13px] font-semibold capitalize transition-colors ${activeTab === tab.key ? 'text-[#1A1A1A]' : 'text-[#8E8E93]'
              }`}>
            {tab.label}
            {activeTab === tab.key && (
              <motion.div layoutId="tab-line"
                className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#FFD233] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ═══ TAB CONTENT ═══ */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-[210px]">
          {/* ─── DAYS TAB ─── */}
          {activeTab === 'days' && (
            <motion.div key="days" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col" style={{ gap: '14px' }}>
              {days.map((day, dayIdx) => (
                <motion.div key={day.day}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIdx * 0.05 }}//
                >
                  {/* Day header - collapsible */}
                  <button
                    onClick={() => setExpandedDay(expandedDay === dayIdx ? null : dayIdx)}
                    className="w-full flex items-center gap-3 p-3 bg-white rounded-2xl shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFD233] flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-bold text-[#1A1A1A]">D{day.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[14px] text-[#1A1A1A] truncate">{day.title}</p>
                      <p className="text-[11px] text-[#8E8E93]">{day.items.length} activities</p>
                    </div>
                    {expandedDay === dayIdx ? (
                      <ChevronUp className="w-4 h-4 text-[#8E8E93]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8E8E93]" />
                    )}
                  </button>

                  {/* Expanded activities */}
                  <AnimatePresence>
                    <div key="dummy" style={{ display: 'none' }} />
                    {expandedDay === dayIdx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                          {/* ─── TIMELINE (non-aligned pinned card + sorted items) ─── */}
                          <div style={{ paddingTop: '8px', paddingLeft: '24px', borderLeft: '2px solid rgba(255, 210, 51, 0.3)', marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                          {/* NON-ALIGNED: pinned at top */}
                          {day.mustDo && !day.mustDo.alignsWithPreferences && (() => {
                            const md = day.mustDo as MustDoActivity;
                            const isManuallyAdded = addedMustDos.has(dayIdx);
                            const IconComp = TYPE_ICONS[md.type] || Camera;
                            const color = TYPE_COLORS[md.type] || '#8E8E93';
                            return (
                              <div key="mustdo-pinned" className="relative">
                                {/* Gold dot on timeline */}
                                <div className="absolute -left-[23px] top-4 w-3 h-3 rounded-full border-2 border-white bg-[#FFD233]" />
                                <div
                                  onClick={() => toggleCardExpansion(`pinned-mustdo-${dayIdx}`)}
                                  className="bg-[#FFF8E1] rounded-xl p-3 flex items-start gap-3 cursor-pointer"
                                  style={{ border: '1px solid #FFD233', boxShadow: '0 0 0 2px rgba(255,210,51,0.15)' }}
                                >
                                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: color + '15' }}>
                                    <IconComp className="w-4 h-4" style={{ color }} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    {/* Time + badges */}
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                      <span className="text-[10px] font-medium text-[#8E8E93]">{md.type === 'activity' ? '—' : '—'}</span>
                                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#92400E] bg-[#FFD233]/30 px-1.5 py-0.5 rounded-full">Must Do</span>
                                    </div>
                                    <p className="font-semibold text-[13px] text-[#1A1A1A] truncate">{md.activity}</p>
                                    <p className={`text-[11px] text-[#8E8E93] transition-all duration-200 ease-in-out ${expandedCards.has(`pinned-mustdo-${dayIdx}`) ? 'break-words' : 'truncate'}`}>
                                      {md.description}
                                    </p>
                                    {/* Add / Remove */}
                                    <div className="mt-1.5">
                                      {!isManuallyAdded ? (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setAddedMustDos(prev => new Set([...prev, dayIdx]));
                                          }}
                                          className="flex items-center gap-1 text-[10px] font-bold text-[#92400E] bg-[#FFD233]/30 px-2 py-0.5 rounded-full active:opacity-70 transition-opacity"
                                        >
                                          + Add — {md.cost === 0 ? 'not covered' : `₹${md.cost.toLocaleString()}`}
                                        </button>
                                      ) : (
                                        <div className="flex items-center gap-2">
                                          <span className="text-[9px] text-[#065F46] bg-[#D1FAE5] px-2 py-0.5 rounded-full font-semibold">✓ Added</span>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setAddedMustDos(prev => { const s = new Set(prev); s.delete(dayIdx); return s; });
                                            }}
                                            className="text-[9px] font-semibold text-[#FF3B30] bg-[#FF3B30]/10 px-2 py-0.5 rounded-full active:opacity-70"
                                          >
                                            − Remove
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {md.cost !== undefined && (
                                    <span className="text-[11px] font-bold text-[#6B6B6B] flex-shrink-0 whitespace-nowrap mt-0.5">
                                      {md.cost === 0 ? 'not covered' : `₹${md.cost.toLocaleString()}`}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })()}

                          {/* TIMELINE ITEMS + aligned mustDo injected in sort order */}
                          {(() => {
                            const md = day.mustDo as MustDoActivity | undefined;
                            const isAligned = md?.alignsWithPreferences === true;

                            // Build a merged list: regular items + mustDo (if aligned)
                            type TimelineEntry = { isMustDo: true; data: MustDoActivity } | { isMustDo: false; data: typeof day.items[number] };
                            const entries: TimelineEntry[] = [
                              ...day.items.map(it => ({ isMustDo: false as const, data: it })),
                              ...(isAligned && md ? [{ isMustDo: true as const, data: md }] : []),
                            ].sort((a, b) => {
                              const tA = (a.data as any).time ? String((a.data as any).time).split(':').map(Number) : [0, 0];
                              const tB = (b.data as any).time ? String((b.data as any).time).split(':').map(Number) : [0, 0];
                              return (tA[0] * 60 + (tA[1] || 0)) - (tB[0] * 60 + (tB[1] || 0));
                            });

                            return entries.map((entry, idx) => {
                              if (entry.isMustDo) {
                                // ── Aligned Must Do: highlighted inline card ──
                                const m = entry.data;
                                const IconComp = TYPE_ICONS[m.type] || Camera;
                                const color = TYPE_COLORS[m.type] || '#8E8E93';
                                return (
                                  <div key="mustdo-inline" className="relative">
                                    {/* Gold dot */}
                                    <div className="absolute -left-[23px] top-4 w-3 h-3 rounded-full border-2 border-white bg-[#FFD233]" />
                                    <div
                                      onClick={() => toggleCardExpansion(`inline-mustdo-${dayIdx}`)}
                                      className="bg-[#FFF8E1] rounded-xl p-3 mb-2 flex items-start gap-3 cursor-pointer"
                                      style={{ border: '1px solid #FFD233', boxShadow: '0 0 0 2px rgba(255,210,51,0.15)' }}
                                    >
                                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: color + '15' }}>
                                        <IconComp className="w-4 h-4" style={{ color }} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        {/* Time row */}
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                          <p className="text-[10px] font-medium text-[#8E8E93]">{m.time || ''}</p>
                                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#92400E] bg-[#FFD233]/30 px-1.5 py-0.5 rounded-full">Must Do</span>
                                          <span className="text-[9px] font-bold text-white bg-[#34C759] px-1.5 py-0.5 rounded-full">✓ Matches You</span>
                                        </div>
                                        <p className="font-semibold text-[13px] text-[#1A1A1A] truncate">{m.activity}</p>
                                        <p className={`text-[11px] text-[#8E8E93] transition-all duration-200 ease-in-out ${expandedCards.has(`inline-mustdo-${dayIdx}`) ? 'break-words' : 'truncate'}`}>
                                          {m.description}
                                        </p>
                                        {/* Street view for the must-do location */}
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setStreetViewLocation({
                                              name: m.activity,
                                              description: m.description || itinerary.destination,
                                              type: 'sightseeing',
                                            });
                                          }}
                                          className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[#B8860B] bg-[#FFD233]/15 px-2 py-1 rounded-full active:opacity-70 hover:bg-[#FFD233]/25 transition-colors"
                                        >
                                          <MapPin className="w-2.5 h-2.5" />
                                          View Street View
                                        </button>
                                      </div>
                                      {m.cost !== undefined && (
                                        <span className="text-[11px] font-bold text-[#6B6B6B] flex-shrink-0 whitespace-nowrap mt-0.5">
                                          {m.cost === 0 ? 'not covered' : `₹${m.cost.toLocaleString()}`}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              }

                              // ── Regular activity card ──
                              const item = entry.data;
                              const IconComp = TYPE_ICONS[item.type] || Camera;
                              const color = TYPE_COLORS[item.type] || '#8E8E93';
                              const isHotelActivity = item.type === 'travel' && (
                                /hotel|check.?in|check.?out|settle|arrive/i.test(item.activity + ' ' + item.description)
                              ) && itinerary.hotel;
                              return (
                                <div key={idx} className="relative">
                                  {/* Dot on timeline */}
                                  <div className="absolute -left-[23px] top-4 w-3 h-3 rounded-full border-2 border-white"
                                    style={{ backgroundColor: color }} />
                                  <div 
                                    onClick={() => toggleCardExpansion(`item-${dayIdx}-${idx}`)}
                                    className="bg-[#F9F9FB] rounded-xl p-3 mb-2 flex items-start gap-3 cursor-pointer"
                                  >
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                      style={{ backgroundColor: color + '15' }}>
                                      <IconComp className="w-4 h-4" style={{ color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[10px] font-medium text-[#8E8E93]">{item.time}</p>
                                      <p className="font-semibold text-[13px] text-[#1A1A1A] truncate">{item.activity}</p>
                                      <p className={`text-[11px] text-[#8E8E93] transition-all duration-200 ease-in-out ${expandedCards.has(`item-${dayIdx}-${idx}`) ? 'break-words' : 'truncate'}`}>
                                        {item.description}
                                      </p>
                                      {isHotelActivity && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setStreetViewHotel({
                                              name: (itinerary.hotel as any).name,
                                              locationText: (itinerary.hotel as any).address || (itinerary.hotel as any).location || itinerary.destination,
                                            });
                                          }}
                                          className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[#5B8FB9] bg-[#5B8FB9]/10 px-2 py-1 rounded-full active:opacity-70"
                                        >
                                          <Map className="w-2.5 h-2.5" />
                                          View Hotel Street View
                                        </button>
                                      )}
                                      {!isHotelActivity && (item.type === 'activity' || item.type === 'food' || item.type === 'relax') && (
                                        <button
                                          onClick={() => setStreetViewLocation({
                                            name: item.activity,
                                            description: item.description || itinerary.destination,
                                            type: item.type === 'food' ? 'restaurant' : item.type === 'relax' ? 'relax' : 'sightseeing',
                                          })}
                                          className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[#B8860B] bg-[#FFD233]/15 px-2 py-1 rounded-full active:opacity-70 hover:bg-[#FFD233]/25 transition-colors"
                                        >
                                          <MapPin className="w-2.5 h-2.5" />
                                          View Street View
                                        </button>
                                      )}
                                    </div>
                                    {item.cost !== undefined && (
                                      <span className="text-[11px] font-bold text-[#6B6B6B] flex-shrink-0 whitespace-nowrap mt-0.5">
                                        {item.cost === 0 ? 'not covered' : `₹${item.cost.toLocaleString()}`}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            });
                          })()}

                          </div>{/* end timeline wrapper */}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ─── FLIGHTS TAB ─── */}
          {activeTab === 'flights' && (
            <motion.div key="flights" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col" style={{ gap: '16px' }}>
              {/* HotelAPI loading skeleton */}
              {hotelApiLoading && (
                <div className="flex flex-col gap-4">
                  <div className="bg-white/70 rounded-2xl p-4 flex flex-col gap-3 animate-pulse">
                    <div className="h-6 w-32 bg-[#E5E5EA] rounded-lg" />
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-20 bg-[#E5E5EA] rounded-lg" />
                      <div className="h-4 w-24 bg-[#E5E5EA] rounded-full" />
                      <div className="h-8 w-20 bg-[#E5E5EA] rounded-lg" />
                    </div>
                    <div className="h-4 w-40 bg-[#E5E5EA] rounded-lg self-center" />
                  </div>
                  <div className="bg-white/70 rounded-2xl p-4 flex flex-col gap-3 animate-pulse">
                    <div className="h-6 w-32 bg-[#E5E5EA] rounded-lg" />
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-20 bg-[#E5E5EA] rounded-lg" />
                      <div className="h-4 w-24 bg-[#E5E5EA] rounded-full" />
                      <div className="h-8 w-20 bg-[#E5E5EA] rounded-lg" />
                    </div>
                    <div className="h-4 w-40 bg-[#E5E5EA] rounded-lg self-center" />
                  </div>
                  <p className="text-center text-[12px] text-[#8E8E93] animate-pulse">Fetching live flights…</p>
                </div>
              )}
              {!hotelApiLoading && flights.map((flight: any, i: number) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => setFlightDetailIdx(i)}
                >
                  {/* Header */}
                  <div className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider ${flight.type === 'departure' ? 'bg-[#5B8FB9]/10 text-[#5B8FB9]' : 'bg-[#FFD233]/10 text-[#F5A623]'
                    }`}>
                    {flight.type === 'departure' ? '✈️ Outbound Flight' : '✈️ Return Flight'}
                  </div>

                  <div className="p-4">
                    {/* Overall Route Summary */}
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[13px] font-semibold text-[#1A1A1A]">{flight.airline}</p>
                      <span className="text-[11px] text-[#8E8E93] font-medium">{flight.flightNo}</span>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-[18px] font-bold text-[#1A1A1A]">{flight.from}</p>
                        <p className="text-[11px] text-[#8E8E93]">{flight.departure}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-1.5">
                        <div className="h-[1px] flex-1 bg-[#E5E5EA]" />
                        <Plane className="w-4 h-4 text-[#8E8E93] rotate-90" />
                        <div className="h-[1px] flex-1 bg-[#E5E5EA]" />
                      </div>
                      <div className="text-center">
                        <p className="text-[18px] font-bold text-[#1A1A1A]">{flight.to}</p>
                        <p className="text-[11px] text-[#8E8E93]">{flight.arrival}</p>
                      </div>
                    </div>

                    {/* ── Segment-by-Segment Breakdown (for multi-stop flights) ── */}
                    {flight.segments && flight.segments.length > 1 && (
                      <div className="mt-3 pt-3 border-t border-[#F2F2F7]">
                        <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider mb-2">Route Details</p>
                        <div className="flex flex-col gap-0">
                          {flight.segments.map((seg: any, si: number) => (
                            <div key={si}>
                              {/* Each Leg */}
                              <div className="flex items-center gap-2 py-1.5">
                                <div className="w-5 h-5 rounded-full bg-[#5B8FB9]/10 flex items-center justify-center flex-shrink-0">
                                  <Plane className="w-3 h-3 text-[#5B8FB9] rotate-90" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-semibold text-[#1A1A1A]">
                                    {seg.from} → {seg.to}
                                    <span className="text-[#8E8E93] font-normal ml-1">({seg.flightNo})</span>
                                  </p>
                                  <p className="text-[10px] text-[#8E8E93]">
                                    {seg.airline} · {seg.departure} – {seg.arrival} · {seg.duration}
                                  </p>
                                </div>
                              </div>
                              {/* Layover indicator between segments */}
                              {seg.layover && (
                                <div className="flex items-center gap-2 py-1 ml-2.5 border-l-2 border-dashed border-[#FFD233]/60 pl-3">
                                  <span className="text-[10px] text-[#F5A623] font-medium">
                                    ⏱ {seg.layover} layover in {flight.segments[si + 1]?.fromCity || flight.segments[si + 1]?.from}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {flight.baggage && (
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#F2F2F7] text-[10px] text-[#8E8E93]">
                        <span className="flex items-center gap-1">🧳 Check-in: <span className="text-[#1A1A1A] font-medium">{flight.baggage}</span></span>
                        <span className="flex items-center gap-1">🎒 Cabin: <span className="text-[#1A1A1A] font-medium">{flight.cabinBaggage}</span></span>
                      </div>
                    )}
                    <div className={flight.baggage ? "flex items-center justify-between mt-2 pt-2" : "flex items-center justify-between mt-3 pt-3 border-t border-[#F2F2F7]"}>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-[#8E8E93] font-medium">
                          {flight.stops === undefined ? '' : (flight.stops === 0 ? 'Non-stop • ' : `${flight.stops} Stop(s) • `)}{flight.duration}
                        </span>
                        {flight.isRefundable !== undefined && (
                          <span className={`text-[10px] ${flight.isRefundable ? "text-[#34C759]" : "text-[#FF3B30]"} font-medium`}>
                            {flight.isRefundable ? "Refundable" : "Non-refundable"}
                          </span>
                        )}
                      </div>
                      <span className="text-[16px] font-bold text-[#1A1A1A]">₹{(flight.cost || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Total */}
              <div className="bg-[#F2F2F7] rounded-xl p-3 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#8E8E93]">Total Flight Cost</span>
                <span className="text-[14px] font-bold text-[#1A1A1A]">
                  ₹{flights.reduce((s, f) => s + (f.cost || 0), 0).toLocaleString()}
                </span>
              </div>

              <p className="text-[10px] text-[#8E8E93]/50 text-center">Live prices from HotelAPI Flights API</p>

              {/* ── Flight Detail Bottom Sheet ── */}
              <AnimatePresence>
                <div key="dummy" style={{ display: 'none' }} />
                {flightDetailIdx !== null && flights[flightDetailIdx] && (() => {
                  const fl: any = flights[flightDetailIdx];
                  return (
                    <motion.div className="fixed inset-0 z-50 flex flex-col justify-end"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="absolute inset-0 bg-black/50" onClick={() => setFlightDetailIdx(null)} />
                      <motion.div className="relative bg-white rounded-t-3xl max-h-[92vh] overflow-y-auto"
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}>

                        {/* Handle + Header */}
                        <div className="sticky top-0 bg-white z-10 px-5 pt-4 pb-3 border-b border-[#F2F2F7]">
                          <div className="w-10 h-1 bg-[#E5E5EA] rounded-full mx-auto mb-3" />
                          <div className="flex items-center gap-3">
                            <button onClick={() => setFlightDetailIdx(null)}
                              className="w-7 h-7 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#1A1A1A] text-lg font-bold flex-shrink-0">×</button>
                            <h2 className="text-[16px] font-bold text-[#1A1A1A] truncate">
                              {fl.type === 'departure' ? '✈️ Outbound' : '✈️ Return'} · {fl.from} → {fl.to}
                            </h2>
                          </div>
                        </div>

                        <div className="px-5 py-4 flex flex-col gap-4">

                          {/* ── Overview Row ── */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-[#F9F9FB] rounded-xl p-3 text-center">
                              <p className="text-[10px] text-[#8E8E93] font-medium">Duration</p>
                              <p className="text-[14px] font-bold text-[#1A1A1A]">{fl.duration}</p>
                            </div>
                            <div className="bg-[#F9F9FB] rounded-xl p-3 text-center">
                              <p className="text-[10px] text-[#8E8E93] font-medium">Stops</p>
                              <p className="text-[14px] font-bold text-[#1A1A1A]">{fl.stops === 0 ? 'Non-stop' : `${fl.stops} Stop(s)`}</p>
                            </div>
                            <div className="bg-[#F9F9FB] rounded-xl p-3 text-center">
                              <p className="text-[10px] text-[#8E8E93] font-medium">Class</p>
                              <p className="text-[14px] font-bold text-[#1A1A1A]">{fl.cabinClass || 'Economy'}</p>
                            </div>
                          </div>

                          {/* ── Segment Timeline ── */}
                          <div>
                            <h3 className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-3">Flight Route</h3>
                            <div className="flex flex-col">
                              {(fl.segments || []).map((seg: any, si: number) => (
                                <div key={si}>
                                  <div className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                      <div className="w-3 h-3 rounded-full bg-[#5B8FB9] border-2 border-white shadow-sm" />
                                      <div className="w-0.5 flex-1 bg-[#E5E5EA]" />
                                      <div className="w-3 h-3 rounded-full bg-[#5B8FB9] border-2 border-white shadow-sm" />
                                    </div>
                                    <div className="flex-1 pb-2">
                                      <div className="bg-[#F9F9FB] rounded-xl p-3">
                                        <div className="flex items-center justify-between mb-1">
                                          <p className="text-[12px] font-bold text-[#1A1A1A]">{seg.flightNo}</p>
                                          <span className="text-[10px] text-[#8E8E93]">{seg.aircraft !== 'N/A' ? `✈ ${seg.aircraft}` : ''}</span>
                                        </div>
                                        <p className="text-[11px] text-[#8E8E93] mb-2">{seg.airline}</p>

                                        <div className="flex justify-between items-start">
                                          <div>
                                            <p className="text-[13px] font-bold text-[#1A1A1A]">{seg.departure}</p>
                                            <p className="text-[10px] text-[#8E8E93]">{seg.fromAirport || seg.from}</p>
                                            <p className="text-[10px] font-medium text-[#1A1A1A]">{seg.fromCity} ({seg.fromAirportCode || seg.from})</p>
                                            {seg.depDate && <p className="text-[9px] text-[#8E8E93]">{seg.depDate}</p>}
                                          </div>
                                          <div className="flex flex-col items-center px-2">
                                            <p className="text-[10px] text-[#8E8E93]">{seg.duration}</p>
                                            <div className="w-12 h-[1px] bg-[#E5E5EA] my-1" />
                                            <Plane className="w-3 h-3 text-[#5B8FB9] rotate-90" />
                                          </div>
                                          <div className="text-right">
                                            <p className="text-[13px] font-bold text-[#1A1A1A]">{seg.arrival}</p>
                                            <p className="text-[10px] text-[#8E8E93]">{seg.toAirport || seg.to}</p>
                                            <p className="text-[10px] font-medium text-[#1A1A1A]">{seg.toCity} ({seg.toAirportCode || seg.to})</p>
                                            {seg.arrDate && <p className="text-[9px] text-[#8E8E93]">{seg.arrDate}</p>}
                                          </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-[#F2F2F7]">
                                          <span className="text-[9px] bg-[#5B8FB9]/10 text-[#5B8FB9] px-2 py-0.5 rounded-full font-medium">{seg.cabinClass || 'Economy'}</span>
                                          {seg.seatsAvailable > 0 && <span className="text-[9px] bg-[#34C759]/10 text-[#34C759] px-2 py-0.5 rounded-full font-medium">{seg.seatsAvailable} seats left</span>}
                                          {seg.baggage && <span className="text-[9px] bg-[#8E8E93]/10 text-[#8E8E93] px-2 py-0.5 rounded-full">🧳 {seg.baggage}</span>}
                                          {seg.cabinBaggage && <span className="text-[9px] bg-[#8E8E93]/10 text-[#8E8E93] px-2 py-0.5 rounded-full">🎒 {seg.cabinBaggage}</span>}
                                          {seg.isETicket && <span className="text-[9px] bg-[#FFD233]/10 text-[#F5A623] px-2 py-0.5 rounded-full">🎫 E-Ticket</span>}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Layover */}
                                  {seg.layover && (
                                    <div className="flex gap-3 -mt-1 mb-1">
                                      <div className="flex flex-col items-center">
                                        <div className="w-0.5 h-full bg-[#FFD233]/50" />
                                      </div>
                                      <div className="bg-[#FFFBEA] rounded-lg p-2 flex-1">
                                        <p className="text-[10px] text-[#F5A623] font-semibold">⏱ {seg.layover} layover in {fl.segments[si + 1]?.fromCity || fl.segments[si + 1]?.from}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ── Fare Breakdown ── */}
                          <div>
                            <h3 className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-2">Fare Breakdown</h3>
                            <div className="bg-[#F9F9FB] rounded-xl p-3 flex flex-col gap-1.5">
                              <div className="flex justify-between">
                                <span className="text-[11px] text-[#8E8E93]">Base Fare</span>
                                <span className="text-[11px] font-medium text-[#1A1A1A]">₹{(fl.baseFare || 0).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[11px] text-[#8E8E93]">Taxes & Fees</span>
                                <span className="text-[11px] font-medium text-[#1A1A1A]">₹{(fl.tax || 0).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between pt-1.5 border-t border-[#E5E5EA]">
                                <span className="text-[12px] font-bold text-[#1A1A1A]">Total</span>
                                <span className="text-[14px] font-bold text-[#1A1A1A]">₹{(fl.cost || 0).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* ── Additional Info ── */}
                          <div>
                            <h3 className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-2">Additional Information</h3>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-[#F9F9FB] rounded-xl p-3">
                                <p className="text-[10px] text-[#8E8E93]">Aircraft</p>
                                <p className="text-[12px] font-semibold text-[#1A1A1A]">{fl.aircraft || 'N/A'}</p>
                              </div>
                              <div className="bg-[#F9F9FB] rounded-xl p-3">
                                <p className="text-[10px] text-[#8E8E93]">Refundable</p>
                                <p className={`text-[12px] font-semibold ${fl.isRefundable ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                                  {fl.isRefundable ? 'Yes ✓' : 'No ✕'}
                                </p>
                              </div>
                              <div className="bg-[#F9F9FB] rounded-xl p-3">
                                <p className="text-[10px] text-[#8E8E93]">E-Ticket</p>
                                <p className="text-[12px] font-semibold text-[#1A1A1A]">{fl.isETicket ? 'Available ✓' : 'N/A'}</p>
                              </div>
                              <div className="bg-[#F9F9FB] rounded-xl p-3">
                                <p className="text-[10px] text-[#8E8E93]">Departure</p>
                                <p className="text-[12px] font-semibold text-[#1A1A1A]">{fl.depDate || 'N/A'}</p>
                              </div>
                            </div>
                          </div>

                          {/* Baggage Summary */}
                          <div className="bg-[#F9F9FB] rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[12px] font-bold text-[#1A1A1A]">Baggage</span>
                            </div>
                            <div className="flex gap-4 text-[11px] text-[#8E8E93]">
                              <span>🧳 Check-in: <span className="text-[#1A1A1A] font-medium">{fl.baggage || 'N/A'}</span></span>
                              <span>🎒 Cabin: <span className="text-[#1A1A1A] font-medium">{fl.cabinBaggage || 'N/A'}</span></span>
                            </div>
                          </div>

                          <p className="text-[9px] text-[#8E8E93]/50 text-center pb-4">All data sourced from HotelAPI Air API · Live pricing</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ─── HOTEL TAB ─── */}
          {activeTab === 'hotel' && (() => {
            // Show skeleton while HotelAPI is still fetching
            if (hotelApiLoading) {
              return (
                <motion.div key="hotel-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col gap-4">
                  <div className="bg-white/70 rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-[190px] bg-[#E5E5EA]" />
                    <div className="p-4 flex flex-col gap-3">
                      <div className="h-5 w-48 bg-[#E5E5EA] rounded-lg" />
                      <div className="h-4 w-32 bg-[#E5E5EA] rounded-lg" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-[#E5E5EA] rounded-full" />
                        <div className="h-6 w-16 bg-[#E5E5EA] rounded-full" />
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-[12px] text-[#8E8E93] animate-pulse">Booking the best hotel for you…</p>
                </motion.div>
              );
            }
            // Guard: hotel may be null if backend couldn't find one
            if (!itinerary.hotel) {
              return (
                <motion.div key="hotel-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#F5F3FF] flex items-center justify-center">
                    <Hotel className="w-7 h-7 text-[#8E8E93]" />
                  </div>
                  <h3 className="font-bold text-[16px] text-[#1A1A1A]">No Hotel Selected</h3>
                  <p className="text-[13px] text-[#8E8E93] text-center px-4 leading-relaxed">
                    We couldn't find a suitable hotel within your budget. Don't worry, you can always book one later.
                  </p>
                </motion.div>
              );
            }

            const hotelList: any[] = (itinerary.hotel as any).hotels?.length
              ? (itinerary.hotel as any).hotels
              : [itinerary.hotel];
            const hotel = hotelList[Math.min(activeHotelIdx, hotelList.length - 1)];

            const KEY_FACILITIES = ['wifi', 'WiFi', 'Parking', 'Restaurant', 'Bar',
              'Air conditioning', 'Room service', 'Swimming pool', 'Gym', 'Spa',
              'Sauna', 'Lift', 'Heating', 'Concierge'];
            const topFacilities: string[] = (hotel.facilities || [])
              .filter((f: string) => KEY_FACILITIES.some(k => f.toLowerCase().includes(k.toLowerCase())))
              .slice(0, 6);

            return (
              <motion.div key="hotel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col" style={{ gap: '16px' }}>

                {/* ── Main hotel card (tap for details) ── */}
                <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer active:opacity-90"
                  onClick={() => setHotelDetailOpen(true)}>
                  <div className="relative h-[190px]">
                    <img src={hotel.image} alt={hotel.name}
                      className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {/* Rank badge top-left */}
                    {hotel.rankBadge && (
                      <div className="absolute top-3 left-3 bg-[#FFD233] rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
                        <span className="text-[10px] font-bold text-[#1A1A1A]">{hotel.rankBadge === 'Best Match' ? '🎯' : hotel.rankBadge === 'Best Value' ? '💰' : '⭐'} {hotel.rankBadge}</span>
                      </div>
                    )}
                    {/* Live + rating */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      {hotel.isHotelAPILive && (
                        <div className="bg-[#34C759]/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                          <span className="text-[10px] font-bold text-white">● LIVE</span>
                        </div>
                      )}
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FFD233]" fill="#FFD233" />
                        <span className="text-[12px] font-bold text-[#1A1A1A]">{hotel.rating}/5</span>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <span className="text-[10px] text-white font-medium">Tap for details →</span>
                    </div>
                    {/* Rank score pill bottom-left */}
                    {hotel.rankScore && (
                      <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                        <span className="text-[11px] font-bold text-white">{hotel.rankScore}/100 Match</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-[16px] font-bold text-[#1A1A1A]">{hotel.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#8E8E93]" />
                      <p className="text-[12px] text-[#8E8E93]">{hotel.address || hotel.location}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setStreetViewHotel({
                          name: hotel.name,
                          locationText: hotel.address || hotel.location || itinerary.destination,
                        });
                      }}
                      className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#5B8FB9] px-3 py-1.5 rounded-full active:opacity-80 shadow-sm"
                    >
                      <Map className="w-3 h-3" />
                      View Street View
                    </button>
                    {/* Why this hotel - AI explanation tags */}
                    {hotel.rankExplanation?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {hotel.rankExplanation.map((reason: string, i: number) => (
                          <span key={i} className="text-[10px] bg-[#FFD233]/15 text-[#B8860B] px-2 py-0.5 rounded-full font-medium">✓ {reason}</span>
                        ))}
                      </div>
                    )}
                    {topFacilities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {topFacilities.slice(0, 4).map((f: string) => (
                          <span key={f} className="text-[10px] bg-[#F2F2F7] text-[#6B6B6B] px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                        {topFacilities.length > 4 && (
                          <span className="text-[10px] bg-[#F2F2F7] text-[#6B6B6B] px-2 py-0.5 rounded-full">+{(hotel.facilities?.length || 0) - 4} more</span>
                        )}
                      </div>
                    )}
                    <div className="mt-3 pt-3 border-t border-[#F2F2F7] flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-[#8E8E93]">{hotel.nights} nights · {hotel.mealType || 'Room Only'}</p>
                        <p className="text-[11px] text-[#8E8E93]">₹{Math.round(hotel.totalCost / hotel.nights).toLocaleString()}/night</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[18px] font-bold text-[#1A1A1A]">₹{hotel.totalCost?.toLocaleString()}</p>
                        {hotel.isRefundable && <p className="text-[10px] text-[#34C759]">Free cancellation</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Other option pills ── */}
                {hotelList.length > 1 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide">Top Ranked Options</p>
                    {hotelList.map((h: any, i: number) => (
                      <div key={i} onClick={() => setActiveHotelIdx(i)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left cursor-pointer ${i === activeHotelIdx ? 'border-[#FFD233] bg-[#FFFBEA]' : 'border-[#F2F2F7] bg-white'}`}>
                        <div className="relative flex-shrink-0">
                          <img src={h.image} alt={h.name} className="w-12 h-12 rounded-lg object-cover" />
                          {h.rankScore && (
                            <div className="absolute -top-1.5 -right-1.5 bg-[#FFD233] rounded-full w-5 h-5 flex items-center justify-center">
                              <span className="text-[7px] font-bold text-[#1A1A1A]">{h.rankScore}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{h.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-[#FFD233]" fill="#FFD233" />
                              <span className="text-[11px] text-[#8E8E93]">{h.rating}/5</span>
                            </div>
                            {h.rankBadge && (
                              <span className="text-[9px] font-bold text-[#B8860B] bg-[#FFD233]/20 px-1.5 py-0.5 rounded-full">{h.rankBadge}</span>
                            )}
                          </div>
                        </div>
                        <p className="text-[13px] font-bold text-[#1A1A1A] flex-shrink-0">₹{h.totalCost?.toLocaleString()}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setStreetViewHotel({
                              name: h.name,
                              locationText: h.address || h.location || itinerary.destination,
                            });
                          }}
                          className="ml-2 text-[10px] font-bold text-[#5B8FB9] bg-[#5B8FB9]/10 px-2 py-1 rounded-full flex-shrink-0"
                        >
                          Street View
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Transfers */}
                <h3 className="font-bold text-[14px] text-[#1A1A1A] pt-1">Transfers</h3>
                {transfers.map((t, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8E8E93]/10 flex items-center justify-center">
                      <Car className="w-4 h-4 text-[#8E8E93]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[#1A1A1A] truncate">{t.from} → {t.to}</p>
                      <p className="text-[10px] text-[#8E8E93]">{t.type}</p>
                    </div>
                    <span className="text-[12px] font-bold text-[#6B6B6B]">₹{t.cost.toLocaleString()}</span>
                  </div>
                ))}
                <p className="text-[10px] text-[#8E8E93]/50 text-center">Powered by HotelAPI Hotels API · Live pricing</p>

                {/* ── Full Detail Bottom Sheet ── */}
                <AnimatePresence>
                  <div key="dummy" style={{ display: 'none' }} />
                  {hotelDetailOpen && (
                    <motion.div className="fixed inset-0 z-50 flex flex-col justify-end"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="absolute inset-0 bg-black/50" onClick={() => setHotelDetailOpen(false)} />
                      <motion.div className="relative bg-white rounded-t-3xl max-h-[92vh] overflow-y-auto"
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}>

                        {/* Handle + header */}
                        <div className="sticky top-0 bg-white z-10 px-5 pt-4 pb-3 border-b border-[#F2F2F7]">
                          <div className="w-10 h-1 bg-[#E5E5EA] rounded-full mx-auto mb-3" />
                          <div className="flex items-center gap-3">
                            <button onClick={() => setHotelDetailOpen(false)}
                              className="w-7 h-7 rounded-full bg-[#F2F2F7] flex items-center justify-center flex-shrink-0 text-[#1A1A1A] text-lg font-bold">×</button>
                            <h2 className="text-[16px] font-bold text-[#1A1A1A] truncate pr-8">{hotel.name}</h2>
                          </div>
                        </div>

                        {/* Image gallery */}
                        {(hotel.images || []).length > 0 && (
                          <div className="flex gap-2 px-5 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                            {(hotel.images as string[]).map((img: string, i: number) => (
                              <img key={i} src={img} alt={`${hotel.name} ${i + 1}`}
                                className={`flex-shrink-0 rounded-xl object-cover ${i === 0 ? 'w-56 h-40' : 'w-32 h-40'}`} />
                            ))}
                          </div>
                        )}

                        <div className="px-5 pb-10 flex flex-col gap-5">
                          {/* Rating + price + address */}
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-[#FFD233]" fill="#FFD233" />
                                ))}
                                <span className="text-[12px] text-[#8E8E93] ml-1">{hotel.rating} stars</span>
                              </div>
                              <div className="flex items-start gap-1">
                                <MapPin className="w-3 h-3 text-[#8E8E93] mt-0.5 flex-shrink-0" />
                                <p className="text-[12px] text-[#8E8E93]">{hotel.address}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-[22px] font-bold text-[#1A1A1A]">₹{hotel.totalCost?.toLocaleString()}</p>
                              <p className="text-[11px] text-[#8E8E93]">{hotel.nights} nights total</p>
                            </div>
                          </div>

                          {/* Check-in / Check-out / Policy */}
                          <div className="flex gap-2">
                            <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3 text-center">
                              <p className="text-[10px] text-[#8E8E93] font-medium mb-1">Check-in</p>
                              <p className="text-[15px] font-bold text-[#1A1A1A]">{hotel.checkInTime || '15:00'}</p>
                            </div>
                            <div className="flex-1 bg-[#F2F2F7] rounded-xl p-3 text-center">
                              <p className="text-[10px] text-[#8E8E93] font-medium mb-1">Check-out</p>
                              <p className="text-[15px] font-bold text-[#1A1A1A]">{hotel.checkOutTime || '11:00'}</p>
                            </div>
                            <div className="flex-1 rounded-xl p-3 text-center"
                              style={{ backgroundColor: hotel.isRefundable ? '#EDFBF1' : '#FFF3E0' }}>
                              <p className="text-[10px] text-[#8E8E93] font-medium mb-1">Policy</p>
                              <p className="text-[11px] font-bold"
                                style={{ color: hotel.isRefundable ? '#34C759' : '#FF9500' }}>
                                {hotel.isRefundable ? '✓ Refundable' : 'Non-refund'}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          {hotel.description && (
                            <div>
                              <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-2">About</h3>
                              <p className="text-[13px] text-[#6B6B6B] leading-relaxed">
                                {hotel.description.replace(/<[^>]*>/g, '').substring(0, 400)}
                                {hotel.description.length > 400 ? '...' : ''}
                              </p>
                            </div>
                          )}

                          {/* Facilities */}
                          {(hotel.facilities || []).length > 0 && (
                            <div>
                              <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-2">Facilities</h3>
                              <div className="flex flex-wrap gap-1.5">
                                {(hotel.facilities as string[]).slice(0, 24).map((f: string) => (
                                  <span key={f} className="text-[11px] bg-[#F2F2F7] text-[#5B5B5B] px-2.5 py-1 rounded-full">{f}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Room options */}
                          {(hotel.rooms || []).length > 0 && (
                            <div>
                              <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-2">Available Rooms</h3>
                              <div className="flex flex-col gap-2">
                                {(hotel.rooms as any[]).map((r: any, i: number) => (
                                  <div key={i} className="border border-[#F2F2F7] rounded-xl p-3 flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                      <p className="text-[12px] font-semibold text-[#1A1A1A]">{r.name}</p>
                                      <p className="text-[10px] text-[#8E8E93] mt-0.5">{r.mealType}{r.inclusion ? ` · ${r.inclusion}` : ''}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-[14px] font-bold text-[#1A1A1A]">₹{r.totalFareINR?.toLocaleString()}</p>
                                      <p className={`text-[10px] ${r.isRefundable ? 'text-[#34C759]' : 'text-[#FF9500]'}`}>
                                        {r.isRefundable ? 'Free cancel' : 'Non-refund'}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Attractions */}
                          {(hotel.attractions || []).length > 0 && (
                            <div>
                              <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-2">Nearby Attractions</h3>
                              <div className="flex flex-col gap-2">
                                {(hotel.attractions as string[]).slice(0, 5).map((a: string, i: number) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD233] flex-shrink-0" />
                                    <p className="text-[13px] text-[#6B6B6B]">{a}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Contact */}
                          {(hotel.phone || hotel.email || hotel.website) && (
                            <div>
                              <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-2">Contact</h3>
                              {hotel.phone && <p className="text-[13px] text-[#5B8FB9]">📞 {hotel.phone}</p>}
                              {hotel.email && <p className="text-[13px] text-[#5B8FB9] mt-1">✉️ {hotel.email}</p>}
                              {hotel.website && <p className="text-[13px] text-[#5B8FB9] mt-1 truncate">🌐 {hotel.website}</p>}
                            </div>
                          )}
                        </div>


                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })()}


          {/* ─── MAP TAB ─── */}
          {activeTab === 'map' && (() => {
            // Resolve city landmarks from our predefined data file.
            // getCityMapData does a case-insensitive lookup.
            const mapData = getCityMapData(itinerary.destination);

            if (!mapData) {
              return (
                <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 gap-3">
                  <MapPin className="w-10 h-10 text-[#E5E5EA]" />
                  <p className="text-[14px] font-semibold text-[#8E8E93]">Map coming soon</p>
                  <p className="text-[12px] text-[#8E8E93]/60 text-center px-8">
                    Landmark data for {itinerary.destination} hasn't been added yet.
                  </p>
                </motion.div>
              );
            }

            return (
              <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/*
                  CityMap responsibilities:
                  - Loads Google Maps script once (cached across re-renders)
                  - Renders satellite view centred on city coords
                  - Drops yellow landmark pin markers
                  - Shows Street View Static API preview on pin tap (lazy - no upfront API call)
                */}
                <CityMap
                  cityName={itinerary.destination}
                  mapData={mapData}
                />
              </motion.div>
            );
          })()}

          {/* placeholder – modal moved to root */}


          {/* ─── BUDGET TAB ─── */}
          {activeTab === 'budget' && (
            <motion.div key="budget" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col" style={{ gap: '16px' }}>
              {hotelApiLoading && (
                <div className="flex flex-col gap-4">
                  <div className="bg-[#E5E5EA] rounded-2xl h-24 animate-pulse" />
                  <div className="flex flex-col gap-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="bg-white/70 rounded-xl h-12 animate-pulse" />
                    ))}
                  </div>
                  <p className="text-center text-[12px] text-[#8E8E93] animate-pulse">Calculating your live budget…</p>
                </div>
              )}
              {!hotelApiLoading && <>
              {/* Total card */}
              <div className="bg-[#1A1A1A] rounded-2xl p-5 text-white">
                <p className="text-[12px] text-white/50 font-medium mb-1">Total Trip Cost</p>
                <p className="text-3xl font-bold">₹{displayedTotalCost.toLocaleString()}</p>
                {travelerLabel && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFD233]/15 text-[#FFD233]">
                      Cost for {travelerLabel}
                    </span>
                  </div>
                )}
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                  <budgetStatus.icon className="w-4 h-4" style={{ color: budgetStatus.color }} />
                  <p className="text-[12px] font-medium" style={{ color: budgetStatus.color }}>{budgetStatus.label}</p>
                  {budgetDiff >= 0 && (
                    <span className="ml-auto text-[12px] text-white/40">Save ₹{budgetDiff.toLocaleString()}</span>
                  )}
                </div>
              </div>

              {/* Budget bar */}
              <div className="bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                <div className="flex justify-between text-[11px] text-[#8E8E93] mb-2">
                  <span>₹0</span><span>Budget: ₹{userBudget.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-[#F2F2F7] rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (displayedTotalCost / userBudget) * 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: budgetDiff >= 0 ? '#34C759' : '#FF9500' }}
                  />
                </div>
              </div>

              {/* Breakdown items */}
              <h3 className="font-bold text-[14px] text-[#1A1A1A] pt-1">Breakdown</h3>
              {[
                { label: 'Flights', val: breakdown.flights, icon: Plane, color: '#5B8FB9' },
                { label: 'Accommodation', val: breakdown.stay, icon: Hotel, color: '#FFD233' },
                { label: 'Activities', val: breakdown.activities, icon: Camera, color: '#34C759' },
                { label: 'Transfers', val: breakdown.transfers, icon: Car, color: '#8E8E93' },
                ...(mustDoExtraCost > 0 ? [{ label: 'Must Do Add-ons', val: mustDoExtraCost, icon: Sparkles, color: '#A855F7' }] : []),
              ].map(item => {
                const pct = displayedTotalCost > 0 ? Math.round((item.val / displayedTotalCost) * 100) : 0;
                return (
                  <div key={item.label} className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.color + '15' }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="text-[12px] font-semibold text-[#1A1A1A]">{item.label}</p>
                        <p className="text-[13px] font-bold text-[#1A1A1A]">₹{(item.val || 0).toLocaleString()}</p>
                      </div>
                      <div className="h-[3px] bg-[#F2F2F7] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                      </div>
                      <p className="text-[10px] text-[#8E8E93] mt-0.5">{pct}% of total</p>
                    </div>
                  </div>
                );
              })}

              <p className="text-[10px] text-[#8E8E93]/50 text-center pt-1">Real-time pricing · Live availability</p>

              {/* Travel Cash Discount */}
              {travelCashBalance > 0 && (
                <div className="bg-gradient-to-r from-[#FFD233]/20 to-[#F5A623]/10 rounded-2xl p-4 border border-[#FFD233]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFD233]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🎁</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-bold text-[#1A1A1A]">Travel Cash Applied</p>
                      <p className="text-[11px] text-[#8E8E93]">From your previous booking rewards</p>
                    </div>
                    <p className="text-[16px] font-bold text-[#34C759]">-₹{Math.min(travelCashBalance, displayedTotalCost).toLocaleString()}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#FFD233]/20 flex justify-between items-center">
                    <p className="text-[12px] font-semibold text-[#1A1A1A]">Effective Cost</p>
                    <p className="text-[18px] font-bold text-[#1A1A1A]">₹{Math.max(0, displayedTotalCost - travelCashBalance).toLocaleString()}</p>
                  </div>
                </div>
              )}
              </>}
            </motion.div>
          )}
      </div>

      {/* ═══ BOTTOM CTA + OPTIMIZATION ═══ */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-20"
        style={{ background: 'linear-gradient(to top, #F5F3FF 80%, transparent)' }}>



        <div className="px-5 pb-6 pt-1">
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={onBook}
            className="w-full py-4 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,210,51,0.35)]">
            Book This Trip · ₹{displayedTotalCost.toLocaleString()}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          {travelerLabel && (
            <p className="text-center text-[11px] text-[#8E8E93] mt-1.5">
              for {travelerLabel}
            </p>
          )}
          <button onClick={onReset}
            className="w-full mt-2 py-2 text-[12px] font-medium text-[#8E8E93] flex items-center justify-center gap-1.5 active:opacity-60">
            <RefreshCw className="w-3 h-3" /> Start Over
          </button>
        </div>
      </div>

      {/* ═══ HOTEL STREET VIEW MODAL (root level – never clipped by overflow) ═══ */}
      <HotelStreetViewModal
        isOpen={!!streetViewHotel}
        onClose={() => setStreetViewHotel(null)}
        hotelName={streetViewHotel?.name || ""}
        locationText={streetViewHotel?.locationText || itinerary.destination}
        cityName={itinerary.destination}
      />

      {/* ═══ SIGHTSEEING / ACTIVITY STREET VIEW MODAL ═══ */}
      <LocationStreetViewModal
        isOpen={!!streetViewLocation}
        onClose={() => setStreetViewLocation(null)}
        locationName={streetViewLocation?.name || ""}
        locationDescription={streetViewLocation?.description}
        cityName={itinerary.destination}
        type={streetViewLocation?.type ?? 'sightseeing'}
      />
    </div>
  );
}
