# TravelBuddy — Feature List

This document details the complete feature set of the TravelBuddy platform.

## 1. Discovery & Profiling
* **Tinder-style Swipe Engine**: 4-directional card swiping (Like, Nope, Expand, Save) leveraging Framer Motion spring physics for fluid interactions.
* **Curated Content**: 46 distinct travel cards categorized into Vibes, Activities, and Stays, each enriched with 6 specific ML tags.
* **Multi-Vector ML Profiling**: Silently builds individual Vibe, Activity, and Stay preference vectors based on every swipe.
* **Swipe Scoring**: Sophisticated scoring algorithm that incorporates position decay, swipe speed weighting, tag rarity (IDF), and detail-view engagement bonuses.
* **Adaptive Card Feed**: Epsilon-greedy selector balancing preferred content (75%) with exploration cards (25%) while preventing consecutive repetitive tags.
* **Contextual Calibration**: Automatically detects dislike streaks and tag conflicts (e.g., Party vs. Zen), triggering forced vertical-slider duels for clarification.
* **Curated User Profiles**: Dedicated profile editor allowing users to upload profile photos, manage budget/travelers, and explicitly add/remove preference tags.

## 2. Recommendation Engine
* **Cosine Similarity Ranking**: Ranks destinations by comparing user vectors against destination vectors (weighted 50% Vibes, 30% Activities, 20% Stays).
* **Budget Alignment Bonus**: Adjusts destination scores by up to ±10% based on how well the theoretical trip cost aligns with the user's stated budget.
* **Expanded City Pool**: Comprehensive database of European destinations fully compatible with live HotelAPI Hotel API inventory.

## 3. Dynamic Itinerary Generation
* **Resilient AI Pipeline**: Uses Gemini 2.5 Flash with a robust multi-key, multi-model fallback and rotation system to bypass rate limits and ensure uptime.
* **Logistics & Planning Synthesis**: Parallel AI calls to fetch flight/hotel logistics and generate tailored day-by-day schedules (3-10 days) simultaneously.
* **Micro-Personalized Day Plans**: Re-sorts and emphasizes daily activities based exclusively on the user's top-rated activity tags (e.g., placing adventure activities first for thrill-seekers).

## 4. Live Integrations & Mapping
* **HotelAPI Hotel API Integration**: Live REST API connection fetches the cheapest available real hotel pricing (converting USD to INR), gracefully falling back to seed data if unavailable.
* **Google Maps Street View**: 
  * Immersive 360° panoramas directly within the itinerary.
  * Fully supports both **Hotels** and all individual **Sightseeing/Restaurant/Activity** locations.
  * Smart geocoding fallbacks and progressive radius expansion to handle remote nature landmarks vs city centers.
* **Tourist Attraction Explorer**: Interactive Google Maps module (Places API) allowing users to visually discover nearby monuments, museums, and historical sites curated for their destination city.

## 5. UI/UX & Flow
* **Seamless Onboarding**: 4-step rapid onboarding (Departure City, Duration, Travelers, Budget) under 20 seconds.
* **Google OAuth**: Frictionless sign-in/sign-up flow using Google Authentication.
* **4-Tab Itinerary View**: Beautifully animated layout organizing the trip into Days (collapsible accordions), Flights, Hotel, and Budget tabs.
* **Dynamic Budget Bar**: Visual indicator showing exact spend ratio (green for within budget, warning colors for over budget) dynamically reflecting group size.
* **Responsive Mobile-First Design**: Optimized for 430px mobile viewports using modern Tailwind CSS v4 styling.
