"use strict";

/**
 * Live hotels and flights, through SerpApi.
 *
 * Google Hotels and Google Flights replace the booking API this server used to
 * call. The four exports keep the old module's names and return shapes, so the
 * routes and the frontend are unchanged.
 *
 * The free plan is 250 searches a month and one destination costs three (one
 * hotel search, the outbound flights, the return flights), so every search goes
 * through three layers, cheapest first:
 *
 *   1. a 48-hour cache, persisted to disk so a restart does not re-spend;
 *   2. a daily and a monthly credit cap;
 *   3. saved real responses (src/data/serp-snapshots.json), used when there is
 *      no key or a cap is hit. They are labelled as saved, never as live.
 *
 * Everything returned says where it came from: live, cached or saved.
 */

const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const ENDPOINT = "https://serpapi.com/search.json";
const CACHE_TTL_MS = 48 * 60 * 60 * 1000;
const DAILY_CAP = Number(process.env.SERPAPI_DAILY_CAP) || 40;
const MONTHLY_CAP = Number(process.env.SERPAPI_MONTHLY_CAP) || 230;
const CACHE_FILE = path.resolve(__dirname, "../../.cache/serpapi.json");

let SNAPSHOTS = {};
try {
  SNAPSHOTS = require("../data/serp-snapshots.json");
} catch {
  /* no saved responses yet */
}

const serpConfigured = () => Boolean(process.env.SERPAPI_API_KEY);

// ── cache and credit budget ─────────────────────────────────────────────────

let store = null;
function load() {
  if (store) return store;
  try {
    store = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  } catch {
    store = { cache: {}, used: {} };
  }
  store.cache = store.cache || {};
  store.used = store.used || {};
  return store;
}

function save() {
  try {
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(store));
  } catch {
    /* read-only filesystem: the memory copy still works for this run */
  }
}

/** IST calendar day and month, so the budget resets on the traveller's clock. */
function istStamp() {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString();
  return { day: ist.slice(0, 10), month: ist.slice(0, 7) };
}

function reserveCredit() {
  const s = load();
  const { day, month } = istStamp();
  const d = s.used[day] || 0;
  const m = s.used[month] || 0;
  if (d >= DAILY_CAP || m >= MONTHLY_CAP) return false;
  s.used[day] = d + 1;
  s.used[month] = m + 1;
  save();
  return true;
}

function serpUsage() {
  const s = load();
  const { day, month } = istStamp();
  return {
    configured: serpConfigured(),
    today: s.used[day] || 0,
    month: s.used[month] || 0,
    dailyCap: DAILY_CAP,
    monthlyCap: MONTHLY_CAP,
    cachedSearches: Object.keys(s.cache).length,
    savedHotels: Object.keys(SNAPSHOTS.hotels || {}).length,
    savedFlights: Object.keys(SNAPSHOTS.flights || {}).length,
    savedCapturedAt: SNAPSHOTS.capturedAt || null,
  };
}

// ── the network ─────────────────────────────────────────────────────────────

async function callSerpApi(params) {
  const res = await axios.get(ENDPOINT, {
    params: { ...params, api_key: process.env.SERPAPI_API_KEY },
    timeout: 25000,
    validateStatus: () => true,
  });
  if (res.status === 401) throw new Error("SerpApi rejected the key (401)");
  if (res.status === 429) throw new Error("SerpApi rate limit (429)");
  if (res.status !== 200) throw new Error("SerpApi HTTP " + res.status);
  if (res.data && typeof res.data.error === "string") {
    // "no results" is an empty answer, not a failure.
    if (/hasn't returned any results|no results/i.test(res.data.error)) return {};
    throw new Error(res.data.error);
  }
  return res.data;
}

/**
 * One search through cache -> credits -> network. 'reduce' trims the response
 * to the fields we use, so the cache stays small and a cached answer is
 * exactly what a live one would have returned.
 */
async function search(kind, keyParts, params, reduce) {
  const s = load();
  const key = kind + ":" + crypto.createHash("sha1").update(keyParts.join("|")).digest("hex").slice(0, 16);
  const hit = s.cache[key];
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    return { data: hit.data, provenance: "cached", fetchedAt: new Date(hit.at).toISOString() };
  }
  if (serpConfigured() && reserveCredit()) {
    try {
      const data = reduce(await callSerpApi(params));
      s.cache[key] = { at: Date.now(), data };
      save();
      return { data, provenance: "live", fetchedAt: new Date().toISOString() };
    } catch (err) {
      console.warn("[serpapi] " + kind + " search failed: " + err.message);
    }
  }
  return null;
}

