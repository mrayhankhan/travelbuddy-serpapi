"use client";

import { useEffect, useRef, useState } from "react";
import { X, MapPin, Map } from "lucide-react";

interface HotelStreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
  locationText: string;
  cityName: string;
}

// ─── Singleton script loader ───────────────────────────────────────────────
let mapsScriptPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
  // Already loaded
  if (typeof window !== "undefined" && (window as any).google?.maps) {
    return Promise.resolve();
  }
  if (mapsScriptPromise) return mapsScriptPromise;

  mapsScriptPromise = new Promise<void>((resolve, reject) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
      reject(new Error("Google Maps API key is not configured."));
      return;
    }

    // Avoid adding the script twice
    if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      // Script tag exists; poll until google.maps is ready
      const poll = setInterval(() => {
        if ((window as any).google?.maps) {
          clearInterval(poll);
          resolve();
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      mapsScriptPromise = null; // allow retry
      reject(new Error("Failed to load Google Maps — check your API key."));
    };
    document.head.appendChild(script);
  });

  return mapsScriptPromise;
}

// ─── Geocode one query, return coords or null (never throws) ───────────────
async function tryGeocode(query: string): Promise<google.maps.LatLngLiteral | null> {
  try {
    const geocoder = new google.maps.Geocoder();
    // The promise-based geocoder rejects on ZERO_RESULTS / ERROR — hence the catch
    const result = await geocoder.geocode({ address: query });
    if (result?.results?.length > 0) {
      const loc = result.results[0].geometry.location;
      return { lat: loc.lat(), lng: loc.lng() };
    }
  } catch {
    // Geocoder rejected (ZERO_RESULTS, OVER_QUERY_LIMIT, etc.) — try next candidate
  }
  return null;
}

// ─── Try to find nearest Street View panorama (never throws) ─────────────
async function findPanorama(
  coords: google.maps.LatLngLiteral,
): Promise<google.maps.StreetViewPanoramaData | null> {
  const svc = new google.maps.StreetViewService();

  // Escalating search: outdoor → default source, increasing radius
  const attempts: Array<{ radius: number; source: google.maps.StreetViewSource }> = [
    { radius: 100,  source: google.maps.StreetViewSource.OUTDOOR },
    { radius: 300,  source: google.maps.StreetViewSource.OUTDOOR },
    { radius: 600,  source: google.maps.StreetViewSource.OUTDOOR },
    { radius: 200,  source: google.maps.StreetViewSource.DEFAULT },
    { radius: 800,  source: google.maps.StreetViewSource.DEFAULT },
    { radius: 1500, source: google.maps.StreetViewSource.DEFAULT },
  ];

  for (const { radius, source } of attempts) {
    try {
      const res = await svc.getPanorama({ location: coords, radius, source });
      if (res?.data?.location?.latLng) return res.data;
    } catch {
      // No panorama at this radius/source — try next
    }
  }
  return null;
}

// ─── Build a static-map fallback URL ─────────────────────────────────────
function staticMapUrl(coords: google.maps.LatLngLiteral, label: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const enc = encodeURIComponent(label);
  return (
    `https://maps.googleapis.com/maps/api/staticmap` +
    `?center=${coords.lat},${coords.lng}` +
    `&zoom=17&size=600x400&scale=2&maptype=roadmap` +
    `&markers=color:red%7Clabel:H%7C${coords.lat},${coords.lng}` +
    `&key=${apiKey}`
  );
}

