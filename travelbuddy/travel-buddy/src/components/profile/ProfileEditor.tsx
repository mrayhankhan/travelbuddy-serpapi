"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, User, Camera, MapPin, Wallet, Shield,
    Check, Link2, Loader2, Plus, ChevronRight, Sparkles, LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

/* ── Types ─────────────────────────────────────────────────────────────── */
export interface UserProfile {
    email: string;
    name: string;
    image: string;
    age: number | null;
    city: string;
    bio: string;
    photos: string[];
    budgetRange: string;
    accommodationPref: string;
    spendingStyle: number;
    // Session / Trip fields
    departureCity: string;
    duration: string;
    travelers: number;
    adults: number;
    children: number;
    budget: number;

    travelStyleTags: string[];
    travelCash: number;
    isVerified: boolean;
    socialLink: string;
}

const EMPTY_PROFILE: UserProfile = {
    email: "", name: "", image: "", age: null, city: "", bio: "", photos: [],
    budgetRange: "", accommodationPref: "", spendingStyle: 50,
    departureCity: "", duration: "5-7", travelers: 2, adults: 2, children: 0, budget: 300000,
    travelStyleTags: [], travelCash: 0, isVerified: false, socialLink: "",
};

const BUDGET_RANGES = ["₹5k–10k", "₹10k–25k", "₹25k–60k", "₹60k+"];
const ACCOM_PREFS = ["Hostel", "Airbnb", "Hotel", "Resort"];

/* ── Tag section meta ────────────────────────────────────────────────── */
const SECTION_META = {
    vibes: { label: "Vibes", emoji: "✦", color: "#C9930A", bg: "#FFF8DC" },
    activities: { label: "Activities", emoji: "🤸", color: "#2B6BB0", bg: "#EEF5FB" },
    stays: { label: "Stays", emoji: "🏠", color: "#1A7A3A", bg: "#EDFBF1" },
} as const;

type SectionKey = keyof typeof SECTION_META;

export interface ProfileTagBuckets {
    vibes: string[];
    activities: string[];
    stays: string[];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    userEmail: string | null;
    /** Session-derived tags from swiping - used ONLY for initial categorization */
    swipeTags?: ProfileTagBuckets;
    /** Called whenever tags change so the parent can keep profileTags in sync */
    onTagsChange?: (tags: ProfileTagBuckets) => void;
    /** Called when the profile (including trip details) is updated and saved */
    onProfileUpdate?: (profileUpdates: Partial<UserProfile>) => void;
}

/* ── Chip (budget/accom) ─────────────────────────────────────────────── */
function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
    return (
        <button type="button" onClick={onClick}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all border-2 active:scale-95
            ${selected ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#6B6B6B] border-[#E5E5EA] hover:border-[#C0C0C0]"}`}>
            {label}
        </button>
    );
}

/* ── Section Header ─────────────────────────────────────────────────── */
function SectionHeader({ icon: Icon, title, color }: { icon: any; title: string; color: string }) {
    return (
        <div className="flex items-center gap-3 mb-6 mt-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon className="w-4.5 h-4.5" style={{ color }} />
            </div>
            <h3 className="text-[20px] font-bold text-[#1A1A1A] tracking-[-0.01em]">{title}</h3>
        </div>
    );
}

/* ── Save Button ─────────────────────────────────────────────────────── */
function SaveBtn({ onClick, saving, saved, disabled }: {
    onClick: () => void; saving: boolean; saved: boolean; disabled?: boolean;
}) {
    return (
        <button onClick={onClick} disabled={saving || disabled}
            className="px-4 py-2 bg-[#1A1A1A] text-white rounded-xl text-[13px] font-semibold flex items-center gap-1.5 disabled:opacity-40 active:scale-95 transition-all">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <Check className="w-3.5 h-3.5" /> : null}
            {saved ? "Saved!" : "Save"}
        </button>
    );
}

/* ── Removable tag pill ──────────────────────────────────────────────── */
function RemovableTag({ tag, section, onRemove }: { tag: string; section: SectionKey; onRemove: () => void }) {
    const meta = SECTION_META[section];
    return (
        <motion.div layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.15 } }}
            className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-[12px] font-semibold"
            style={{ backgroundColor: meta.bg, color: meta.color }}>
            {tag}
            <button onClick={onRemove}
                className="w-4 h-4 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                style={{ backgroundColor: meta.color + "30" }}>
                <X className="w-2.5 h-2.5" />
            </button>
        </motion.div>
    );
}

