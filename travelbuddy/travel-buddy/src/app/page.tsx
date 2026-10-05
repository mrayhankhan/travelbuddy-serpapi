"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Sparkles, User } from "lucide-react";
import { useSession } from "next-auth/react";
import SessionInit, { SessionData } from "@/components/onboarding/SessionInit";
import SwipeEngine from "@/components/discovery/SwipeEngine";
import PhotoUpload, {
  PhotoAnalysisResult,
} from "@/components/discovery/PhotoUpload";
import PreferenceSummary from "@/components/discovery/PreferenceSummary";
import ItineraryView from "@/components/itinerary/ItineraryView";
import BookingLoader from "@/components/itinerary/BookingLoader";
import BookingSuccess from "@/components/itinerary/BookingSuccess";
import PaymentGateway, {
  type PaymentSuccessDetails,
} from "@/components/itinerary/PaymentGateway";
import DestinationShortlist from "@/components/discovery/DestinationShortlist";
import ProfileDrawer, {
  ProfileTags,
} from "@/components/discovery/ProfileDrawer";
import AuthModal from "@/components/auth/AuthModal";
import PreSwipeAuth, {
  ReturningUserData,
} from "@/components/auth/PreSwipeAuth";
import ProfileEditor from "@/components/profile/ProfileEditor";
import TravelChatbot from "@/components/itinerary/TravelChatbot";
import BottomNav, { MainTab } from "@/components/ui/BottomNav";
import ItinerariesPage from "@/components/itinerary/ItinerariesPage";
import Lottie from "lottie-react";
import waveLoadingData from "../../public/loading-wave.json";
import { TripItinerary, ShortlistDestination } from "@/data/itineraryMock";
import {
  createSession,
  getShortlistFromAPI,
  generateItineraryFromAPI,
  removePreferenceTag,
  getLatestSession,
  linkSessionToEmail,
} from "@/lib/api";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

type Phase =
  | "splash"
  | "session"
  | "auth_gate"
  | "photo_upload"
  | "swipe"
  | "summary"
  | "analyzing"
  | "shortlist"
  | "generating"
  | "itinerary"
  | "payment"
  | "booked";

const LOADER_STAGES = [
  "Matching flights...",
  "Optimizing routes...",
  "Clustering activities...",
  "Aligning with budget...",
  "Almost there...",
];

const TRAVEL_FACTS = [
  "Over 1.4 billion tourists travel internationally every year.",
  "The shortest commercial flight in the world lasts just 57 seconds — in Scotland.",
  "France is the most visited country in the world, with 90 million tourists annually.",
  "About 10% of the world's jobs are in the travel and tourism industry.",
  "The average person takes 17 seconds to fall asleep on a flight.",
  "Airports are one of the few places that still use phonetic alphabet codes developed in the 1950s.",
  "The longest non-stop commercial flight covers 17,754 km — Singapore to New York.",
];