// ── helpers ─────────────────────────────────────────────────────────────────

const titleCase = (s) => String(s).replace(/\b\w/g, (c) => c.toUpperCase());

function getNumNights(checkIn, checkOut) {
  return Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000));
}

function getDatesForDuration(durationStr) {
  const base = new Date();
  base.setDate(base.getDate() + 30);
  const checkIn = base.toISOString().split("T")[0];
  const nights = durationStr ? parseInt(durationStr.split("-")[0]) || 5 : 5;
  const out = new Date(base);
  out.setDate(out.getDate() + nights);
  return { checkIn, checkOut: out.toISOString().split("T")[0] };
}

/** "3:00 PM" -> "15:00". */
function to24h(t, fallback) {
  const m = /(\d{1,2}):(\d{2})\s*([AP]M)/i.exec(String(t || "").replace(/[  ]/g, " "));
  if (!m) return fallback;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return String(h).padStart(2, "0") + ":" + m[2];
}

// ── hotels ──────────────────────────────────────────────────────────────────

/**
 * SerpApi returns hotel photos at full resolution (often 2,000-4,000px and
 * over a megabyte each), from a dozen different image CDNs. Show a phone-sized
 * version where the host supports resizing; leave the rest alone, since most
 * of those are already small. Applied when a hotel is built, not when it is
 * cached, so saved responses keep the original URLs.
 */
function sized(url, width) {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (/googleusercontent\.com$/.test(u.host)) return url.replace(/=[swh]\d+.*$/, "") + "=w" + width;
    if (/tripadvisor\.com$/.test(u.host)) {
      u.searchParams.set("w", String(width));
      u.searchParams.set("h", String(Math.round((width * 2) / 3)));
      return u.toString();
    }
    if (/(trvl-media|vrbo)\.com$/.test(u.host)) {
      u.searchParams.set("impolicy", "resizecrop");
      u.searchParams.set("rw", String(width));
      u.searchParams.set("ra", "fit");
      return u.toString();
    }
  } catch {
    /* not a URL we can parse: use it as given */
  }
  return url;
}

const round1 = (n) => (typeof n === "number" ? Math.round(n * 10) / 10 : n);

function reduceHotels(json) {
  return (json.properties || [])
    .filter((p) => p.name)
    .slice(0, 14)
    .map((p) => ({
      name: p.name,
      type: p.type,
      starClass: p.extracted_hotel_class || null,
      rating: Number(p.overall_rating) || null,
      reviews: Number(p.reviews) || 0,
      locationRating: Number(p.location_rating) || null,
      perNight: p.rate_per_night && p.rate_per_night.extracted_lowest,
      total: p.total_rate && p.total_rate.extracted_lowest,
      checkInTime: p.check_in_time,
      checkOutTime: p.check_out_time,
      description: p.description,
      amenities: p.amenities || [],
      images: (p.images || []).slice(0, 6).map((i) => i.original_image || i.thumbnail).filter(Boolean),
      gps: p.gps_coordinates,
      link: p.link,
      token: p.property_token,
      nearby: (p.nearby_places || []).slice(0, 4).map((n) => ({
        name: n.name,
        duration: n.transportations && n.transportations[0] && n.transportations[0].duration,
      })),
    }));
}

