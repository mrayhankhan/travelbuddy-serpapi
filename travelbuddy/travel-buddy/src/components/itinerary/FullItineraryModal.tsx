"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, Map } from "lucide-react";
import { TripItinerary } from "@/data/itineraryMock";
import { deriveDurationLabel } from "@/lib/utils";
import HotelStreetViewModal from "@/components/itinerary/HotelStreetViewModal";
import LocationStreetViewModal, { LocationType } from "@/components/itinerary/LocationStreetViewModal";

interface FullItineraryModalProps {
  itinerary: TripItinerary & { shortDescription?: string };
  budget: number;
  onClose: () => void;
  onBook: () => void;
}

type ModalTab = "days" | "flights" | "hotel" | "budget";

const TAB_LABELS: { id: ModalTab; label: string }[] = [
  { id: "days", label: "Days" },
  { id: "flights", label: "Flights" },
  { id: "hotel", label: "Hotel" },
  { id: "budget", label: "Budget" },
];

const TYPE_COLORS: Record<string, string> = {
  activity: "bg-blue-100 text-blue-700",
  food: "bg-orange-100 text-orange-700",
  travel: "bg-purple-100 text-purple-700",
  relax: "bg-green-100 text-green-700",
  shopping: "bg-pink-100 text-pink-700",
};

