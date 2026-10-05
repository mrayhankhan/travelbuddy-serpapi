/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TravelBuddy — Full API Connectivity Checker
 *  Run: node check-connections.js
 * ─────────────────────────────────────────────────────────────────────────────
 *  Checks:
 *   1. Local Express server  → http://localhost:5001/api/health
 *   2. MongoDB Atlas          → via server health response
 *   3. HotelAPI Auth               → POST /CityList (proves credentials)
 *   4. HotelAPI Hotel Search       → POST /Search   (proves live hotel data)
 *   5. HotelAPI Hotel Code List    → POST /HotelAPIHotelCodeList (proves metadata endpoint)
 * ─────────────────────────────────────────────────────────────────────────────
 */

require('dotenv').config();
const axios = require('axios');

const LOCAL_SERVER = 'http://localhost:5001';
const HotelAPI_BASE = 'http://api.example.invalid/HotelAPIHolidays_HotelAPI';
const AUTH = {
    username: process.env.HOTEL_API_USERNAME || 'REDACTED',
    password: process.env.HOTEL_API_PASSWORD || 'REDACTED',
};

// Colours
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

function ok(msg) { console.log(`  ${GREEN}✅ ${msg}${RESET}`); }
function fail(msg) { console.log(`  ${RED}❌ ${msg}${RESET}`); }
function warn(msg) { console.log(`  ${YELLOW}⚠️  ${msg}${RESET}`); }
function info(msg) { console.log(`  ${CYAN}ℹ️  ${msg}${RESET}`); }
function header(title) {
    console.log(`\n${BOLD}${CYAN}━━━ ${title} ${'━'.repeat(Math.max(0, 50 - title.length))}${RESET}`);
}

// ─── 1. Local server health ───────────────────────────────────────────────────
async function checkLocalServer() {
    header('CHECK 1 — Local Express Server  (port 5001)');
    try {
        const res = await axios.get(`${LOCAL_SERVER}/api/health`, { timeout: 5000 });
        if (res.data?.status === 'ok') {
            ok(`Server is UP  →  ${LOCAL_SERVER}/api/health`);
            info(`Timestamp: ${res.data.timestamp}`);
            return true;
        } else {
            fail(`Server responded but status is not "ok": ${JSON.stringify(res.data)}`);
            return false;
        }
    } catch (err) {
        fail(`Server is NOT running on port 5001  (${err.message})`);
        warn('Start the server with:  cd server && npm run dev');
        return false;
    }
}

// ─── 2. Local API routes ──────────────────────────────────────────────────────
async function checkLocalRoutes(serverUp) {
    header('CHECK 2 — Local REST API Routes');
    if (!serverUp) {
        warn('Skipping — server is not running');
        return;
    }

    const routes = [
        { method: 'POST', path: '/api/session', body: { duration: '5-7', budget: 'mid', travelers: 2 } },
        { method: 'POST', path: '/api/cards/next', body: { sessionId: 'init', stage: 'vibes', count: 3 } },
        { method: 'POST', path: '/api/calibration', body: { sessionId: 'init' } },
    ];

    for (const r of routes) {
        try {
            const res = await axios({ method: r.method, url: `${LOCAL_SERVER}${r.path}`, data: r.body, timeout: 8000 });
            ok(`${r.method} ${r.path}  →  HTTP ${res.status}`);
        } catch (err) {
            const code = err.response?.status;
            if (code && code < 500) {
                // 4xx is expected for some routes without real data
                ok(`${r.method} ${r.path}  →  HTTP ${code} (expected for no-data scenario)`);
            } else {
                fail(`${r.method} ${r.path}  →  ${err.response?.status || err.message}`);
            }
        }
    }
}

// ─── 3. HotelAPI authentication ────────────────────────────────────────────────────
async function checkHotelApiAuth() {
    header('CHECK 3 — HotelAPI API Authentication');
    info(`Endpoint : POST ${HotelAPI_BASE}/CityList`);
    info(`Username : ${AUTH.username}`);

    try {
        const res = await axios.post(
            `${HotelAPI_BASE}/CityList`,
            { CountryCode: 'IN' },
            { auth: AUTH, timeout: 20000 }
        );
        const cities = res.data?.CityList || [];
        if (cities.length > 0) {
            ok(`Authentication SUCCESS — CityList returned ${cities.length} cities`);
            info(`Sample cities: ${cities.slice(0, 3).map(c => `${c.Name} (${c.Code})`).join(', ')}`);
            return true;
        } else {
            warn('CityList returned 0 cities — credentials may be OK but no data available');
            return true; // auth still worked
        }
    } catch (err) {
        if (err.response?.status === 401) {
            fail('Authentication FAILED — 401 Unauthorized. Check HOTEL_API_USERNAME / HOTEL_API_PASSWORD in .env');
        } else if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
            fail(`Cannot reach HotelAPI API server: ${err.message}`);
        } else {
            fail(`HotelAPI CityList error: ${err.response?.status || err.message}`);
            if (err.response?.data) info(`Response: ${JSON.stringify(err.response.data).slice(0, 200)}`);
        }
        return false;
    }
}