// Amenity keyword -> the stay-type tags the swipe cards produce.
const FACILITY_TAG_MAP = {
  spa: ["spa", "luxury", "wellness"],
  pool: ["pool", "resort", "luxury"],
  gym: ["fitness", "active", "gym"],
  fitness: ["fitness", "active", "gym"],
  restaurant: ["restaurant", "dining", "foodie"],
  bar: ["bar", "nightlife"],
  "wi-fi": ["wifi", "work", "digital-nomad"],
  wifi: ["wifi", "work", "digital-nomad"],
  parking: ["parking", "road-trip"],
  pet: ["pet-friendly"],
  airport: ["airport", "transit"],
  beach: ["beach", "seaside"],
  kid: ["family", "kids"],
  family: ["family", "kids"],
  business: ["business", "work"],
  suite: ["luxury", "honeymoon"],
};

function rankHotels(hotels, targetBudget, userPreferences) {
  const liked = ((userPreferences && userPreferences.likedStays) || []).map((s) => s.toLowerCase());
  const stayScores = (userPreferences && userPreferences.stayScores) || {};

  const scored = hotels.map((hotel) => {
    // 1. Preference match (35%)
    let pref = 0.5;
    if (liked.length > 0 || Object.keys(stayScores).length > 0) {
      const have = hotel.facilities.map((f) => f.toLowerCase());
      let hits = 0;
      let weight = 0;
      for (const [kw, tags] of Object.entries(FACILITY_TAG_MAP)) {
        if (!have.some((f) => f.includes(kw))) continue;
        for (const tag of tags) {
          if (liked.some((l) => l.includes(tag) || tag.includes(l))) hits += 1;
          weight += (stayScores[tag] || 0) * 0.5;
        }
      }
      pref = Math.min(Math.min(hits / Math.max(liked.length, 1), 1) + Math.min(weight / 10, 0.5), 1);
    }

    // 2. Price match (25%)
    let price = 0.5;
    if (targetBudget && hotel.totalCost) {
      const ratio = hotel.totalCost / targetBudget;
      price = ratio <= 1 ? (ratio >= 0.5 ? 0.5 + (ratio - 0.5) : ratio) : Math.max(0, 1 - (ratio - 1) * 2);
    }

    // 3. Guest rating (20%)
    const rating = Math.min((hotel.rating || 3) / 5, 1);

    // 4. Location (10%) - Google's own location rating for the property
    const location = hotel.locationRating ? Math.min(hotel.locationRating / 5, 1) : 0.6;

    // 5. Popularity (10%) - real review volume, log-scaled, with amenity depth
    const popularity = Math.min(
      Math.min(Math.log10((hotel.reviews || 0) + 1) / 4, 1) * 0.6 + Math.min(hotel.facilities.length / 20, 1) * 0.4,
      1,
    );

    const rankScore = Math.round((pref * 0.35 + price * 0.25 + rating * 0.2 + location * 0.1 + popularity * 0.1) * 100);

    const why = [];
    if (pref >= 0.7) why.push("Matches your stay preferences");
    else if (pref >= 0.4 && liked.length) why.push("Partially matches your preferences");
    if (price >= 0.8) why.push("Within your hotel budget");
    else if (price >= 0.5) why.push("Close to your budget");
    else why.push("Slightly above budget");
    if (hotel.rating >= 4.4) why.push("Excellent " + hotel.rating + " guest rating");
    else if (hotel.rating >= 4.0) why.push("Good " + hotel.rating + " guest rating");
    if (hotel.locationRating >= 4.3) why.push("Great location");
    if (hotel.reviews >= 1000) why.push(hotel.reviews.toLocaleString("en-IN") + " reviews");

    return {
      ...hotel,
      rankScore,
      rankExplanation: why,
      _scores: {
        preference: Math.round(pref * 100),
        price: Math.round(price * 100),
        rating: Math.round(rating * 100),
        location: Math.round(location * 100),
        popularity: Math.round(popularity * 100),
      },
    };
  });

  scored.sort((a, b) => b.rankScore - a.rankScore);
  const BADGES = ["Best Match", "Best Value", "Highly Rated"];
  return scored.slice(0, 3).map((h, i) => ({ ...h, rankBadge: BADGES[i] }));
}

