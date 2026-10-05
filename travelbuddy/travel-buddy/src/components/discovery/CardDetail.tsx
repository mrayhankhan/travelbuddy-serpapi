"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, Heart, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { DiscoveryCard } from "@/data/mockData";

export default function CardDetail({
  card,
  onClose,
  onSwipe,
}: {
  card: DiscoveryCard;
  onClose: () => void;
  onSwipe: (dir: 'left' | 'right') => void;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const allImages = [card.image, ...card.extraImages];
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [showScrollUp, setShowScrollUp] = useState(false);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 150 || info.velocity.y > 300) {
      onClose();
    }
  };

  const handleImageScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setActiveImg(Math.round(scrollLeft / clientWidth));
  };

  const goToImage = useCallback((idx: number) => {
    if (!scrollRef.current) return;
    const clamped = Math.max(0, Math.min(idx, allImages.length - 1));
    scrollRef.current.scrollTo({ left: clamped * scrollRef.current.clientWidth, behavior: 'smooth' });
    setActiveImg(clamped);
  }, [allImages.length]);

  const prevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    goToImage(activeImg - 1);
  }, [activeImg, goToImage]);

  const nextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    goToImage(activeImg + 1);
  }, [activeImg, goToImage]);

  const scrollDownContent = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!contentRef.current) return;
    contentRef.current.scrollBy({ top: 200, behavior: 'smooth' });
    setShowScrollHint(false);
  }, []);

  const handleContentScroll = () => {
    if (!contentRef.current) return;
    const scrollTop = contentRef.current.scrollTop;
    if (scrollTop > 20) {
      setShowScrollHint(false);
      setShowScrollUp(true);
    }
    // Hide scroll-up button once back near top
    if (scrollTop < 10) {
      setShowScrollUp(false);
      setShowScrollHint(true);
    }
  };

  const scrollUpContent = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!contentRef.current) return;
    contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Sheet */}
      <motion.div
        className="relative mt-auto w-full max-w-[430px] mx-auto bg-white rounded-t-[32px] overflow-hidden flex flex-col"
        style={{ maxHeight: '92dvh' }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#E5E5EA]" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Scrollable content */}
        <div
          ref={contentRef}
          onScroll={handleContentScroll}
          className="flex-1 overflow-y-auto overscroll-contain no-scrollbar"
        >

          {/* Image carousel */}
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleImageScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
            >
              {allImages.map((img, i) => (
                <div key={i} className="flex-shrink-0 w-full aspect-[4/3] snap-center">
                  <img src={img} alt={`${card.title} ${i + 1}`}
                    className="w-full h-full object-cover" draggable={false} />
                </div>
              ))}
            </div>

            {/* Left arrow */}
            {allImages.length > 1 && activeImg > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Right arrow */}
            {allImages.length > 1 && activeImg < allImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goToImage(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeImg ? 'bg-white w-5' : 'bg-white/40 w-2'
                  }`}
                />
              ))}
            </div>

            {/* Image counter badge */}
            {allImages.length > 1 && (
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                <span className="text-white text-[11px] font-semibold">{activeImg + 1} / {allImages.length}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-6 pt-5 pb-8 relative">

            {/* Scroll-down hint button */}
            <AnimatePresence>
              {showScrollHint && (
                <motion.button
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: [0, 4, 0] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    y: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  onClick={scrollDownContent}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center justify-center active:scale-90 transition-transform border border-[#E5E5EA]"
                  title="Scroll down for details"
                >
                  <ChevronDown className="w-5 h-5 text-[#1A1A1A]" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Scroll-up hint button - appears after scroll-down hides */}
            <AnimatePresence>
              {showScrollUp && (
                <motion.button
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: [0, -4, 0] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    y: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  onClick={scrollUpContent}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.18)] flex items-center justify-center active:scale-90 transition-transform border border-[#333]"
                  title="Scroll back to top"
                >
                  <ChevronUp className="w-5 h-5 text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Title + type */}
            <div className="flex items-start justify-between gap-3" style={{ marginBottom: 10 }}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5A623] mb-1 block">
                  {card.type === 'vibe' ? '✨ Travel Vibe' : card.type === 'activity' ? '🤸 Activity' : '🏨 Stay Type'}
                </span>
                <h2 className="text-[22px] font-bold text-[#1A1A1A] leading-tight">{card.title}</h2>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-1.5 flex-wrap" style={{ marginBottom: 13 }}>
              {card.tags.map(t => (
                <span key={t} className="px-3 py-1 bg-[#F2F2F7] rounded-full text-[11px] font-semibold text-[#6B6B6B]">
                  {t}
                </span>
              ))}
            </div>

            {/* Long description */}
            <p className="text-[14px] text-[#4A4A4A] leading-[1.7]" style={{ marginBottom: 20 }}>
              {card.longDescription}
            </p>

            {/* Highlights */}
            {card.highlights.length > 0 && (
              <div className="mb-6" >
                <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#8E8E93] mb-3 flex items-center gap-1.5"style={{ marginBottom: 5}}>
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD233]" />
                  Highlights
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {card.highlights.map(h => (
                    <div key={h} className="flex items-center gap-2 px-3 py-2.5 bg-[#FAFAFA] rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD233] flex-shrink-0" />
                      <span className="text-[12px] font-medium text-[#1A1A1A]">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="px-6 pb-6 pt-3 bg-white border-t border-[#F2F2F7]">
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => onSwipe('left')}
              className="flex-1 py-3.5 rounded-full border-2 border-[#E5E5EA] text-[14px] font-semibold text-[#8E8E93] flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" /> Skip
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => onSwipe('right')}
              className="flex-1 py-3.5 rounded-full bg-[#FFD233] text-[14px] font-semibold text-[#1A1A1A] flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(255,210,51,0.3)]"
            >
              <Heart className="w-4 h-4" fill="currentColor" /> Like
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
