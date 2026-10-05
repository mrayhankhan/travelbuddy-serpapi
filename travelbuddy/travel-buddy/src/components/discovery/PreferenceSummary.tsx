"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Edit3, Sparkles, Coffee, Hotel, Mountain, X } from "lucide-react";
import { getTopTags } from "@/lib/api";

export type EditCategory = 'vibes' | 'activities' | 'stays';

export default function PreferenceSummary({
  preferences,
  budget,
  onContinue,
  onEdit,
  sessionId,
}: {
  preferences: any;
  budget: number;
  onContinue: () => void;
  onEdit: (category: EditCategory) => void;
  sessionId?: string | null;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [topVibes, setTopVibes] = useState<string[]>([]);
  const [topActs, setTopActs] = useState<string[]>([]);
  const [topStays, setTopStays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dot-product-ranked tags from backend
  useEffect(() => {
    if (!sessionId) {
      // Fallback to profile tags if no session
      setTopVibes((preferences.profileTags?.vibes || []).slice(0, 5));
      setTopActs((preferences.profileTags?.activities || []).slice(0, 5));
      setTopStays((preferences.profileTags?.stays || []).slice(0, 5));
      setLoading(false);
      return;
    }

    getTopTags(sessionId).then(result => {
      if (result) {
        setTopVibes(result.vibes.length > 0 ? result.vibes : (preferences.profileTags?.vibes || []).slice(0, 5));
        setTopActs(result.activities.length > 0 ? result.activities : (preferences.profileTags?.activities || []).slice(0, 5));
        setTopStays(result.stays.length > 0 ? result.stays : (preferences.profileTags?.stays || []).slice(0, 5));
      } else {
        // Fallback to profile tags
        setTopVibes((preferences.profileTags?.vibes || []).slice(0, 5));
        setTopActs((preferences.profileTags?.activities || []).slice(0, 5));
        setTopStays((preferences.profileTags?.stays || []).slice(0, 5));
      }
      setLoading(false);
    });
  }, [sessionId, preferences]);

  const budgetLabel = budget >= 400000 ? 'Premium' : budget >= 150000 ? 'Comfortable' : 'Budget-Friendly';

  const sections = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#FFD233]" />,
      label: 'Travel Style',
      values: topVibes.length > 0 ? topVibes : ['Flexible'],
    },
    {
      icon: <Coffee className="w-5 h-5 text-[#FF6B6B]" />,
      label: 'Top Activities',
      values: topActs.length > 0 ? topActs : ['Open to anything'],
    },
    {
      icon: <Hotel className="w-5 h-5 text-[#5B8FB9]" />,
      label: 'Stay Preference',
      values: topStays.length > 0 ? topStays : ['Flexible'],
    },
    {
      icon: <Mountain className="w-5 h-5 text-[#34C759]" />,
      label: 'Budget Bracket',
      values: [`₹${budget.toLocaleString()} - ${budgetLabel}`],
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col px-6 pt-8 pb-32">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-12 h-12 rounded-2xl bg-[#FFD233] flex items-center justify-center mb-5">
          <Sparkles className="w-6 h-6 text-[#1A1A1A]" />
        </div>
        <h1 className="text-[26px] font-bold text-[#1A1A1A] leading-snug tracking-tight">Your Travel Profile</h1>
        <p className="text-[#8E8E93] text-[14px] mt-2 leading-relaxed">Here&apos;s what we learned about your travel style</p>
      </motion.div>

      {/* Profile cards */}
      <div className="flex-1 mt-7 flex flex-col" style={{ gap: '13px' }}>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full border-[3px] border-[#E5E5EA] border-t-[#FFD233] animate-spin" />
          </motion.div>
        ) : (
          sections.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F7] flex items-center justify-center flex-shrink-0 mt-0.5">
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide mb-2">{s.label}</p>
                <div className="flex flex-wrap gap-2">
                  {s.values.map((v: string) => (
                    <span key={v} className="px-3 py-1.5 bg-[#F2F2F7] rounded-full text-[13px] font-medium text-[#1A1A1A]">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}

        {/* Edit Preferences Button */}
        <button onClick={() => setShowPicker(true)}
          className="w-full py-3 mt-4 text-[13px] font-medium text-[#8E8E93] flex items-center justify-center gap-1.5 active:opacity-60">
          <Edit3 className="w-3.5 h-3.5" /> Edit Preferences
        </button>
      </div>

      {/* CTA */}
      <div className="mt-6 space-y-3">
        <motion.button
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="w-full py-4 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,210,51,0.3)]"
        >
          Find My Destinations
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Category Picker Bottom Sheet */}
      <AnimatePresence>
        {showPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowPicker(false)}
              className="fixed inset-0 bg-black/40 z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl px-6 pt-5 pb-8 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
            >
              <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-4" />
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] font-bold text-[#1A1A1A]">What would you like to change?</h3>
                <button onClick={() => setShowPicker(false)} className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center">
                  <X className="w-4 h-4 text-[#8E8E93]" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { key: 'vibes' as EditCategory, icon: <Sparkles className="w-5 h-5 text-[#FFD233]" />, label: 'Vibes', desc: 'Change your travel style & mood' },
                  { key: 'activities' as EditCategory, icon: <Coffee className="w-5 h-5 text-[#FF6B6B]" />, label: 'Activities', desc: 'Update things you love to do' },
                  { key: 'stays' as EditCategory, icon: <Hotel className="w-5 h-5 text-[#5B8FB9]" />, label: 'Stay', desc: 'Pick a different stay style' },
                ].map((opt) => (
                  <motion.button
                    key={opt.key}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setShowPicker(false);
                      onEdit(opt.key);
                    }}
                    className="flex items-center gap-4 p-4 bg-[#F9F9FB] rounded-2xl active:bg-[#F2F2F7] transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-[#1A1A1A]">{opt.label}</p>
                      <p className="text-[12px] text-[#8E8E93] mt-0.5">{opt.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C7C7CC] flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