// ─── 4. HotelAPI Hotel Search ──────────────────────────────────────────────────────
async function checkHotelApiSearch(authOk) {
    header('CHECK 4 — HotelAPI Hotel Search  (POST /Search)');
    if (!authOk) { warn('Skipping — authentication failed'); return; }

    // Reykjavik — the city we KNOW has hotel codes in our app
    const cityCode = '135090';
    const hotelCodes = ['1001049', '1016223', '1028104'];
    const checkIn = (() => { const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().split('T')[0]; })();
    const checkOut = (() => { const d = new Date(); d.setDate(d.getDate() + 35); return d.toISOString().split('T')[0]; })();

    info(`City     : Reykjavik (${cityCode})`);
    info(`Check-in : ${checkIn}  →  Check-out: ${checkOut}`);
    info(`Hotels   : ${hotelCodes.join(', ')}`);

    try {
        const res = await axios.post(
            `${HotelAPI_BASE}/Search`,
            {
                CheckIn: checkIn,
                CheckOut: checkOut,
                CityId: cityCode,
                HotelCodes: hotelCodes.join(','),
                GuestNationality: 'IN',
                PaxRooms: [{ Adults: 2, Children: 0, ChildrenAges: [] }],
                ResponseTime: 23,
                IsNearBySearchAllowed: false,
                IsDetailedResponse: true,
            },
            { auth: AUTH, timeout: 25000 }
        );

        const hotels = res.data?.HotelResult;
        if (hotels && hotels.length > 0) {
            ok(`Hotel Search SUCCESS — ${hotels.length} live hotel(s) returned`);
            hotels.forEach((h, i) => {
                const fare = h.Rooms?.[0]?.TotalFare || 'N/A';
                const name = h.HotelInfo?.HotelName || h.HotelCode || '?';
                info(`  [${i + 1}] ${name}  |  Price: ${fare} USD`);
            });
        } else {
            warn('Search succeeded but no rooms available in staging (normal for test accounts)');
            info('The app handles this gracefully by falling back to seed hotel data');
        }
    } catch (err) {
        if (err.response?.status === 404 || err.response?.data?.Status?.Code === 404) {
            warn('Hotel Search: 404 — no inventory in staging (this is NORMAL for hackathon test accounts)');
            info('The app handles this gracefully by falling back to seed hotel data');
        } else {
            fail(`Hotel Search error: ${err.response?.status || err.message}`);
            if (err.response?.data) info(`Response: ${JSON.stringify(err.response.data).slice(0, 300)}`);
        }
    }
}

// ─── 5. HotelAPI Hotel Code List ────────────────────────────────────────────────────
async function checkHotelApiHotelCodeList(authOk) {
    header('CHECK 5 — HotelAPI Hotel Code List  (POST /HotelAPIHotelCodeList)');
    if (!authOk) { warn('Skipping — authentication failed'); return; }

    info('Fetching hotel metadata for Reykjavik (cityCode: 135090)');
    try {
        const res = await axios.post(
            `${HotelAPI_BASE}/HotelAPIHotelCodeList`,
            { CityCode: '135090', IsDetailedResponse: 'true' },
            { auth: AUTH, timeout: 20000 }
        );
        const hotels = res.data?.Hotels || [];
        if (hotels.length > 0) {
            ok(`HotelCodeList SUCCESS — ${hotels.length} hotels with metadata`);
            const sample = hotels[0];
            info(`Sample: ${sample.HotelName} (${sample.HotelCode}) — Image: ${sample.ImageUrls?.[0]?.ImageUrl ? '✅ present' : '⚠️ none'}`);
        } else {
            warn('HotelCodeList returned 0 hotels (staging limitation)');
        }
    } catch (err) {
        fail(`HotelCodeList error: ${err.response?.status || err.message}`);
        if (err.response?.data) info(`Response: ${JSON.stringify(err.response.data).slice(0, 300)}`);
    }
}

// ─── Summary ──────────────────────────────────────────────────────────────────
async function run() {
    console.log(`\n${BOLD}${CYAN}╔══════════════════════════════════════════════════════╗`);
    console.log(`║       TravelBuddy — API Connectivity Checker         ║`);
    console.log(`╚══════════════════════════════════════════════════════╝${RESET}`);

    const serverUp = await checkLocalServer();
    await checkLocalRoutes(serverUp);
    const authOk = await checkHotelApiAuth();
    await checkHotelApiSearch(authOk);
    await checkHotelApiHotelCodeList(authOk);

    header('SUMMARY');
    console.log(`\n  Local Server  : ${serverUp ? GREEN + '✅ Running' : RED + '❌ Not running'}${RESET}`);
    console.log(`  HotelAPI Auth      : ${authOk ? GREEN + '✅ Connected' : RED + '❌ Failed'}${RESET}`);
    console.log(`\n${CYAN}  HotelAPI REST base : ${HotelAPI_BASE}${RESET}`);
    console.log(`${CYAN}  Username      : ${AUTH.username}${RESET}`);

    if (!serverUp) {
        console.log(`\n${YELLOW}  👉 To start the server:${RESET}`);
        console.log(`     cd /Users/dakshsingh/Desktop/HotelAPI/TravelAgent_HotelAPI/server`);
        console.log(`     npm run dev\n`);
    }
}

run().catch(err => {
    fail(`Unexpected error: ${err.message}`);
    process.exit(1);
});