/** The hotel search itself, shared by searchHotels and the snapshot script. */
async function fetchHotelData(destinationName, checkIn, checkOut) {
  const key = String(destinationName).toLowerCase().trim();
  // Always priced for two adults in a room, then scaled by rooms, so one
  // search serves every party size.
  return search(
    "hotels",
    ["v2", key, checkIn, checkOut],
    {
      engine: "google_hotels",
      q: "Hotels in " + titleCase(destinationName),
      check_in_date: checkIn,
      check_out_date: checkOut,
      adults: "2",
      currency: "INR",
      gl: "in",
      hl: "en",
    },
    reduceHotels,
  );
}

async function searchHotels(destinationName, checkIn, checkOut, noOfRooms, noOfAdults, targetBudget = null, userPreferences = null) {
  try {
    const key = String(destinationName).toLowerCase().trim();
    const cityName = titleCase(destinationName);
    const nights = getNumNights(checkIn, checkOut);
    const rooms = Math.max(1, noOfRooms || 1);

    let result = await fetchHotelData(destinationName, checkIn, checkOut);
    if (!result || !result.data.length) {
      const saved = (SNAPSHOTS.hotels || {})[key];
      if (saved) result = { data: saved.data, provenance: "saved", fetchedAt: saved.fetchedAt };
    }
    if (!result || !result.data.length) {
      console.log("[serpapi] no hotel results for " + cityName + " - using seed data");
      return null;
    }

    const stayNights = nights;
    const hotels = result.data
      .map((p) => {
        const base = p.total || (p.perNight ? p.perNight * nights : 0);
        if (!base) return null;
        const images = (p.images || []).map((u) => sized(u, 800));
        return {
          name: p.name,
          rating: round1(p.rating || p.starClass || 4),
          starRating: p.starClass,
          reviews: p.reviews,
          locationRating: round1(p.locationRating),
          location: cityName,
          address: cityName,
          distanceToCenter: p.nearby && p.nearby[0] ? p.nearby[0].name + (p.nearby[0].duration ? " - " + p.nearby[0].duration : "") : "",
          totalCost: Math.round(base * rooms),
          perNight: p.perNight ? Math.round(p.perNight) : null,
          image: images[0] || "",
          images,
          nights: stayNights,
          hotelCode: p.token,
          checkInTime: to24h(p.checkInTime, "15:00"),
          checkOutTime: to24h(p.checkOutTime, "11:00"),
          currency: "INR",
          description: p.description || p.name + " in " + cityName + ".",
          facilities: p.amenities && p.amenities.length ? p.amenities : [],
          attractions: (p.nearby || []).map((n) => n.name),
          website: p.link || "",
          gps: p.gps,
          // Where this came from, shown on the card.
          source: "serpapi",
          provenance: result.provenance,
          fetchedAt: result.fetchedAt,
          isLive: result.provenance !== "saved",
        };
      })
      .filter(Boolean);
    if (!hotels.length) return null;

    const top = rankHotels(hotels, targetBudget, userPreferences);
    console.log("[serpapi] hotels (" + result.provenance + ") for " + cityName + ":");
    top.forEach((h, i) => console.log("   " + (i + 1) + ". [" + h.rankScore + "/100] " + h.rankBadge + " - " + h.name + " (Rs " + h.totalCost + ")"));
    return { ...top[0], hotels: top };
  } catch (err) {
    console.warn("[serpapi] hotel search error: " + err.message);
    return null;
  }
}

// ── flights ─────────────────────────────────────────────────────────────────

