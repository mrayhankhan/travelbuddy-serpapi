const axios = require('axios');

// ── All major Indian International Airports with coordinates ──
const INTERNATIONAL_HUBS = [
    { code: 'DEL', name: 'New Delhi', lat: 28.5562, lon: 77.1000 },
    { code: 'BOM', name: 'Mumbai', lat: 19.0896, lon: 72.8656 },
    { code: 'BLR', name: 'Bangalore', lat: 13.1989, lon: 77.7068 },
    { code: 'HYD', name: 'Hyderabad', lat: 17.2403, lon: 78.4294 },
    { code: 'MAA', name: 'Chennai', lat: 12.9941, lon: 80.1709 },
    { code: 'CCU', name: 'Kolkata', lat: 22.6520, lon: 88.4467 },
    { code: 'COK', name: 'Kochi', lat: 10.1518, lon: 76.3930 },
    { code: 'PNQ', name: 'Pune', lat: 18.5822, lon: 73.9197 },
    { code: 'AMD', name: 'Ahmedabad', lat: 23.0772, lon: 72.6347 },
    { code: 'GOI', name: 'Goa', lat: 15.3808, lon: 73.8314 },
    { code: 'JAI', name: 'Jaipur', lat: 26.8242, lon: 75.8122 },
    { code: 'LKO', name: 'Lucknow', lat: 26.7606, lon: 80.8893 },
    { code: 'GAU', name: 'Guwahati', lat: 26.1062, lon: 91.5859 },
    { code: 'TRV', name: 'Thiruvananthapuram', lat: 8.4821, lon: 76.9200 },
    { code: 'ATQ', name: 'Amritsar', lat: 31.7096, lon: 74.7973 },
    { code: 'VNS', name: 'Varanasi', lat: 25.4524, lon: 82.8593 },
    { code: 'SXR', name: 'Srinagar', lat: 33.9871, lon: 74.7742 },
    { code: 'IXC', name: 'Chandigarh', lat: 30.6735, lon: 76.7885 },
    { code: 'NAG', name: 'Nagpur', lat: 21.0922, lon: 79.0472 },
    { code: 'IXE', name: 'Mangalore', lat: 12.9614, lon: 74.8900 },
    { code: 'CJB', name: 'Coimbatore', lat: 11.0300, lon: 77.0434 },
    { code: 'IDR', name: 'Indore', lat: 22.7217, lon: 75.8013 },
    { code: 'BHO', name: 'Bhopal', lat: 23.2875, lon: 77.3374 },
    { code: 'PAT', name: 'Patna', lat: 25.5913, lon: 85.0880 },
    { code: 'BBI', name: 'Bhubaneswar', lat: 20.2444, lon: 85.8178 },
    { code: 'RPR', name: 'Raipur', lat: 21.1804, lon: 81.7388 },
    { code: 'IXR', name: 'Ranchi', lat: 23.3143, lon: 85.3213 },
    { code: 'DED', name: 'Dehradun', lat: 30.1897, lon: 78.1804 },
    { code: 'STV', name: 'Surat', lat: 21.1141, lon: 72.7419 },
    { code: 'BDQ', name: 'Vadodara', lat: 22.3362, lon: 73.2264 },
    { code: 'RAJ', name: 'Rajkot', lat: 22.3092, lon: 70.7795 },
    { code: 'IXM', name: 'Madurai', lat: 9.8345, lon: 78.0934 },
];

// ── City name -> IATA code lookup (for quick direct matching) ──
const CITY_TO_IATA = {};
INTERNATIONAL_HUBS.forEach(h => {
    CITY_TO_IATA[h.name.toLowerCase()] = h.code;
});
// Add common alternate spellings
CITY_TO_IATA['new delhi'] = 'DEL';
CITY_TO_IATA['bombay'] = 'BOM';
CITY_TO_IATA['calcutta'] = 'CCU';
CITY_TO_IATA['madras'] = 'MAA';
CITY_TO_IATA['bengaluru'] = 'BLR';
CITY_TO_IATA['cochin'] = 'COK';
CITY_TO_IATA['trivandrum'] = 'TRV';
CITY_TO_IATA['baroda'] = 'BDQ';
CITY_TO_IATA['ahemdabad'] = 'AMD'; // common typo

/**
 * Haversine formula — distance in km between 2 GPS points.
 */
function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Given a city name, returns:
 *   { originCode, hubCode, hubName, distanceKm, needsConnection }
 *
 * - If the city IS an airport city (like Hyderabad), originCode = 'HYD', needsConnection = false
 * - If the city is NOT an airport city (like Indore), we geocode it, find nearest hub,
 *   and return originCode = 'IDR', hubCode = 'BOM', needsConnection = true
 */
async function resolveOrigin(cityName) {
    if (!cityName) return { originCode: 'DEL', needsConnection: false };

    const lower = cityName.toLowerCase().trim();

    // 1) Direct match — the user typed a known airport city
    if (CITY_TO_IATA[lower]) {
        const code = CITY_TO_IATA[lower];
        const hub = INTERNATIONAL_HUBS.find(h => h.code === code);
        return {
            originCode: code,
            originName: hub ? hub.name : cityName,
            needsConnection: false,
        };
    }

    // 2) Not a known airport city → Geocode it and find the nearest airport
    try {
        console.log(`🌍 Geocoding "${cityName}" to find nearest airport...`);
        const res = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: { q: `${cityName}, India`, format: 'json', limit: 1 },
            headers: { 'User-Agent': 'TravelBuddyApp/1.0' },
            timeout: 5000,
        });

        if (!res.data || res.data.length === 0) {
            console.warn(`⚠️  Could not geocode "${cityName}". Defaulting to DEL.`);
            return { originCode: 'DEL', originName: 'New Delhi', needsConnection: false };
        }

        const userLat = parseFloat(res.data[0].lat);
        const userLon = parseFloat(res.data[0].lon);

        let nearest = INTERNATIONAL_HUBS[0];
        let minDist = Infinity;

        for (const hub of INTERNATIONAL_HUBS) {
            const d = haversineKm(userLat, userLon, hub.lat, hub.lon);
            if (d < minDist) {
                minDist = d;
                nearest = hub;
            }
        }

        console.log(`📍 "${cityName}" → nearest airport: ${nearest.name} (${nearest.code}) — ${Math.round(minDist)} km`);

        return {
            originCode: nearest.code,
            originName: nearest.name,
            originCity: cityName,         // the original city user typed
            distanceKm: Math.round(minDist),
            needsConnection: true,        // they need a domestic leg
        };

    } catch (err) {
        console.warn(`⚠️  Geocode error for "${cityName}":`, err.message);
        return { originCode: 'DEL', originName: 'New Delhi', needsConnection: false };
    }
}

module.exports = { resolveOrigin, CITY_TO_IATA, INTERNATIONAL_HUBS, haversineKm };