export default function Home() {
  const { data: session, status } = useSession();
  const [phase, setPhase] = useState<Phase>("splash");
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [shortlist, setShortlist] = useState<ShortlistDestination[] | null>(
    null,
  );
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [loaderStage, setLoaderStage] = useState(0);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [loaderFacts, setLoaderFacts] = useState<string[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [profileTags, setProfileTags] = useState<ProfileTags>({
    vibes: [],
    activities: [],
    stays: [],
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [returningUserData, setReturningUserData] =
    useState<ReturningUserData | null>(null);
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [skipPhases, setSkipPhases] = useState<string[]>([]);
  const [initialProfileTags, setInitialProfileTags] = useState<{
    vibes: string[];
    activities: string[];
    stays: string[];
  } | null>(null);
  const [editCategory, setEditCategory] = useState<
    "vibes" | "activities" | "stays" | null
  >(null);
  const [initialUserVector, setInitialUserVector] = useState<number[] | null>(
    null,
  );
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [swipeKey, setSwipeKey] = useState(0); // bump to force SwipeEngine remount
  const generationCancelRef = useRef<boolean>(false);
  const generationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [travelCashBalance, setTravelCashBalance] = useState(0);
  const [paymentDetails, setPaymentDetails] =
    useState<PaymentSuccessDetails | null>(null);
  const [bookingConfirmedAt, setBookingConfirmedAt] = useState<string | null>(
    null,
  );
  const [mainTab, setMainTab] = useState<MainTab>("discover");

  // Fetch travel cash balance when user is authenticated
  useEffect(() => {
    if (session?.user?.email) {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
      fetch(
        `${API_BASE}/auth-backend/profile/${encodeURIComponent(session.user.email)}`,
      )
        .then((r) => r.json())
        .then((data) => setTravelCashBalance(data.travelCash || 0))
        .catch(() => { });
    }
  }, [session?.user?.email]);

  // ── Persist state before Google OAuth redirect & restore on return ──
  useEffect(() => {
    if (status !== "authenticated" || phase !== "splash") return;
    const saved = sessionStorage.getItem("tb_auth_pending");
    if (!saved) return;
    sessionStorage.removeItem("tb_auth_pending");
    try {
      const s = JSON.parse(saved);
      if (s.sessionData) setSessionData(s.sessionData);
      if (s.sessionId) setSessionId(s.sessionId);
      if (s.preferences) setPreferences(s.preferences);
      if (s.profileTags) setProfileTags(s.profileTags);
      const fromGate = s.fromAuthGate;

      if (fromGate && session?.user?.email) {
        handleReturningUser(session.user.email, s.sessionData, s.sessionId);
      } else if (s.preferences) {
        setPhase("analyzing");
        setLoaderStage(0);
        const budget = s.sessionData?.budget || 100000;
        getShortlistFromAPI(s.sessionId, s.preferences, budget).then(
          (results) => {
            setTimeout(() => {
              setShortlist(results);
              setPhase("shortlist");
            }, 2500);
          },
        );
      }
    } catch {
      /* ignore corrupt data */
    }
  }, [status, phase]);

  // ── Handle returning user (check for existing session with preferences) ──
  const handleReturningUser = useCallback(
    async (
      email: string,
      currentSessionData: SessionData | null,
      currentSessionId: string | null,
    ) => {
      // Link the new session to this email
      if (currentSessionId) {
        linkSessionToEmail(currentSessionId, email);
      }

      // Check if user has an existing session with preferences
      const existing = await getLatestSession(email);
      if (existing && existing.hasPreferences) {
        // Returning user!
        if (existing.savedItinerary) {
          // User has a saved itinerary → show the returning user choice screen
          setReturningUserData(existing);
          setSessionId(existing.sessionId);
          if (existing.profileTags) setProfileTags(existing.profileTags);
          setPhase("auth_gate"); // stay on auth_gate but show returning-user view
        } else if (
          existing.savedShortlist &&
          existing.savedShortlist.length > 0
        ) {
          // User has preferences + shortlist but no itinerary → show shortlist
          setSessionId(existing.sessionId);
          if (existing.profileTags) setProfileTags(existing.profileTags);
          setShortlist(existing.savedShortlist);
          setPhase("shortlist");
        } else {
          // User has preferences but no shortlist → generate fresh shortlist
          setSessionId(existing.sessionId);
          if (existing.profileTags) setProfileTags(existing.profileTags);
          setPhase("analyzing");
          setLoaderStage(0);
          const budget =
            existing.budget || currentSessionData?.budget || 100000;
          const results = await getShortlistFromAPI(
            existing.sessionId,
            null,
            budget,
          );
          setTimeout(() => {
            setShortlist(results);
            setPhase("shortlist");
          }, 2500);
        }
      } else {
        // New user or no previous preferences → proceed to session onboarding
        setPhase("session");
      }
    },
    [],
  );

  const showProfileBtn = ![
    "splash",
    "session",
    "auth_gate",
    "photo_upload",
    "swipe",
    "payment",
  ].includes(phase);

  // Show bottom nav after onboarding is complete.
  // Excluded: itinerary/payment/booked — those are full-screen overlays with their own navigation.
  const showBottomNav = [
    "swipe",
    "summary",
    "shortlist",
    "analyzing",
    "generating",
  ].includes(phase);

  // 'Plan My Trip' → always show auth gate (sign up / sign in / guest)
  const handleStart = useCallback(() => {
    setPhase("auth_gate");
  }, []);

  const handleSessionComplete = useCallback(
    async (data: SessionData) => {
      setSessionData(data);

      // Save these onboarding preferences to the user's backend profile
      const email = session?.user?.email;
      if (email) {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
        fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(email)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            departureCity: data.departureCity,
            duration: data.duration,
            intendedTravelWindow: data.intendedTravelWindow,
            travelers: data.travelers,
            adults: data.adults,
            children: data.children,
            budget: data.budget,
          }),
        }).catch(console.error);
      }

      // Skip photo upload in the flow — accessible via camera icon in swipe header
      setPhase("swipe");
      createSession(data).then((sid) => {
        if (sid) {
          setSessionId(sid);
          // Link session to authenticated user
          if (email) linkSessionToEmail(sid, email);
        }
      });
    },
    [session],
  );

  // ── Auth gate handlers ──
  const handleAuthGateSkip = useCallback(() => {
    setReturningUserData(null);
    // Go to session onboarding first if not done, else to swipe
    if (!sessionData) {
      setPhase("session");
    } else {
      setPhase("swipe");
    }
  }, [sessionData]);

  const handleAuthGateSuccess = useCallback(() => {
    setAuthOpen(false);
    if (session?.user?.email) {
      handleReturningUser(session.user.email, sessionData, sessionId);
    } else if (!sessionData) {
      // Authenticated but no session data yet → go to onboarding
      setPhase("session");
    } else {
      setPhase("swipe");
    }
  }, [session, sessionData, sessionId, handleReturningUser]);

  const handleAuthGateOpenEmail = useCallback(() => {
    sessionStorage.setItem(
      "tb_auth_pending",
      JSON.stringify({
        sessionData,
        sessionId,
        preferences,
        profileTags,
        fromAuthGate: true,
      }),
    );
    setAuthOpen(true);
  }, [sessionData, sessionId, preferences, profileTags]);

  // Save state for Google OAuth redirect while on auth_gate
  useEffect(() => {
    if (phase === "auth_gate") {
      sessionStorage.setItem(
        "tb_auth_pending",
        JSON.stringify({
          sessionData,
          sessionId,
          preferences,
          profileTags,
          fromAuthGate: true,
        }),
      );
    }
  }, [phase, sessionData, sessionId, preferences, profileTags]);

  // ── Returning user handlers ──
  const handleViewPreviousTrip = useCallback(async () => {
    if (!returningUserData?.savedItinerary) return;
    setItinerary(returningUserData.savedItinerary);
    if (returningUserData.savedShortlist?.length)
      setShortlist(returningUserData.savedShortlist);

    // Load saved tags from backend and categorise into buckets
    const email = session?.user?.email;
    if (email) {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
        const res = await fetch(
          `${API_BASE}/auth-backend/profile/${encodeURIComponent(email)}`,
        );
        if (res.ok) {
          const data = await res.json();
          const saved: string[] = data.travelStyleTags || [];
          if (saved.length > 0) {
            // Use existing session buckets as a category reference
            const vibeSet = new Set(
              returningUserData.profileTags?.vibes ?? profileTags.vibes,
            );
            const actSet = new Set(
              returningUserData.profileTags?.activities ??
              profileTags.activities,
            );
            const staySet = new Set(
              returningUserData.profileTags?.stays ?? profileTags.stays,
            );
            const vibes = saved.filter((t) => vibeSet.has(t));
            const activities = saved.filter(
              (t) => actSet.has(t) && !vibeSet.has(t),
            );
            const stays = saved.filter(
              (t) => staySet.has(t) && !vibeSet.has(t) && !actSet.has(t),
            );
            // Custom tags not in any bucket → put in vibes
            const custom = saved.filter(
              (t) => !vibeSet.has(t) && !actSet.has(t) && !staySet.has(t),
            );
            setProfileTags({ vibes: [...vibes, ...custom], activities, stays });
          }
        }
      } catch {
        /* ignore — tags are non-critical */
      }
    }

    setPhase("itinerary");
  }, [returningUserData, session, profileTags]);

  const handleStartFresh = useCallback(() => {
    // Clear tags in state so the new swipe session starts clean
    setProfileTags({ vibes: [], activities: [], stays: [] });
    // Clear returning user data
    setReturningUserData(null);
    setSessionData(null); // Clear session data so SessionInit mounts fresh
    setPhase("session"); // Route through onboarding first

    // Wipe travelStyleTags on the backend so profile is truly reset
    const email = session?.user?.email;
    if (email) {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
      fetch(`${API_BASE}/auth-backend/profile/${encodeURIComponent(email)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ travelStyleTags: [] }),
      }).catch(() => { });
    }
  }, [session]);

  const handleSwipeComplete = useCallback(
    (prefs: any) => {
      if (editCategory) {
        // Merge: only replace the edited category, keep others intact
        setPreferences((prev: any) => {
          if (!prev) return prefs;
          return {
            ...prev,
            likedVibes:
              editCategory === "vibes"
                ? prefs.likedVibes || []
                : prev.likedVibes,
            likedActivities:
              editCategory === "activities"
                ? prefs.likedActivities || []
                : prev.likedActivities,
            likedStays:
              editCategory === "stays"
                ? prefs.likedStays || []
                : prev.likedStays,
            profileTags: {
              vibes:
                editCategory === "vibes"
                  ? prefs.profileTags?.vibes || []
                  : prev.profileTags?.vibes || profileTags.vibes,
              activities:
                editCategory === "activities"
                  ? prefs.profileTags?.activities || []
                  : prev.profileTags?.activities || profileTags.activities,
              stays:
                editCategory === "stays"
                  ? prefs.profileTags?.stays || []
                  : prev.profileTags?.stays || profileTags.stays,
            },
          };
        });
        if (prefs?.profileTags) {
          setProfileTags((prev) => ({
            vibes:
              editCategory === "vibes"
                ? prefs.profileTags.vibes || []
                : prev.vibes,
            activities:
              editCategory === "activities"
                ? prefs.profileTags.activities || []
                : prev.activities,
            stays:
              editCategory === "stays"
                ? prefs.profileTags.stays || []
                : prev.stays,
          }));
        }
        setEditCategory(null);
        setSkipPhases([]);
        setInitialProfileTags(null);
      } else {
        if (prefs?.profileTags) {
          setProfileTags(prefs.profileTags);
        }
        setPreferences(prefs);
      }
      setPhase("summary");
    },
    [editCategory, profileTags],
  );

  // ── Photo upload handlers ──
  const handlePhotoComplete = useCallback((result: PhotoAnalysisResult) => {
    // Determine which phases have tags (and can be skipped)
    const covered: string[] = [];
    const tags: { vibes: string[]; activities: string[]; stays: string[] } = {
      vibes: [],
      activities: [],
      stays: [],
    };

    if (result.vibes.length > 0) {
      covered.push("vibes");
      tags.vibes = result.vibes.map((t) => t.tag);
    }
    if (result.activities.length > 0) {
      covered.push("activities");
      tags.activities = result.activities.map((t) => t.tag);
    }
    if (result.stays.length > 0) {
      covered.push("stays");
      tags.stays = result.stays.map((t) => t.tag);
    }

    // Build initial user vector from tag embeddings × confidence
    // We'll let SwipeEngine handle this via the tags + confidences
    setSkipPhases(covered);
    setInitialProfileTags(tags);
    setProfileTags((prev) => ({
      vibes: [
        ...prev.vibes,
        ...tags.vibes.filter((t) => !prev.vibes.includes(t)),
      ],
      activities: [
        ...prev.activities,
        ...tags.activities.filter((t) => !prev.activities.includes(t)),
      ],
      stays: [
        ...prev.stays,
        ...tags.stays.filter((t) => !prev.stays.includes(t)),
      ],
    }));

    // If all three phases are covered, skip straight to summary
    if (covered.length === 3) {
      setPreferences({
        likedVibes: [],
        likedActivities: [],
        likedStays: [],
        profileTags: tags,
      });
      setPhase("summary");
    } else {
      setPhase("swipe");
    }
  }, []);

  const handlePhotoSkip = useCallback(() => {
    setSkipPhases([]);
    setInitialProfileTags(null);
    setPhase("swipe");
  }, []);

  // ── Photo modal handlers (camera icon in swipe header) ──
  const handlePhotoCompleteFromModal = useCallback(
    (result: PhotoAnalysisResult) => {
      // Determine which phases are now covered by the photo
      const covered: string[] = [];
      const tags: { vibes: string[]; activities: string[]; stays: string[] } = {
        vibes: [],
        activities: [],
        stays: [],
      };
      if (result.vibes.length > 0) { covered.push("vibes"); tags.vibes = result.vibes.map((t) => t.tag); }
      if (result.activities.length > 0) { covered.push("activities"); tags.activities = result.activities.map((t) => t.tag); }
      if (result.stays.length > 0) { covered.push("stays"); tags.stays = result.stays.map((t) => t.tag); }

      // Merge into global profile tags
      setProfileTags((prev) => ({
        vibes: [...prev.vibes, ...tags.vibes.filter((t) => !prev.vibes.includes(t))],
        activities: [...prev.activities, ...tags.activities.filter((t) => !prev.activities.includes(t))],
        stays: [...prev.stays, ...tags.stays.filter((t) => !prev.stays.includes(t))],
      }));

      setShowPhotoModal(false);

      if (covered.length === 3) {
        // All phases covered → skip swipe entirely, go to travel profile summary
        setSkipPhases(covered);
        setInitialProfileTags(tags);
        setPreferences({
          likedVibes: [],
          likedActivities: [],
          likedStays: [],
          profileTags: tags,
        });
        setPhase("summary");
      } else if (covered.length > 0) {
        // Partial coverage → update skipPhases and remount SwipeEngine on the right phase
        setSkipPhases(covered);
        setInitialProfileTags(tags);
        setSwipeKey((k) => k + 1); // force SwipeEngine remount so it starts at correct phase
        setPhase("swipe");
      }
      // covered.length === 0 → nothing extracted, just stay in swipe as-is
    },
    [],
  );

  const handlePhotoSkipFromModal = useCallback(() => {
    setShowPhotoModal(false);
  }, []);

  const handleSummaryEdit = useCallback(
    (category: "vibes" | "activities" | "stays") => {
      const allPhases = ["vibes", "activities", "stays"];
      const toSkip = allPhases.filter((p) => p !== category);
      setEditCategory(category);
      setSkipPhases(toSkip);
      setInitialProfileTags({
        vibes: category === "vibes" ? [] : profileTags.vibes,
        activities: category === "activities" ? [] : profileTags.activities,
        stays: category === "stays" ? [] : profileTags.stays,
      });
      setPhase("swipe");
    },
    [profileTags],
  );

  const proceedToAnalysis = useCallback(async () => {
    setAuthOpen(false);
    setPhase("analyzing");
    setLoaderStage(0);
    const budget = sessionData?.budget || 100000;

    if (session?.user?.email && sessionId) {
      linkSessionToEmail(sessionId, session.user.email);
    }

    const results = await getShortlistFromAPI(sessionId, preferences, budget);
    setTimeout(() => {
      setShortlist(results);
      setPhase("shortlist");
    }, 2500);
  }, [sessionData, sessionId, preferences, session]);

  const handleSummaryContinue = useCallback(() => {
    if (session?.user) {
      proceedToAnalysis();
    } else {
      sessionStorage.setItem(
        "tb_auth_pending",
        JSON.stringify({
          sessionData,
          sessionId,
          preferences,
          profileTags,
        }),
      );
      setAuthOpen(true);
    }
  }, [
    session,
    sessionData,
    sessionId,
    preferences,
    profileTags,
    proceedToAnalysis,
  ]);

  const handleDestinationSelect = useCallback(
    async (id: string) => {
      generationCancelRef.current = false;
      if (generationTimerRef.current) clearTimeout(generationTimerRef.current);

      setSelectedDestinationId(id);
      setPhase("generating");
      setLoaderStage(0);
      setCurrentFactIndex(0);
      const budget = sessionData?.budget || 100000;
      const trip = await generateItineraryFromAPI(sessionId, id, budget);
      if (generationCancelRef.current) return;
      generationTimerRef.current = setTimeout(() => {
        if (!generationCancelRef.current) {
          setItinerary(trip);
          setPhase("itinerary");
        }
      }, 3500);
    },
    [sessionData, sessionId],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const container = document.querySelector("[data-main-container]");
    if (container) container.scrollTop = 0;
  }, [phase]);

  const handleBackToSummary = useCallback(() => setPhase("summary"), []);
  const handleBackToShortlist = useCallback(() => {
    generationCancelRef.current = true;
    if (generationTimerRef.current) clearTimeout(generationTimerRef.current);

    if (!shortlist || shortlist.length === 0) {
      if (sessionId && preferences) {
        setPhase("analyzing");
        setLoaderStage(0);
        const budget = sessionData?.budget || 100000;
        getShortlistFromAPI(sessionId, preferences, budget).then((results) => {
          setShortlist(results);
          setItinerary(null);
          setPhase("shortlist");
        });
        return;
      } else {
        setPhase("summary");
        return;
      }
    }
    // Switch to shortlist first — don't null itinerary before the phase flip
    // React will unmount itinerary view naturally when phase changes
    setPhase("shortlist");
  }, [shortlist, sessionId, preferences, sessionData]);

  const handleReset = useCallback(() => {
    // Clear trip-specific state but preserve auth
    setSessionData(null);
    setSessionId(null);
    setPreferences(null);
    setShortlist(null);
    setItinerary(null);
    setPaymentDetails(null);
    setBookingConfirmedAt(null);
    setProfileTags({ vibes: [], activities: [], stays: [] });
    setReturningUserData(null);
    sessionStorage.removeItem("tb_auth_pending");

    // If user is logged in, skip splash & auth — go straight to trip planning
    if (session?.user) {
      setPhase("session");
    } else {
      setPhase("splash");
    }
  }, [session]);

  // Cycle through loader stages at the bottom
  useEffect(() => {
    if (phase !== "analyzing" && phase !== "generating") return;
    setLoaderStage(0);
    const interval = setInterval(() => {
      setLoaderStage((s) => (s < LOADER_STAGES.length - 1 ? s + 1 : s));
    }, 1800);
    return () => clearInterval(interval);
  }, [phase]);

  // Fetch facts when entering generating phase
  useEffect(() => {
    if (phase === "generating" && selectedDestinationId) {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
      fetch(`${API_BASE}/destinations/${encodeURIComponent(selectedDestinationId)}/facts`)
        .then((r) => r.json())
        .then((data) => {
          if (data.facts && data.facts.length > 0) {
            setLoaderFacts(data.facts);
          } else {
            setLoaderFacts(TRAVEL_FACTS);
          }
          setCurrentFactIndex(0);
        })
        .catch(() => setLoaderFacts(TRAVEL_FACTS));
    } else if (phase === "analyzing") {
      setLoaderFacts(TRAVEL_FACTS);
      setCurrentFactIndex(0);
    }
  }, [phase, selectedDestinationId]);

  // Rotate facts every 5 seconds
  useEffect(() => {
    if ((phase !== "analyzing" && phase !== "generating") || loaderFacts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentFactIndex((i: number) => (i + 1) % loaderFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [phase, loaderFacts]);

  return (
    <div
      data-main-container
      className="w-full max-w-[430px] mx-auto h-[100dvh] relative bg-[#F5F3FF] overflow-x-hidden overflow-y-auto"
      style={{ boxShadow: "0 0 80px rgba(0,0,0,0.04)" }}
    >
      <AnimatePresence mode="wait">
        {/* ═══ SPLASH ═══ */}
        {phase === "splash" && (
          <motion.div
            key="splash"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[100dvh] flex flex-col"
          >
            <div className="relative flex-1 min-h-[50vh] overflow-hidden">
              {/* <img
                src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80"
                alt="Travel Adventure"
                className="absolute inset-0 w-full h-full object-cover"
              /> */}
              <video
                src="/aeroplane.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[#FFD233]/20 mix-blend-overlay" />
            </div>
            <div className="relative z-10 bg-white rounded-t-[36px] -mt-10 px-10 pt-10 pb-14 flex flex-col items-center text-center shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-[#FFD233] flex items-center justify-center shadow-[0_4px_16px_rgba(255,210,51,0.3)]"
                style={{ marginBottom: 10 }}
              >
                <Compass className="w-8 h-8 text-[#1A1A1A]" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[30px] font-bold tracking-tight text-[#1A1A1A]"
              >
                TravelBuddy
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[#B8860B] text-[15px] max-w-[280px] leading-relaxed"
                style={{ marginTop: 1 }}
              >
                Stop searching. Start discovering.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStart}
                className="px-10 py-4 bg-[#1A1A1A] text-white rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                style={{ marginTop: 12 }}
              >
                Plan My Trip <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[11px] text-[#8E8E93]/70 tracking-wide"
                style={{ marginTop: 10 }}
              >
                Powered by HotelAPI API&apos;s and Inventory
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* ═══ SESSION INIT ═══ */}
        {phase === "session" && (
          <motion.div
            key="session"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[100dvh]"
          >
            <SessionInit onComplete={handleSessionComplete} />
          </motion.div>
        )}

        {/* ═══ AUTH GATE ═══ */}
        {phase === "auth_gate" && (
          <motion.div
            key="auth_gate"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[100dvh]"
          >
            <PreSwipeAuth
              onSignIn={handleAuthGateSuccess}
              onSkip={handleAuthGateSkip}
              onOpenEmailAuth={handleAuthGateOpenEmail}
              returningUser={returningUserData}
              onViewPreviousTrip={handleViewPreviousTrip}
              onStartFresh={handleStartFresh}
            />
          </motion.div>
        )}

        {/* ═══ PHOTO UPLOAD ═══ */}
        {phase === "photo_upload" && (
          <motion.div
            key="photo_upload"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[100dvh]"
          >
            <PhotoUpload
              sessionId={sessionId}
              onComplete={handlePhotoComplete}
              onSkip={handlePhotoSkip}
            />
          </motion.div>
        )}

        {/* ═══ SWIPE ENGINE ═══ */}
        {phase === "swipe" && (
          <motion.div
            key={`swipe-${swipeKey}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[100dvh]"
          >
            <SwipeEngine
              onComplete={handleSwipeComplete}
              sessionId={sessionId}
              onProfileOpen={() => setProfileEditorOpen(true)}
              onCameraOpen={() => setShowPhotoModal(true)}
              onTagsChange={(tags) => setProfileTags(tags)}
              skipPhases={skipPhases}
              initialProfileTags={initialProfileTags || undefined}
            />
          </motion.div>
        )}

        {/* ═══ PREFERENCE SUMMARY ═══ */}
        {phase === "summary" && preferences && (
          <motion.div
            key="summary"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[100dvh]"
          >
            <PreferenceSummary
              preferences={preferences}
              budget={sessionData?.budget || 100000}
              onContinue={handleSummaryContinue}
              onEdit={handleSummaryEdit}
              sessionId={sessionId}
            />
          </motion.div>
        )}

        {/* ═══ ANALYZING / GENERATING ═══ */}
        {(phase === "analyzing" || phase === "generating") && (
          <motion.div
            key="loader"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[100dvh] flex flex-col items-center px-8 pt-10 pb-10"
          >
            {/* Center Area: Animations + Facts grouped together */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[320px]">
              {/* Lottie animation + GIF */}
              <div className="flex flex-col items-center mb-8">
                <img
                  src="/anim.gif"
                  alt="Loading animation"
                  className="w-40 h-40 object-contain mt-[-16px]"
                />
                {/* <div className="w-36 h-36 flex items-center justify-center">
                  <Lottie
                    animationData={waveLoadingData}
                    loop={true}
                    style={{ width: 130, height: 130 }}
                  />
                </div> */}
              </div>

              {/* Rotating fact card */}
              <div className="w-full flex flex-col items-center">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#8E8E93] mb-4">
                  ✦ Did you know?
                </p>
                <div className="relative w-full min-h-[110px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {loaderFacts.length > 0 && (
                      <motion.div
                        key={currentFactIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center"
                      >
                        <p className="text-[17px] font-semibold text-[#1A1A1A] leading-snug tracking-tight">
                          {loaderFacts[currentFactIndex]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Fact dots */}
                {loaderFacts.length > 1 && (
                  <div className="flex gap-1.5 mt-6">
                    {loaderFacts.map((_: string, i: number) => (
                      <div
                        key={i}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === currentFactIndex ? 18 : 6,
                          height: 6,
                          background: i === currentFactIndex ? "#1A1A1A" : "#D1D1D6",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom: Animated technical step */}
            <div className="w-full flex flex-col items-center pb-2">
              <div className="relative h-8 flex items-center justify-center overflow-hidden w-full">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loaderStage}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute text-[13px] font-medium text-[#3C3C43]/70"
                  >
                    {LOADER_STAGES[loaderStage]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="text-[10px] text-[#8E8E93]/45 mt-2 tracking-wide">
                Powered by HotelAPI · Real-time availability
              </p>
            </div>
          </motion.div>
        )}

        {/* ═══ SHORTLIST ═══ */}
        {phase === "shortlist" && (
          <motion.div
            key="shortlist"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[100dvh]"
          >
            {Array.isArray(shortlist) && shortlist.length > 0 ? (
              <DestinationShortlist
                shortlist={shortlist}
                onSelect={handleDestinationSelect}
                onBack={handleBackToSummary}
              />
            ) : (
              <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-4 px-8">
                <div className="w-14 h-14 rounded-full border-[3px] border-[#E5E5EA] border-t-[#FFD233] animate-spin" />
                <p className="text-[14px] font-semibold text-[#8E8E93]">
                  Loading your suggestions...
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ ITINERARIES TAB PAGE ═══ */}
      {mainTab === "itineraries" && showBottomNav && (
        <div className="absolute inset-0 z-10 overflow-y-auto bg-[#F5F3FF]">
          <ItinerariesPage
            sessionData={sessionData}
            sessionId={sessionId}
            profileTags={profileTags}
            onViewItinerary={(itin) => {
              // ItinerariesPage already merged the details before calling here
              setItinerary(itin);
              setPhase("itinerary");
            }}
            onBook={(itin) => {
              setItinerary(itin);
              setMainTab("discover");
              setPhase("payment");
            }}
          />
        </div>
      )}

      {/* ═══ ITINERARY (outside AnimatePresence to avoid exit animation deadlocks) ═══ */}
      {phase === "itinerary" && itinerary && (
        <div className="absolute inset-0 z-20 min-h-[100dvh] bg-[#F5F3FF]">
          <ItineraryView
            itinerary={itinerary}
            onReset={handleReset}
            onBack={() => {
              if (mainTab === "itineraries") {
                // Came from the Ready Itineraries tab — go back to the feed
                setItinerary(null);
                setPhase("swipe"); // showBottomNav is true here, ItinerariesPage reappears
              } else {
                handleBackToShortlist();
              }
            }}
            onBook={() => setPhase("payment")}
            sessionData={sessionData}
            travelCashBalance={travelCashBalance}
            destinationId={(itinerary as any).destinationId || selectedDestinationId || undefined}
          />
        </div>
      )}

      {/* ═══ PAYMENT GATEWAY (outside AnimatePresence to avoid exit conflicts) ═══ */}
      {phase === "payment" && itinerary && (
        <div className="absolute inset-0 z-30 min-h-[100dvh]">
          <PaymentGateway
            amount={itinerary.totalCost}
            destination={itinerary.destination}
            onSuccess={(details) => {
              if (details.travelCashUsed > 0 && session?.user?.email) {
                const API_BASE =
                  process.env.NEXT_PUBLIC_API_URL ||
                  "http://localhost:5002/api";
                fetch(
                  `${API_BASE}/auth-backend/profile/${encodeURIComponent(session.user.email)}/deduct-cashback`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: details.travelCashUsed }),
                  },
                ).catch(() => { });
                setTravelCashBalance((prev) =>
                  Math.max(0, prev - details.travelCashUsed),
                );
              }
              setPaymentDetails(details);
              setBookingConfirmedAt(details.paidAt);
              setPhase("booked");
            }}
            onCancel={() => setPhase("itinerary")}
            travelCashDiscount={Math.min(
              travelCashBalance,
              itinerary.totalCost,
            )}
          />
        </div>
      )}

      {/* ═══ BOOKING SUCCESS + REWARDS (outside AnimatePresence) ═══ */}
      {phase === "booked" && itinerary && (
        <div className="absolute inset-0 z-30 min-h-[100dvh]">
          <BookingSuccess
            destination={itinerary.destination}
            country={itinerary.country}
            duration={itinerary.duration}
            totalCost={itinerary.totalCost}
            image={itinerary.image}
            itinerary={itinerary}
            paymentDetails={paymentDetails}
            bookedAt={bookingConfirmedAt || undefined}
            onReset={handleReset}
            userEmail={session?.user?.email}
          />
        </div>
      )}

      {/* ═══ GLOBAL PROFILE BUTTON (top-right, all pages except swipe) ═══ */}
      {showProfileBtn && session?.user && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setProfileEditorOpen(true)}
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)] active:scale-90 transition-transform border border-white/50"
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : session?.user?.name ? (
            <span className="text-[14px] font-bold text-[#1A1A1A]">
              {session.user.name[0].toUpperCase()}
            </span>
          ) : (
            <User className="w-4.5 h-4.5 text-[#6B6B6B]" />
          )}
        </motion.button>
      )}

      {/* ═══ GLOBAL PROFILE DRAWER (ML tags — shown only post-swipe) ═══ */}
      <ProfileDrawer
        tags={profileTags}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onRemoveTag={(section, tag) => {
          setProfileTags((pt) => ({
            ...pt,
            [section]: pt[section].filter((t) => t !== tag),
          }));
          if (sessionId) removePreferenceTag(sessionId, section, tag);
        }}
      />

      {/* ═══ AUTH MODAL ═══ */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={
          phase === "auth_gate" ? handleAuthGateSuccess : proceedToAnalysis
        }
      />

      {/* ═══ PHOTO UPLOAD MODAL (camera icon in swipe header) ═══ */}
      <AnimatePresence>
        {showPhotoModal && (
          <motion.div
            key="photo-modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#F2F1F8]"
          >
            <PhotoUpload
              sessionId={sessionId}
              onComplete={handlePhotoCompleteFromModal}
              onSkip={handlePhotoSkipFromModal}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ PROFILE EDITOR ═══ */}
      <ProfileEditor
        isOpen={profileEditorOpen}
        onClose={() => setProfileEditorOpen(false)}
        userEmail={session?.user?.email || null}
        swipeTags={profileTags}
        onTagsChange={(tags) => setProfileTags(tags)}
        onProfileUpdate={(updates) => {
          if (sessionData) {
            // @ts-ignore - duration string type vs literal union
            setSessionData({ ...sessionData, ...(updates as any) });
          }
        }}
      />

      {/* ═══ TRAVEL CHAHotelAPIT (itinerary + booked phases) ═══ */}
      {(phase === "itinerary" || phase === "booked") && itinerary && (
        <TravelChatbot
          destination={itinerary.destination}
          country={itinerary.country}
        />
      )}

      {/* ═══ BOTTOM NAVIGATION BAR ═══ */}
      {showBottomNav && (
        <BottomNav
          activeTab={mainTab}
          onTabChange={(tab) => {
            // Reset to discover flow when switching back
            setMainTab(tab);
          }}
        />
      )}
    </div>
  );
}
