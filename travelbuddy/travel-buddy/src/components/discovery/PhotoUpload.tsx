"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Sparkles, ArrowRight, SkipForward, Check } from "lucide-react";
import { analyzePhoto } from "@/lib/api";

type TagResult = { tag: string; confidence: number };
export type PhotoAnalysisResult = {
    vibes: TagResult[];
    activities: TagResult[];
    stays: TagResult[];
};

type AnalysisState = 'idle' | 'analyzing' | 'done' | 'error';

const PHASE_META = {
    vibes: { label: 'Vibes', color: '#FFD233', emoji: '✨' },
    activities: { label: 'Activities', color: '#34C759', emoji: '🎯' },
    stays: { label: 'Stays', color: '#007AFF', emoji: '🏠' },
};

export default function PhotoUpload({
    sessionId,
    onComplete,
    onSkip,
}: {
    sessionId: string | null;
    onComplete: (result: PhotoAnalysisResult) => void;
    onSkip: () => void;
}) {
    const [preview, setPreview] = useState<string | null>(null);
    const [base64, setBase64] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState('image/jpeg');
    const [state, setState] = useState<AnalysisState>('idle');
    const [result, setResult] = useState<PhotoAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) return;
        setMimeType(file.type);
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            setPreview(dataUrl);
            // Extract base64 portion (remove data:image/...;base64,)
            const b64 = dataUrl.split(',')[1];
            setBase64(b64);
            setState('idle');
            setResult(null);
            setError(null);
        };
        reader.readAsDataURL(file);
    }, []);

    const handleAnalyze = useCallback(async () => {
        if (!base64) return;
        setState('analyzing');
        setError(null);
        try {
            const res = await analyzePhoto(sessionId, base64, mimeType);
            if (!res) throw new Error('Analysis returned no results');
            setResult(res);
            setState('done');
        } catch (err: any) {
            setError(err.message || 'Failed to analyze image');
            setState('error');
        }
    }, [base64, mimeType, sessionId]);

    const handleContinue = useCallback(() => {
        if (result) onComplete(result);
    }, [result, onComplete]);

    const totalTags = result
        ? result.vibes.length + result.activities.length + result.stays.length
        : 0;

    return (
        <div className="h-[100dvh] flex flex-col bg-[#F5F3FF] overflow-hidden">
            {/* Header — pinned, never scrolls */}
            <div className="px-6 pt-8 pb-4 flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-[22px] font-bold text-[#1A1A1A]">Upload a Memory</h1>
                    <p className="text-[13px] text-[#8E8E93] mt-0.5">
                        Share a photo to kickstart your preferences
                    </p>
                </div>
                <button
                    onClick={onSkip}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 text-[12px] font-semibold text-[#8E8E93] border border-[#E5E5EA] active:scale-95 transition-transform"
                >
                    Skip <SkipForward className="w-3 h-3" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-10">
                {/* Upload Area */}
                {!preview ? (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-8"
                    >
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full max-w-[320px] aspect-[4/5] rounded-[28px] border-2 border-dashed border-[#D1D1D6] bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 active:scale-[0.98] transition-transform hover:border-[#FFD233] hover:bg-[#FFD233]/5"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#FFD233]/15 flex items-center justify-center">
                                <Camera className="w-8 h-8 text-[#B8860B]" />
                            </div>
                            <div className="text-center">
                                <p className="text-[15px] font-semibold text-[#1A1A1A]">Tap to upload a photo</p>
                                <p className="text-[12px] text-[#8E8E93] mt-1 max-w-[220px]">
                                    A vacation shot, a wedding photo, or any scene you&apos;d love to recreate
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-[13px] font-semibold">
                                <Upload className="w-3.5 h-3.5" /> Choose Photo
                            </div>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleFileSelect(f);
                            }}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Image Preview */}
                        <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
                            <img src={preview} alt="Uploaded" className="w-full h-full object-cover" />
                            {state !== 'analyzing' && state !== 'done' && (
                                <button
                                    onClick={() => { setPreview(null); setBase64(null); setResult(null); setState('idle'); }}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            )}
                            {/* Analyzing overlay */}
                            <AnimatePresence>
                                {state === 'analyzing' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                                            className="w-12 h-12 rounded-full border-[3px] border-white/30 border-t-[#FFD233]"
                                        />
                                        <p className="text-white text-[14px] font-semibold">Analyzing your photo...</p>
                                        <p className="text-white/60 text-[11px]">Powered by Gemini AI</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Analyze button (before analysis) */}
                        {(state === 'idle' || state === 'error') && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                                {error && (
                                    <p className="text-[12px] text-red-500 text-center">{error}</p>
                                )}
                                <button
                                    onClick={handleAnalyze}
                                    className="w-full py-3.5 rounded-full bg-[#1A1A1A] text-white text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:scale-95 transition-transform"
                                >
                                    <Sparkles className="w-4 h-4" /> Analyze with AI
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full py-3 rounded-full border-2 border-[#E5E5EA] text-[#1A1A1A] text-[14px] font-semibold active:scale-95 transition-transform"
                                >
                                    Choose Different Photo
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) handleFileSelect(f);
                                    }}
                                />
                            </motion.div>
                        )}

                        {/* Results */}
                        <AnimatePresence>
                            {state === 'done' && result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-[#34C759] flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <p className="text-[14px] font-semibold text-[#1A1A1A]">
                                            Found {totalTags} travel preferences
                                        </p>
                                    </div>

                                    {/* Tag groups */}
                                    {(['vibes', 'activities', 'stays'] as const).map((phase) => {
                                        const tags = result[phase];
                                        if (tags.length === 0) return null;
                                        const meta = PHASE_META[phase];
                                        return (
                                            <div key={phase} className="bg-white rounded-[20px] p-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                                                <div className="flex items-center gap-2 mb-2.5">
                                                    <span className="text-[14px]">{meta.emoji}</span>
                                                    <span className="text-[13px] font-bold text-[#1A1A1A]">{meta.label}</span>
                                                    <span className="text-[11px] text-[#8E8E93] ml-auto">{tags.length} tags</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {tags.map(({ tag, confidence }) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2.5 py-1 rounded-full text-[12px] font-medium"
                                                            style={{
                                                                backgroundColor: `${meta.color}20`,
                                                                color: '#1A1A1A',
                                                                opacity: 0.5 + confidence * 0.5,
                                                            }}
                                                        >
                                                            {tag}
                                                            <span className="ml-1 text-[10px] text-[#8E8E93]">
                                                                {Math.round(confidence * 100)}%
                                                            </span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Missing phases note */}
                                    {(() => {
                                        const missing = (['vibes', 'activities', 'stays'] as const).filter(p => result[p].length === 0);
                                        if (missing.length === 0) return null;
                                        return (
                                            <p className="text-[12px] text-[#8E8E93] text-center leading-snug">
                                                No {missing.map(m => PHASE_META[m].label.toLowerCase()).join(' or ')} tags found -
                                                you&apos;ll swipe through {missing.length === 1 ? 'that phase' : 'those phases'} to set preferences.
                                            </p>
                                        );
                                    })()}

                                    {/* Continue button */}
                                    <button
                                        onClick={handleContinue}
                                        className="w-full py-3.5 rounded-full bg-[#FFD233] text-[#1A1A1A] text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,210,51,0.3)] active:scale-95 transition-transform"
                                    >
                                        Continue <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
