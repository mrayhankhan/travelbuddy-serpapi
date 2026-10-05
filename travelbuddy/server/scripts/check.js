"use strict";

/**
 * Is everything the app needs reachable? One command, no credits spent.
 *   npm run check
 */
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const axios = require("axios");
const mongoose = require("mongoose");
const { serpUsage } = require("../src/lib/serpApi");

const ok = (m) => console.log("  ✅ " + m);
const warn = (m) => console.log("  ⚠️  " + m);
const bad = (m) => console.log("  ❌ " + m);

(async () => {
  console.log("\nTravelBuddy server check\n");
  let failed = false;

  console.log("MongoDB");
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/travelbuddy", { serverSelectionTimeoutMS: 3000 });
    const n = await mongoose.connection.db.collection("destinations").countDocuments();
    ok("reachable, " + n + " destinations" + (n ? "" : "  (run: npm run seed)"));
    if (!n) failed = true;
  } catch (e) {
    bad("not reachable: " + e.message.split("\n")[0]);
    failed = true;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }

  console.log("\nSerpApi");
  const key = process.env.SERPAPI_API_KEY;
  if (!key) {
    warn("SERPAPI_API_KEY is not set - Demo Mode will serve saved responses");
  } else {
    try {
      const { data } = await axios.get("https://serpapi.com/account.json", { params: { api_key: key }, timeout: 10000 });
      ok(data.plan_name + ": " + data.plan_searches_left + " of " + data.searches_per_month + " searches left this month");
    } catch (e) {
      bad("key rejected or unreachable: " + (e.response ? "HTTP " + e.response.status : e.message));
      failed = true;
    }
  }
  const u = serpUsage();
  ok("saved responses: " + u.savedHotels + " hotel sets, " + u.savedFlights + " flight sets" + (u.savedCapturedAt ? " (captured " + u.savedCapturedAt.slice(0, 10) + ")" : ""));
  ok("this server has spent " + u.month + " credits this month (caps " + u.dailyCap + "/day, " + u.monthlyCap + "/month)");

  console.log("\nGemini (optional)");
  if (process.env.VERTEX_API_KEY && process.env.VERTEX_PROJECT_ID) ok("Vertex AI configured");
  else warn("not configured - seed itineraries are used; chat and photo analysis are off");

  console.log(failed ? "\nSomething above needs fixing.\n" : "\nReady.\n");
  process.exit(failed ? 1 : 0);
})();
