"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin, ChevronLeft } from "lucide-react";
import { ShortlistDestination } from "@/data/itineraryMock";

// We'll dynamically fetch a real image from Wikipedia if the DB image fails
import { useState, useEffect } from "react";

export default function DestinationShortlist({
  shortlist,
  onSelect,
  onBack,
}: {
  shortlist: ShortlistDestination[];
  onSelect: (id: string) => void;
  onBack?: () => void;
}) {
  const [wikiImages, setWikiImages] = useState<Record<string, string>>({});

  useEffect(() => {
    // Attempt to fetch Wikipedia thumbnails for missing or all images on mount
    shortlist.forEach(dest => {
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(dest.name)}`)
        .then(res => res.json())
        .then(data => {
          if (data.thumbnail?.source) {
            setWikiImages(prev => ({ ...prev, [dest.id]: data.thumbnail.source }));
          }
        })
        .catch(() => { });
    });
  }, [shortlist]);
  return (
    <div className="min-h-[100dvh] flex flex-col overflow-y-auto" style={{ padding: '24px 20px 32px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
        {onBack && (
          <button onClick={onBack}
            className="flex items-center gap-1 text-[13px] font-medium text-[#8E8E93] mb-4 active:opacity-60 transition-opacity">
            <ChevronLeft className="w-4 h-4" /> Back to Summary
          </button>
        )}
        <p className="text-xs font-semibold text-[#F5A623] tracking-wide uppercase" style={{ marginBottom: '6px' }}>Your Results</p>
        <h1 className="text-[24px] font-bold text-[#1A1A1A]">Top Matches ✨</h1>
        <p className="text-[#8E8E93] text-sm" style={{ marginTop: '6px' }}>Based on your preferences · Tap to explore</p>
      </motion.div>

      {/* Results */}
      <div className="flex-1 flex flex-col" style={{ gap: '16px' }}>
        {shortlist.map((dest, i) => (
          <motion.button
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(dest.id)}
            className="w-full bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] overflow-hidden flex text-left group hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow"
          >
            {/* Thumbnail */}
            <div className="w-[110px] min-h-[130px] flex-shrink-0 relative overflow-hidden bg-[#FFD233]/20">
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  // If primary Unsplash image 404s, seamlessly switch to the Wikipedia thumbnail fetched in the background
                  if (wikiImages[dest.id] && e.currentTarget.src !== wikiImages[dest.id]) {
                    e.currentTarget.src = wikiImages[dest.id];
                  } else {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80';
                  }
                }}
              />
              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#1A1A1A]/70 backdrop-blur-sm flex items-center justify-center text-white text-[10px] font-bold z-10">
                {i + 1}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-[15px] text-[#1A1A1A] truncate">{dest.name}</h3>
                  <span className="flex-shrink-0 flex items-center gap-0.5 text-[11px] font-bold bg-[#FFD233] text-[#1A1A1A] px-2 py-0.5 rounded-full">
                    <Star className="w-2.5 h-2.5" fill="currentColor" />
                    {dest.score}%
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  <MapPin className="w-2.5 h-2.5 text-[#8E8E93]" />
                  <span className="text-[11px] text-[#8E8E93]">{dest.country}</span>
                </div>
                <p className="text-[11px] text-[#6B6B6B] line-clamp-2 leading-relaxed">{dest.description}</p>
                <div className="flex gap-1 flex-wrap mt-2">
                  {dest.tags.map((t, idx) => (
                    <span key={`${t}-${idx}`} className="text-[10px] bg-[#F2F2F7] text-[#6B6B6B] px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[12px] text-[#8E8E93]">
                  from <span className="font-bold text-[#1A1A1A]">₹{dest.minCost.toLocaleString()}</span>
                </span>
                <div className="w-7 h-7 rounded-full bg-[#FFD233] flex items-center justify-center group-hover:bg-[#F5A623] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#1A1A1A]" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* HotelAPI branding */}
      <p className="text-center text-[10px] text-[#8E8E93]/50" style={{ marginTop: '20px' }}>
        Curated from 40+ European countries · Powered by HotelAPI
      </p>
    </div>
  );
}
