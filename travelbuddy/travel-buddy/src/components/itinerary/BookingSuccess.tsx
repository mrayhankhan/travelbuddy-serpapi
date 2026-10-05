"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Gift, MapPin, ArrowRight, Sparkles, Download } from "lucide-react";
import { TripItinerary } from "@/data/itineraryMock";
import type { PaymentSuccessDetails } from "@/components/itinerary/PaymentGateway";
import { downloadBookingConfirmationPdf } from "@/lib/bookingPdf";

// ── Cashback logic ───────────────────────────────────────────────────────────
function calculateTravelCash(tripCost: number): number {
    if (tripCost < 60000) return 1500;
    if (tripCost < 100000) return 2500;
    return 3500;
}

// ── Per-destination redemption cards ─────────────────────────────────────────
interface RedeemCard { emoji: string; type: string; name: string; offer: string; }

const DESTINATION_REWARDS: Record<string, RedeemCard[]> = {
    'Amsterdam': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Canal House Bistro', offer: '₹500 OFF' },
        { emoji: '🎨', type: 'Experience', name: 'Rijksmuseum Night Tour', offer: '₹1000 OFF' },
        { emoji: '🚲', type: 'Activity', name: 'Vondelpark Bike Rental', offer: '₹700 OFF' },
        { emoji: '☕', type: 'Café', name: 'De Koffie Salon', offer: 'Free pastry' },
    ],
    'Vienna': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Café Sacher', offer: '₹500 OFF' },
        { emoji: '🎵', type: 'Experience', name: 'Classical Vienna Concert', offer: '₹1000 OFF' },
        { emoji: '🏰', type: 'Activity', name: 'Palace Garden Tour', offer: '₹700 OFF' },
        { emoji: '☕', type: 'Café', name: 'Central Cafe', offer: 'Free Sachertorte' },
    ],
    'Budapest': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Buda Ruin Kitchen', offer: '₹500 OFF' },
        { emoji: '♨️', type: 'Experience', name: 'Szechenyi Night Bath', offer: '₹1000 OFF' },
        { emoji: '🚢', type: 'Activity', name: 'Danube Sunset Cruise', offer: '₹700 OFF' },
        { emoji: '🍺', type: 'Bar', name: 'Szimpla Ruin Bar', offer: 'Free cocktail' },
    ],
    'Lisbon': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Alfama Fish House', offer: '₹500 OFF' },
        { emoji: '🎶', type: 'Experience', name: 'Fado Night Experience', offer: '₹1000 OFF' },
        { emoji: '🚃', type: 'Activity', name: 'Tram 28 Day Pass', offer: '₹700 OFF' },
        { emoji: '🥐', type: 'Café', name: 'Pastéis de Belém', offer: 'Free box of 6' },
    ],
    'Copenhagen': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Nyhavn Seafood Grill', offer: '₹500 OFF' },
        { emoji: '🎢', type: 'Experience', name: 'Tivoli VIP Night Pass', offer: '₹1000 OFF' },
        { emoji: '🚲', type: 'Activity', name: 'Copenhagen Bike Tour', offer: '₹700 OFF' },
        { emoji: '☕', type: 'Café', name: 'Hygge Coffee House', offer: 'Free kanelbulle' },
    ],
    'Dubrovnik': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Old Town Fish Tavern', offer: '₹500 OFF' },
        { emoji: '🏰', type: 'Experience', name: 'GoT Walking Tour', offer: '₹1000 OFF' },
        { emoji: '🚣', type: 'Activity', name: 'Sea Kayak Adventure', offer: '₹700 OFF' },
        { emoji: '🍷', type: 'Bar', name: 'Buža Cliff Bar', offer: 'Free glass of wine' },
    ],
    'Athens': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Plaka Rooftop Taverna', offer: '₹500 OFF' },
        { emoji: '🏛️', type: 'Experience', name: 'Acropolis Sunset Tour', offer: '₹1000 OFF' },
        { emoji: '🧀', type: 'Activity', name: 'Greek Food Walking Tour', offer: '₹700 OFF' },
        { emoji: '☕', type: 'Café', name: 'Little Kook Café', offer: 'Free baklava' },
    ],
    'Edinburgh': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Royal Mile Gastropub', offer: '₹500 OFF' },
        { emoji: '🥃', type: 'Experience', name: 'Scotch Whisky Tasting', offer: '₹1000 OFF' },
        { emoji: '🏔️', type: 'Activity', name: "Arthur's Seat Hike", offer: '₹700 OFF' },
        { emoji: '☕', type: 'Café', name: 'The Elephant House', offer: 'Free scone' },
    ],
    'Tromsø': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Arctic Grill', offer: '₹500 OFF' },
        { emoji: '🌌', type: 'Experience', name: 'Northern Lights Tour', offer: '₹1000 OFF' },
        { emoji: '🚢', type: 'Activity', name: 'Fjord Cruise', offer: '₹700 OFF' },
        { emoji: '☕', type: 'Café', name: 'Polar Café', offer: 'Free dessert' },
    ],
    'Reykjavik': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Grillið Steakhouse', offer: '₹500 OFF' },
        { emoji: '🌋', type: 'Experience', name: 'Golden Circle Tour', offer: '₹1000 OFF' },
        { emoji: '♨️', type: 'Activity', name: 'Blue Lagoon Upgrade', offer: '₹700 OFF' },
        { emoji: '☕', type: 'Café', name: 'Reykjavik Roasters', offer: 'Free coffee' },
    ],
    'Prague': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Old Town Beer Hall', offer: '₹500 OFF' },
        { emoji: '🏰', type: 'Experience', name: 'Castle Night Tour', offer: '₹1000 OFF' },
        { emoji: '🚶', type: 'Activity', name: 'Charles Bridge Walk', offer: '₹700 OFF' },
        { emoji: '🍺', type: 'Bar', name: 'Brewery Staropramen', offer: 'Free tasting' },
    ],
    'Istanbul': [
        { emoji: '🍽️', type: 'Restaurant', name: 'Bosphorus Kebab House', offer: '₹500 OFF' },
        { emoji: '🕌', type: 'Experience', name: 'Grand Bazaar Tour', offer: '₹1000 OFF' },
        { emoji: '🚤', type: 'Activity', name: 'Bosphorus Cruise', offer: '₹700 OFF' },
        { emoji: '☕', type: 'Café', name: 'Turkish Coffee House', offer: 'Free dessert' },
    ],
};

