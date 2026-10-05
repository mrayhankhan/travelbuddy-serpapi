"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TripItinerary } from "@/data/itineraryMock";

import { RefreshCw } from "lucide-react";
import { deriveDurationLabel } from "@/lib/utils";



interface ItineraryCardProps {
  itinerary: TripItinerary & { shortDescription?: string };
  budget: number;
  onViewFull: () => void;
  index: number;
}

function BudgetBadge({ cost, budget }: { cost: number; budget: number }) {
  const ratio = cost / budget;
  if (ratio <= 1.0) {
    return (
      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">
        Within Budget
      </span>
    );
  } else if (ratio <= 1.15) {
    return (
      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 border border-amber-500/20">
        Slightly Above
      </span>
    );
  }
  return (
    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-600 border border-red-500/20">
      Over Budget
    </span>
  );
}

const DESTINATION_VERBS = ['Explore', 'Discover', 'Experience', 'Uncover', 'Wander through'];

export default function ItineraryCard({
  itinerary,
  budget,
  onViewFull,
  index,
}: ItineraryCardProps) {
  const durationLabel = deriveDurationLabel(itinerary.days, itinerary.duration);
  const dayPreviews = itinerary.days?.slice(0, 3) ?? [];
  const verb = DESTINATION_VERBS[index % DESTINATION_VERBS.length];

  // Fetch a real destination photo from Wikipedia (same pattern as ItineraryView)
  const [cardImage, setCardImage] = useState<string | null>(null);
  useEffect(() => {
    if (!itinerary.destination) return;
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(itinerary.destination)}`)
      .then(res => res.json())
      .then(data => { if (data.thumbnail?.source) setCardImage(data.thumbnail.source); })
      .catch(() => {});
  }, [itinerary.destination]);

  // Generic European landscape fallback (reliable Unsplash URL)
  const FALLBACK = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
  const heroSrc = cardImage || FALLBACK;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl overflow-hidden mb-5 shadow-[0_4px_32px_rgba(0,0,0,0.10)] border border-black/5 bg-white"
    >
      {/* Hero image — Wikipedia destination photo, with fallback */}
      <div className="relative h-52 overflow-hidden bg-[#c8c8d0]">
        <img
          src={heroSrc}
          alt={itinerary.destination}
          className="w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
          }}
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Match score pill — top right */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#FFD233] shadow-sm flex items-center gap-1">
          <span className="text-[11px] font-bold text-[#1A1A1A]">
            {itinerary.matchScore ?? 88}% Match
          </span>
        </div>

        {/* Destination name overlay */}
        <div className="absolute bottom-3 left-4">
          <h3 className="text-white text-[22px] font-bold leading-tight drop-shadow-lg">
            {verb} {itinerary.destination}
          </h3>
          <p className="text-white/75 text-[12px] font-medium">{itinerary.country}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 pt-4 pb-4">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold text-[#6B6B6B]">
              {durationLabel}
            </span>
            <span className="text-[#D1D1D6]">·</span>
            <span className="text-[14px] font-bold text-[#1A1A1A]">
              ₹{(itinerary.totalCost ?? 0).toLocaleString()}
            </span>
          </div>
          <BudgetBadge cost={itinerary.totalCost ?? 0} budget={budget} />
        </div>

        {/* Short description */}
        {(itinerary as any).shortDescription && (
          <p className="text-[13px] text-[#6B6B6B] leading-snug mb-3">
            {(itinerary as any).shortDescription}
          </p>
        )}

        {/* Day preview */}
        {dayPreviews.length > 0 && (
          <div
            className="rounded-2xl p-3 mb-4 border border-[#F2F2F7]"
            style={{ background: "#FAFAFA" }}
          >
            <p className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-widest mb-2">
              Trip Preview
            </p>
            <div className="flex flex-col gap-1.5">
              {dayPreviews.map((d) => (
                <div key={d.day} className="flex items-start gap-2">
                  <span className="text-[11px] font-bold text-[#FFD233] w-[38px] flex-shrink-0 leading-snug">
                    Day {d.day}
                  </span>
                  <span className="text-[11px] text-[#3A3A3C] line-clamp-1 leading-snug">
                    {d.items
                      ?.slice(0, 2)
                      .map((i) => i.activity)
                      .join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA button */}
        <motion.button
          id={`itinerary-card-view-${index}`}
          whileTap={{ scale: 0.97 }}
          onClick={onViewFull}
          className="w-full py-3 bg-[#1A1A1A] text-white text-[13px] font-bold rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:bg-[#2A2A2A] transition-colors"
        >
          View Full Itinerary
        </motion.button>
      </div>
    </motion.div>
  );
}
