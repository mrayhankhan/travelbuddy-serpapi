"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import { Heart, X, ChevronDown, Bookmark } from "lucide-react";

export interface SwipeCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'vibe' | 'activity' | 'stay';
  tags: string[];
}

export default function SwipeCard({
  data,
  isWishlisted,
  onSwipe,
}: {
  data: SwipeCardData;
  isWishlisted?: boolean;
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void;
}) {
  //
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();
  const isMountedRef = useRef(false);
  // FIX 7: Prevent onSwipe from firing multiple times per gesture
  const swipeFiredRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    // Reset swipe guard whenever new card data mounts
    swipeFiredRef.current = false;
    return () => { isMountedRef.current = false; };
  }, [data.id]);

  // Horizontal transforms
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const rotateY = useTransform(x, [-200, 0, 200], [-8, 0, 8]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);

  // Vertical transforms
  const expandOpacity = useTransform(y, [0, 60], [0, 1]);
  const saveOpacity = useTransform(y, [-60, 0], [1, 0]);

  const handleDragEnd = useCallback(async (_: any, info: PanInfo) => {
    if (!isMountedRef.current || swipeFiredRef.current) return;
    const { offset, velocity } = info;
    const absX = Math.abs(offset.x);
    const absY = Math.abs(offset.y);

    // Determine dominant axis
    if (absX > absY) {
      // Horizontal swipe
      if (offset.x > 80 || velocity.x > 400) {
        swipeFiredRef.current = true;
        // Velocity-aware exit: faster flick → faster exit
        const exitSpeed = Math.min(0.35, Math.max(0.15, 300 / (Math.abs(velocity.x) + 200)));
        const yDrift = velocity.y * 0.15; // natural arc from gesture direction
        await controls.start({
          x: 500,
          y: yDrift,
          scale: 0.85,
          opacity: 0,
          transition: { duration: exitSpeed, ease: [0.32, 0.72, 0, 1] },
        });
        if (isMountedRef.current) onSwipe('right');
        return;
      } else if (offset.x < -80 || velocity.x < -400) {
        swipeFiredRef.current = true;
        const exitSpeed = Math.min(0.35, Math.max(0.15, 300 / (Math.abs(velocity.x) + 200)));
        const yDrift = velocity.y * 0.15;
        await controls.start({
          x: -500,
          y: yDrift,
          scale: 0.85,
          opacity: 0,
          transition: { duration: exitSpeed, ease: [0.32, 0.72, 0, 1] },
        });
        if (isMountedRef.current) onSwipe('left');
        return;
      }
    } else {
      // Vertical swipe
      if (offset.y > 80 || velocity.y > 400) {
        // Swipe down - expand (no swipeFired guard, card stays)
        await controls.start({ y: 0, x: 0, transition: { type: 'spring', stiffness: 400, damping: 28 } });
        if (isMountedRef.current) onSwipe('down');
        return;
      } else if (offset.y < -80 || velocity.y < -400) {
        // Swipe up - wishlist (card stays)
        await controls.start({
          y: -30, scale: 1.02,
          transition: { type: 'spring', stiffness: 400, damping: 28 },
        });
        if (isMountedRef.current) {
          await controls.start({ y: 0, scale: 1, transition: { duration: 0.2 } });
          onSwipe('up');
        }
        return;
      }
    }

    // Snap back - soft, elastic spring
    controls.start({
      x: 0, y: 0,
      transition: { type: 'spring', mass: 0.6, stiffness: 280, damping: 24 },
    });
  }, [controls, onSwipe]);

  const triggerSwipe = useCallback((dir: 'left' | 'right') => {
    if (!isMountedRef.current || swipeFiredRef.current) return;
    swipeFiredRef.current = true;
    const xTarget = dir === 'right' ? 500 : -500;
    controls.start({
      x: xTarget,
      y: 30,
      scale: 0.88,
      opacity: 0,
      transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
    });
    setTimeout(() => {
      if (isMountedRef.current) onSwipe(dir);
    }, 220);
  }, [controls, onSwipe]);

  return (
    <div className="absolute top-3 left-3 right-3 bottom-24" style={{ perspective: 800 }}>
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, y, rotate, rotateY, willChange: 'transform', transformStyle: 'preserve-3d' }}
        className="absolute inset-0 bg-white rounded-[32px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] cursor-grab active:cursor-grabbing touch-none select-none flex flex-col"
      >
        {/* NOPE overlay */}
        <motion.div style={{ opacity: nopeOpacity }}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#FF3B30]/12" />
          <div
            className="-rotate-12"
            style={{
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: '0.12em',
              color: '#FF3B30',
              textShadow: '0 2px 8px rgba(255,59,48,0.35), 0 0 20px rgba(255,59,48,0.15)',
              WebkitTextStroke: '1.5px rgba(255,59,48,0.6)',
            }}
          >
            NOPE
          </div>
        </motion.div>

        {/* LIKE overlay */}
        <motion.div style={{ opacity: likeOpacity }}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#34C759]/12" />
          <div
            className="rotate-12"
            style={{
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: '0.12em',
              color: '#34C759',
              textShadow: '0 2px 8px rgba(52,199,89,0.35), 0 0 20px rgba(52,199,89,0.15)',
              WebkitTextStroke: '1.5px rgba(52,199,89,0.6)',
            }}
          >
            LIKE
          </div>
        </motion.div>

        {/* EXPAND overlay (drag down) */}
        <motion.div style={{ opacity: expandOpacity }}
          className="absolute inset-0 z-30 pointer-events-none flex items-end justify-center pb-[35%]"
        >
          <div className="absolute inset-0 bg-[#5B8FB9]/10" />
          <div className="flex flex-col items-center gap-1">
            <ChevronDown className="w-6 h-6 text-[#5B8FB9] animate-bounce" />
            <span className="text-[#5B8FB9] font-bold text-sm tracking-wide">MORE INFO</span>
          </div>
        </motion.div>

        {/* SAVE / UNSAVE overlay (drag up) */}
        <motion.div style={{ opacity: saveOpacity }}
          className="absolute inset-0 z-30 pointer-events-none flex items-start justify-center pt-[35%]"
        >
          <div className={`absolute inset-0 ${isWishlisted ? 'bg-[#FF3B30]/10' : 'bg-[#34C759]/10'}`} />
          <div className="flex flex-col items-center gap-1">
            <Bookmark className={`w-6 h-6 ${isWishlisted ? 'text-[#FF3B30]' : 'text-[#34C759]'}`} fill={isWishlisted ? '#FF3B30' : '#34C759'} />
            <span className={`font-bold text-sm tracking-wide ${isWishlisted ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
              {isWishlisted ? 'UNSAVE' : 'SAVED!'}
            </span>
          </div>
        </motion.div>

        {/* Wishlisted badge */}
        {isWishlisted && (
          <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#34C759] flex items-center justify-center shadow-md">
            <Bookmark className="w-4 h-4 text-white" fill="white" />
          </div>
        )}

        {/* Image section */}
        <div className="relative flex-1 min-h-0">
          <div className="absolute inset-0 bg-[#E5E5EA]" />
          {data.image && (
            <img src={data.image} alt={data.title}
              className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Card info on image */}
          <div className="absolute bottom-5 left-5 right-5 text-white z-10">
            <h2 className="text-[24px] font-bold leading-tight drop-shadow-md">{data.title}</h2>
            <p className="text-white/80 text-[13px] mt-1 line-clamp-1 leading-relaxed">{data.description}</p>
            <div className="flex gap-1.5 mt-2.5 flex-wrap">
              {data.tags.map(t => (
                <span key={t} className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-semibold tracking-wide">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="px-5 py-4 bg-white flex items-center justify-between">
          {/* Swipe up hint */}
          <button onClick={() => onSwipe('up')}
            className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${isWishlisted
              ? 'text-[#34C759] active:text-[#FF3B30]'
              : 'text-[#8E8E93] active:text-[#34C759]'
              }`}>
            <Bookmark className="w-3.5 h-3.5" fill={isWishlisted ? 'currentColor' : 'none'} />
            {isWishlisted ? 'Saved' : 'Save'}
          </button>

          {/* Main actions */}
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => triggerSwipe('left')}
              className="w-[50px] h-[50px] rounded-full border-2 border-[#FF3B30]/15 flex items-center justify-center text-[#FF3B30] bg-[#FF3B30]/5"
            >
              <X size={18} strokeWidth={2.5} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => triggerSwipe('right')}
              className="w-[50px] h-[50px] rounded-full bg-[#FFD233] flex items-center justify-center text-[#1A1A1A] shadow-[0_4px_12px_rgba(255,210,51,0.4)]"
            >
              <Heart size={18} fill="currentColor" />
            </motion.button>
          </div>

          {/* Swipe down hint */}
          <button onClick={() => onSwipe('down')}
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#8E8E93] active:text-[#5B8FB9] transition-colors">
            Info <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