const DEFAULT_REWARDS: RedeemCard[] = [
    { emoji: '🍽️', type: 'Restaurant', name: 'Local Bistro', offer: '₹500 OFF' },
    { emoji: '🎭', type: 'Experience', name: 'City Walking Tour', offer: '₹1000 OFF' },
    { emoji: '🎒', type: 'Activity', name: 'Adventure Activity', offer: '₹700 OFF' },
    { emoji: '☕', type: 'Café', name: 'Local Coffee House', offer: 'Free dessert' },
];

const CARD_BG_COLORS = ['#FFF8E7', '#F0F0FF', '#EEFFF4', '#FFF0F5'];

export default function BookingSuccess({
    destination,
    country,
    duration,
    totalCost,
    image,
    onReset,
    userEmail,
    itinerary,
    paymentDetails,
    bookedAt,
}: {
    destination: string;
    country: string;
    duration: string;
    totalCost: number;
    image: string;
    onReset: () => void;
    userEmail?: string | null;
    itinerary?: TripItinerary | null;
    paymentDetails?: PaymentSuccessDetails | null;
    bookedAt?: string;
}) {
    const travelCash = calculateTravelCash(totalCost);
    const rewards = DESTINATION_REWARDS[destination] || DEFAULT_REWARDS;
    const creditedRef = useRef(false);

    // Credit travel cash to user's backend account (fire-and-forget, once)
    useEffect(() => {
        if (!userEmail || creditedRef.current) return;
        creditedRef.current = true;
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';
        fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(userEmail)}/credit-cashback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: travelCash }),
        }).catch(console.error);
    }, [userEmail, travelCash]);

    return (
        <div className="min-h-[100dvh] overflow-y-auto"
            style={{ background: "linear-gradient(180deg, #F5F3FF 0%, #FFFCF0 100%)" }}>

            {/* ═══ Full-bleed Hero Image with Confirmation ═══ */}
            <motion.div
                className="relative w-full h-[380px] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background destination image */}
                <img src={image} alt={destination}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #2D7D6F, #1A1A2E)';
                        }
                    }}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

                {/* Confirmation content overlaid on image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                    <motion.div
                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-5 border border-white/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <CheckCircle className="w-10 h-10 text-[#34C759]" />
                    </motion.div>
                    <motion.h1
                        className="text-[28px] font-bold text-white mb-1.5 drop-shadow-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Booking Confirmed 🎉
                    </motion.h1>
                    <p className="text-[14px] text-white/70">Your trip is all set!</p>
                </div>

                {/* Destination name at bottom of hero */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="text-white text-[24px] font-bold drop-shadow-md">{destination}</h3>
                            <div className="flex items-center gap-1.5 mt-1">
                                <MapPin className="w-3.5 h-3.5 text-white/60" />
                                <span className="text-white/60 text-[13px] font-medium">{country}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ═══ Trip Details Bar ═══ */}
            <motion.div
                className="mx-5 -mt-5 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-5 py-4 flex justify-between items-center mb-6 relative z-10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
            >
                <div>
                    <p className="text-[10px] text-[#8E8E93] font-medium uppercase tracking-wider mb-0.5">Duration</p>
                    <p className="text-[16px] font-bold text-[#1A1A1A]">{duration}</p>
                </div>
                <div className="w-px h-8 bg-[#F2F2F7]" />
                <div className="text-right">
                    <p className="text-[10px] text-[#8E8E93] font-medium uppercase tracking-wider mb-0.5">Total Cost</p>
                    <p className="text-[22px] font-bold text-[#1A1A1A]">₹{totalCost.toLocaleString()}</p>
                </div>
            </motion.div>

            {/* ═══ Travel Cash Reward Banner ═══ */}
            <motion.div
                className="mx-5 rounded-3xl overflow-hidden mb-8"
                style={{ background: "linear-gradient(135deg, #FFD233 0%, #F5A623 100%)" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.45 }}
            >
                <div className="p-6 flex items-start gap-4">
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/25 flex items-center justify-center flex-shrink-0"
                        animate={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Gift className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="pt-0.5">
                        <p className="text-[12px] text-[#1A1A1A]/60 font-semibold uppercase tracking-wider mb-1">You earned</p>
                        <p className="text-[26px] font-bold text-[#1A1A1A] leading-tight">
                            ₹{travelCash.toLocaleString()}
                        </p>
                        <p className="text-[14px] font-semibold text-[#1A1A1A]/80 mt-0.5">TravelBuddy Travel Cash</p>
                        <p className="text-[11px] text-[#1A1A1A]/50 mt-1.5">
                            Use for restaurants & experiences at your destination
                        </p>
                    </div>
                </div>

                <div className="px-6 pb-5">
                    <div className="flex items-center gap-2 bg-white/15 rounded-2xl px-4 py-2.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]/60" />
                        <p className="text-[11px] text-[#1A1A1A]/60 font-medium">
                            Valid for 90 days · Auto-applied at partner locations
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* ═══ Redemption Section ═══ */}
            <motion.div
                className="px-5 mb-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.45 }}
            >
                <p className="text-[11px] font-bold text-[#F5A623] tracking-[0.12em] uppercase mb-1.5">
                    Redeem in {destination}
                </p>
                <h2 className="text-[20px] font-bold text-[#1A1A1A] mb-5">Use your Travel Cash ✨</h2>

                <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-3">
                    {rewards.map((card, i) => (
                        <motion.div
                            key={i}
                            className="flex-shrink-0 w-[160px] rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden"
                            style={{ background: 'white' }}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.85 + i * 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="h-[70px] flex items-center justify-center text-[36px]"
                                style={{ background: CARD_BG_COLORS[i % 4] }}>
                                {card.emoji}
                            </div>
                            <div className="p-3.5">
                                <p className="text-[9px] font-bold text-[#8E8E93] uppercase tracking-[0.1em] mb-1">
                                    {card.type}
                                </p>
                                <p className="text-[13px] font-bold text-[#1A1A1A] leading-snug mb-2.5 min-h-[36px]">
                                    {card.name}
                                </p>
                                <span className="inline-block text-[11px] font-bold text-[#34C759] bg-[#34C759]/10 px-3 py-1 rounded-full">
                                    {card.offer}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ═══ CTA ═══ */}
            <motion.div
                className="px-5 pb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
            >
                {itinerary && paymentDetails && (
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                            downloadBookingConfirmationPdf({
                                itinerary,
                                payment: paymentDetails,
                                bookedAt,
                            })
                        }
                        className="w-full py-4.5 mb-3 bg-white text-[#1A1A1A] rounded-full text-[15px] font-bold flex items-center justify-center gap-2 border border-[#E5E5EA]"
                        style={{ paddingTop: '18px', paddingBottom: '18px' }}
                    >
                        <Download className="w-4 h-4" />
                        Download Confirmation PDF
                    </motion.button>
                )}

                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={onReset}
                    className="w-full py-4.5 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,210,51,0.35)]"
                    style={{ paddingTop: '18px', paddingBottom: '18px' }}
                >
                    Start a New Journey
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
                <p className="text-center text-[11px] text-[#C7C7CC] mt-3">
                    Your booking details have been saved to your profile
                </p>
            </motion.div>
        </div>
    );
}
