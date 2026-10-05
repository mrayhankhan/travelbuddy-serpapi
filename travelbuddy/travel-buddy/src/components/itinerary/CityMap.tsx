"use client";

/**
 * CityMap.tsx
 *
 * Google Maps satellite view with landmark pins + INTERACTIVE Street View Panorama.
 *
 * Key points:
 *  - Loads the Maps JS script once per session.
 *  - Satellite map initialises only when this tab is opened.
 *  - Clicking a marker opens a full interactive 360° StreetViewPanorama
 *    rendered in a bottom-sheet modal - NOT a static image.
 *  - StreetViewPanorama instance is created lazily (only on first marker click)
 *    and updated on every subsequent click - no idle API usage.
 *  - Panorama + markers are cleaned up on unmount.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { CityMapData, Landmark } from "@/data/cityLandmarks";
import { X, MapPin, Star } from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Deterministic mock data generator to simulate Google Maps ratings and reviews
// This produces consistent star ratings (4.2 - 4.9) and review counts for a given name
function getLandmarkInfo(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const normalized = Math.abs(hash);
  
  const rating = (4.2 + (normalized % 8) / 10).toFixed(1);
  const reviews = (1500 + (normalized % 75000)).toLocaleString();
  const imageId = normalized % 1000; // deterministic image from Picsum

  return {
    rating,
    reviews,
    imageUrl: `https://picsum.photos/seed/${imageId}/120/120`,
    category: "Tourist attraction",
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CityMapProps {
  cityName: string;
  mapData: CityMapData;
}

// ─── Google Maps script loader (singleton - loads once) ───────────────────────

let scriptLoadPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    if (typeof google !== "undefined" && google?.maps) {
      resolve();
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
      reject(new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set in .env.local"));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CityMap({ cityName, mapData }: CityMapProps) {
  const mapDivRef = useRef<HTMLDivElement>(null);           // satellite map container
  const svDivRef  = useRef<HTMLDivElement>(null);           // Street View panorama container

  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef     = useRef<google.maps.Marker[]>([]);
  const panoramaRef    = useRef<google.maps.StreetViewPanorama | null>(null);

  const [scriptReady, setScriptReady]   = useState(false);
  const [scriptError, setScriptError]   = useState<string | null>(null);

  // Which landmark's Street View modal is open (null = closed)
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(null);

  // ── Load Maps script on mount ──────────────────────────────────────────────
  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => setScriptReady(true))
      .catch((err: Error) => setScriptError(err.message));
  }, []);

  // ── Initialise satellite map once script is ready ──────────────────────────
  useEffect(() => {
    if (!scriptReady || !mapDivRef.current || mapInstanceRef.current) return;

    const map = new google.maps.Map(mapDivRef.current, {
      center: mapData.center,
      zoom: mapData.zoom ?? 13,
      mapTypeId: "roadmap" as google.maps.MapTypeId,
      zoomControl: true,
      fullscreenControl: true,
      streetViewControl: false, // we open Street View in our own modal
      mapTypeControl: false,
    });
    mapInstanceRef.current = map;

    // Drop a classic location maker with text label for every landmark
    mapData.landmarks.forEach((landmark) => {
      // Classic red "teardrop" location pin (like the Google Maps default but crisper SVG)
      const svgPin = `<svg width="27" height="43" viewBox="0 0 27 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 0C6.044 0 0 6.044 0 13.5C0 23.625 13.5 43 13.5 43C13.5 43 27 23.625 27 13.5C27 6.044 20.956 0 13.5 0Z" fill="#EA4335" />
        <circle cx="13.5" cy="13.5" r="5" fill="#8F1106" />
      </svg>`;

      const marker = new google.maps.Marker({
        position: { lat: landmark.lat, lng: landmark.lng },
        map,
        title: landmark.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgPin)}`,
          scaledSize: new google.maps.Size(27, 43),
          anchor: new google.maps.Point(13.5, 43),
        },
        animation: google.maps.Animation.DROP,
      });

      // Interactive hover animation - gentle bounce
      marker.addListener("mouseover", () => {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      });
      marker.addListener("mouseout", () => {
        marker.setAnimation(null);
      });

      // On marker click → open Street View modal for that landmark
      marker.addListener("click", () => {
        // Stop bouncing when clicked
        marker.setAnimation(null);
        setActiveLandmark(landmark);
      });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      mapInstanceRef.current = null;
    };
  }, [scriptReady, mapData]);

  // ── Initialise / update StreetViewPanorama when modal opens ───────────────
  // This runs after the modal div is in the DOM (activeLandmark is set)
  useEffect(() => {
    if (!activeLandmark || !svDivRef.current || !scriptReady) return;

    const position = { lat: activeLandmark.lat, lng: activeLandmark.lng };

    // FIX FOR BLACK SCREEN: 
    // The Maps SDK calculates canvas size instantly. Because our bottom sheet ANIMATES up, 
    // the height is 0 at the exact moment of creation, resulting in a broken/black canvas.
    // Instead of forcing a resize later, we just wait for the 300ms animation to finish
    // BEFORE we ever ask Google Maps to render the panorama.
    const renderTimer = setTimeout(() => {
      // Must check refs again inside the timeout in case user closed it fast
      if (!svDivRef.current) return;

      if (!panoramaRef.current) {
        // First open - create the panorama
        panoramaRef.current = new google.maps.StreetViewPanorama(svDivRef.current, {
          position,
          pov:  { heading: 165, pitch: 0 },  // initial camera angle
          zoom: 1,
          motionTracking: false,
          motionTrackingControl: false,
          addressControl: true,
          fullscreenControl: true,
          linksControl: true,   // allow walking through Street View
          panControl: true,
          zoomControl: true,
        });
      } else {
        // Subsequent opens - just move the panorama
        panoramaRef.current.setPosition(position);
        panoramaRef.current.setPov({ heading: 165, pitch: 0 });
        window.google.maps.event.trigger(panoramaRef.current, "resize");
      }
    }, 350); // Wait 350ms to guarantee the 300ms CSS animation has finished

    return () => clearTimeout(renderTimer);
  }, [activeLandmark, scriptReady]);

  const closeStreetView = useCallback(() => {
    setActiveLandmark(null);
    panoramaRef.current = null;
  }, []);

  // ─── Error state ──────────────────────────────────────────────────────────
  if (scriptError) {
    return (
      <div className="flex flex-col items-center justify-center h-[280px] gap-3 bg-[#F9F9FB] rounded-2xl">
        <MapPin className="w-8 h-8 text-[#E5E5EA]" />
        <p className="text-[13px] font-semibold text-[#8E8E93]">Map unavailable</p>
        <p className="text-[11px] text-[#8E8E93]/60 text-center px-6">{scriptError}</p>
      </div>
    );
  }

  // ─── Main render ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-3">

      {/* ── Satellite map ────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
        {!scriptReady && (
          <div className="absolute inset-0 bg-[#F2F2F7] flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#FFD233] border-t-transparent rounded-full animate-spin" />
              <p className="text-[12px] text-[#8E8E93]">Loading map…</p>
            </div>
          </div>
        )}
        <div
          ref={mapDivRef}
          style={{ height: "280px", width: "100%" }}
          aria-label={`Satellite map of ${cityName}`}
        />
      </div>

      {/* ── Landmark Rich Cards legend ────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5 mt-2">
        <p className="text-[12px] font-bold text-[#1A1A1A]">
          Things to do
        </p>
        <div className="flex flex-col gap-3">
          {mapData.landmarks.map((lm, i) => {
            const info = getLandmarkInfo(lm.name);
            return (
              <button
                key={i}
                onClick={() => setActiveLandmark(lm)}
                className="flex items-start gap-4 text-left active:opacity-70 transition-opacity p-1"
              >
                {/* Text Content */}
                <div className="flex-1 min-w-0 flex flex-col pt-0.5">
                  <span className="text-[15px] text-[#1A1A1A] font-medium leading-tight mb-1">{lm.name}</span>
                  
                  {/* Ratings */}
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[13px] text-[#1A1A1A]">{info.rating}</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= parseFloat(info.rating) ? 'fill-[#F4B400] text-[#F4B400]' : 'fill-[#E0E0E0] text-[#E0E0E0]'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[13px] text-[#8E8E93]">({info.reviews})</span>
                  </div>

                  {/* Categories & Description */}
                  <span className="text-[13px] text-[#5F6368] truncate">
                    {info.category} • {lm.description}
                  </span>
                  <span className="text-[12px] text-[#5F6368] mt-1">
                    Tap to view Street View
                  </span>
                </div>

                {/* Thumbnail Image */}
                <div className="w-[84px] h-[84px] rounded-xl overflow-hidden flex-shrink-0 bg-[#F2F2F7]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={info.imageUrl} 
                    alt={lm.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Interactive Street View Panorama modal ────────────────────────── */}
      {activeLandmark && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
          onClick={closeStreetView}
        >
          {/* Bottom sheet */}
          <div
            className="relative bg-white rounded-t-3xl w-full overflow-hidden"
            style={{
              height: "72vh",
              animation: "svSlideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-[#E5E5EA] rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-2">
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-[10px] font-bold text-[#FFD233] uppercase tracking-wider mb-0.5">
                  📍 Street View - {cityName}
                </p>
                <h3 className="text-[16px] font-bold text-[#1A1A1A] leading-tight truncate">
                  {activeLandmark.name}
                </h3>
                {activeLandmark.description && (
                  <p className="text-[11px] text-[#8E8E93]">{activeLandmark.description}</p>
                )}
              </div>
              <button
                onClick={closeStreetView}
                className="w-9 h-9 rounded-full bg-[#F2F2F7] flex items-center justify-center flex-shrink-0"
                aria-label="Close Street View"
              >
                <X className="w-4 h-4 text-[#1A1A1A]" />
              </button>
            </div>

            {/*
              The StreetViewPanorama renders into this div.
              It must have a real pixel height - flex-1 alone won't work
              because the Maps SDK measures offsetHeight at init time.
            */}
            <div
              ref={svDivRef}
              style={{ height: "calc(72vh - 90px)", width: "100%" }}
              aria-label={`Street View of ${activeLandmark.name}`}
            />
          </div>
        </div>
      )}

      {/* Slide-up / CSS overrides */}
      <style jsx global>{`
        @keyframes svSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        /* Give map pin labels a white halo so they are readable over satellite */
        .map-pin-label {
          text-shadow:
            -1px -1px 0 #fff,
             1px -1px 0 #fff,
            -1px  1px 0 #fff,
             1px  1px 0 #fff,
             0px  2px 4px rgba(0,0,0,0.5);
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
