"use client";

import { useEffect, useRef, useState } from "react";
import { X, MapPin, Map, Camera, Utensils, Music } from "lucide-react";

export type LocationType = "hotel" | "sightseeing" | "restaurant" | "activity" | "relax";

interface LocationStreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  locationDescription?: string;
  cityName: string;
  type?: LocationType;
}

// ─── Singleton script loader (shared with HotelStreetViewModal) ────────────
let mapsScriptPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
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

    if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
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
      mapsScriptPromise = null;
      reject(new Error("Failed to load Google Maps — check your API key."));
    };
    document.head.appendChild(script);
  });

  return mapsScriptPromise;
}

// ─── Geocode query, return coords or null ─────────────────────────────────
async function tryGeocode(query: string): Promise<google.maps.LatLngLiteral | null> {
  try {
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ address: query });
    if (result?.results?.length > 0) {
      const loc = result.results[0].geometry.location;
      return { lat: loc.lat(), lng: loc.lng() };
    }
  } catch {
    // ZERO_RESULTS or OVER_QUERY_LIMIT — try next candidate
  }
  return null;
}

// ─── Find nearest Street View panorama, with a distance sanity-check ────────
// MAX_PANO_DISTANCE_M: if the closest panorama is further than this from the
// geocoded landmark coordinate we treat it as a false-positive (e.g. the search
// snapped to a random city street instead of the actual attraction).
const MAX_PANO_DISTANCE_M = 800;

async function findPanorama(
  coords: google.maps.LatLngLiteral,
): Promise<google.maps.StreetViewPanoramaData | null> {
  const svc = new google.maps.StreetViewService();

  // Outdoor radius is capped at 400 m — enough for attractions that have
  // nearby street coverage, but not so large that we snap to a city street
  // several km away from a nature site.
  const attempts: Array<{ radius: number; source: google.maps.StreetViewSource }> = [
    { radius: 50,  source: google.maps.StreetViewSource.OUTDOOR },
    { radius: 150, source: google.maps.StreetViewSource.OUTDOOR },
    { radius: 400, source: google.maps.StreetViewSource.OUTDOOR },
    { radius: 150, source: google.maps.StreetViewSource.DEFAULT },
    { radius: 400, source: google.maps.StreetViewSource.DEFAULT },
    { radius: 800, source: google.maps.StreetViewSource.DEFAULT },
  ];

  for (const { radius, source } of attempts) {
    try {
      const res = await svc.getPanorama({ location: coords, radius, source });
      if (!res?.data?.location?.latLng) continue;

      // ── Distance sanity-check ──────────────────────────────────────────
      // If the geometry library is loaded, compute how far the found panorama
      // is from the original geocoded point.  If it's suspiciously far away
      // (e.g. the geocoder silently fell back to the city centre) we reject
      // this panorama and keep searching / eventually trigger the map fallback.
      if (google.maps.geometry?.spherical) {
        const panoLatLng = res.data.location.latLng;
        const dist = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(coords.lat, coords.lng),
          panoLatLng,
        );
        if (dist > MAX_PANO_DISTANCE_M) continue; // too far — try next radius
      }

      return res.data;
    } catch {
      // No panorama at this radius/source — try next
    }
  }
  return null;
}

// ─── Static map fallback URL ──────────────────────────────────────────────
function staticMapUrl(coords: google.maps.LatLngLiteral, label: string, markerLabel: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  return (
    `https://maps.googleapis.com/maps/api/staticmap` +
    `?center=${coords.lat},${coords.lng}` +
    `&zoom=17&size=600x400&scale=2&maptype=roadmap` +
    `&markers=color:red%7Clabel:${markerLabel}%7C${coords.lat},${coords.lng}` +
    `&key=${apiKey}`
  );
}

