"use client";

import { motion } from "framer-motion";
import { Compass, Map } from "lucide-react";

export type MainTab = "discover" | "itineraries";

interface BottomNavProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: MainTab; label: string; Icon: typeof Compass }[] = [
    { id: "discover", label: "Discover", Icon: Compass },
    { id: "itineraries", label: "Itineraries", Icon: Map },
  ];

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="flex items-center gap-1 px-2 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-white/60"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <motion.button
              key={id}
              whileTap={{ scale: 0.88 }}
              onClick={() => onTabChange(id)}
              id={`bottom-nav-${id}`}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
              style={{
                background: isActive ? "#FFD233" : "transparent",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-[#FFD233]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <Icon
                className={`w-4.5 h-4.5 flex-shrink-0 transition-colors duration-200 ${
                  isActive ? "text-[#1A1A1A]" : "text-[#8E8E93]"
                }`}
                style={{ width: 18, height: 18 }}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[12px] font-bold text-[#1A1A1A] whitespace-nowrap overflow-hidden"
                >
                  {label}
                </motion.span>
              )}
              {!isActive && (
                <span className="text-[12px] font-semibold text-[#8E8E93]">
                  {label}
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
