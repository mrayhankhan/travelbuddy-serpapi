"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Sparkles } from "lucide-react";

export type ProfileTags = {
    vibes: string[];
    activities: string[];
    stays: string[];
};

const SECTION_META = {
    vibes: { label: "Vibes", emoji: "✨", color: "#FFD233", bg: "#FFFBEA" },
    activities: { label: "Activities", emoji: "🤸", color: "#5B8FB9", bg: "#EEF5FB" },
    stays: { label: "Stays", emoji: "🏨", color: "#34C759", bg: "#EDFBF1" },
};

interface Props {
    tags: ProfileTags;
    isOpen: boolean;
    onClose: () => void;
    onRemoveTag: (section: keyof ProfileTags, tag: string) => void;
}

export default function ProfileDrawer({ tags, isOpen, onClose, onRemoveTag }: Props) {
    const totalTags = tags.vibes.length + tags.activities.length + tags.stays.length;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[70] flex flex-col justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                        onClick={onClose}
                    />

                    {/* Sheet */}
                    <motion.div
                        className="relative bg-white rounded-t-[28px] max-h-[82vh] overflow-hidden flex flex-col"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 280 }}
                    >
                        {/* Handle */}
                        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                            <div className="w-10 h-1 bg-[#E5E5EA] rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F2F2F7] flex-shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-[#FFD233] flex items-center justify-center">
                                    <User className="w-4.5 h-4.5 text-[#1A1A1A]" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-[#1A1A1A]">My Preferences</p>
                                    <p className="text-[11px] text-[#8E8E93]">
                                        {totalTags === 0 ? "No tags yet - start swiping!" : `${totalTags} tags collected`}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center"
                            >
                                <X className="w-4 h-4 text-[#1A1A1A]" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-5 pb-10">
                            {totalTags === 0 && (
                                <div className="flex flex-col items-center justify-center py-10 gap-3">
                                    <Sparkles className="w-10 h-10 text-[#E5E5EA]" />
                                    <p className="text-[13px] text-[#8E8E93] text-center">
                                        Swipe right on cards you love and{"\n"}your tags will appear here.
                                    </p>
                                </div>
                            )}

                            {(Object.keys(SECTION_META) as (keyof ProfileTags)[]).map((section) => {
                                const meta = SECTION_META[section];
                                const sectionTags = tags[section];
                                if (sectionTags.length === 0) return null;

                                return (
                                    <div key={section}>
                                        {/* Section header */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div
                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                                                style={{ backgroundColor: meta.bg }}
                                            >
                                                {meta.emoji}
                                            </div>
                                            <p className="text-[13px] font-bold text-[#1A1A1A]">{meta.label}</p>
                                            <span
                                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto"
                                                style={{ backgroundColor: meta.bg, color: meta.color }}
                                            >
                                                {sectionTags.length}
                                            </span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            <AnimatePresence>
                                                {sectionTags.map((tag) => (
                                                    <motion.div
                                                        key={tag}
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.15 } }}
                                                        className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-[12px] font-semibold"
                                                        style={{ backgroundColor: meta.bg, color: meta.color }}
                                                    >
                                                        {tag}
                                                        <button
                                                            onClick={() => onRemoveTag(section, tag)}
                                                            className="w-4 h-4 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                                                            style={{ backgroundColor: meta.color + "30" }}
                                                        >
                                                            <X className="w-2.5 h-2.5" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                );
                            })}

                            {totalTags > 0 && (
                                <p className="text-[10px] text-[#8E8E93]/60 text-center pt-1">
                                    Tap × on any tag to remove it · Your itinerary updates automatically
                                </p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
