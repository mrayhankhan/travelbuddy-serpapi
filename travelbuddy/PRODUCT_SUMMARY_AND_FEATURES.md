# TravelBuddy Product Summary & Features List

**Version:** 2.0 (March 2026)  
**Type:** AI-Powered Consumer Travel Discovery & Booking Platform  
**Target Platform:** Mobile-First Web Application 

---

## 🌍 Product Summary

TravelBuddy is an innovative, swipe-based AI travel discovery engine — colloquially conceived as "Tinder for the complete travel itinerary." Born out of the HotelAPI Hackathon, the platform fundamentally disrupts the traditional form-heavy, filter-driven travel booking paradigm.

Instead of demanding users to immediately know where they want to go, TravelBuddy gamifies the discovery phase. Users swipe through visually immersive cards representing abstract "Vibes," specific "Activities," and varied "Stays." As the user swipes — swiping right for Like, left for Skip, or interacting for a Wishlist/Expand — an intelligent Machine Learning engine works silently in the background. It constructs a multi-dimensional semantic preference vector unique to the user's implicit desires.

Leveraging a vast database of European destinations and integrating directly with HotelAPI's live Hotel APIs, the system uses cosine similarity algorithms to match the user's hidden profile with the perfect destination. The result is a hyper-personalized, fully generated day-by-day itinerary powered by Google Gemini 2.5 Flash, complete with real-time hotel pricing, scaled activity budgets, simulated flight routes, and interactive Google Street View integrations. 

In under 60 seconds, a user goes from a vague desire to travel, to holding a fully budgeted, personalized, interactive, and visually stunning itinerary in their hands—ready to be booked.

---

## ✨ Features List — Details from A to Z

### 1. Intelligent Onboarding (Frictionless Entry)
* **Rapid Session Initialization:** 4-step rapid onboarding completed in under 20 seconds.
* **Core Parameters:** Collects Departure City, Trip Duration (e.g., 5-7 days), Total Traveler Count, and Total Budget Limit (in INR).
* **Travel Window:** Captures intended travel timeframe (e.g., "within 1 month", "within 6 months") to contextualize the urgency and potential pricing.

### 2. Tinder-Style Discovery Engine (The Swipe UI)
* **4-Directional Swipe:** Engaging Framer Motion spring-physics UI. 
  * Swipe Right = LIKE (+1.0 point)
  * Swipe Left = NOPE (-0.5 points)
  * Swipe Up / Tap = SAVE/WISHLIST (+1.8 points)
  * Detail Expand = View deep information; adds an engagement multiplier.
* **Curated Discovery Phases:** The swipe deck sequentially transitions through three distinct phases contextually: 
  1. **Vibes** (e.g., "Zen", "Party", "Historic")
  2. **Activities** (e.g., "Scuba Diving", "Museums", "Food Tours")
  3. **Stays** (e.g., "Luxury Resor", "Hostels", "Boutique Art Hotels")
* **Rich Content Cards:** 46 distinct, high-quality discovery cards backed by Unsplash imagery and multi-bullet highlights.

### 3. Semantic Preference Profiling (Machine Learning)
* **Real-time Semantic Vectors:** Every card contains 6 hidden ML tags. Each swipe updates a 768-dimensional dense vector (User Vibe, User Activity, User Stay) in real-time.
* **Leaky Integrator Formula:** Prevents preference dilution. Recent swipes carry slightly more weight (positional decay), and swipe speed is analyzed (fast instinctual swipes vs. slow considered swipes) to weigh the signal intelligently.
* **Sparse Vector Tracking (IDF):** Tracks exact keyword approvals. Rare tags (like "adrenaline") get an Inverse Document Frequency (IDF) boost if swiped right, ensuring niche interests are strongly respected.

### 4. Adaptive & Contextual Feed (Smart Selection)
* **Epsilon-Greedy Card Selector:** The next batch of cards is fetched dynamically from the server dynamically based on previous swipes.
* **75/25 Split (Semantic vs. Explore):** 75% of upcoming cards are mathematically aligned with the user's evolving preference vector. 25% are "wildcards" deliberately injected to explore unseen tags and ensure diversity.
* **Diversity Interleaver:** Prevents "tag fatigue" by ensuring consecutive cards have minimal tag overlap.
* **Contextual Calibration Duels:** If the system detects a dislike streak or contradictory tags (e.g., liking both "Extreme Budget" and "Ultra Luxury"), it interrupts the feed with a forced vertical-slider "Duel" to clarify the user's exact preference.