const AIRPORT_CODE_MAP = {
    // ── International Destinations ──
    'reykjavik': 'KEF',
    'tromso': 'TOS',
    'tromsø': 'TOS',
    'bergen': 'BGO',
    'tallinn': 'TLL',
    'helsinki': 'HEL',
    'prague': 'PRG',
    'istanbul': 'IST',
    'santorini': 'JTR',
    'amsterdam': 'AMS',
    'vienna': 'VIE',
    'budapest': 'BUD',
    'lisbon': 'LIS',
    'copenhagen': 'CPH',
    'dubrovnik': 'DBV',
    'athens': 'ATH',
    'edinburgh': 'EDI',
    // ── European destinations ──
    'barcelona': 'BCN',
    'rome': 'FCO',
    'paris': 'CDG',
    'london': 'LHR',
    'stockholm': 'ARN',
    'nice': 'NCE',
    'krakow': 'KRK',
    'berlin': 'BER',
    'riga': 'RIX',
    'split': 'SPU',
    'venice': 'VCE',
    'madrid': 'MAD',
    'warsaw': 'WAW',
    'oslo': 'OSL',
    'milan': 'MXP',
    'geneva': 'GVA',
    'brussels': 'BRU',
    'vilnius': 'VNO',
    'lyon': 'LYS',
    'bucharest': 'OTP',
    'valletta': 'MLA',
    'sofia': 'SOF',
    'ljubljana': 'LJU',
    'bordeaux': 'BOD',
    'malaga': 'AGP',
    'thessaloniki': 'SKG',
    'glasgow': 'GLA',
    // ── More European cities ──
    'dublin': 'DUB',
    'manchester': 'MAN',
    'antalya': 'AYT',
    'izmir': 'ADB',
    'corfu': 'CFU',
    'rhodes': 'RHO',
    'mykonos': 'JMK',
    'chania': 'CHQ',
    'palma': 'PMI',
    'tenerife': 'TFS',
    'faro': 'FAO',
    'marseille': 'MRS',
    'toulouse': 'TLS',
    'frankfurt': 'FRA',
    'dusseldorf': 'DUS',
    'cologne': 'CGN',
    'pisa': 'PSA',
    'verona': 'VRN',
    'palermo': 'PMO',
    'catania': 'CTA',
    'bari': 'BRI',
    'wroclaw': 'WRO',
    'zagreb': 'ZAG',
    'belgrade': 'BEG',
    'tirana': 'TIA',
    'larnaca': 'LCA',
    'paphos': 'PFO',
    'cork': 'ORK',
    'varna': 'VAR',
    'clujnapoca': 'CLJ',
    'sarajevo': 'SJJ',
    // ── Indian Cities ──
    'delhi': 'DEL', 'new delhi': 'DEL',
    'mumbai': 'BOM', 'bombay': 'BOM',
    'bangalore': 'BLR', 'bengaluru': 'BLR',
    'hyderabad': 'HYD',
    'chennai': 'MAA', 'madras': 'MAA',
    'kolkata': 'CCU', 'calcutta': 'CCU',
    'ahmedabad': 'AMD', 'ahemdabad': 'AMD',
    'pune': 'PNQ',
    'kochi': 'COK', 'cochin': 'COK',
    'goa': 'GOI',
    'jaipur': 'JAI',
    'lucknow': 'LKO',
    'guwahati': 'GAU',
    'thiruvananthapuram': 'TRV', 'trivandrum': 'TRV',
    'amritsar': 'ATQ',
    'varanasi': 'VNS',
    'srinagar': 'SXR',
    'chandigarh': 'IXC',
    'nagpur': 'NAG',
    'indore': 'IDR',
    'coimbatore': 'CJB',
    'mangalore': 'IXE',
    'bhopal': 'BHO',
    'patna': 'PAT',
    'bhubaneswar': 'BBI',
    'raipur': 'RPR',
    'ranchi': 'IXR',
    'dehradun': 'DED',
    'surat': 'STV',
    'vadodara': 'BDQ', 'baroda': 'BDQ',
    'rajkot': 'RAJ',
    'madurai': 'IXM',
};

