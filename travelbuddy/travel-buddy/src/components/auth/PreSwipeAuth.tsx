"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { ArrowRight, Loader2, User, Compass, MapPin, RefreshCw } from "lucide-react";

/* ── Google icon SVG ────────────────────────────────────────────────────── */
function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

// The returning user data shape from the API
export interface ReturningUserData {
    sessionId: string;
    hasPreferences: boolean;
    budget: number;
    profileTags: any;
    savedItinerary: any | null;
    savedShortlist: any[];
}

interface Props {
    onSignIn: () => void;              // called after successful auth (will check for returning user)
    onSkip: () => void;                // skip auth and proceed to swiping
    onOpenEmailAuth: () => void;       // open the full AuthModal for email/password
    returningUser?: ReturningUserData | null; // populated after auth if user has previous data
    onViewPreviousTrip?: () => void;   // view saved itinerary
    onStartFresh?: () => void;         // discard previous and swipe again
}

export default function PreSwipeAuth({
    onSignIn,
    onSkip,
    onOpenEmailAuth,
    returningUser,
    onViewPreviousTrip,
    onStartFresh,
}: Props) {
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogle = async () => {
        setError(null);
        setGoogleLoading(true);
        try {
            await signIn("google", { callbackUrl: window.location.origin });
        } catch {
            setGoogleLoading(false);
            setError("Google sign-in failed. Please try email instead.");
        }
    };

    // ── Returning user view (shown after they sign in and have previous data) ──
    if (returningUser && returningUser.savedItinerary) {
        const dest = returningUser.savedItinerary?.destination || "your destination";
        return (
            <div className="min-h-[100dvh] flex flex-col bg-[#F5F3FF]">
                <div className="relative flex-shrink-0 pt-16 pb-8 px-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", damping: 15 }}
                        className="w-16 h-16 rounded-2xl bg-[#34C759] flex items-center justify-center mx-auto mb-6 shadow-[0_4px_16px_rgba(52,199,89,0.3)]"
                    >
                        <MapPin className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[26px] font-bold text-[#1A1A1A] tracking-tight"
                    >
                        Welcome back!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-[14px] text-[#8E8E93] mt-3 max-w-[300px] mx-auto leading-relaxed"
                    >
                        You have a saved trip. Would you like to continue where you left off?
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex-1 bg-white rounded-t-[36px] px-8 pt-10 pb-8 flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.04)]"
                >
                    {/* Previous trip card */}
                    <div className="bg-gradient-to-br from-[#F0F8FF] to-[#E8F4FD] rounded-2xl p-5 mb-6 border border-[#D0E5F5]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-[#FFD233] flex items-center justify-center">
                                <Compass className="w-5 h-5 text-[#1A1A1A]" />
                            </div>
                            <div>
                                <p className="text-[15px] font-bold text-[#1A1A1A]">{dest}</p>
                                <p className="text-[12px] text-[#8E8E93]">
                                    {returningUser.savedItinerary?.duration || ""} · ₹{((returningUser.savedItinerary?.totalCost || 0) / 1000).toFixed(0)}K
                                </p>
                            </div>
                        </div>
                        {returningUser.savedItinerary?.hotel?.name && (
                            <p className="text-[12px] text-[#6B6B6B] mt-[2px] pl-[52px]">
                                {returningUser.savedItinerary.hotel.name}
                            </p>
                        )}
                        {returningUser.savedItinerary?.days && (
                            <p className="text-[12px] text-[#6B6B6B] mt-1 pl-[52px]">
                                {returningUser.savedItinerary.days.length} days planned
                            </p>
                        )}
                    </div>

                    {/* View previous trip */}
                    <button
                        onClick={onViewPreviousTrip}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-[#1A1A1A] text-white rounded-2xl text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all mb-3"
                    >
                        <MapPin className="w-4 h-4" />
                        View My Trip
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-[#E5E5EA]" />
                        <span className="text-[11px] font-medium text-[#B0B0B0] uppercase">or</span>
                        <div className="flex-1 h-px bg-[#E5E5EA]" />
                    </div>

                    {/* Start fresh */}
                    <button
                        onClick={onStartFresh}
                        className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-[#E5E5EA] rounded-2xl text-[14px] font-semibold text-[#8E8E93] hover:text-[#1A1A1A] hover:border-[#D0D0D8] transition-all active:scale-[0.98]"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Plan a New Trip
                    </button>

                    <p className="text-[10px] text-[#B0B0B0] text-center mt-auto pt-6">
                        Starting fresh will create new preferences from scratch
                    </p>
                </motion.div>
            </div>
        );
    }

    // ── Default sign-in view (new user or before auth) ──
    return (
        <div className="min-h-[100dvh] flex flex-col bg-[#F5F3FF]">
            <div className="relative flex-shrink-0 pt-16 pb-8 px-8 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                    className="w-16 h-16 rounded-2xl bg-[#FFD233] flex items-center justify-center mx-auto shadow-[0_4px_16px_rgba(255,210,51,0.3)]"
                    style={{ marginBottom: 20 }}
                >
                    <Compass className="w-8 h-8 text-[#1A1A1A]" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-[26px] font-bold text-[#1A1A1A] tracking-tight"
                >
                    Almost ready!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[14px] text-[#8E8E93] max-w-[300px] mx-auto leading-relaxed"
                    style={{ marginTop: 12 }}
                >
                    Sign in to save your preferences and pick up where you left off next time.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex-1 bg-white rounded-t-[36px] px-8 pt-10 pb-8 flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.04)]"
            >
                {/* Returning user hint */}
                <div className="bg-[#FFFAE8] rounded-2xl p-4 flex items-start gap-3" style={{ marginBottom: 20 }}>
                    <div className="w-9 h-9 rounded-xl bg-[#FFD233]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-4 h-4 text-[#B8860B]" />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-[#1A1A1A]">Been here before?</p>
                        <p className="text-[12px] text-[#8E8E93] mt-0.5 leading-relaxed">
                            Sign in to skip swiping and jump straight to your personalised destinations.
                        </p>
                    </div>
                </div>

                {/* Google button */}
                <button
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-center gap-3 py-4 border-2 border-[#E5E5EA] rounded-2xl text-[15px] font-semibold text-[#1A1A1A] hover:border-[#D0D0D8] hover:bg-[#F9F9FB] transition-all active:scale-[0.98] disabled:opacity-60"
                    style={{ marginBottom: 14 }}
                >
                    {googleLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-[#8E8E93]" />
                    ) : (
                        <GoogleIcon />
                    )}
                    Continue with Google
                </button>

                {/* Email button */}
                <button
                    onClick={onOpenEmailAuth}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#1A1A1A] text-white rounded-2xl text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all"
                    style={{ marginBottom: 18 }}
                >
                    <User className="w-4 h-4" />
                    Continue with Email
                </button>

                {/* Error */}
                {error && (
                    <p className="text-[12px] text-[#FF3B30] font-medium text-center mb-3">
                        ⚠ {error}
                    </p>
                )}

                {/* Divider */}
                <div className="flex items-center gap-3" style={{ marginTop: 4, marginBottom: 4 }}>
                    <div className="flex-1 h-px bg-[#E5E5EA]" />
                    <span className="text-[11px] font-medium text-[#B0B0B0] uppercase">or</span>
                    <div className="flex-1 h-px bg-[#E5E5EA]" />
                </div>

                {/* Skip */}
                <button
                    onClick={onSkip}
                    className="w-full py-3.5 text-[14px] font-semibold text-[#8E8E93] hover:text-[#1A1A1A] transition-colors flex items-center justify-center gap-2"
                >
                    Skip for now <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-[#B0B0B0] text-center mt-auto pt-4">
                    You can always sign in later from any screen
                </p>
            </motion.div>
        </div>
    );
}