### 5. Destination Ranking Algorithm (The Matchmaker)
* **Cosine Similarity Ranking:** Ranks destinations by comparing the user's 3 dense vectors against the permanent destination vectors. Weighted mathematically: 50% Vibes, 30% Activities, 20% Stays.
* **Budget Alignment Bonus:** Adjusts theoretical scores by up to ±10% based on how closely the destination’s cost bracket matches the user's onboarding budget constraint.
* **Profile Tag Bonus:** Applies a multiplier if the destination matches explicitly stated tags from the user's profile settings.

### 6. Generative AI Itinerary Engine (Gemini 2.5 Flash)
* **Multi-Key Resilient Pipeline:** Uses Google Gemini 2.5 Flash with automatic fallback to Gemini 2.0 Flash Lite, rotating through API keys with exponential backoff to completely avoid rate limiting and ensure 100% uptime.
* **Fast Lightweight Feeds:** Generates 3 destination summaries with high-level budget breakdowns in under 15 seconds for the shortlist view.
* **Parallel Generation Architecture:** To maximize speed, the backend triggers two simultaneous AI prompts when building the final itinerary: one for "Logistics" (Flights/Hotels/Transfers) and one for "Day Plans".
* **Micro-Personalized Timelines:** AI-generated day plans are algorithmically re-sorted by the backend. Activities containing tags the user highlighted during the swipe-phase are pinned to earlier slots on Day 1 and Day 2.
* **Automatic Budget Pruning:** If the AI-generated trip exceeds the user's strict budget, an internal algorithm silently loops through and selectively prunes the most expensive non-essential activities until the trip turns "Green" (within budget).

### 7. Live API Integrations
* **HotelAPI Holiday Hotel API:** Directly integrated with HotelAPI's B2B REST APIs.
* **Live Pricing & Conversion:** Fetches live hotel availability and the absolute cheapest room rates for the user's dates in USD, dynamically converting them to INR.
* **Graceful Fallbacks:** If HotelAPI API fails, times out, or has no inventory for a lesser-known city, the system seamlessly inserts rich fallback seed data without breaking the UI.
* **Dynamic Cost Scaling:** Flight costs are scaled strictly by total travelers. Hotel rooms are automatically calculated via `ceil(travelers / 2)`. Group transfer costs are appropriately expanded.

### 8. Interactive Maps & Location Services
* **Immersive Street View Modules:** Users can open 360° Google Street View panoramas for both their predicted Hotel and individual Sightseeing landmarks.
* **Smart Geocoding Fallbacks:** Features an intelligent radius expansion algorithm (400m outdoor-only → 600m general) to find the best street view panorama; instantly catches errors on remote nature landmarks.
* **Tourist Attraction Explorer (Places API):** An integrated interactive `CityMap` modal that plots all major museums, parks, and attractions dynamically around the city center using custom Marker clusters with deep-links to Google Maps directions.

### 9. UI/UX, Navigation & Flow
* **Mobile-First App Shell:** Optimized entirely for 430px mobile viewports targeting Gen-Z and Millennial behavior, featuring an overarching lavendar (`#F5F3FF`) surface aesthetic with sharp yellow (`#FFD233`) CTAs and smooth Tailwind CSS v4 styling.
* **4-Tab Itinerary View:** Once generated, the itinerary is split horizontally across 'Days' (collapsible accordions), 'Flights', 'Hotel', and 'Budget'.
* **Dynamic Budget Bar:** A sticky visual header highlighting exact expenditure versus their onboarding limit. Turns warning-orange if technically breached, green if safe.
* **AI Fun-Facts Loader:** During the 5+ second AI generation waits, the load screen fetches and displays hyper-local fun facts specifically about the chosen destination to prevent drop-off.

### 10. E-commerce & Checkout Flow
* **Robust Payment Gateway Simulation:** Fully branded payment modal with Netbanking, UPI, Wallet, and Credit Card simulation handling complex transaction ID generation.
* **Dynamic Fee Calculation:** Automatically injects a live 2% Convenience Fee and an 18% GST overlay onto the final subtotal.
* **Post-Booking Rewards System:** A beautifully animated success screen that reveals destination-specific partner discounts (e.g., "15% off at Café Reykjavik").

### 11. Profile, Auth & User Management
* **Google OAuth NextAuth.js Integration:** 1-click returning user sign-in via Google.
* **State Persistence:** Returning users are greeted with "Pick up right where you left off" fetching their last session, saved shortlist, and generated itinerary from MongoDB.
* **TravelCash Ecosystem:** Real-time earn/burn cashback program. Users earn TravelCash tiers upon successful trip booking and can apply balance deductibles instantly on their next trip checkout.
* **Curated Profile Editor:** Dedicated drawer where users can permanently curate explicit preference tags and utilize an AI "Photo-to-Tags" upload feature.

---

TravelBuddy represents the apex of modern travel discovery—shifting the burden of exhaustive research entirely onto generative AI and robust recommendation algorithms, leaving the user with the pure joy of exploring the possibilities.