const fmtDuration = (min) => (min ? Math.floor(min / 60) + "h " + (min % 60) + "m" : "N/A");
const timeOf = (s) => (s ? String(s).split(" ")[1] || "--:--" : "--:--");
const dateOf = (s) => (s ? String(s).split(" ")[0] : "");

function reduceLeg(l) {
  return {
    airline: l.airline,
    flightNo: l.flight_number,
    airplane: l.airplane,
    travelClass: l.travel_class,
    duration: l.duration,
    legroom: l.legroom,
    overnight: Boolean(l.overnight),
    from: { id: l.departure_airport && l.departure_airport.id, name: l.departure_airport && l.departure_airport.name, time: l.departure_airport && l.departure_airport.time },
    to: { id: l.arrival_airport && l.arrival_airport.id, name: l.arrival_airport && l.arrival_airport.name, time: l.arrival_airport && l.arrival_airport.time },
  };
}

function reduceFlights(json) {
  const all = [...(json.best_flights || []), ...(json.other_flights || [])]
    .filter((o) => typeof o.price === "number" && o.flights && o.flights.length)
    .map((o) => ({
      price: o.price,
      totalDuration: o.total_duration,
      token: o.departure_token,
      legs: o.flights.map(reduceLeg),
      layovers: (o.layovers || []).map((v) => ({ duration: v.duration, name: v.name, id: v.id })),
    }));
  // Keep the cheapest AND the fastest. Cheap fares on a long route are often
  // a night in an airport; if only the cheapest are kept, the sensible option
  // is discarded before anyone gets to choose it.
  const byPrice = [...all].sort((a, b) => a.price - b.price).slice(0, 5);
  const byTime = [...all].sort((a, b) => (a.totalDuration || 1e9) - (b.totalDuration || 1e9)).slice(0, 4);
  const options = [...new Set([...byPrice, ...byTime])];
  const pi = json.price_insights || {};
  return {
    options,
    insight: pi.lowest_price ? { lowest: pi.lowest_price, level: pi.price_level, typical: pi.typical_price_range } : null,
  };
}

/**
 * The fare to show: lowest price once time is counted too. Each hour in transit
 * is valued at Rs 2,000 per passenger, so a 37-hour routing that saves Rs 20,000
 * does not beat a 20-hour one.
 */
const RS_PER_HOUR = 2000;
function pickBest(options) {
  if (!options.length) return null;
  const cost = (o) => o.price + ((o.totalDuration || 0) / 60) * RS_PER_HOUR;
  return options.reduce((a, b) => (cost(b) < cost(a) ? b : a));
}

function formatFlight(option, kind, costPerLeg) {
  const legs = option.legs;
  const first = legs[0];
  const last = legs[legs.length - 1];
  const segments = legs.map((l, i) => {
    const lay = option.layovers[i];
    return {
      airline: l.airline || "Unknown",
      airlineCode: String(l.flightNo || "").split(" ")[0],
      flightNo: l.flightNo || "",
      from: l.from.id,
      fromAirport: l.from.name,
      fromAirportCode: l.from.id,
      to: l.to.id,
      toAirport: l.to.name,
      toAirportCode: l.to.id,
      depDate: dateOf(l.from.time),
      departure: timeOf(l.from.time),
      arrDate: dateOf(l.to.time),
      arrival: timeOf(l.to.time),
      duration: fmtDuration(l.duration),
      durationMin: l.duration || 0,
      aircraft: l.airplane || "N/A",
      cabinClass: l.travelClass || "Economy",
      layover: lay ? fmtDuration(lay.duration) : null,
      layoverMin: lay ? lay.duration : 0,
      layoverAt: lay ? lay.name : null,
    };
  });
  const totalMin = legs.reduce((s, l) => s + (l.duration || 0), 0) + option.layovers.reduce((s, v) => s + (v.duration || 0), 0);
  return {
    type: kind,
    airline: first.airline || "Unknown Airline",
    flightNo: first.flightNo || "",
    from: first.from.id,
    fromAirport: first.from.name,
    to: last.to.id,
    toAirport: last.to.name,
    departure: timeOf(first.from.time),
    arrival: timeOf(last.to.time),
    depDate: dateOf(first.from.time),
    arrDate: dateOf(last.to.time),
    duration: fmtDuration(totalMin),
    totalDurationMin: totalMin,
    cost: costPerLeg,
    currency: "INR",
    stops: legs.length - 1,
    cabinClass: first.travelClass || "Economy",
    aircraft: first.airplane || "N/A",
    segments,
  };
}

