"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import {
    X,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
    ChevronLeft,
    ShieldCheck,
    RefreshCw,
    CheckCircle2,
} from "lucide-react";

/* ── Props ─────────────────────────────────────────────────────────────── */
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // called after successful auth → proceed to destinations
}

/* ── Types ─────────────────────────────────────────────────────────────── */
type Mode = "signin" | "signup";
type FPStep = "email" | "otp" | "reset" | "done"; // forgot-password wizard steps

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

/* ── OTP Input ─────────────────────────────────────────────────────────── */
function OTPInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);
    const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

    const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (digits[i]) {
                const next = digits.map((d, idx) => (idx === i ? "" : d)).join("");
                onChange(next);
            } else if (i > 0) {
                refs.current[i - 1]?.focus();
                const next = digits.map((d, idx) => (idx === i - 1 ? "" : d)).join("");
                onChange(next);
            }
        }
    };

    const handleChange = (i: number, char: string) => {
        if (!/^\d$/.test(char)) return;
        const next = digits.map((d, idx) => (idx === i ? char : d)).join("");
        onChange(next.trim());
        if (i < 5) refs.current[i + 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        onChange(pasted);
        refs.current[Math.min(pasted.length, 5)]?.focus();
    };

    return (
        <div className="flex gap-2 justify-center">
            {digits.map((d, i) => (
                <input
                    key={i}
                    ref={(el) => { refs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onPaste={handlePaste}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKey(i, e)}
                    onFocus={(e) => e.target.select()}
                    className={`w-11 h-13 text-center text-[20px] font-bold rounded-2xl border-2 outline-none transition-all
            ${d ? "border-[#FFD233] bg-[#FFFAE8] text-[#1A1A1A]" : "border-[#E5E5EA] bg-[#F2F2F7] text-[#8E8E93]"}
            focus:border-[#FFD233] focus:bg-[#FFFAE8]`}
                    style={{ minWidth: 44, height: 52 }}
                />
            ))}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   AuthModal
══════════════════════════════════════════════════════════════════════════ */
export default function AuthModal({ isOpen, onClose, onSuccess }: Props) {
    /* ── Main auth state ── */
    const [mode, setMode] = useState<Mode>("signin");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /* ── Forgot-password wizard state ── */
    const [forgotOpen, setForgotOpen] = useState(false);
    const [fpStep, setFpStep] = useState<FPStep>("email");
    const [fpEmail, setFpEmail] = useState("");
    const [fpOtp, setFpOtp] = useState("");
    const [fpNewPass, setFpNewPass] = useState("");
    const [fpConfirmPass, setFpConfirmPass] = useState("");
    const [fpShowNew, setFpShowNew] = useState(false);
    const [fpShowConfirm, setFpShowConfirm] = useState(false);
    const [fpLoading, setFpLoading] = useState(false);
    const [fpError, setFpError] = useState<string | null>(null);
    const [resendCooldown, setResendCooldown] = useState(0);

    /* ── Resend countdown ── */
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCooldown]);

    /* ── Helpers ── */
    const resetAuth = () => { setName(""); setEmail(""); setPassword(""); setError(null); setLoading(false); };
    const switchMode = (m: Mode) => { setMode(m); resetAuth(); };

    const openForgot = () => {
        setForgotOpen(true);
        setFpStep("email");
        setFpEmail(email); // pre-fill if user already typed email
        setFpOtp(""); setFpNewPass(""); setFpConfirmPass(""); setFpError(null);
    };
    const closeForgot = () => { setForgotOpen(false); setFpError(null); };

    /* ═══════════════════════════════════════════════════════════════════════
       STEP 1 – Send OTP
    ═══════════════════════════════════════════════════════════════════════ */
    const handleSendOtp = async () => {
        setFpError(null);
        if (!fpEmail || !/\S+@\S+\.\S+/.test(fpEmail)) {
            setFpError("Please enter a valid email address.");
            return;
        }
        setFpLoading(true);
        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: fpEmail }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send OTP");
            setFpStep("otp");
            setResendCooldown(60);
            // Dev: show preview link in console
            if (data.previewUrl) console.log("[OTP Email Preview]:", data.previewUrl);
        } catch (e: any) {
            setFpError(e.message);
        } finally {
            setFpLoading(false);
        }
    };

    /* ═══════════════════════════════════════════════════════════════════════
       STEP 2 – Verify OTP
    ═══════════════════════════════════════════════════════════════════════ */
    const handleVerifyOtp = async () => {
        setFpError(null);
        if (fpOtp.length !== 6) { setFpError("Please enter the 6-digit OTP."); return; }
        setFpLoading(true);
        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: fpEmail, otp: fpOtp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "OTP verification failed");
            setFpStep("reset");
        } catch (e: any) {
            setFpError(e.message);
        } finally {
            setFpLoading(false);
        }
    };

    /* ═══════════════════════════════════════════════════════════════════════
       STEP 3 – Reset Password
    ═══════════════════════════════════════════════════════════════════════ */
    const handleResetPassword = async () => {
        setFpError(null);
        if (!fpNewPass || fpNewPass.length < 6) { setFpError("Password must be at least 6 characters."); return; }
        if (fpNewPass !== fpConfirmPass) { setFpError("Passwords do not match."); return; }
        setFpLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: fpEmail, newPassword: fpNewPass }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to reset password");

            setFpStep("done");
        } catch (e: any) {
            setFpError(e.message);
        } finally {
            setFpLoading(false);
        }
    };

    /* ═══════════════════════════════════════════════════════════════════════
       Email / Password sign-in / sign-up
    ═══════════════════════════════════════════════════════════════════════ */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) { setError("Please fill in all fields."); return; }
        if (mode === "signup" && !name) { setError("Please enter your name."); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
        if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email."); return; }

        setLoading(true);
        const res = await signIn("credentials", { email, password, name, mode, redirect: false });
        setLoading(false);

        if (res?.error) {
            setError("Invalid credentials. Please try again.");
        } else {
            onSuccess();
        }
    };

    /* ═══════════════════════════════════════════════════════════════════════
       Google OAuth
    ═══════════════════════════════════════════════════════════════════════ */
    const handleGoogle = async () => {
        setError(null);
        setGoogleLoading(true);
        try {
            await signIn("google", { callbackUrl: window.location.origin });
        } catch {
            setGoogleLoading(false);
            setError("Google sign-in failed. Please use email/password instead.");
        }
    };

    /* ═══════════════════════════════════════════════════════════════════════
       Render
    ═══════════════════════════════════════════════════════════════════════ */
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-end justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={!forgotOpen ? onClose : undefined} />

                    {/* ── Main auth sheet ── */}
                    <motion.div
                        className="relative w-full max-w-[430px] bg-white rounded-t-[32px] overflow-hidden"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    >
                        {/* Handle */}
                        <div className="flex justify-center pt-3 pb-0">
                            <div className="w-10 h-1 bg-[#E5E5EA] rounded-full" />
                        </div>

                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-5 w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center z-10"
                        >
                            <X className="w-4 h-4 text-[#1A1A1A]" />
                        </button>

                        <div className="px-6 pt-5 pb-8">
                            {/* Hero */}
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-[#FFD233] flex items-center justify-center mb-4">
                                    <User className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
                                </div>
                                <h2 className="text-[22px] font-bold text-[#1A1A1A] leading-tight">
                                    {mode === "signin" ? "Welcome back" : "Create your account"}
                                </h2>
                                <p className="text-[13px] text-[#8E8E93] mt-1">
                                    {mode === "signin"
                                        ? "Sign in to save your travel profile & itinerary"
                                        : "Join TravelBuddy to access your personalised trip"}
                                </p>
                            </div>

                            {/* Mode toggle */}
                            <div className="flex bg-[#F2F2F7] rounded-xl p-1 mb-5">
                                {(["signin", "signup"] as Mode[]).map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => switchMode(m)}
                                        className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all ${mode === m ? "bg-white text-[#1A1A1A] shadow-sm" : "text-[#8E8E93]"
                                            }`}
                                    >
                                        {m === "signin" ? "Sign In" : "Sign Up"}
                                    </button>
                                ))}
                            </div>

                            {/* Google button */}
                            <button
                                onClick={handleGoogle}
                                disabled={googleLoading}
                                className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-[#E5E5EA] rounded-2xl text-[14px] font-semibold text-[#1A1A1A] hover:border-[#D0D0D8] hover:bg-[#F9F9FB] transition-all active:scale-[0.98] mb-4 disabled:opacity-60"
                            >
                                {googleLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-[#8E8E93]" />
                                ) : (
                                    <GoogleIcon />
                                )}
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-1 h-px bg-[#E5E5EA]" />
                                <span className="text-[11px] font-medium text-[#B0B0B0] uppercase">or</span>
                                <div className="flex-1 h-px bg-[#E5E5EA]" />
                            </div>

                            {/* Email form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                {/* Name - signup only */}
                                <AnimatePresence>
                                    {mode === "signup" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                                                <input
                                                    type="text"
                                                    placeholder="Your name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F2F2F7] text-[14px] text-[#1A1A1A] placeholder-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#FFD233] transition-all"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Email */}
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F2F2F7] text-[14px] text-[#1A1A1A] placeholder-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#FFD233] transition-all"
                                    />
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        placeholder="Password (min 6 chars)"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#F2F2F7] text-[14px] text-[#1A1A1A] placeholder-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#FFD233] transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass((v) => !v)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1A1A1A] transition-colors"
                                    >
                                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>

                                {/* Forgot password link - sign-in mode only */}
                                {mode === "signin" && (
                                    <div className="flex justify-end -mt-1">
                                        <button
                                            type="button"
                                            onClick={openForgot}
                                            className="text-[12px] font-semibold text-[#6B6B6B] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                )}

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            className="text-[12px] text-[#FF3B30] font-medium px-1"
                                        >
                                            ⚠ {error}
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    whileTap={{ scale: 0.97 }}
                                    disabled={loading}
                                    className="w-full py-4 bg-[#1A1A1A] text-white rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 mt-1 shadow-[0_4px_16px_rgba(0,0,0,0.15)] disabled:opacity-60 transition-opacity"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            {mode === "signin" ? "Sign In" : "Create Account"}
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            <p className="text-[10px] text-[#B0B0B0] text-center mt-4">
                                By continuing you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </motion.div>

                    {/* ══════════════════════════════════════════════════════════════
              FORGOT PASSWORD BOTTOM SHEET
          ══════════════════════════════════════════════════════════════ */}
                    <AnimatePresence>
                        {forgotOpen && (
                            <motion.div
                                className="absolute inset-0 z-[90] flex items-end justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Dimmed backdrop over main sheet */}
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={fpStep !== "done" ? closeForgot : undefined} />

                                <motion.div
                                    className="relative w-full max-w-[430px] bg-white rounded-t-[32px] overflow-hidden"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                >
                                    {/* Handle */}
                                    <div className="flex justify-center pt-3">
                                        <div className="w-10 h-1 bg-[#E5E5EA] rounded-full" />
                                    </div>

                                    {/* Back / Close row */}
                                    <div className="flex items-center px-5 pt-3 pb-0 min-h-[40px]">
                                        {fpStep !== "done" && fpStep !== "email" && (
                                            <button
                                                onClick={() =>
                                                    setFpStep(fpStep === "otp" ? "email" : fpStep === "reset" ? "otp" : "email")
                                                }
                                                className="flex items-center gap-1 text-sm font-medium text-[#6B6B6B]"
                                            >
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>
                                        )}
                                        <button
                                            onClick={closeForgot}
                                            className="ml-auto w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center"
                                        >
                                            <X className="w-4 h-4 text-[#1A1A1A]" />
                                        </button>
                                    </div>

                                    <div className="px-6 pt-4 pb-10">
                                        <AnimatePresence mode="wait">

                                            {/* ── STEP: email ─────────────────────────────── */}
                                            {fpStep === "email" && (
                                                <motion.div
                                                    key="fp-email"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    {/* Icon */}
                                                    <div className="w-14 h-14 rounded-2xl bg-[#F2F2F7] flex items-center justify-center mb-5 mx-auto" style={{ width: 56, height: 56 }}>
                                                        <Mail className="w-7 h-7 text-[#1A1A1A]" />
                                                    </div>
                                                    <h3 className="text-[20px] font-bold text-[#1A1A1A] text-center mb-1">Forgot password?</h3>
                                                    <p className="text-[13px] text-[#8E8E93] text-center mb-6 leading-relaxed">
                                                        No worries! Enter your email and we'll send you a 6-digit code to reset your password.
                                                    </p>

                                                    <div className="relative mb-4">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                                                        <input
                                                            type="email"
                                                            placeholder="Email address"
                                                            value={fpEmail}
                                                            onChange={(e) => setFpEmail(e.target.value)}
                                                            onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F2F2F7] text-[14px] text-[#1A1A1A] placeholder-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#FFD233] transition-all"
                                                        />
                                                    </div>

                                                    <AnimatePresence>
                                                        {fpError && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                                className="text-[12px] text-[#FF3B30] font-medium mb-3 px-1"
                                                            >⚠ {fpError}</motion.p>
                                                        )}
                                                    </AnimatePresence>

                                                    <motion.button
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={handleSendOtp}
                                                        disabled={fpLoading}
                                                        className="w-full py-4 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,210,51,0.3)] disabled:opacity-60"
                                                    >
                                                        {fpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
                                                    </motion.button>
                                                </motion.div>
                                            )}

                                            {/* ── STEP: otp ───────────────────────────────── */}
                                            {fpStep === "otp" && (
                                                <motion.div
                                                    key="fp-otp"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <div className="w-14 h-14 rounded-2xl bg-[#FFFAE8] flex items-center justify-center mb-5 mx-auto" style={{ width: 56, height: 56 }}>
                                                        <ShieldCheck className="w-7 h-7 text-[#F5A623]" />
                                                    </div>
                                                    <h3 className="text-[20px] font-bold text-[#1A1A1A] text-center mb-1">Check your email</h3>
                                                    <p className="text-[13px] text-[#8E8E93] text-center mb-2 leading-relaxed">
                                                        We sent a 6-digit code to
                                                    </p>
                                                    <p className="text-[14px] font-semibold text-[#1A1A1A] text-center mb-6">
                                                        {fpEmail}
                                                    </p>

                                                    <OTPInput value={fpOtp} onChange={setFpOtp} />

                                                    {/* Resend */}
                                                    <div className="flex items-center justify-center gap-1 mt-4 mb-4">
                                                        <span className="text-[12px] text-[#8E8E93]">Didn't get it?</span>
                                                        <button
                                                            onClick={() => { setFpOtp(""); setFpStep("email"); setResendCooldown(0); }}
                                                            disabled={resendCooldown > 0}
                                                            className={`text-[12px] font-semibold flex items-center gap-1 transition-colors ${resendCooldown > 0 ? "text-[#B0B0B0]" : "text-[#1A1A1A] hover:text-[#F5A623]"
                                                                }`}
                                                        >
                                                            <RefreshCw className="w-3 h-3" />
                                                            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                                                        </button>
                                                    </div>

                                                    <AnimatePresence>
                                                        {fpError && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                                className="text-[12px] text-[#FF3B30] font-medium mb-3 px-1 text-center"
                                                            >⚠ {fpError}</motion.p>
                                                        )}
                                                    </AnimatePresence>

                                                    <motion.button
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={handleVerifyOtp}
                                                        disabled={fpLoading || fpOtp.length < 6}
                                                        className="w-full py-4 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,210,51,0.3)] disabled:opacity-50"
                                                    >
                                                        {fpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Verify OTP <ArrowRight className="w-4 h-4" /></>}
                                                    </motion.button>
                                                </motion.div>
                                            )}

                                            {/* ── STEP: reset ─────────────────────────────── */}
                                            {fpStep === "reset" && (
                                                <motion.div
                                                    key="fp-reset"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <div className="w-14 h-14 rounded-2xl bg-[#F2F2F7] flex items-center justify-center mb-5 mx-auto" style={{ width: 56, height: 56 }}>
                                                        <Lock className="w-7 h-7 text-[#1A1A1A]" />
                                                    </div>
                                                    <h3 className="text-[20px] font-bold text-[#1A1A1A] text-center mb-1">Set new password</h3>
                                                    <p className="text-[13px] text-[#8E8E93] text-center mb-6 leading-relaxed">
                                                        Choose a strong password you haven't used before.
                                                    </p>

                                                    <div className="flex flex-col gap-3">
                                                        {/* New password */}
                                                        <div className="relative">
                                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                                                            <input
                                                                type={fpShowNew ? "text" : "password"}
                                                                placeholder="New password"
                                                                value={fpNewPass}
                                                                onChange={(e) => setFpNewPass(e.target.value)}
                                                                className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#F2F2F7] text-[14px] text-[#1A1A1A] placeholder-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#FFD233] transition-all"
                                                            />
                                                            <button type="button" onClick={() => setFpShowNew((v) => !v)}
                                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1A1A1A]">
                                                                {fpShowNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                            </button>
                                                        </div>

                                                        {/* Confirm password */}
                                                        <div className="relative">
                                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                                                            <input
                                                                type={fpShowConfirm ? "text" : "password"}
                                                                placeholder="Confirm new password"
                                                                value={fpConfirmPass}
                                                                onChange={(e) => setFpConfirmPass(e.target.value)}
                                                                className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#F2F2F7] text-[14px] text-[#1A1A1A] placeholder-[#B0B0B0] outline-none focus:ring-2 focus:ring-[#FFD233] transition-all"
                                                            />
                                                            <button type="button" onClick={() => setFpShowConfirm((v) => !v)}
                                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1A1A1A]">
                                                                {fpShowConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                            </button>
                                                        </div>

                                                        {/* Password strength hint */}
                                                        {fpNewPass && (
                                                            <div className="flex gap-1.5 px-1">
                                                                {[6, 8, 12].map((threshold, i) => (
                                                                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${fpNewPass.length >= threshold
                                                                        ? i === 0 ? "bg-[#FF9500]" : i === 1 ? "bg-[#FFD233]" : "bg-[#34C759]"
                                                                        : "bg-[#E5E5EA]"
                                                                        }`} />
                                                                ))}
                                                                <span className="text-[10px] text-[#8E8E93] ml-1">
                                                                    {fpNewPass.length < 6 ? "Too short" : fpNewPass.length < 8 ? "Weak" : fpNewPass.length < 12 ? "Good" : "Strong"}
                                                                </span>
                                                            </div>
                                                        )}

                                                        <AnimatePresence>
                                                            {fpError && (
                                                                <motion.p
                                                                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                                    className="text-[12px] text-[#FF3B30] font-medium px-1"
                                                                >⚠ {fpError}</motion.p>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    <motion.button
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={handleResetPassword}
                                                        disabled={fpLoading}
                                                        className="w-full py-4 bg-[#1A1A1A] text-white rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 mt-5 shadow-[0_4px_16px_rgba(0,0,0,0.15)] disabled:opacity-60"
                                                    >
                                                        {fpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Reset Password <ArrowRight className="w-4 h-4" /></>}
                                                    </motion.button>
                                                </motion.div>
                                            )}

                                            {/* ── STEP: done ── */}
                                            {fpStep === "done" && (
                                                <motion.div
                                                    key="fp-done"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ type: "spring", damping: 18, stiffness: 200 }}
                                                    className="flex flex-col items-center text-center py-4"
                                                >
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: "spring", damping: 15, stiffness: 250, delay: 0.1 }}
                                                        className="w-20 h-20 rounded-full bg-[#D1FAE5] flex items-center justify-center mb-6"
                                                    >
                                                        <CheckCircle2 className="w-10 h-10 text-[#34C759]" strokeWidth={2} />
                                                    </motion.div>
                                                    <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-2">Password reset!</h3>
                                                    <p className="text-[13px] text-[#8E8E93] leading-relaxed mb-8">
                                                        Your password has been updated successfully. Sign in with your new password.
                                                    </p>
                                                    <motion.button
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() => { closeForgot(); setMode("signin"); resetAuth(); }}
                                                        className="w-full py-4 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,210,51,0.3)]"
                                                    >
                                                        Sign In Now <ArrowRight className="w-4 h-4" />
                                                    </motion.button>
                                                </motion.div>
                                            )}

                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