export default function FullItineraryModal({
  itinerary,
  budget,
  onClose,
  onBook,
}: FullItineraryModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>("days");
  const [imgError, setImgError] = useState(false);
  const [streetViewOpen, setStreetViewOpen] = useState(false);
  const [locationStreetView, setLocationStreetView] = useState<{
    name: string;
    description: string;
    type: LocationType;
  } | null>(null);
  const durationLabel = deriveDurationLabel(itinerary.days, itinerary.duration);

  const ratio = (itinerary.totalCost ?? 0) / budget;
  const budgetStatus =
    ratio <= 1.0 ? "Within Budget" : ratio <= 1.15 ? "Slightly Above" : "Over Budget";
  const budgetColor =
    ratio <= 1.0 ? "text-emerald-600" : ratio <= 1.15 ? "text-amber-600" : "text-red-600";
  const barColor =
    ratio <= 1.0 ? "bg-emerald-400" : ratio <= 1.15 ? "bg-amber-400" : "bg-red-400";

  return (
    <AnimatePresence>
      <motion.div
        key="full-itinerary-modal"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }}
        className="fixed inset-0 z-50 bg-[#F5F3FF] flex flex-col overflow-hidden"
      >
        {/* Hero */}
        <div className="relative h-52 flex-shrink-0">
          <img
            src={imgError ? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80" : itinerary.image}
            alt={itinerary.destination}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Back button */}
          <button
            id="full-itinerary-close"
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-4">
            <h2 className="text-white text-[22px] font-bold">{itinerary.destination}</h2>
            <p className="text-white/75 text-[13px]">
              {itinerary.country} · {durationLabel}
            </p>
          </div>

          {/* Cost badge */}
          <div className="absolute bottom-4 right-4 bg-[#FFD233] px-3 py-1.5 rounded-full">
            <p className="text-[#1A1A1A] text-[13px] font-bold">
              ₹{(itinerary.totalCost ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex bg-white border-b border-[#E5E5EA] flex-shrink-0">
          {TAB_LABELS.map(({ id, label }) => (
            <button
              key={id}
              id={`modal-tab-${id}`}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-3 text-[12px] font-semibold relative transition-colors ${
                activeTab === id ? "text-[#1A1A1A]" : "text-[#8E8E93]"
              }`}
            >
              {label}
              {activeTab === id && (
                <motion.div
                  layoutId="modal-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFD233] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32">
          {/* DAYS TAB */}
          {activeTab === "days" && (
            <div className="flex flex-col gap-4">
              {(itinerary.days ?? []).map((day) => (
                <div key={day.day} className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] font-bold text-[#FFD233] uppercase tracking-wide mb-1">
                    Day {day.day}
                  </p>
                  <h4 className="text-[15px] font-bold text-[#1A1A1A] mb-3">{day.title}</h4>
                  <div className="flex flex-col gap-2.5">
                    {(day.items ?? []).map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-[11px] text-[#8E8E93] min-w-[40px] mt-0.5">
                          {item.time}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[13px] font-semibold text-[#1A1A1A] leading-tight flex-1">
                              {item.activity}
                            </p>
                            {item.cost > 0 && (
                              <span className="text-[11px] text-[#8E8E93] font-medium flex-shrink-0">
                                ₹{item.cost.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#8E8E93] mt-0.5">{item.description}</p>
                          <span
                            className={`inline-block mt-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                              TYPE_COLORS[item.type] ?? "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.type}
                          </span>
                          {/* Street View button for sightseeing/food/relax activities */}
                          {(item.type === 'activity' || item.type === 'food' || item.type === 'relax') && (
                            <button
                              onClick={() => setLocationStreetView({
                                name: item.activity,
                                description: item.description || itinerary.destination,
                                type: item.type === 'food' ? 'restaurant' : item.type === 'relax' ? 'relax' : 'sightseeing',
                              })}
                              className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[#B8860B] bg-[#FFD233]/15 px-2 py-1 rounded-full active:opacity-70 hover:bg-[#FFD233]/25 transition-colors"
                            >
                              <span className="text-[9px]">📍</span>
                              View Street View
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FLIGHTS TAB */}
          {activeTab === "flights" && (
            <div className="flex flex-col gap-3">
              {(itinerary.flights ?? []).length === 0 ? (
                <p className="text-center text-[#8E8E93] py-12 text-sm">
                  Flight details not available for AI-generated itineraries.
                </p>
              ) : (
                (itinerary.flights ?? []).map((f, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          f.type === "departure"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {f.type === "departure" ? "Outbound" : "Return"}
                      </span>
                      <span className="text-[13px] font-bold text-[#1A1A1A]">
                        ₹{f.cost.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[15px] font-bold text-[#1A1A1A]">
                      {f.from} → {f.to}
                    </p>
                    <p className="text-[12px] text-[#8E8E93] mt-0.5">
                      {f.airline} · {f.flightNo}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-[12px] text-[#6B6B6B]">
                      <span>{f.departure}</span>
                      <span className="text-[10px] text-[#8E8E93]">{f.duration}</span>
                      <span>{f.arrival}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* HOTEL TAB */}
          {activeTab === "hotel" && itinerary.hotel && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <img
                src={itinerary.hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80"}
                alt={itinerary.hotel.name}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80";
                }}
              />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[16px] font-bold text-[#1A1A1A]">{itinerary.hotel.name}</h4>
                    <p className="text-[12px] text-[#8E8E93] mt-0.5">{itinerary.hotel.location}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#FFF4BF] px-2 py-1 rounded-full">
                    <span className="text-[12px]">⭐</span>
                    <span className="text-[12px] font-bold text-[#1A1A1A]">{itinerary.hotel.rating}</span>
                  </div>
                </div>

                {/* Street View Button */}
                <button
                  onClick={() => setStreetViewOpen(true)}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-[#5B8FB9] text-white text-[12px] font-bold rounded-xl active:opacity-80 shadow-sm"
                >
                  <Map className="w-3.5 h-3.5" />
                  View Street View
                </button>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] text-[#8E8E93]">{itinerary.hotel.nights} nights</p>
                    {itinerary.hotel.distanceToCenter && (
                      <p className="text-[11px] text-[#8E8E93]">
                        {itinerary.hotel.distanceToCenter} from centre
                      </p>
                    )}
                  </div>
                  <p className="text-[18px] font-bold text-[#1A1A1A]">
                    ₹{itinerary.hotel.totalCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BUDGET TAB */}
          {activeTab === "budget" && (
            <div className="flex flex-col gap-3">
              {/* Summary card */}
              <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[14px] font-bold text-[#1A1A1A]">Budget Overview</p>
                  <span className={`text-[11px] font-bold ${budgetColor}`}>{budgetStatus}</span>
                </div>
                {/* Progress bar */}
                <div className="h-2 bg-[#F2F2F7] rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(ratio * 100, 100)}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`h-full rounded-full ${barColor}`}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#8E8E93]">
                  <span>₹0</span>
                  <span>Your budget: ₹{budget.toLocaleString()}</span>
                </div>
                <p className={`text-[16px] font-bold mt-3 ${budgetColor}`}>
                  ₹{(itinerary.totalCost ?? 0).toLocaleString()} total
                </p>
              </div>

              {/* Breakdown */}
              {itinerary.breakdown && (
                <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">Cost Breakdown</p>
                  {(
                    [
                      { label: "✈️ Flights", key: "flights" },
                      { label: "🏨 Stay", key: "stay" },
                      { label: "🎯 Activities", key: "activities" },
                      { label: "🚌 Transfers", key: "transfers" },
                    ] as { label: string; key: keyof typeof itinerary.breakdown }[]
                  ).map(({ label, key }) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-[#F2F2F7] last:border-0">
                      <span className="text-[13px] text-[#6B6B6B]">{label}</span>
                      <span className="text-[13px] font-semibold text-[#1A1A1A]">
                        ₹{(itinerary.breakdown[key] ?? 0).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Book CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md px-4 py-4 border-t border-[#E5E5EA]"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}>
          <motion.button
            id="full-itinerary-book"
            whileTap={{ scale: 0.97 }}
            onClick={onBook}
            className="w-full py-4 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-bold shadow-[0_4px_16px_rgba(255,210,51,0.35)]"
          >
            Book This Trip
          </motion.button>
        </div>
      </motion.div>

      {/* Street View Modal — rendered at root so it overlays the full-screen modal */}
      {itinerary.hotel && (
        <HotelStreetViewModal
          isOpen={streetViewOpen}
          onClose={() => setStreetViewOpen(false)}
          hotelName={itinerary.hotel.name}
          locationText={itinerary.hotel.location}
          cityName={itinerary.destination}
        />
      )}

      {/* Sightseeing / Activity Street View Modal */}
      <LocationStreetViewModal
        isOpen={!!locationStreetView}
        onClose={() => setLocationStreetView(null)}
        locationName={locationStreetView?.name || ""}
        locationDescription={locationStreetView?.description}
        cityName={itinerary.destination}
        type={locationStreetView?.type ?? 'sightseeing'}
      />
    </AnimatePresence>
  );
}
