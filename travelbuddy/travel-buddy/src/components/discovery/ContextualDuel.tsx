"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { DuelConfig, QuickTapChip } from "@/data/calibrationData";

export interface DuelResult {
  type: 'duel';
  duelId: string;
  position: number;
  leftTags: string[];
  rightTags: string[];
}

export interface QuickTapResult {
  type: 'quicktap';
  selectedTags: string[];
}

export type CalibrationResult = DuelResult | QuickTapResult;

interface ContextualDuelProps {
  duelConfig: DuelConfig;
  quickTapChips: QuickTapChip[];
  onResolve: (result: CalibrationResult) => void;
  onSkip: () => void;
}

const SNAP_POINTS = [-2, -1, 0, 1, 2];
const SLIDER_HEIGHT = 220;
const SNAP_SPACING = SLIDER_HEIGHT / 4;

export default function ContextualDuel({ duelConfig, quickTapChips, onResolve, onSkip }: ContextualDuelProps) {
  const [mode, setMode] = useState<'duel' | 'quicktap'>('duel');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const resolvedRef = useRef(false);

  // y motion: negative = up (toward top card), positive = down (toward bottom card)
  const y = useMotionValue(0);

  // top card: if y < 0 (slider up), it gets green tint. If y > 0 (slider down), it gets dark tint.
  const topOverlay = useTransform(y, [-SLIDER_HEIGHT / 2, 0, SLIDER_HEIGHT / 2], [
    "rgba(52, 199, 89, 0.4)", // green tint when selected
    "rgba(0, 0, 0, 0.2)",     // neutral baseline
    "rgba(0, 0, 0, 0.7)"      // dark when opposite selected
  ]);

  // bottom card: if y > 0 (slider down), it gets green tint. If y < 0 (slider up), it gets dark tint.
  const bottomOverlay = useTransform(y, [-SLIDER_HEIGHT / 2, 0, SLIDER_HEIGHT / 2], [
    "rgba(0, 0, 0, 0.7)",     // dark when opposite selected
    "rgba(0, 0, 0, 0.2)",     // neutral baseline
    "rgba(52, 199, 89, 0.4)"  // green tint when selected
  ]);
  // Track accent - height and direction (hooks must be at top level, not in JSX)
  const accentHeight = useTransform(y, (v: number) => `${Math.abs(v / SLIDER_HEIGHT) * 100}%`);
  const accentTransform = useTransform(y, (v: number) =>
    v < 0 ? `translateX(-50%) translateY(-100%)` : `translateX(-50%) translateY(0%)`
  );

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (resolvedRef.current) return;
    const rawPos = y.get();
    const snapped = Math.round(rawPos / SNAP_SPACING);
    const clamped = Math.max(-2, Math.min(2, snapped));
    y.set(clamped * SNAP_SPACING);

    // Auto-submit if the user didn't land on center
    if (clamped !== 0) {
      resolvedRef.current = true;
      // Brief pause so user sees the snap, then resolve
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          // Negative clamped = slider moved UP = toward top card (leftTags)
          // Positive clamped = slider moved DOWN = toward bottom card (rightTags)
          onResolve({
            type: 'duel',
            duelId: duelConfig.id,
            position: clamped, // negative = left/top, positive = right/bottom
            leftTags: duelConfig.leftTags,
            rightTags: duelConfig.rightTags,
          });
        }, 250);
      }, 350);
    }
  }, [y, duelConfig, onResolve]);

  const handleSnapTap = useCallback((point: number) => {
    if (resolvedRef.current) return;
    y.set(point * SNAP_SPACING);
    if (point !== 0) {
      resolvedRef.current = true;
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onResolve({
            type: 'duel',
            duelId: duelConfig.id,
            position: point,
            leftTags: duelConfig.leftTags,
            rightTags: duelConfig.rightTags,
          });
        }, 250);
      }, 350);
    }
  }, [y, duelConfig, onResolve]);

  const handleChipToggle = useCallback((chipId: string) => {
    setSelectedChips(prev => {
      if (prev.includes(chipId)) return prev.filter(id => id !== chipId);
      if (prev.length >= 3) return prev;
      return [...prev, chipId];
    });
  }, []);

  const handleQuickTapSubmit = useCallback(() => {
    const allTags = selectedChips.flatMap(chipId => {
      const chip = quickTapChips.find(c => c.id === chipId);
      return chip ? chip.tags : [];
    });
    setIsExiting(true);
    setTimeout(() => {
      onResolve({ type: 'quicktap', selectedTags: allTags });
    }, 300);
  }, [selectedChips, quickTapChips, onResolve]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-[50] bg-[#F5F3FF] flex flex-col overflow-hidden"
          style={{ borderRadius: '24px' }}
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 pt-4 pb-1">
            <div className="px-3 py-1 rounded-full bg-[#FFD233]/20">
              <span className="text-[10px] font-bold tracking-wide text-[#1A1A1A]">WHICH EXCITES YOU MORE?</span>
            </div>
            <button
              onClick={onSkip}
              className="w-7 h-7 rounded-full bg-[#F2F2F7] flex items-center justify-center"
            >
              <X className="w-3.5 h-3.5 text-[#8E8E93]" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'duel' ? (
              <motion.div
                key="duel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex px-4 pb-4 pt-2 gap-3"
              >
                {/* ── Stacked Cards (left area) ── */}
                <div className="flex-1 flex flex-col gap-2.5">
                  {/* Top card (leftTags) */}
                  <motion.div className="flex-1 rounded-2xl overflow-hidden relative">
                    <img
                      src={duelConfig.leftImage}
                      alt={duelConfig.leftLabel}
                      className="w-full h-full object-cover"
                    />
                    {/* Dynamic overlay: greens when selected, dims when opposite selected */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none transition-colors duration-200"
                      style={{ backgroundColor: topOverlay }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <p className="absolute bottom-3 left-3 text-white text-[14px] font-bold drop-shadow-lg">
                      {duelConfig.leftLabel}
                    </p>
                    {/* Arrow hint */}
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">↑</span>
                    </div>
                  </motion.div>

                  {/* Bottom card (rightTags) */}
                  <motion.div className="flex-1 rounded-2xl overflow-hidden relative">
                    <img
                      src={duelConfig.rightImage}
                      alt={duelConfig.rightLabel}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 pointer-events-none transition-colors duration-200"
                      style={{ backgroundColor: bottomOverlay }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
                    <p className="absolute bottom-3 left-3 text-white text-[14px] font-bold drop-shadow-lg">
                      {duelConfig.rightLabel}
                    </p>
                    <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">↓</span>
                    </div>
                  </motion.div>
                </div>

                {/* ── Vertical Slider (right side) ── */}
                <div className="flex flex-col items-center justify-center gap-6" style={{ width: 48 }}>
                  {/* Hint text moved to top, enlarged, black, better UI */}
                  <div className="bg-[#FFD233]/20 px-2 py-1 rounded border border-[#FFD233]/0">
                    <p className="text-[10px] text-[#1A1A1A] font-bold text-center leading-tight uppercase tracking-wide">
                      drag
                    </p>
                  </div>

                  <div className="relative mt-1" style={{ height: SLIDER_HEIGHT, width: 48 }}>
                    {/* Track */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-[#E5E5EA] rounded-full"
                      style={{ top: 0, bottom: 0 }}
                    />

                    {/* Gradient accent on track */}
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full"
                      style={{
                        background: 'linear-gradient(to bottom, #FFD233, #FF9500)',
                        top: '50%',
                        height: accentHeight,
                        transform: accentTransform,
                      }}
                    />

                    {/* Snap dots */}
                    {SNAP_POINTS.map((point, i) => (
                      <button
                        key={point}
                        onClick={() => handleSnapTap(point)}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 bg-[#D1D1D6] hover:bg-[#FFD233]"
                        style={{
                          top: `${i * 25}%`,
                          width: point === 0 ? 8 : 6,
                          height: point === 0 ? 8 : 6,
                        }}
                        aria-label={`Position ${point}`}
                      />
                    ))}

                    {/* Draggable thumb */}
                    <motion.div
                      drag="y"
                      dragConstraints={{ top: -SLIDER_HEIGHT / 2, bottom: SLIDER_HEIGHT / 2 }}
                      dragElastic={0.08}
                      dragMomentum={false}
                      onDragEnd={handleDragEnd}
                      style={{ y }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FFD233] shadow-[0_4px_20px_rgba(255,210,51,0.5)] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-10"
                      whileTap={{ scale: 1.12 }}
                    >
                      <div className="w-4 h-[2px] bg-[#1A1A1A]/30 rounded-full mb-1" />
                      <div className="w-4 h-[2px] bg-[#1A1A1A]/30 rounded-full" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── Quick Tap Mode ── */
              <motion.div
                key="quicktap"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col px-5 pb-5"
              >
                <h2 className="text-[18px] font-bold text-[#1A1A1A] text-center mt-2 mb-1">
                  What are you looking for?
                </h2>
                <p className="text-[12px] text-[#8E8E93] text-center mb-5">
                  Select 1-3 that excite you
                </p>

                {/* Chip Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {quickTapChips.map(chip => {
                    const isSelected = selectedChips.includes(chip.id);
                    return (
                      <motion.button
                        key={chip.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChipToggle(chip.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${isSelected
                            ? 'bg-[#FFD233] text-[#1A1A1A] shadow-[0_2px_12px_rgba(255,210,51,0.3)]'
                            : 'bg-white text-[#1A1A1A] shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                          } ${!isSelected && selectedChips.length >= 3 ? 'opacity-40' : ''}`}
                      >
                        <span className="text-[18px]">{chip.emoji}</span>
                        <span className="text-[13px] font-semibold">{chip.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleQuickTapSubmit}
                  disabled={selectedChips.length === 0}
                  className={`w-full py-3.5 rounded-full text-[14px] font-bold transition-all duration-200 ${selectedChips.length > 0
                      ? 'bg-[#1A1A1A] text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
                      : 'bg-[#E5E5EA] text-[#8E8E93]'
                    }`}
                >
                  {selectedChips.length === 0 ? 'Select at least 1' : `Continue with ${selectedChips.length} selected →`}
                </motion.button>

                {/* Back */}
                <button
                  onClick={() => { setMode('duel'); setSelectedChips([]); }}
                  className="mt-3 text-[12px] text-[#8E8E93] font-medium text-center"
                >
                  ← Back to comparison
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── None of these (visible only in duel mode) ── */}
          {mode === 'duel' && (
            <div className="px-5 pb-4">
              <button
                onClick={() => setMode('quicktap')}
                className="w-full py-2.5 rounded-full border-2 border-dashed border-[#D1D1D6] text-[12px] font-semibold text-[#8E8E93] hover:border-[#FFD233] hover:text-[#1A1A1A] transition-all duration-200"
              >
                None of these
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
