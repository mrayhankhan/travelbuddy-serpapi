"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, Users, MapPin, Search } from "lucide-react";

export type SessionData = {
  duration: "3-5" | "5-7" | "7-10";
  intendedTravelWindow:
    | "within-7-days"
    | "within-1-month"
    | "within-3-months"
    | "within-6-months";
  travelers: number;
  adults: number;
  children: number;
  budget: number;
  departureCity: string;
  sessionDate: Date; // Captured when the user first opens the onboarding flow
};

const DURATION_OPTIONS = [
  { val: "3-5" as const, label: "3–5 Days", sub: "Quick getaway" },
  { val: "5-7" as const, label: "5–7 Days", sub: "Perfect balance" },
  { val: "7-10" as const, label: "7–10 Days", sub: "Deep exploration" },
];

const TRAVEL_WINDOW_OPTIONS = [
  {
    val: "within-7-days" as const,
    label: "Within 7 days",
    sub: "Spontaneous escape",
  },
  {
    val: "within-1-month" as const,
    label: "Within 1 month",
    sub: "Planning soon",
  },
  {
    val: "within-3-months" as const,
    label: "Within 3 months",
    sub: "Short-term plan",
  },
  {
    val: "within-6-months" as const,
    label: "Within 6 months",
    sub: "Still exploring",
  },
];

const CITIES = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi",
  "Goa",
  "Indore",
  "Bhopal",
  "Visakhapatnam",
  "Thiruvananthapuram",
  "Coimbatore",
  "Nagpur",
  "Surat",
  "Varanasi",
  "Amritsar",
];

const BUDGET_PRESETS = [100000, 200000, 300000, 400000, 600000];
const BUDGET_MIN = 90000;
const BUDGET_MAX = 1200000;
const BUDGET_SLIDER_STEP = 1000;

const stepAnim = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

