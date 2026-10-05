"use strict";

/**
 * Save real SerpApi responses for Demo Mode.
 *
 * Demo Mode serves these when there is no SERPAPI_API_KEY or the credit cap is
 * reached, and the UI labels them "SAVED EXAMPLE". They are only ever written
 * by this script, from real searches - never by hand.
 *
 *   npm run capture                      # the default destinations, from New Delhi
 *   npm run capture -- vienna rome       # just these
 *
 * A destination costs three credits (hotels, outbound flights, return flights).
 * Anything already in the cache is free.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const fs = require("fs");
const path = require("path");
const { fetchHotelData, fetchFlightData, getDatesForDuration, AIRPORT_CODE_MAP, serpConfigured } = require("../src/lib/serpApi");

const ORIGIN = "DEL";
const DEFAULTS = ["reykjavik", "copenhagen", "vienna", "rome", "brussels", "athens", "prague", "lisbon"];
const FILE = path.resolve(__dirname, "../src/data/serp-snapshots.json");

async function main() {
  if (!serpConfigured()) {
    console.error("Set SERPAPI_API_KEY in server/.env first.");
    process.exit(1);
  }
  const wanted = process.argv.slice(2).map((s) => s.toLowerCase());
  const targets = wanted.length ? wanted : DEFAULTS;

  let snapshot = { hotels: {}, flights: {} };
  try {
    snapshot = JSON.parse(fs.readFileSync(FILE, "utf8"));
    snapshot.hotels = snapshot.hotels || {};
    snapshot.flights = snapshot.flights || {};
  } catch {
    /* first run */
  }

  const { checkIn, checkOut } = getDatesForDuration("5-7");
  console.log("Dates: " + checkIn + " -> " + checkOut + "   origin: " + ORIGIN + "\n");

  for (const dest of targets) {
    const code = AIRPORT_CODE_MAP[dest];
    const hotels = await fetchHotelData(dest, checkIn, checkOut);
    if (hotels && hotels.data.length) {
      snapshot.hotels[dest] = { fetchedAt: hotels.fetchedAt, checkIn, checkOut, data: hotels.data };
    }
    const flights = code ? await fetchFlightData(ORIGIN, code, checkIn, checkOut) : null;
    if (flights && flights.ret) {
      snapshot.flights[ORIGIN + "-" + code] = {
        fetchedAt: flights.out.fetchedAt,
        checkIn,
        checkOut,
        outbound: flights.out.data,
        inbound: flights.ret.data,
      };
    }
    console.log(
      dest.padEnd(12) +
        " hotels " + (hotels ? hotels.data.length + " (" + hotels.provenance + ")" : "none").padEnd(14) +
        " flights " + (flights ? flights.out.data.options.length + " out / " + (flights.ret ? flights.ret.data.options.length : 0) + " back (" + flights.out.provenance + ")" : "none"),
    );
  }

  snapshot.capturedAt = new Date().toISOString();
  snapshot.note = "Real SerpApi responses saved by scripts/capture-snapshots.js. Served only in Demo Mode and labelled as saved.";
  fs.writeFileSync(FILE, JSON.stringify(snapshot));
  console.log("\nWrote " + Object.keys(snapshot.hotels).length + " hotel sets and " + Object.keys(snapshot.flights).length + " flight sets to " + path.relative(process.cwd(), FILE));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
