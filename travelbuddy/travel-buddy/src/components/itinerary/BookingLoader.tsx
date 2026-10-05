"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Hotel, Camera, Car, CheckCircle } from "lucide-react";

const BOOKING_STEPS = [
    { text: "Confirming flights", icon: Plane, color: "#5B8FB9" },
    { text: "Reserving hotel", icon: Hotel, color: "#FF6B6B" },
    { text: "Securing activities", icon: Camera, color: "#FFD233" },
    { text: "Optimizing transfers", icon: Car, color: "#34C759" },
    { text: "Finalizing booking", icon: CheckCircle, color: "#8B5CF6" },
];

export default function BookingLoader({
    destination,
    onComplete,
}: {
    destination: string;
    onComplete: () => void;
}) {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;
    const completedRef = useRef(false);

    useEffect(() => {
        let currentStep = 0;
        const stepTimer = setInterval(() => {
            currentStep++;
            if (currentStep >= BOOKING_STEPS.length) {
                clearInterval(stepTimer);
                setStep(BOOKING_STEPS.length - 1);
                // Delay then call onComplete
                if (!completedRef.current) {
                    completedRef.current = true;
                    setTimeout(() => onCompleteRef.current(), 1000);
                }
            } else {
                setStep(currentStep);
            }
        }, 1000);
        return () => clearInterval(stepTimer);
    }, []); // Empty deps - runs once on mount

    // Smooth progress bar
    useEffect(() => {
        const targetProgress = ((step + 1) / BOOKING_STEPS.length) * 100;
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= targetProgress) {
                    clearInterval(progressTimer);
                    return targetProgress;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(progressTimer);
    }, [step]);

    const CurrentIcon = BOOKING_STEPS[step].icon;

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6"
            style={{ background: "linear-gradient(180deg, #F5F3FF 0%, #FFFCF0 100%)" }}>

            {/* Pulsing circle + icon */}
            <div className="relative mb-10">
                <motion.div
                    className="w-28 h-28 rounded-full flex items-center justify-center"
                    style={{ background: `${BOOKING_STEPS[step].color}15` }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ background: `${BOOKING_STEPS[step].color}25` }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CurrentIcon className="w-9 h-9" style={{ color: BOOKING_STEPS[step].color }} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

            {/* Status text */}
            <AnimatePresence mode="wait">
                <motion.h2
                    key={step}
                    className="text-[20px] font-bold text-[#1A1A1A] mb-2 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                >
                    {BOOKING_STEPS[step].text}...
                </motion.h2>
            </AnimatePresence>
            <p className="text-[13px] text-[#8E8E93] mb-8">
                Booking your trip to <span className="font-semibold text-[#1A1A1A]">{destination}</span>
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-[280px]">
                <div className="h-2 bg-[#F2F2F7] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #FFD233, #F5A623)", width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <p className="text-[11px] text-[#8E8E93] text-center mt-2">
                    Step {step + 1} of {BOOKING_STEPS.length}
                </p>
            </div>

            {/* Completed steps */}
            <div className="mt-8 space-y-2 w-full max-w-[280px]">
                {BOOKING_STEPS.map((s, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: i <= step ? 1 : 0.3, x: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.3 }}
                    >
                        <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                                background: i < step ? s.color : i === step ? `${s.color}30` : "#F2F2F7",
                            }}
                        >
                            {i < step ? (
                                <CheckCircle className="w-3.5 h-3.5 text-white" />
                            ) : i === step ? (
                                <motion.div
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: s.color }}
                                    animate={{ scale: [1, 1.4, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                            ) : (
                                <div className="w-2 h-2 rounded-full bg-[#D1D1D6]" />
                            )}
                        </div>
                        <span
                            className="text-[12px] font-medium"
                            style={{
                                color: i < step ? s.color : i === step ? "#1A1A1A" : "#C7C7CC",
                            }}
                        >
                            {s.text}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