export default function SessionInit({
  onComplete,
}: {
  onComplete: (data: SessionData) => void;
}) {
  const [step, setStep] = useState(0);
  const [citySearch, setCitySearch] = useState("");
  const [budgetInput, setBudgetInput] = useState("300000");
  const [isBudgetEditing, setIsBudgetEditing] = useState(false);
  const budgetInputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<SessionData>({
    duration: "5-7",
    intendedTravelWindow: "within-1-month",
    travelers: 2,
    adults: 2,
    children: 0,
    budget: 300000,
    departureCity: "New Delhi",
    sessionDate: new Date(), // Captured at the moment the onboarding starts
  });

  const filteredCities = CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase()),
  );

  const clampBudget = (value: number) =>
    Math.min(BUDGET_MAX, Math.max(BUDGET_MIN, value));

  const updateBudget = (value: number) => {
    const nextBudget = clampBudget(Math.round(value));
    setData((prev) => ({ ...prev, budget: nextBudget }));
  };

  useEffect(() => {
    setBudgetInput(String(data.budget));
  }, [data.budget]);

  useEffect(() => {
    if (!isBudgetEditing) return;
    budgetInputRef.current?.focus();
    budgetInputRef.current?.select();
  }, [isBudgetEditing]);

  const totalSteps = 4;
  const next = () =>
    step < totalSteps - 1 ? setStep((s) => s + 1) : onComplete(data);
  const back = () => step > 0 && setStep((s) => s - 1);

  const STEP_TITLES = [
    "Where are you flying from?",
    "How long is your trip?",
    "How many travelers?",
    "What's your budget?",
  ];
  const STEP_SUBS = [
    "Select your departure city",
    "Choose your ideal duration",
    "Who's joining the adventure?",
    "We'll find options that fit",
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col px-6 pt-6 pb-8">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-3 min-h-[36px]">
        {step > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={back}
            className="flex items-center gap-1 text-sm font-medium text-[#6B6B6B] active:opacity-60"
            style={{ marginBottom: 5 }}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </motion.button>
        )}
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full bg-[#E5E5EA] overflow-hidden"
            style={{ marginBottom: 5 }}
          >
            <motion.div
              className="h-full bg-[#FFD233] rounded-full"
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      {/* Title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p
            className="text-xs font-semibold text-[#F5A623] tracking-wide uppercase mb-2"
            style={{ marginBottom: 5 }}
          >
            Step {step + 1} of {totalSteps}
          </p>
          <h2
            className="text-[24px] font-bold text-[#1A1A1A] leading-tight"
            style={{ marginBottom: 3 }}
          >
            {STEP_TITLES[step]}
          </h2>
          <p
            className="text-[#8E8E93] text-sm mt-2"
            style={{ marginBottom: 5 }}
          >
            {STEP_SUBS[step]}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Content — all steps always mounted, shown/hidden via CSS only.
          This is intentional: AnimatePresence mode="wait" has a known race condition
          where the entering step can get stuck at opacity 0. CSS transitions are
          100% reliable and execute synchronously. */}
      <div className="flex-1 flex flex-col" style={{ position: "relative" }}>
        {/* DEPARTURE CITY */}
        <div
          className="flex flex-col"
          style={{
            gap: 0,
            display: step === 0 ? "flex" : "none",
          }}
        >
          <div className="relative" style={{ marginBottom: "16px" }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
            <input
              type="text"
              placeholder="Search city..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="w-full py-3 pl-11 pr-4 rounded-2xl bg-white text-[15px] text-[#1A1A1A] placeholder-[#8E8E93] outline-none border-2 border-[#E5E5EA] focus:border-[#FFD233] transition-colors"
            />
          </div>
          <div
            className="flex flex-col overflow-y-auto pr-5"
            style={{ gap: "12px", maxHeight: "55vh" }}
          >
            {filteredCities.map((city) => {
              const active = data.departureCity === city;
              return (
                <motion.button
                  key={city}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setData({ ...data, departureCity: city })}
                  className={`w-full rounded-2xl flex items-center text-left transition-all duration-200 ${
                    active
                      ? "bg-[#FFD233] shadow-[0_4px_20px_rgba(255,210,51,0.3)]"
                      : "bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
                  }`}
                  style={{ padding: "14px 16px", gap: "12px" }}
                >
                  <MapPin
                    className={`w-4 h-4 ${active ? "text-[#1A1A1A]" : "text-[#8E8E93]"}`}
                  />
                  <span className="font-semibold text-[15px] text-[#1A1A1A]">
                    {city}
                  </span>
                  {active && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* DURATION */}
        <div
          className="flex flex-col"
          style={{
            gap: "16px",
            display: step === 1 ? "flex" : "none",
          }}
        >
          {DURATION_OPTIONS.map((opt) => {
            const active = data.duration === opt.val;
            return (
              <motion.button
                key={opt.val}
                whileTap={{ scale: 0.98 }}
                onClick={() => setData({ ...data, duration: opt.val })}
                className={`relative w-full p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 ${
                  active
                    ? "bg-[#FFD233] shadow-[0_4px_20px_rgba(255,210,51,0.3)]"
                    : "bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
                }`}
              >
                <span className="font-semibold text-[15px] text-[#1A1A1A]">
                  {opt.label}
                </span>
                <p
                  className={`text-xs mt-0.5 ${active ? "text-[#1A1A1A]/60" : "text-[#8E8E93]"}`}
                >
                  {opt.sub}
                </p>
                {active && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </motion.button>
            );
          })}

          <div className="pt-2">
            <p className="text-[15px] font-bold text-[#1A1A1A]">
              When would you like to travel?
            </p>
            <p className="text-[12px] text-[#8E8E93] mt-1">
              We will use this later to align suggestions with your planning
              window.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {TRAVEL_WINDOW_OPTIONS.map((opt) => {
              const active = data.intendedTravelWindow === opt.val;
              return (
                <motion.button
                  key={opt.val}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setData({ ...data, intendedTravelWindow: opt.val })
                  }
                  className={`relative rounded-2xl p-4 text-left transition-all duration-200 ${
                    active
                      ? "bg-[#FFF4BF] border-2 border-[#FFD233] shadow-[0_4px_20px_rgba(255,210,51,0.18)]"
                      : "bg-white border-2 border-transparent shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
                  }`}
                >
                  <p className="pr-6 text-[14px] font-semibold text-[#1A1A1A] leading-snug">
                    {opt.label}
                  </p>
                  <p
                    className={`mt-1 text-[11px] ${active ? "text-[#1A1A1A]/65" : "text-[#8E8E93]"}`}
                  >
                    {opt.sub}
                  </p>
                  {active && (
                    <div className="absolute right-3 top-3 w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* TRAVELERS */}
        <div
          className="flex-1 flex flex-col justify-center gap-4"
          style={{ display: step === 2 ? "flex" : "none" }}
        >
          {/* Adults row */}
          <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] px-8 py-7 flex items-center justify-between">
            <div>
              <p className="text-[17px] font-bold text-[#1A1A1A]">Adults</p>
              <p className="text-[12px] text-[#8E8E93] mt-0.5">Age 18+</p>
            </div>
            <div className="flex items-center gap-5">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() =>
                  setData((d) => {
                    const adults = Math.max(1, d.adults - 1);
                    return { ...d, adults, travelers: adults + d.children };
                  })
                }
                className="w-11 h-11 rounded-full bg-[#F2F2F7] flex items-center justify-center text-xl font-bold text-[#6B6B6B] select-none"
              >
                −
              </motion.button>
              <span className="text-[32px] font-bold text-[#1A1A1A] min-w-[36px] text-center select-none">
                {data.adults}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() =>
                  setData((d) => {
                    const adults = Math.min(9, d.adults + 1);
                    return { ...d, adults, travelers: adults + d.children };
                  })
                }
                className="w-11 h-11 rounded-full bg-[#FFD233] flex items-center justify-center text-xl font-bold text-[#1A1A1A] select-none"
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Children row */}
          <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] px-8 py-7 flex items-center justify-between">
            <div>
              <p className="text-[17px] font-bold text-[#1A1A1A]">Children</p>
              <p className="text-[12px] text-[#8E8E93] mt-0.5">Age 2–17</p>
            </div>
            <div className="flex items-center gap-5">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() =>
                  setData((d) => {
                    const children = Math.max(0, d.children - 1);
                    return { ...d, children, travelers: d.adults + children };
                  })
                }
                className="w-11 h-11 rounded-full bg-[#F2F2F7] flex items-center justify-center text-xl font-bold text-[#6B6B6B] select-none"
              >
                −
              </motion.button>
              <span className="text-[32px] font-bold text-[#1A1A1A] min-w-[36px] text-center select-none">
                {data.children}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() =>
                  setData((d) => {
                    const children = Math.min(6, d.children + 1);
                    return { ...d, children, travelers: d.adults + children };
                  })
                }
                className="w-11 h-11 rounded-full bg-[#FFD233] flex items-center justify-center text-xl font-bold text-[#1A1A1A] select-none"
              >
                +
              </motion.button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-1">
            <Users className="w-4 h-4 text-[#8E8E93]" />
            <p className="text-[13px] text-[#8E8E93] font-medium">
              {data.travelers} {data.travelers === 1 ? "traveler" : "travelers"}{" "}
              total
            </p>
          </div>
        </div>

        {/* BUDGET */}
        <div
          className="flex-1 flex flex-col justify-center gap-6"
          style={{ display: step === 3 ? "flex" : "none" }}
        >
          <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6">
            <div className="text-center mb-6">
              {isBudgetEditing ? (
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#1A1A1A]">₹</span>
                  <input
                    ref={budgetInputRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={budgetInput}
                    onChange={(e) => {
                      const numeric = e.target.value.replace(/\D/g, "");
                      setBudgetInput(numeric);
                      if (!numeric) return;
                      updateBudget(Number(numeric));
                    }}
                    onBlur={() => {
                      if (!budgetInput) {
                        setBudgetInput(String(data.budget));
                        setIsBudgetEditing(false);
                        return;
                      }
                      const normalized = clampBudget(Number(budgetInput));
                      updateBudget(normalized);
                      setBudgetInput(String(normalized));
                      setIsBudgetEditing(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    className="min-w-0 w-[220px] bg-transparent text-4xl font-bold text-[#1A1A1A] text-center outline-none"
                    aria-label="Enter exact budget"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setBudgetInput(String(data.budget));
                    setIsBudgetEditing(true);
                  }}
                  className="text-4xl font-bold text-[#1A1A1A] inline-block active:opacity-70"
                  aria-label="Edit budget"
                >
                  ₹{data.budget.toLocaleString()}
                </button>
              )}
              <p className="text-xs text-[#8E8E93] mt-1">Total Trip Budget</p>
              <p className="mt-2 text-[11px] text-[#8E8E93]">
                Tap the amount to enter an exact budget
              </p>
            </div>
            <input
              type="range"
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={BUDGET_SLIDER_STEP}
              value={data.budget}
              onChange={(e) => updateBudget(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{
                height: "6px",
                background: `linear-gradient(to right, #FFD233 ${((data.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%, #E5E5EA ${((data.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-[11px] text-[#8E8E93] mt-2 px-0.5">
              <span>₹90k</span>
              <span>₹4L</span>
              <span>₹8L</span>
              <span>₹12L</span>
            </div>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-1">
            {BUDGET_PRESETS.map((v) => (
              <motion.button
                key={v}
                whileTap={{ scale: 0.93 }}
                onClick={() => updateBudget(v)}
                className={`flex-shrink-0 px-3 py-3 rounded-full text-sm font-medium transition-colors ${data.budget === v ? "bg-[#1A1A1A] text-white" : "bg-white text-[#6B6B6B] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"}`}
              >
                ₹{v >= 100000 ? `${v / 100000}L` : `${v / 1000}k`}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        onClick={next}
        className="w-full py-4 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 mt-8 shadow-[0_4px_16px_rgba(255,210,51,0.3)]"
      >
        {step < totalSteps - 1 ? "Continue" : "Start Discovering"}
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* HotelAPI branding */}
      <p className="text-center text-[10px] text-[#8E8E93]/60 mt-3">
        Powered by HotelAPI Inventory
      </p>
    </div>
  );
}