/* ── Add-tag input per section ───────────────────────────────────────── */
function AddTagInput({ section, color, onAdd }: { section: SectionKey; color: string; onAdd: (t: string) => void }) {
    const [val, setVal] = useState("");
    const submit = () => { const t = val.trim(); if (!t) return; setVal(""); onAdd(t); };
    return (
        <div className="flex gap-1.5 mt-2">
            <input type="text" value={val}
                onChange={e => setVal(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") submit(); }}
                placeholder={`Add to ${SECTION_META[section].label}…`}
                className="flex-1 px-3 py-1.5 rounded-full border text-[12px] focus:outline-none transition-colors bg-white"
                style={{ borderColor: color + "60", color: "#1A1A1A" }} />
            <button type="button" onClick={submit} disabled={!val.trim()}
                className="w-7 h-7 rounded-full flex items-center justify-center disabled:opacity-30 active:scale-90 transition-all"
                style={{ background: color }}>
                <Plus className="w-3.5 h-3.5 text-white" />
            </button>
        </div>
    );
}

/* ── Main Component ─────────────────────────────────────────────────── */
export default function ProfileEditor({ isOpen, onClose, userEmail, swipeTags, onTagsChange, onProfileUpdate }: Props) {
    const [profile, setProfile] = useState<UserProfile>(EMPTY_PROFILE);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [screen, setScreen] = useState<"profile" | "tags">("profile");

    // 3-bucket state - these are the SOURCE OF TRUTH for the UI
    const [draftVibes, setDraftVibes] = useState<string[]>([]);
    const [draftActivities, setDraftActivities] = useState<string[]>([]);
    const [draftStays, setDraftStays] = useState<string[]>([]);

    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const totalDraftTags = draftVibes.length + draftActivities.length + draftStays.length;

    // ── Fetch profile & build buckets on open ─────────────────────────
    useEffect(() => {
        if (!isOpen || !userEmail) return;
        setScreen("profile");
        setLoading(true);

        fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(userEmail)}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (!data) return;
                // ─ 1. Saved flat tags are the source of truth
                const savedTags: string[] = data.travelStyleTags || [];
                const savedSet = new Set(savedTags);

                // ─ 2. Use swipeTags ONLY to categorize tags - never override saved state
                const swipeVibeSet = new Set(swipeTags?.vibes ?? []);
                const swipeActSet = new Set(swipeTags?.activities ?? []);
                const swipeStaySet = new Set(swipeTags?.stays ?? []);

                if (savedTags.length > 0) {
                    // User has saved state - categorize saved tags by which swipe bucket they came from
                    // Priority: vibes > activities > stays (if same tag appears in multiple, first wins)
                    const vibes = savedTags.filter(t => swipeVibeSet.has(t));
                    const acts = savedTags.filter(t => swipeActSet.has(t) && !swipeVibeSet.has(t));
                    const stays = savedTags.filter(t => swipeStaySet.has(t) && !swipeVibeSet.has(t) && !swipeActSet.has(t));
                    // Custom tags (not from any swipe session bucket) go into vibes
                    const custom = savedTags.filter(t => !swipeVibeSet.has(t) && !swipeActSet.has(t) && !swipeStaySet.has(t));

                    // NEW swipe tags (not yet saved) get merged in
                    const newVibes = (swipeTags?.vibes ?? []).filter(t => !savedSet.has(t));
                    const newActs = (swipeTags?.activities ?? []).filter(t => !savedSet.has(t));
                    const newStays = (swipeTags?.stays ?? []).filter(t => !savedSet.has(t));

                    const finalVibes = [...vibes, ...custom, ...newVibes];
                    const finalActs = [...acts, ...newActs];
                    const finalStays = [...stays, ...newStays];

                    setDraftVibes(finalVibes);
                    setDraftActivities(finalActs);
                    setDraftStays(finalStays);

                    // If new swipe tags were added that aren't saved yet → persist them
                    if (newVibes.length || newActs.length || newStays.length) {
                        const merged = [...new Set([...savedTags, ...newVibes, ...newActs, ...newStays])];
                        fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(userEmail)}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ travelStyleTags: merged }),
                        }).catch(() => { });
                        onTagsChange?.({ vibes: finalVibes, activities: finalActs, stays: finalStays });
                    } else {
                        onTagsChange?.({ vibes: finalVibes, activities: finalActs, stays: finalStays });
                    }
                } else {
                    // No saved state yet - seed from swipe session tags
                    const sv = swipeTags?.vibes ?? [];
                    const sa = swipeTags?.activities ?? [];
                    const ss = swipeTags?.stays ?? [];
                    setDraftVibes(sv);
                    setDraftActivities(sa);
                    setDraftStays(ss);

                    if (sv.length || sa.length || ss.length) {
                        const merged = [...new Set([...sv, ...sa, ...ss])];
                        fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(userEmail)}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ travelStyleTags: merged }),
                        }).catch(() => { });
                        onTagsChange?.({ vibes: sv, activities: sa, stays: ss });
                    }
                }

                setProfile({ ...EMPTY_PROFILE, ...data });
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [isOpen, userEmail]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Persist buckets to backend + propagate up ─────────────────────
    const persistBuckets = useCallback(async (vibes: string[], activities: string[], stays: string[]) => {
        if (!userEmail) return;
        const merged = [...new Set([...vibes, ...activities, ...stays])];
        // Update profile summary row in real time
        setProfile(p => ({ ...p, travelStyleTags: merged }));
        // Propagate to parent (updates ProfileDrawer + count badge)
        onTagsChange?.({ vibes, activities, stays });
        // Fire & forget PATCH
        try {
            await fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(userEmail)}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ travelStyleTags: merged }),
            });
        } catch { }
    }, [userEmail, onTagsChange]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Remove tag from a section ─────────────────────────────────────
    const removeTag = useCallback((section: SectionKey, tag: string) => {
        setDraftVibes(prev => {
            const next = section === "vibes" ? prev.filter(t => t !== tag) : prev;
            setDraftActivities(prevA => {
                const nextA = section === "activities" ? prevA.filter(t => t !== tag) : prevA;
                setDraftStays(prevS => {
                    const nextS = section === "stays" ? prevS.filter(t => t !== tag) : prevS;
                    persistBuckets(next, nextA, nextS);
                    return nextS;
                });
                return nextA;
            });
            return next;
        });
    }, [persistBuckets]);

    // ── Add custom tag to a section ───────────────────────────────────
    const addTag = useCallback((section: SectionKey, tag: string) => {
        if (section === "vibes") {
            setDraftVibes(prev => {
                if (prev.includes(tag)) return prev;
                const next = [...prev, tag];
                setDraftActivities(a => { setDraftStays(s => { persistBuckets(next, a, s); return s; }); return a; });
                return next;
            });
        } else if (section === "activities") {
            setDraftActivities(prev => {
                if (prev.includes(tag)) return prev;
                const next = [...prev, tag];
                setDraftVibes(v => { setDraftStays(s => { persistBuckets(v, next, s); return s; }); return v; });
                return next;
            });
        } else {
            setDraftStays(prev => {
                if (prev.includes(tag)) return prev;
                const next = [...prev, tag];
                setDraftVibes(v => { setDraftActivities(a => { persistBuckets(v, a, next); return a; }); return v; });
                return next;
            });
        }
    }, [persistBuckets]);

    // ── Profile field update ──────────────────────────────────────────
    const update = useCallback(<K extends keyof UserProfile>(key: K, val: UserProfile[K]) => {
        setProfile(p => ({ ...p, [key]: val }));
    }, []);

    // ── Save main profile ─────────────────────────────────────────────
    const handleSaveProfile = useCallback(async () => {
        if (!userEmail) return;
        setSaving(true);
        try {
            const res = await fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(userEmail)}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });
            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
                onProfileUpdate?.({
                    departureCity: profile.departureCity,
                    duration: profile.duration,
                    travelers: profile.adults + profile.children,
                    adults: profile.adults,
                    children: profile.children,
                    budget: profile.budget
                });
            }
        } catch { }
        setSaving(false);
    }, [profile, userEmail, onProfileUpdate]);

    // ── Photo upload ──────────────────────────────────────────────────
    const handlePhotoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !userEmail) return;
        if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5MB"); return; }
        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            setProfile(p => ({ ...p, image: base64 }));
            try {
                await fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(userEmail)}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: base64 }),
                });
            } catch { }
            setUploading(false);
        };
        reader.readAsDataURL(file);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, [userEmail]);

    if (!isOpen) return null;

    const tagBuckets: { key: SectionKey; tags: string[] }[] = [
        { key: "vibes", tags: draftVibes },
        { key: "activities", tags: draftActivities },
        { key: "stays", tags: draftStays },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div key="pe-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" />

                    <motion.div key="pe-sheet"
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-x-0 bottom-0 z-[61] max-w-[430px] mx-auto bg-white rounded-t-[28px] max-h-[92dvh] flex flex-col shadow-[0_-12px_40px_rgba(0,0,0,0.15)]">

                        <AnimatePresence mode="wait">

                            {/* ══ PROFILE SCREEN ══ */}
                            {screen === "profile" && (
                                <motion.div key="screen-profile"
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }} className="flex flex-col flex-1 min-h-0">

                                    <div className="flex-shrink-0 pt-3 pb-2 px-6">
                                        <div className="w-10 h-1 bg-[#D0D0D0] rounded-full mx-auto mb-4" />
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-[20px] font-bold text-[#1A1A1A]">My Profile</h2>
                                            <div className="flex items-center gap-2">
                                                <SaveBtn onClick={handleSaveProfile} saving={saving} saved={saved} disabled={!userEmail} />
                                                <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center">
                                                    <X className="w-4 h-4 text-[#8E8E93]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {!userEmail && (
                                        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
                                            <div className="w-16 h-16 rounded-full bg-[#F2F2F7] flex items-center justify-center mb-4">
                                                <User className="w-7 h-7 text-[#C0C0C0]" />
                                            </div>
                                            <p className="text-[15px] font-semibold text-[#1A1A1A] mb-1">Sign in to edit your profile</p>
                                            <p className="text-[13px] text-[#8E8E93]">Your travel profile is saved to your account</p>
                                        </div>
                                    )}

                                    {userEmail && loading && (
                                        <div className="flex-1 flex items-center justify-center pb-12">
                                            <Loader2 className="w-8 h-8 animate-spin text-[#FFD233]" />
                                        </div>
                                    )}

                                    {userEmail && !loading && (
                                        <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-7" style={{ scrollbarWidth: "none" }}>

                                            {/* ── Travel Cash Balance ── */}
                                            {profile.travelCash > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                                    className="rounded-2xl overflow-hidden"
                                                    style={{ background: 'linear-gradient(135deg, #FFD233 0%, #F5A623 100%)' }}
                                                >
                                                    <div className="p-5 flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center flex-shrink-0">
                                                            <span className="text-2xl">🎁</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[10px] text-[#1A1A1A]/50 font-bold uppercase tracking-wider">Travel Cash Balance</p>
                                                            <p className="text-[24px] font-bold text-[#1A1A1A] leading-tight">₹{profile.travelCash.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="px-5 pb-4">
                                                        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                                                            <Sparkles className="w-3 h-3 text-[#1A1A1A]/50" />
                                                            <p className="text-[10px] text-[#1A1A1A]/50 font-medium">Auto-applied on your next booking</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            <SectionHeader icon={User} title="Basic Information" color="#5B8FB9" />

                                            <div className="flex items-center gap-4" style={{ marginTop: 24 }}>
                                                <div className="relative">
                                                    <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD233] to-[#FFB800] flex items-center justify-center overflow-hidden active:scale-95 transition-transform">
                                                        {uploading ? <Loader2 className="w-6 h-6 animate-spin text-white" />
                                                            : profile.image ? <img src={profile.image} alt="" className="w-16 h-16 rounded-full object-cover" />
                                                                : <span className="text-[24px] font-bold text-white">{profile.name?.[0]?.toUpperCase() || "?"}</span>}
                                                    </button>
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center pointer-events-none">
                                                        <Camera className="w-3 h-3 text-white" />
                                                    </div>
                                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[13px] font-semibold text-[#1A1A1A]">{profile.email}</p>
                                                    <p className="text-[11px] text-[#8E8E93]">Tap photo to upload</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3" style={{ marginTop: 24 }}>
                                                <div className="flex-1">
                                                    <label className="text-[14px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5 block">Name</label>
                                                    <input type="text" value={profile.name} placeholder="Your name" onChange={e => update("name", e.target.value)}
                                                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E5E5EA] text-[14px] text-[#1A1A1A] focus:border-[#FFD233] focus:outline-none transition-colors bg-[#FAFAFA]" />
                                                </div>
                                                <div className="w-20">
                                                    <label className="text-[14px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5 block">Age</label>
                                                    <input type="number" value={profile.age || ""} placeholder="25" onChange={e => update("age", e.target.value ? Number(e.target.value) : null)}
                                                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E5E5EA] text-[14px] text-[#1A1A1A] focus:border-[#FFD233] focus:outline-none transition-colors bg-[#FAFAFA]" />
                                                </div>
                                            </div>

                                            <div style={{ marginTop: 24 }}>
                                                <label className="text-[14px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5 block">Current City</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]" />
                                                    <input type="text" value={profile.city} placeholder="e.g. Mumbai, Delhi, Bangalore" onChange={e => update("city", e.target.value)}
                                                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border-2 border-[#E5E5EA] text-[14px] text-[#1A1A1A] focus:border-[#FFD233] focus:outline-none transition-colors bg-[#FAFAFA]" />
                                                </div>
                                            </div>

                                            <div style={{ marginTop: 24 }}>
                                                <label className="text-[14px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                                    <span>Short Bio</span>
                                                    <span className={`${(profile.bio?.length || 0) > 140 ? "text-[#FF3B30]" : "text-[#C0C0C0]"}`}>
                                                        {profile.bio?.length || 0}/150
                                                    </span>
                                                </label>
                                                <textarea value={profile.bio} placeholder="Tell fellow travelers about yourself..." maxLength={150}
                                                    onChange={e => update("bio", e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E5E5EA] text-[14px] text-[#1A1A1A] focus:border-[#FFD233] focus:outline-none transition-colors bg-[#FAFAFA] resize-none h-20" />
                                            </div>

                                            <div className="h-[1.5px] bg-[#F0F0F5] rounded-full" />

                                            {/* ─── Trip Details ────────────────────────────── */}
                                            <SectionHeader icon={MapPin} title="Trip Details" color="#C9930A" />

                                            <div style={{ marginTop: 24 }}>
                                                <label className="text-[14px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5 block">Departure City</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]" />
                                                    <input type="text" value={profile.departureCity} placeholder="e.g. New Delhi" onChange={e => update("departureCity", e.target.value)}
                                                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border-2 border-[#E5E5EA] text-[14px] text-[#1A1A1A] focus:border-[#FFD233] focus:outline-none transition-colors bg-[#FAFAFA]" />
                                                </div>
                                            </div>

                                            <div style={{ marginTop: 24 }}>
                                                <label className="text-[14px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-2 block">Duration</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {["3-5", "5-7", "7-10"].map(d => (
                                                        <Chip key={d} label={`${d} Days`} selected={profile.duration === d} onClick={() => update("duration", d)} />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-3" style={{ marginTop: 24 }}>
                                                <div className="flex-1 bg-[#FAFAFA] rounded-2xl p-4 border border-[#E5E5EA]">
                                                    <p className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-3">Adults</p>
                                                    <div className="flex items-center justify-between">
                                                        <button onClick={() => update("adults", Math.max(1, profile.adults - 1))} className="w-8 h-8 rounded-full bg-[#E5E5EA] flex items-center justify-center font-bold text-[15px] text-[#6B6B6B] active:scale-90 transition-transform">−</button>
                                                        <span className="font-bold text-[18px] text-[#1A1A1A] tabular-nums">{profile.adults}</span>
                                                        <button onClick={() => update("adults", Math.min(9, profile.adults + 1))} className="w-8 h-8 rounded-full bg-[#FFD233] flex items-center justify-center font-bold text-[15px] text-[#1A1A1A] active:scale-90 transition-transform">+</button>
                                                    </div>
                                                </div>
                                                <div className="flex-1 bg-[#FAFAFA] rounded-2xl p-4 border border-[#E5E5EA]">
                                                    <p className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-3">Children</p>
                                                    <div className="flex items-center justify-between">
                                                        <button onClick={() => update("children", Math.max(0, profile.children - 1))} className="w-8 h-8 rounded-full bg-[#E5E5EA] flex items-center justify-center font-bold text-[15px] text-[#6B6B6B] active:scale-90 transition-transform">−</button>
                                                        <span className="font-bold text-[18px] text-[#1A1A1A] tabular-nums">{profile.children}</span>
                                                        <button onClick={() => update("children", Math.min(6, profile.children + 1))} className="w-8 h-8 rounded-full bg-[#FFD233] flex items-center justify-center font-bold text-[15px] text-[#1A1A1A] active:scale-90 transition-transform">+</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ marginTop: 24 }}>
                                                <label className="text-[14px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-2 flex items-center justify-between">
                                                    <span>Total Budget</span>
                                                    <span className="text-[#1A1A1A] font-bold text-[12px]">₹{profile.budget.toLocaleString()}</span>
                                                </label>
                                                <div className="relative px-1">
                                                    <input type="range" min={80000} max={1200000} step={20000} value={profile.budget}
                                                        onChange={e => update("budget", Number(e.target.value))}
                                                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                                        style={{ background: `linear-gradient(to right, #FFD233 ${((profile.budget - 80000) / 1120000) * 100}%, #E5E5EA ${((profile.budget - 80000) / 1120000) * 100}%)` }} />
                                                    <div className="flex justify-between text-[10px] text-[#8E8E93] mt-1.5 px-0.5">
                                                        <span>₹80k</span><span>₹4L</span><span>₹8L</span><span>₹12L</span>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="h-[1.5px] bg-[#F0F0F5] rounded-full" />

                                            {/* ─── My Preferences row ──────────────────────── */}
                                            <button type="button" onClick={() => setScreen("tags")}
                                                className="w-full flex items-center justify-between py-2.5 active:opacity-60 transition-opacity">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#FFD233] flex items-center justify-center flex-shrink-0">
                                                        <User className="w-4.5 h-4.5 text-[#1A1A1A]" strokeWidth={2.5} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-[15px] font-bold text-[#1A1A1A]">My Preferences</p>
                                                        <p className="text-[11px] text-[#8E8E93] mt-0.5">
                                                            {totalDraftTags === 0 ? "No tags yet - start swiping!" : `${totalDraftTags} tags collected`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-[#C0C0C0]" />
                                            </button>

                                            <div className="h-[1.5px] bg-[#F0F0F5] rounded-full" />

                                            <button type="button" onClick={() => signOut({ callbackUrl: window.location.origin })}
                                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FFF6F6] text-[#FF3B30] font-bold text-[14px] active:scale-95 transition-transform mt-2 mb-4">
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>



                                            <div className="h-6" />
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* ══ MY PREFERENCES SCREEN ══ */}
                            {screen === "tags" && (
                                <motion.div key="screen-tags"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }} className="flex flex-col flex-1 min-h-0">

                                    {/* Handle */}
                                    <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                                        <div className="w-10 h-1 bg-[#E5E5EA] rounded-full" />
                                    </div>

                                    {/* Header */}
                                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#F2F2F7] flex-shrink-0">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-9 h-9 rounded-full bg-[#FFD233] flex items-center justify-center">
                                                <User className="w-4 h-4 text-[#1A1A1A]" strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#1A1A1A]">My Preferences</p>
                                                <p className="text-[11px] text-[#8E8E93]">
                                                    {totalDraftTags === 0 ? "No tags yet - start swiping!" : `${totalDraftTags} tags collected`}
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={() => setScreen("profile")}
                                            className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center">
                                            <X className="w-4 h-4 text-[#1A1A1A]" />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="overflow-y-auto px-5 py-4 flex flex-col gap-5 pb-10" style={{ scrollbarWidth: "none" }}>
                                        {totalDraftTags === 0 && (
                                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                                <Sparkles className="w-10 h-10 text-[#E5E5EA]" />
                                                <p className="text-[13px] text-[#8E8E93] text-center">
                                                    Swipe right on cards you love{"\n"}and your tags will appear here.
                                                </p>
                                            </div>
                                        )}

                                        {tagBuckets.map(({ key, tags }) => {
                                            const meta = SECTION_META[key];
                                            return (
                                                <div key={key}>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: meta.bg }}>
                                                            {meta.emoji}
                                                        </div>
                                                        <p className="text-[14px] font-bold text-[#1A1A1A]">{meta.label}</p>
                                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1"
                                                            style={{ backgroundColor: meta.bg, color: meta.color }}>
                                                            {tags.length}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        <AnimatePresence>
                                                            {tags.map(tag => (
                                                                <RemovableTag key={tag} tag={tag} section={key} onRemove={() => removeTag(key, tag)} />
                                                            ))}
                                                        </AnimatePresence>
                                                    </div>
                                                    <AddTagInput section={key} color={meta.color} onAdd={t => addTag(key, t)} />
                                                </div>
                                            );
                                        })}

                                        {totalDraftTags > 0 && (
                                            <p className="text-[10px] text-[#8E8E93]/60 text-center">
                                                Tap × to remove · changes save automatically
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