// ─── Component ────────────────────────────────────────────────────────────
export default function HotelStreetViewModal({
  isOpen,
  onClose,
  hotelName,
  locationText,
  cityName,
}: HotelStreetViewModalProps) {
  const panoramaDivRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);

  type UIState = "idle" | "loading" | "ready" | "fallback" | "error";
  const [uiState, setUiState] = useState<UIState>("idle");
  const [statusMsg, setStatusMsg] = useState<string>("Loading Street View...");
  // coords used for static-map fallback
  const [fallbackCoords, setFallbackCoords] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const run = async () => {
      setUiState("loading");
      setStatusMsg("Locating hotel…");

      try {
        await loadGoogleMapsScript();
        if (cancelled) return;

        // ── 1. Geocode: try from most-specific to least-specific ──────────
        const candidates = [
          `${hotelName}, ${locationText}, ${cityName}`,
          `${hotelName}, ${cityName}`,
          `${locationText}, ${cityName}`,
          `hotel near ${cityName}`,
          cityName,
        ];

        let coords: google.maps.LatLngLiteral | null = null;
        for (const q of candidates) {
          coords = await tryGeocode(q);
          if (coords) break;
        }

        if (!coords) {
          setUiState("error");
          setStatusMsg("Could not find this hotel's location on the map.");
          return;
        }
        if (cancelled) return;

        setStatusMsg("Searching for Street View imagery…");

        // ── 2. Find nearest Street View panorama ─────────────────────────
        const panoData = await findPanorama(coords);
        if (cancelled) return;

        if (!panoData?.location?.latLng) {
          // No imagery — show static map fallback instead
          setFallbackCoords(coords);
          setUiState("fallback");
          return;
        }

        if (!panoramaDivRef.current || cancelled) return;

        // ── 3. Render Street View panorama ───────────────────────────────
        const pos = {
          lat: panoData.location.latLng.lat(),
          lng: panoData.location.latLng.lng(),
        };

        panoramaRef.current = new google.maps.StreetViewPanorama(
          panoramaDivRef.current,
          {
            position: pos,
            pov: { heading: 0, pitch: 0 },
            zoom: 1,
            addressControl: true,
            fullscreenControl: true,
            linksControl: true,
            panControl: true,
            zoomControl: true,
            motionTracking: false,
            motionTrackingControl: false,
          }
        );

        // Auto-orient panorama towards hotel coords (if offset)
        const bearing = google.maps.geometry?.spherical
          ? google.maps.geometry.spherical.computeHeading(
              new google.maps.LatLng(pos.lat, pos.lng),
              new google.maps.LatLng(coords.lat, coords.lng)
            )
          : 0;

        if (bearing !== 0) {
          panoramaRef.current.setPov({ heading: bearing, pitch: 0 });
        }

        setUiState("ready");
      } catch (err: any) {
        if (cancelled) return;
        setUiState("error");
        setStatusMsg(err?.message || "Unable to load Street View.");
      }
    };

    // Short delay so the modal animation completes before the panorama div has height
    const timer = setTimeout(run, 280);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (panoramaRef.current) {
        panoramaRef.current = null;
      }
      setUiState("idle");
      setFallbackCoords(null);
    };
  }, [isOpen, hotelName, locationText, cityName]);

  if (!isOpen) return null;

  const HEADER_H = 76; // px — height of drag-handle + hotel name row

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col justify-end bg-black/60 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-t-3xl w-full overflow-hidden"
        style={{ height: "72vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Drag handle ── */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-[#E5E5EA] rounded-full" />
        </div>

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-5 pb-3">
          <div className="min-w-0 pr-3">
            <p className="text-[10px] font-bold text-[#FFD233] uppercase tracking-wider mb-0.5">
              {uiState === "fallback" ? "Map View (Street View unavailable)" : "Hotel Street View"}
            </p>
            <h3 className="text-[16px] font-bold text-[#1A1A1A] leading-tight truncate">
              {hotelName}
            </h3>
            <p className="text-[11px] text-[#8E8E93] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{locationText || cityName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F2F2F7] flex items-center justify-center flex-shrink-0"
            aria-label="Close street view"
          >
            <X className="w-4 h-4 text-[#1A1A1A]" />
          </button>
        </div>

        {/* ── Overlay states (loading / error) ── */}
        {(uiState === "loading" || uiState === "error") && (
          <div
            className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-3 bg-[#F9F9FB] z-10"
            style={{ top: HEADER_H }}
          >
            {uiState === "loading" && (
              <>
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#FFD233]/30" />
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#FFD233] border-t-transparent animate-spin" />
                  <Map className="absolute inset-0 m-auto w-5 h-5 text-[#FFD233]" />
                </div>
                <p className="text-[12px] text-[#8E8E93] font-medium">{statusMsg}</p>
              </>
            )}
            {uiState === "error" && (
              <div className="text-center px-8 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#FF3B30]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#FF3B30]" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1A1A1A] mb-1">Location not found</p>
                  <p className="text-[11px] text-[#8E8E93] leading-relaxed">{statusMsg}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Static map fallback ── */}
        {uiState === "fallback" && fallbackCoords && (
          <div
            className="absolute left-0 right-0 bottom-0 overflow-hidden"
            style={{ top: HEADER_H }}
          >
            {/* Overlay badge */}
            <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Map className="w-3 h-3" />
              Street View not available · Showing map
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={staticMapUrl(fallbackCoords, hotelName)}
              alt={`Map of ${hotelName}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* ── Street View panorama container ── */}
        <div
          ref={panoramaDivRef}
          className="absolute left-0 right-0 bottom-0"
          style={{
            top: HEADER_H,
            // Hide while loading to avoid showing an unstyled empty div
            visibility: uiState === "ready" ? "visible" : "hidden",
          }}
          aria-label={`Street View of ${hotelName}`}
        />
      </div>
    </div>
  );
}