// ─── Type metadata helpers ────────────────────────────────────────────────
function getTypeConfig(type: LocationType) {
  switch (type) {
    case "restaurant":
      return {
        label: "Restaurant Street View",
        markerLabel: "R",
        iconColor: "#FF6B6B",
        Icon: Utensils,
      };
    case "relax":
      return {
        label: "Attraction Street View",
        markerLabel: "A",
        iconColor: "#34C759",
        Icon: Music,
      };
    case "activity":
    case "sightseeing":
    default:
      return {
        label: "Sightseeing Street View",
        markerLabel: "S",
        iconColor: "#FFD233",
        Icon: Camera,
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────
export default function LocationStreetViewModal({
  isOpen,
  onClose,
  locationName,
  locationDescription,
  cityName,
  type = "sightseeing",
}: LocationStreetViewModalProps) {
  const panoramaDivRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);

  type UIState = "idle" | "loading" | "ready" | "fallback" | "error";
  const [uiState, setUiState] = useState<UIState>("idle");
  const [statusMsg, setStatusMsg] = useState<string>("Loading Street View...");
  const [fallbackCoords, setFallbackCoords] = useState<google.maps.LatLngLiteral | null>(null);

  const typeConfig = getTypeConfig(type);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const run = async () => {
      setUiState("loading");
      setStatusMsg("Locating place…");

      try {
        await loadGoogleMapsScript();
        if (cancelled) return;

        // ── 1. Geocode: try the landmark name globally first ──────────────
        // Rationale: for nature sites like "Gullfoss Waterfall" or "Geysir",
        // the bare name is far more unique than "Gullfoss, Reykjavik" which
        // can confuse the geocoder and return city-centre coordinates.
        // We intentionally do NOT fall back to just `cityName` — if we can't
        // geocode the landmark even loosely, show a map-fallback/error rather
        // than silently showing the wrong city-centre Street View.
        const candidates = [
          locationName,                              // bare name first (most unique for landmarks)
          `${locationName}, ${cityName}`,            // then with city context
          ...(locationDescription
            ? [locationDescription, `${locationDescription}, ${cityName}`]
            : []),
          // ⚠️  cityName alone is intentionally omitted — falling back to the
          // city centre would show a random street with no relation to the
          // attraction and is indistinguishable from a successful result.
        ];

        let coords: google.maps.LatLngLiteral | null = null;
        for (const q of candidates) {
          coords = await tryGeocode(q);
          if (coords) break;
        }

        if (!coords) {
          setUiState("error");
          setStatusMsg("Could not find this location on the map.");
          return;
        }
        if (cancelled) return;

        setStatusMsg("Searching for Street View imagery…");

        // ── 2. Find nearest panorama ──────────────────────────────────────
        const panoData = await findPanorama(coords);
        if (cancelled) return;

        if (!panoData?.location?.latLng) {
          setFallbackCoords(coords);
          setUiState("fallback");
          return;
        }

        if (!panoramaDivRef.current || cancelled) return;

        // ── 3. Render panorama ────────────────────────────────────────────
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

        // Auto-orient towards the actual location coords
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

    // Short delay so modal entrance animation completes before div renders
    const timer = setTimeout(run, 280);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      panoramaRef.current = null;
      setUiState("idle");
      setFallbackCoords(null);
    };
  }, [isOpen, locationName, locationDescription, cityName]);

  if (!isOpen) return null;

  const HEADER_H = 80; // px — height of drag-handle + name row

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${locationName}, ${cityName}`
  )}`;

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
          <div className="min-w-0 pr-3 flex-1">
            <p
              className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
              style={{ color: typeConfig.iconColor }}
            >
              {uiState === "fallback"
                ? "Map View (Street View unavailable)"
                : typeConfig.label}
            </p>
            <h3 className="text-[16px] font-bold text-[#1A1A1A] leading-tight truncate">
              {locationName}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[11px] text-[#8E8E93] flex items-center gap-1">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{locationDescription || cityName}</span>
              </p>
              {/* Open in Google Maps link */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-[#5B8FB9] underline flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                Open in Maps
              </a>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F2F2F7] flex items-center justify-center flex-shrink-0"
            aria-label="Close street view"
          >
            <X className="w-4 h-4 text-[#1A1A1A]" />
          </button>
        </div>

        {/* ── Loading / Error overlay ── */}
        {(uiState === "loading" || uiState === "error") && (
          <div
            className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-3 bg-[#F9F9FB] z-10"
            style={{ top: HEADER_H }}
          >
            {uiState === "loading" && (
              <>
                <div className="relative w-14 h-14">
                  <div
                    className="absolute inset-0 rounded-full border-[3px]"
                    style={{ borderColor: `${typeConfig.iconColor}30` }}
                  />
                  <div
                    className="absolute inset-0 rounded-full border-[3px] border-t-transparent animate-spin"
                    style={{ borderColor: `${typeConfig.iconColor} transparent transparent transparent` }}
                  />
                  <typeConfig.Icon
                    className="absolute inset-0 m-auto w-5 h-5"
                    style={{ color: typeConfig.iconColor }}
                  />
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
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-bold text-[#5B8FB9] underline"
                >
                  Try opening in Google Maps instead →
                </a>
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
            <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Map className="w-3 h-3" />
              Street View not available · Showing map
            </div>
            {/* Link to Google Maps overlaid top-right */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 z-10 bg-white/90 text-[#5B8FB9] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Map className="w-3 h-3" />
              Open in Maps
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={staticMapUrl(fallbackCoords, locationName, typeConfig.markerLabel)}
              alt={`Map of ${locationName}`}
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
            visibility: uiState === "ready" ? "visible" : "hidden",
          }}
          aria-label={`Street View of ${locationName}`}
        />
      </div>
    </div>
  );
}