/** Outbound search, then the return leg for the chosen outbound. */
async function fetchFlightData(origin, destAirport, checkInDate, checkOutDate) {
  // SerpApi prices the whole party in one number. Searching for one adult
  // and multiplying keeps one cached search valid for every party size.
  const base = { engine: "google_flights", departure_id: origin, arrival_id: destAirport, outbound_date: checkInDate, return_date: checkOutDate, currency: "INR", gl: "in", hl: "en", adults: "1", type: "1" };
  const out = await search("flights", ["v2", origin, destAirport, checkInDate, checkOutDate], base, reduceFlights);
  if (!out || !out.data.options.length) return null;
  const best = pickBest(out.data.options);
  let ret = null;
  if (best.token) {
    ret = await search("flights-return", ["v2", origin, destAirport, checkInDate, checkOutDate, best.token], { ...base, departure_token: best.token }, reduceFlights);
  }
  return { out, ret };
}

async function getLiveFlights(originCode, destinationName, checkInDate, checkOutDate, adults = 1, childCount = 0, targetBudget = null) {
  try {
    const origin = originCode || "DEL";
    const destAirport = AIRPORT_CODE_MAP[String(destinationName).toLowerCase().trim()];
    if (!destAirport) {
      console.log("[serpapi] no airport code mapped for " + destinationName);
      return null;
    }

    let found = await fetchFlightData(origin, destAirport, checkInDate, checkOutDate);
    if (!found) {
      const saved = (SNAPSHOTS.flights || {})[origin + "-" + destAirport];
      if (!saved) {
        console.log("[serpapi] no flights " + origin + " -> " + destAirport + " - using seed data");
        return null;
      }
      found = {
        out: { data: saved.outbound, provenance: "saved", fetchedAt: saved.fetchedAt },
        ret: { data: saved.inbound, provenance: "saved", fetchedAt: saved.fetchedAt },
      };
    }
    const { out, ret } = found;
    const best = pickBest(out.data.options);

    const pax = Math.max(1, (adults || 1) + (childCount || 0));
    const total = best.price * pax;
    const perLeg = Math.round(total / 2);

    const flights = [formatFlight(best, "departure", perLeg)];
    const back = ret && pickBest(ret.data.options);
    if (back) flights.push(formatFlight(back, "return", total - perLeg));

    const meta = {
      source: "serpapi",
      provenance: out.provenance,
      fetchedAt: out.fetchedAt,
      isLive: out.provenance !== "saved",
      partySize: pax,
      roundTripTotal: total,
      priceInsight: out.data.insight || null,
    };
    flights.forEach((f) => Object.assign(f, meta));
    console.log("[serpapi] flights (" + out.provenance + ") " + origin + " -> " + destAirport + ": Rs " + total + " for " + pax);
    return flights;
  } catch (err) {
    console.warn("[serpapi] flight search error: " + err.message);
    return null;
  }
}

module.exports = {
  searchHotels,
  getLiveFlights,
  getDatesForDuration,
  AIRPORT_CODE_MAP,
  serpUsage,
  serpConfigured,
  fetchHotelData,
  fetchFlightData,
  // Pure helpers, exported for the unit tests.
  _internals: { pickBest, reduceFlights, rankHotels, sized, to24h },
};
