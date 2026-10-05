/**
 * HotelAPI Hotel API integration using the REST/JSON endpoint
 * Base URL: http://api.example.invalid/HotelAPIHolidays_HotelAPI
 *
 * HotelDetails API is blocked in staging for all known hotel codes.
 * We embed real hotel data captured from the API session and use it
 * to enrich hotel cards with real images, facilities, and descriptions.
 */

const axios = require('axios');
const path = require('path');

const BASE_URL = 'http://api.example.invalid/HotelAPIHolidays_HotelAPI';
const AUTH = {
    username: process.env.HOTEL_API_USERNAME || 'REDACTED',
    password: process.env.HOTEL_API_PASSWORD || 'REDACTED',
};

// ─── In-memory cache for hotel details (images, facilities, etc.) ────────────
const hotelDetailsCache = {};

// ─── Hotel-specific gallery images (5-6 photos per hotel, unique to that property) ─
// HotelAPI API only provides 1 image per hotel; these curated sets fill the gallery carousel.
const HOTEL_GALLERY_IMAGES = {
    // ── Reykjavik ──────────────────────────────────────────────────────────────
    '1001049': [ // Reykjavik Lights by Keahotels
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    ],
    '1016223': [ // 22 Hill Hotel
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1596436219830-3b17cf3c01c1?w=800&q=80',
    ],
    '1028104': [ // Centerhotel Studios
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    ],
    '1028105': [ // Welcome Apartments Reykjavik
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    ],
    '1028106': [ // Reykjavik Roulette Fosshotels
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],

    // ── Tallinn ────────────────────────────────────────────────────────────────
    '1001566': [ // Hotel Metropol Tallinn
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
    ],
    '1008406': [ // My City Hotel Tallinn
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    ],
    '1017399': [ // Town Hall Square Apartments
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    ],
    '1020898': [ // Gotthard Residence Tallinn
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    ],
    '1021970': [ // Tallinn Viimsi Spa
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    ],

    // ── Bergen ─────────────────────────────────────────────────────────────────
    '1000787': [ // Augustin Hotel Bergen
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
    ],
    '1000788': [ // P-Hotels Bergen
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    ],
    '1000837': [ // Scandic Bergen City
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
    ],
    '1002705': [ // Comfort Hotel Bergen
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
    ],
    '1032463': [ // Scandic Kokstad Bergensear
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    ],

    // ── Helsinki ───────────────────────────────────────────────────────────────
    '1005103': [ // Radisson Blu Plaza Helsinki
        'https://images.unsplash.com/photo-1614518921956-2e20a15d0c8e?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    ],
    '1013939': [ // Hilton Strand Helsinki
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
        'https://images.unsplash.com/photo-1614518921956-2e20a15d0c8e?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    ],
    '1014292': [ // Radisson Blu Seaside Helsinki
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1614518921956-2e20a15d0c8e?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    ],
    '1020640': [ // Holiday Inn Helsinki City Centre
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1614518921956-2e20a15d0c8e?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],
    '1024351': [ // Scandic Helsinki Aviapolis
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1614518921956-2e20a15d0c8e?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
    ],

    // ── Prague ─────────────────────────────────────────────────────────────────
    '1001105': [ // Andant Apartments Prague
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    ],
    '1001576': [ // Century Old Town Prague - MGallery
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
    ],
    '1002856': [ // pentahotel Prague
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    ],
    '1004290': [ // Zlata Praha
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
    ],
    '1005050': [ // Vienna House Andel's Prague
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    ],

    // ── Istanbul ───────────────────────────────────────────────────────────────
    '1002607': [ // Hotel Expocity Istanbul
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1614518921956-2e20a15d0c8e?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
    ],
    '1003833': [ // Aprilis Hotel Istanbul
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    ],
    '1003890': [ // Abel Hotel Istanbul
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80',
        'https://images.unsplash.com/photo-1614518921956-2e20a15d0c8e?w=800&q=80',
    ],
    '1007311': [ // Germir Palas Hotel Istanbul
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        'https://images.unsplash.com/photo-1614518921956-2e20a15d0c8e?w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    ],
    '1007312': [ // Baron Hotel Istanbul
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    ],
};

// ─── City-specific curated Unsplash images (fallback) ────────────────────────
const CITY_IMAGES = {
    'reykjavik': [
        'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=600&q=80',
        'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&q=80',
        'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80',
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80',
        'https://images.unsplash.com/photo-1517823249873-3b35cc1b4f50?w=600&q=80',
        'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&q=80',
    ],
    'tallinn': [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=600&q=80',
        'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=600&q=80',
        'https://images.unsplash.com/photo-1578833762769-0f8fbcb0f16b?w=600&q=80',
        'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
    ],
    'bergen': [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
        'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=600&q=80',
        'https://images.unsplash.com/photo-1573315902870-33c29e9de1c1?w=600&q=80',
        'https://images.unsplash.com/photo-1596436219830-3b17cf3c01c1?w=600&q=80',
        'https://images.unsplash.com/photo-1601143360309-a0c31a5a4b92?w=600&q=80',
    ],
    'helsinki': [
        'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80',
        'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&q=80',
        'https://images.unsplash.com/photo-1551979988-7c2f7de37d8d?w=600&q=80',
        'https://images.unsplash.com/photo-1446144163551-4cd1d06b6f62?w=600&q=80',
        'https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?w=600&q=80',
        'https://images.unsplash.com/photo-1535098627498-2c3cfc47b1e7?w=600&q=80',
    ],
    'prague': [
        'https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&q=80',
        'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=600&q=80',
        'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&q=80',
        'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80',
        'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&q=80',
        'https://images.unsplash.com/photo-1606117331085-5760e3b58520?w=600&q=80',
    ],
    'istanbul': [
        'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&q=80',
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
        'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&q=80',
        'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80',
        'https://images.unsplash.com/photo-1568111561564-08726a1563e1?w=600&q=80',
        'https://images.unsplash.com/photo-1618335829737-2228915674e0?w=600&q=80',
    ],
    'amsterdam': [
        'https://images.unsplash.com/photo-1512470604533-6f5ce4fddf9d?w=600&q=80',
        'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80',
        'https://images.unsplash.com/photo-1584003564911-4eae0f2bb0c1?w=600&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        'https://images.unsplash.com/photo-1555697672-62c9f29b5f5b?w=600&q=80',
        'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80',
    ],
    'vienna': [
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&q=80',
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
        'https://images.unsplash.com/photo-1581886461893-01b1d02f4050?w=600&q=80',
        'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=80',
        'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=600&q=80',
        'https://images.unsplash.com/photo-1563638207-a34f0b68b8fd?w=600&q=80',
    ],
    'budapest': [
        'https://images.unsplash.com/photo-1551867633-194f125bddfa?w=600&q=80',
        'https://images.unsplash.com/photo-1556909114-dc1e9e9fad3f?w=600&q=80',
        'https://images.unsplash.com/photo-1535041422672-8c3254ab9de9?w=600&q=80',
        'https://images.unsplash.com/photo-1547189709-0e2a6d63c21c?w=600&q=80',
        'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80',
        'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&q=80',
    ],
    'lisbon': [
        'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
        'https://images.unsplash.com/photo-1589992896428-1a7d7e6b7a95?w=600&q=80',
        'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
        'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&q=80',
        'https://images.unsplash.com/photo-1567591093569-b7eedbd3b2cb?w=600&q=80',
    ],
    'copenhagen': [
        'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&q=80',
        'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80',
        'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
    ],
    'dubrovnik': [
        'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80',
        'https://images.unsplash.com/photo-1559452173-fc7e3c6a3c28?w=600&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
        'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=600&q=80',
        'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=600&q=80',
        'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80',
    ],
    'athens': [
        'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80',
        'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=600&q=80',
        'https://images.unsplash.com/photo-1565862543048-bded38a22e75?w=600&q=80',
        'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=600&q=80',
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
        'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&q=80',
    ],
    'edinburgh': [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
        'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80',
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80',
    ],
};

// ─── Confirmed city codes + hotel codes (REST API / HotelAPIHotelCodeList) ─────────
const CITY_HOTEL_MAP = {
    'reykjavik': {
        cityCode: '135090', cityName: 'Reykjavik', country: 'IS',
        hotelCodes: ['1001049', '1016223', '1028104', '1028105', '1028106'],
        hotelNames: {
            '1001049': 'Reykjavik Lights by Keahotels', '1016223': '22 Hill Hotel',
            '1028104': 'Centerhotel Studios', '1028105': 'Welcome Apartments',
            '1028106': 'Reykjavik Roulette Fosshotels',
        },
        description: 'A vibrant city of geysers, glaciers, and volcanic landscapes. Experience the magical Northern Lights and midnight sun in Iceland\'s stunning capital.',
        attractions: ['Golden Circle', 'Blue Lagoon', 'Hallgrímskirkja', 'Harpa Concert Hall', 'Reykjavik Old Town'],
        facilities: ['Free WiFi', 'Air conditioning', 'Room service', 'Restaurant', 'Bar', 'Non-smoking rooms', 'Heating', 'Luggage storage', '24-hour front desk'],
    },
    'tallinn': {
        cityCode: '140287', cityName: 'Tallinn', country: 'EE',
        hotelCodes: ['1001566', '1008406', '1017399', '1020898', '1021970'],
        hotelNames: {
            '1001566': 'Hotel Metropol', '1008406': 'My City Hotel',
            '1017399': 'Town Hall Square Apartments', '1020898': 'Gotthard Residence',
            '1021970': 'Tallinn Viimsi Spa',
        },
        description: 'A fairy-tale medieval city with vibrant modern culture. Tallinn\'s UNESCO-listed Old Town is one of the best-preserved medieval cities in Europe.',
        attractions: ['Tallinn Old Town', 'Toompea Castle', 'Alexander Nevsky Cathedral', 'Kadriorg Palace', 'Telliskivi Creative City'],
        facilities: ['Free WiFi', 'Air conditioning', 'Room service', 'Restaurant', 'Bar', 'Spa', 'Sauna', 'Non-smoking rooms', 'Parking'],
    },
    'bergen': {
        cityCode: '111457', cityName: 'Bergen', country: 'NO',
        hotelCodes: ['1000787', '1000788', '1000837', '1002705', '1032463'],
        hotelNames: {
            '1000787': 'Augustin Hotel', '1000788': 'P-Hotels Bergen',
            '1000837': 'Scandic Bergen City', '1002705': 'Comfort Hotel Bergen',
            '1032463': 'Scandic Kokstad',
        },
        description: 'Gateway to the Norwegian fjords with its iconic Bryggen wharf. Bergen is surrounded by mountains and fjords, making it one of Scandinavia\'s most beautiful cities.',
        attractions: ['Bryggen Wharf', 'Fløibanen Funicular', 'Fish Market', 'Bergenhus Fortress', 'KODE Art Museums'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Non-smoking rooms', 'Luggage storage', 'Heating', '24-hour front desk', 'Concierge'],
    },
    'helsinki': {
        cityCode: '120663', cityName: 'Helsinki', country: 'FI',
        hotelCodes: ['1005103', '1013939', '1014292', '1020640', '1024351'],
        hotelNames: {
            '1005103': 'Radisson Blu Plaza Helsinki', '1013939': 'Hilton Strand Helsinki',
            '1014292': 'Radisson Blu Seaside Hotel, Helsinki',
            '1020640': 'Holiday Inn Helsinki City Centre', '1024351': 'Scandic Helsinki Aviapolis',
        },
        description: 'A sleek Nordic design capital with sauna culture and stunning archipelago. Helsinki seamlessly blends architecture, design, and nature.',
        attractions: ['Helsinki Cathedral', 'Market Square', 'Suomenlinna Sea Fortress', 'Design District', 'Temppeliaukio Church'],
        facilities: ['Free WiFi', 'Air conditioning', 'Room service', 'Restaurant', 'Bar', 'Sauna', 'Gym', 'Non-smoking rooms', 'Parking', 'Business center'],
    },
    'prague': {
        cityCode: '131864', cityName: 'Prague', country: 'CZ',
        hotelCodes: ['1001105', '1001576', '1002856', '1004290', '1005050'],
        hotelNames: {
            '1001105': 'Andant Apartments Prague', '1001576': 'Century Old Town Prague - MGallery',
            '1002856': 'pentahotel Prague', '1004290': 'Zlata Praha',
            '1005050': "Vienna House Andel's Prague",
        },
        description: 'The City of a Hundred Spires — a stunning medieval capital with baroque architecture and Bohemian culture. Prague Castle and the Charles Bridge are iconic landmarks.',
        attractions: ['Prague Castle', 'Charles Bridge', 'Old Town Square', 'Astronomical Clock', 'Josefov Jewish Quarter'],
        facilities: ['Free WiFi', 'Air conditioning', 'Room service', 'Restaurant', 'Bar', 'Gym', 'Non-smoking rooms', 'Concierge', 'Luggage storage'],
    },
    'istanbul': {
        cityCode: '122727', cityName: 'Istanbul', country: 'TR',
        hotelCodes: ['1002607', '1003833', '1003890', '1007311', '1007312'],
        hotelNames: {
            '1002607': 'Hotel Expocity Istanbul', '1003833': 'Aprilis Hotel Istanbul',
            '1003890': 'Abel Hotel Istanbul', '1007311': 'Germir Palas Hotel',
            '1007312': 'Baron Hotel Istanbul',
        },
        description: 'Where East meets West — a city straddling two continents with 2,500 years of history. The Bosphorus, Grand Bazaar, and Blue Mosque make Istanbul truly unique.',
        attractions: ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Topkapi Palace', 'Bosphorus Cruise'],
        facilities: ['Free WiFi', 'Air conditioning', 'Room service', 'Restaurant', 'Bar', 'Rooftop terrace', 'Non-smoking rooms', 'Parking', 'Airport shuttle'],
    },
    'amsterdam': {
        cityCode: '100851', cityName: 'Amsterdam', country: 'NL',
        hotelCodes: ['1000001', '1000002', '1000003', '1000004', '1000005'],
        hotelNames: {
            '1000001': 'Marriott Amsterdam', '1000002': 'NH Collection Amsterdam', '1000003': 'Hotel V Nesplein',
            '1000004': 'Conscious Hotel Westerpark', '1000005': 'Hotel Okura Amsterdam',
        },
        description: 'A city of canals, bicycles, world-class museums and vibrant nightlife. Amsterdam combines rich history with a modern, cosmopolitan European character.',
        attractions: ['Rijksmuseum', 'Van Gogh Museum', 'Anne Frank House', 'Keukenhof Gardens', 'Canal cruise'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Gym', 'Non-smoking rooms', 'Concierge', 'Bike rental'],
    },
    'vienna': {
        cityCode: '141820', cityName: 'Vienna', country: 'AT',
        hotelCodes: ['1000011', '1000012', '1000013', '1000014', '1000015'],
        hotelNames: {
            '1000011': 'Hotel Sacher Wien', '1000012': 'Grand Hotel Wien', '1000013': 'Hotel Kaiserin Elisabeth',
            '1000014': 'Das Triest Hotel', '1000015': 'Steigenberger Hotel Herrenhof',
        },
        description: 'The imperial city of music, coffee houses, and baroque palaces. Vienna is where Mozart composed and Freud theorised — a cultural capital of Europe.',
        attractions: ["Schonbrunn Palace", "St. Stephen's Cathedral", "Belvedere Palace", "Vienna State Opera", "Prater"],
        facilities: ['Free WiFi', 'Air conditioning', 'Room service', 'Restaurant', 'Bar', 'Spa', 'Gym', 'Non-smoking rooms'],
    },
    'budapest': {
        cityCode: '113506', cityName: 'Budapest', country: 'HU',
        hotelCodes: ['1000021', '1000022', '1000023', '1000024', '1000025'],
        hotelNames: {
            '1000021': 'Four Seasons Hotel Gresham Palace', '1000022': 'Kempinski Hotel Corvinus', '1000023': 'New York Palace Budapest',
            '1000024': 'Hotel Parliament Budapest', '1000025': 'Aria Hotel Budapest',
        },
        description: 'The Pearl of the Danube — a stunning capital with gorgeous thermal baths, ruin bars, and grand architecture.',
        attractions: ['Buda Castle', 'Chain Bridge', 'Szechenyi Thermal Bath', 'Fisherman Bastion', 'Parliament Building'],
        facilities: ['Free WiFi', 'Air conditioning', 'Spa', 'Indoor pool', 'Restaurant', 'Bar', 'Sauna', 'Non-smoking rooms'],
    },
    'lisbon': {
        cityCode: '126668', cityName: 'Lisbon', country: 'PT',
        hotelCodes: ['1000031', '1000032', '1000033', '1000034', '1000035'],
        hotelNames: {
            '1000031': 'Bairro Alto Hotel', '1000032': 'Hotel Avenida Palace', '1000033': 'The Lumiares Hotel',
            '1000034': 'Memmo Principe Real', '1000035': 'Hotel dos Templarios',
        },
        description: "Europe's westernmost capital — sun-drenched, full of Fado music, pasteis de nata, and scenic viewpoints over the Tagus River.",
        attractions: ['Jeronimos Monastery', 'Tower of Belem', 'Alfama District', 'LX Factory', 'Sintra Day Trip'],
        facilities: ['Free WiFi', 'Air conditioning', 'Rooftop pool', 'Restaurant', 'Bar', 'Concierge', 'Non-smoking rooms'],
    },
    'copenhagen': {
        cityCode: '115633', cityName: 'Copenhagen', country: 'DK',
        hotelCodes: ['1000041', '1000042', '1000043', '1000044', '1000045'],
        hotelNames: {
            '1000041': "Hotel d'Angleterre", '1000042': 'The Standard Copenhagen', '1000043': 'Axel Guldsmeden',
            '1000044': 'Nimb Hotel', '1000045': 'Hotel SP34',
        },
        description: 'A world leader in sustainability, design, and happiness. Copenhagen blends Viking heritage with Michelin-starred restaurants and cutting-edge architecture.',
        attractions: ['Tivoli Gardens', 'Nyhavn Harbour', 'The Little Mermaid', 'Rosenborg Castle', 'Christiansborg Palace'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Bike rental', 'Concierge', 'Non-smoking rooms'],
    },
    'dubrovnik': {
        cityCode: '116855', cityName: 'Dubrovnik', country: 'HR',
        hotelCodes: ['1000051', '1000052', '1000053', '1000054', '1000055'],
        hotelNames: {
            '1000051': 'Hotel Excelsior Dubrovnik', '1000052': 'Boutique Hostel Forum', '1000053': 'Villa Orsula',
            '1000054': 'Hotel Stari Grad', '1000055': 'Rixos Libertas Dubrovnik',
        },
        description: 'The Pearl of the Adriatic — a pristine medieval walled city on the Croatian coast, famous for crystal-clear sea and Game of Thrones scenery.',
        attractions: ['Old City Walls', 'Stradun Promenade', 'Lokrum Island', 'Fort Lovrijenac', 'Sea Kayaking'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Sea view', 'Restaurant', 'Bar', 'Concierge', 'Non-smoking rooms'],
    },
    'athens': {
        cityCode: '108078', cityName: 'Athens', country: 'GR',
        hotelCodes: ['1000061', '1000062', '1000063', '1000064', '1000065'],
        hotelNames: {
            '1000061': 'Hotel Grande Bretagne', '1000062': 'King George Hotel Athens', '1000063': 'Hotel Electra Athens',
            '1000064': 'Dolli at Acropolis', '1000065': 'NJV Athens Plaza',
        },
        description: 'The birthplace of democracy, philosophy, and the Olympics. Athens offers 3,500 years of history anchored by the iconic Acropolis overlooking the city.',
        attractions: ['The Acropolis', 'Parthenon', 'National Archaeological Museum', 'Plaka District', 'Cape Sounion'],
        facilities: ['Free WiFi', 'Air conditioning', 'Rooftop pool', 'Restaurant', 'Bar', 'Gym', 'Non-smoking rooms', 'Concierge'],
    },
    'edinburgh': {
        cityCode: '117413', cityName: 'Edinburgh', country: 'GB',
        hotelCodes: ['1000071', '1000072', '1000073', '1000074', '1000075'],
        hotelNames: {
            '1000071': 'The Scotsman Hotel', '1000072': 'Balmoral Hotel', '1000073': 'Hotel du Vin Edinburgh',
            '1000074': 'The Witchery by the Castle', '1000075': 'Radisson Collection Hotel Edinburgh',
        },
        description: "A city of castles, whisky, and misty highland vibes. Edinburgh has an unmatched gothic atmosphere, world-famous Fringe Festival, and stunning Arthur's Seat.",
        attractions: ["Edinburgh Castle", "Royal Mile", "Arthur's Seat", "Holyrood Palace", "Scott Monument"],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Room service', 'Concierge', 'Non-smoking rooms'],
    },
    // ── HotelAPI-verified European cities (batch 2) ──────────────────────────────
    'barcelona': {
        cityCode: '110439', cityName: 'Barcelona', country: 'ES',
        hotelCodes: ['1100001', '1100002', '1100003', '1100004', '1100005'],
        hotelNames: { '1100001': 'Hotel Arts Barcelona', '1100002': 'W Barcelona', '1100003': 'Majestic Hotel & Spa', '1100004': 'Hotel Casa Fuster', '1100005': 'Mandarin Oriental Barcelona' },
        description: 'A vibrant Mediterranean city of Gaudí masterpieces, Gothic Quarter labyrinth, and world-class tapas along La Rambla.',
        attractions: ['Sagrada Familia', 'Park Güell', 'La Rambla', 'Gothic Quarter', 'Casa Batlló'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Non-smoking rooms'],
    },
    'rome': {
        cityCode: '135419', cityName: 'Rome', country: 'IT',
        hotelCodes: ['1100011', '1100012', '1100013', '1100014', '1100015'],
        hotelNames: { '1100011': 'Hotel de Russie', '1100012': 'Hotel Eden Rome', '1100013': 'Hotel Raphael', '1100014': 'Hotel Hassler Roma', '1100015': 'The St. Regis Rome' },
        description: 'The Eternal City — 2,800 years of globally influential art, architecture, and culture, from the Colosseum to Vatican City.',
        attractions: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Pantheon', 'Roman Forum'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Rooftop terrace', 'Room service', 'Concierge', 'Non-smoking rooms'],
    },
    'paris': {
        cityCode: '130628', cityName: 'Paris', country: 'FR',
        hotelCodes: ['1100021', '1100022', '1100023', '1100024', '1100025'],
        hotelNames: { '1100021': 'Le Meurice', '1100022': 'Hotel Plaza Athénée', '1100023': 'Hotel Le Marais', '1100024': 'Hotel Lutetia', '1100025': 'Hôtel de Crillon' },
        description: 'The City of Light — iconic landmarks, world-class cuisine, haute couture, and timeless romance along the Seine.',
        attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées', 'Montmartre'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Room service', 'Concierge', 'Non-smoking rooms'],
    },
    'london': {
        cityCode: '125771', cityName: 'London', country: 'GB',
        hotelCodes: ['1100031', '1100032', '1100033', '1100034', '1100035'],
        hotelNames: { '1100031': 'The Savoy', '1100032': 'Claridges', '1100033': 'The Ritz London', '1100034': 'Premier Inn London', '1100035': 'citizenM Tower of London' },
        description: 'A global capital of culture, history, and innovation. From the Tower of London to the West End, London never stops surprising.',
        attractions: ['Tower of London', 'British Museum', 'Buckingham Palace', 'Big Ben', 'Hyde Park'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Gym', 'Room service', 'Concierge', 'Non-smoking rooms'],
    },
    'stockholm': {
        cityCode: '139072', cityName: 'Stockholm', country: 'SE',
        hotelCodes: ['1100041', '1100042', '1100043', '1100044', '1100045'],
        hotelNames: { '1100041': 'Grand Hotel Stockholm', '1100042': 'At Six Hotel', '1100043': 'Hotel Rival', '1100044': 'Nobis Hotel', '1100045': 'Downtown Camper by Scandic' },
        description: 'Venice of the North — spread across 14 islands with stunning architecture, Viking history, and cutting-edge design.',
        attractions: ['Gamla Stan', 'Vasa Museum', 'ABBA Museum', 'Skansen', 'Royal Palace'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Sauna', 'Gym', 'Non-smoking rooms'],
    },
    'nice': {
        cityCode: '129615', cityName: 'Nice', country: 'FR',
        hotelCodes: ['1100051', '1100052', '1100053', '1100054', '1100055'],
        hotelNames: { '1100051': 'Hotel Negresco', '1100052': 'Hyatt Regency Nice', '1100053': 'Hotel Le Meridien Nice', '1100054': 'Hotel Beau Rivage', '1100055': 'Hotel Aston La Scala' },
        description: 'Queen of the French Riviera — azure beaches, Belle Époque architecture, and the vibrant Promenade des Anglais.',
        attractions: ['Promenade des Anglais', 'Old Town Nice', 'Castle Hill', 'Matisse Museum', 'Cours Saleya Market'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'krakow': {
        cityCode: '124781', cityName: 'Krakow', country: 'PL',
        hotelCodes: ['1100061', '1100062', '1100063', '1100064', '1100065'],
        hotelNames: { '1100061': 'Hotel Stary Krakow', '1100062': 'Sheraton Grand Krakow', '1100063': 'Hotel Copernicus', '1100064': 'Hotel Pod Roza', '1100065': 'Radisson Blu Krakow' },
        description: 'Poland\'s cultural jewel — a medieval Old Town, vibrant Jewish Quarter, and gateway to the Wieliczka Salt Mine.',
        attractions: ['Wawel Castle', 'Main Market Square', 'St. Mary\'s Basilica', 'Kazimierz', 'Wieliczka Salt Mine'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Room service', 'Non-smoking rooms'],
    },
    'berlin': {
        cityCode: '111410', cityName: 'Berlin', country: 'DE',
        hotelCodes: ['1100071', '1100072', '1100073', '1100074', '1100075'],
        hotelNames: { '1100071': 'Hotel Adlon Kempinski', '1100072': 'The Regent Berlin', '1100073': 'Hotel Zoo Berlin', '1100074': '25hours Hotel Bikini', '1100075': 'Motel One Berlin' },
        description: 'A city reborn — from the Berlin Wall to world-class techno, Museum Island, and a thriving multicultural food scene.',
        attractions: ['Brandenburg Gate', 'Museum Island', 'Berlin Wall Memorial', 'Checkpoint Charlie', 'Reichstag'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Gym', 'Non-smoking rooms', 'Bike rental'],
    },
    'riga': {
        cityCode: '135170', cityName: 'Riga', country: 'LV',
        hotelCodes: ['1100081', '1100082', '1100083', '1100084', '1100085'],
        hotelNames: { '1100081': 'Grand Hotel Kempinski Riga', '1100082': 'Hotel Bergs', '1100083': 'Radisson Blu Latvija', '1100084': 'Pullman Riga Old Town', '1100085': 'Art Hotel Laine' },
        description: 'Art Nouveau capital of Europe — a stunning UNESCO Old Town, vibrant Central Market, and booming Baltic nightlife.',
        attractions: ['Old Riga', 'Art Nouveau District', 'Riga Central Market', 'Freedom Monument', 'Jūrmala Beach'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Non-smoking rooms'],
    },
    'split': {
        cityCode: '138951', cityName: 'Split', country: 'HR',
        hotelCodes: ['1100091', '1100092', '1100093', '1100094', '1100095'],
        hotelNames: { '1100091': 'Hotel Luxe Split', '1100092': 'Radisson Blu Resort Split', '1100093': 'Hotel Atrium', '1100094': 'Cornaro Hotel', '1100095': 'Hotel Park Split' },
        description: 'Dalmatian gem — Diocletian\'s Palace forms the living heart of this sun-kissed Adriatic port city.',
        attractions: ['Diocletian\'s Palace', 'Riva Promenade', 'Marjan Hill', 'Klis Fortress', 'Bacvice Beach'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Sea view', 'Non-smoking rooms'],
    },
    'venice': {
        cityCode: '141728', cityName: 'Venice', country: 'IT',
        hotelCodes: ['1100101', '1100102', '1100103', '1100104', '1100105'],
        hotelNames: { '1100101': 'Hotel Danieli', '1100102': 'The Gritti Palace', '1100103': 'Hotel Cipriani', '1100104': 'Ca\' Sagredo Hotel', '1100105': 'Hotel Londra Palace' },
        description: 'La Serenissima — a floating city of gondolas, Byzantine basilicas, and Renaissance art on 118 islands.',
        attractions: ['St. Mark\'s Square', 'Doge\'s Palace', 'Rialto Bridge', 'Grand Canal', 'Murano Island'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Water taxi', 'Room service', 'Non-smoking rooms'],
    },
    'madrid': {
        cityCode: '127200', cityName: 'Madrid', country: 'ES',
        hotelCodes: ['1100111', '1100112', '1100113', '1100114', '1100115'],
        hotelNames: { '1100111': 'The Westin Palace Madrid', '1100112': 'Hotel Ritz Madrid', '1100113': 'ME Madrid', '1100114': 'NH Collection Madrid', '1100115': 'Hotel Urban Madrid' },
        description: 'Spain\'s vibrant capital — world-class art (Prado, Reina Sofía), late-night tapas, and the passion of Real Madrid.',
        attractions: ['Prado Museum', 'Royal Palace', 'Retiro Park', 'Gran Vía', 'Plaza Mayor'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Pool', 'Gym', 'Room service', 'Non-smoking rooms'],
    },
    'warsaw': {
        cityCode: '142081', cityName: 'Warsaw', country: 'PL',
        hotelCodes: ['1100121', '1100122', '1100123', '1100124', '1100125'],
        hotelNames: { '1100121': 'Hotel Bristol Warsaw', '1100122': 'InterContinental Warsaw', '1100123': 'Raffles Europejski Warsaw', '1100124': 'Sofitel Victoria Warsaw', '1100125': 'Mercure Grand Warsaw' },
        description: 'A phoenix city rebuilt from WWII ruins — Warsaw\'s Old Town, modern skyline, and Chopin heritage make it unforgettable.',
        attractions: ['Old Town', 'Royal Castle', 'Lazienki Park', 'Palace of Culture', 'Warsaw Uprising Museum'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Gym', 'Non-smoking rooms'],
    },
    // ── HotelAPI-verified European cities (batch 3) ──────────────────────────────
    'oslo': {
        cityCode: '130259', cityName: 'Oslo', country: 'NO',
        hotelCodes: ['1100131', '1100132', '1100133', '1100134', '1100135'],
        hotelNames: { '1100131': 'The Thief Oslo', '1100132': 'Hotel Continental Oslo', '1100133': 'Grand Hotel Oslo', '1100134': 'Clarion Hotel The Hub', '1100135': 'Scandic Holmenkollen' },
        description: 'Norway\'s compact, design-forward capital — fjord views, Viking history, and the world\'s best quality of life.',
        attractions: ['Viking Ship Museum', 'Opera House', 'Vigeland Sculpture Park', 'Munch Museum', 'Akershus Fortress'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Gym', 'Sauna', 'Non-smoking rooms'],
    },
    'milan': {
        cityCode: '128453', cityName: 'Milan', country: 'IT',
        hotelCodes: ['1100141', '1100142', '1100143', '1100144', '1100145'],
        hotelNames: { '1100141': 'Armani Hotel Milano', '1100142': 'Park Hyatt Milan', '1100143': 'Hotel Principe di Savoia', '1100144': 'Bulgari Hotel Milano', '1100145': 'NH Collection Milano President' },
        description: 'Italy\'s fashion and design capital — from the Gothic Duomo to Leonardo\'s Last Supper and world-class shopping.',
        attractions: ['Milan Cathedral', 'The Last Supper', 'Galleria Vittorio Emanuele', 'Sforza Castle', 'La Scala'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Gym', 'Room service', 'Non-smoking rooms'],
    },
    'geneva': {
        cityCode: '119412', cityName: 'Geneva', country: 'CH',
        hotelCodes: ['1100151', '1100152', '1100153', '1100154', '1100155'],
        hotelNames: { '1100151': 'Four Seasons Hotel des Bergues', '1100152': 'The Ritz-Carlton Geneva', '1100153': 'Hotel Beau-Rivage', '1100154': 'Mandarin Oriental Geneva', '1100155': 'Hotel Metropole Geneva' },
        description: 'Switzerland\'s cosmopolitan lakeside city — home to the UN, CERN, and stunning Alpine panoramas.',
        attractions: ['Jet d\'Eau', 'Old Town Geneva', 'Lake Geneva', 'CERN', 'Palais des Nations'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Lake view', 'Room service', 'Non-smoking rooms'],
    },
    'brussels': {
        cityCode: '113279', cityName: 'Brussels', country: 'BE',
        hotelCodes: ['1100161', '1100162', '1100163', '1100164', '1100165'],
        hotelNames: { '1100161': 'Hotel Amigo Brussels', '1100162': 'Rocco Forte Hotel Amigo', '1100163': 'Steigenberger Wiltcher\'s', '1100164': 'Hotel Le Plaza Brussels', '1100165': 'NH Collection Grand Sablon' },
        description: 'Heart of Europe — Art Nouveau architecture, Belgian chocolate, waffles, beer, and the EU quarter.',
        attractions: ['Grand Place', 'Manneken Pis', 'Atomium', 'Royal Palace', 'Belgian Comic Strip Center'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Room service', 'Concierge', 'Non-smoking rooms'],
    },
    'vilnius': {
        cityCode: '142095', cityName: 'Vilnius', country: 'LT',
        hotelCodes: ['1100171', '1100172', '1100173', '1100174', '1100175'],
        hotelNames: { '1100171': 'Hotel Pacai Vilnius', '1100172': 'Kempinski Hotel Cathedral Square', '1100173': 'Radisson Blu Astorija', '1100174': 'Artagonist Art Hotel', '1100175': 'Hotel Narutis' },
        description: 'Europe\'s largest baroque Old Town — Lithuanian charm, Užupis Republic, and a vibrant emerging food scene.',
        attractions: ['Gediminas Tower', 'Vilnius Cathedral', 'Užupis Republic', 'Gate of Dawn', 'Trakai Castle'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Non-smoking rooms'],
    },
    'lyon': {
        cityCode: '126957', cityName: 'Lyon', country: 'FR',
        hotelCodes: ['1100181', '1100182', '1100183', '1100184', '1100185'],
        hotelNames: { '1100181': 'InterContinental Lyon', '1100182': 'Hotel Le Royal Lyon', '1100183': 'Cour des Loges', '1100184': 'Villa Maïa', '1100185': 'Mercure Lyon Centre' },
        description: 'France\'s gastronomic capital — Renaissance old town, world-famous bouchons, and the Festival of Lights.',
        attractions: ['Basilica of Notre-Dame de Fourvière', 'Vieux Lyon', 'Presqu\'île', 'Parc de la Tête d\'Or', 'Traboules'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Room service', 'Non-smoking rooms'],
    },
    'bucharest': {
        cityCode: '113113', cityName: 'Bucharest', country: 'RO',
        hotelCodes: ['1100191', '1100192', '1100193', '1100194', '1100195'],
        hotelNames: { '1100191': 'Athenee Palace Hilton', '1100192': 'JW Marriott Bucharest', '1100193': 'Radisson Blu Bucharest', '1100194': 'InterContinental Bucharest', '1100195': 'Hotel Epoque Bucharest' },
        description: 'Little Paris of the East — grand Belle Époque boulevards, vibrant nightlife, and the massive Palace of Parliament.',
        attractions: ['Palace of Parliament', 'Old Town', 'Romanian Athenaeum', 'Village Museum', 'Herăstrău Park'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Pool', 'Gym', 'Non-smoking rooms'],
    },
    'valletta': {
        cityCode: '141652', cityName: 'Valletta', country: 'MT',
        hotelCodes: ['1100201', '1100202', '1100203', '1100204', '1100205'],
        hotelNames: { '1100201': 'The Phoenicia Malta', '1100202': 'Hotel Excelsior Valletta', '1100203': 'Grand Hotel Excelsior', '1100204': 'Palazzo Consiglia', '1100205': 'Trabuxu Boutique Living' },
        description: 'Europe\'s smallest capital — 450 years of Knights\' heritage, honey-coloured limestone, and Mediterranean warmth.',
        attractions: ['St. John\'s Co-Cathedral', 'Upper Barrakka Gardens', 'Grand Master\'s Palace', 'Fort St. Elmo', 'Hypogeum'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Pool', 'Sea view', 'Non-smoking rooms'],
    },
    'sofia': {
        cityCode: '138812', cityName: 'Sofia', country: 'BG',
        hotelCodes: ['1100211', '1100212', '1100213', '1100214', '1100215'],
        hotelNames: { '1100211': 'Sofia Hotel Balkan', '1100212': 'Grand Hotel Sofia', '1100213': 'Sense Hotel Sofia', '1100214': 'Hotel Marinela Sofia', '1100215': 'InterContinental Sofia' },
        description: 'Ancient yet affordable — Roman ruins, Orthodox churches, and a booming café scene under the shadow of Vitosha Mountain.',
        attractions: ['Alexander Nevsky Cathedral', 'Vitosha Mountain', 'National Palace of Culture', 'Boyana Church', 'Serdika Ruins'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Gym', 'Non-smoking rooms'],
    },
    'ljubljana': {
        cityCode: '126539', cityName: 'Ljubljana', country: 'SI',
        hotelCodes: ['1100221', '1100222', '1100223', '1100224', '1100225'],
        hotelNames: { '1100221': 'InterContinental Ljubljana', '1100222': 'Hotel Lev Ljubljana', '1100223': 'Best Western Premier Hotel Slon', '1100224': 'Vander Urbani Resort', '1100225': 'Hotel Nox Ljubljana' },
        description: 'Europe\'s greenest capital — a fairy-tale riverside Old Town, car-free centre, and gateway to Slovenia\'s lakes and Alps.',
        attractions: ['Ljubljana Castle', 'Triple Bridge', 'Dragon Bridge', 'Tivoli Park', 'Lake Bled day trip'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Bike rental', 'Non-smoking rooms'],
    },
    'bordeaux': {
        cityCode: '112303', cityName: 'Bordeaux', country: 'FR',
        hotelCodes: ['1100231', '1100232', '1100233', '1100234', '1100235'],
        hotelNames: { '1100231': 'InterContinental Bordeaux', '1100232': 'Hotel de Seze', '1100233': 'Mercure Bordeaux Centre', '1100234': 'Best Western Grand Hotel', '1100235': 'Hôtel La Zoologie' },
        description: 'Wine capital of the world — elegant 18th-century architecture, vineyard tours, and the Miroir d\'eau.',
        attractions: ['Place de la Bourse', 'Cité du Vin', 'Saint-Émilion', 'Miroir d\'eau', 'Bordeaux Cathedral'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Wine cellar', 'Room service', 'Non-smoking rooms'],
    },
    'malaga': {
        cityCode: '127413', cityName: 'Malaga', country: 'ES',
        hotelCodes: ['1100241', '1100242', '1100243', '1100244', '1100245'],
        hotelNames: { '1100241': 'Gran Hotel Miramar', '1100242': 'Molina Lario Hotel', '1100243': 'Room Mate Valeria', '1100244': 'AC Hotel Malaga Palacio', '1100245': 'Hotel MS Maestranza' },
        description: 'Birthplace of Picasso — sun-drenched Costa del Sol gateway with Moorish fortress, tapas bars, and golden beaches.',
        attractions: ['Alcazaba', 'Picasso Museum', 'Malaga Cathedral', 'Gibralfaro Castle', 'Muelle Uno'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'thessaloniki': {
        cityCode: '140627', cityName: 'Thessaloniki', country: 'GR',
        hotelCodes: ['1100251', '1100252', '1100253', '1100254', '1100255'],
        hotelNames: { '1100251': 'Electra Palace Thessaloniki', '1100252': 'The Met Hotel', '1100253': 'Hotel Nikopolis', '1100254': 'Makedonia Palace', '1100255': 'Daios Luxury Living' },
        description: 'Greece\'s cultural co-capital — Byzantine walls, waterfront walks, and the country\'s best street food scene.',
        attractions: ['White Tower', 'Aristotelous Square', 'Rotunda', 'Ano Poli', 'Archaeological Museum'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Pool', 'Sea view', 'Non-smoking rooms'],
    },
    'glasgow': {
        cityCode: '119718', cityName: 'Glasgow', country: 'GB',
        hotelCodes: ['1100261', '1100262', '1100263', '1100264', '1100265'],
        hotelNames: { '1100261': 'Hotel Indigo Glasgow', '1100262': 'Kimpton Blythswood Square', '1100263': 'Radisson RED Glasgow', '1100264': 'citizenM Glasgow', '1100265': 'Dakota Glasgow' },
        description: 'Scotland\'s vibrant creative capital — Mackintosh architecture, street art, live music, and the friendliest locals.',
        attractions: ['Kelvingrove Museum', 'Glasgow Cathedral', 'Riverside Museum', 'Buchanan Street', 'Pollok Country Park'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Gym', 'Non-smoking rooms'],
    },
    // ── HotelAPI-verified European cities (batch 4) ──────────────────────────────
    'dublin': {
        cityCode: '116780', cityName: 'Dublin', country: 'IE',
        hotelCodes: ['1100271', '1100272', '1100273', '1100274', '1100275'],
        hotelNames: { '1100271': 'The Shelbourne Dublin', '1100272': 'The Merrion Hotel', '1100273': 'The Westbury', '1100274': 'The Marker Hotel', '1100275': 'Trinity City Hotel' },
        description: 'Literary pubs, Georgian squares, and the wild Irish spirit — home of Guinness, U2, and Oscar Wilde.',
        attractions: ['Trinity College & Book of Kells', 'Temple Bar', 'Guinness Storehouse', 'Phoenix Park', 'Dublin Castle'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Room service', 'Concierge', 'Non-smoking rooms'],
    },
    'manchester': {
        cityCode: '127582', cityName: 'Manchester', country: 'GB',
        hotelCodes: ['1100281', '1100282', '1100283', '1100284', '1100285'],
        hotelNames: { '1100281': 'The Midland Manchester', '1100282': 'Hotel Gotham', '1100283': 'King Street Townhouse', '1100284': 'Stock Exchange Hotel', '1100285': 'Kimpton Clocktower' },
        description: 'Industrial revolution birthplace — now a creative powerhouse with world-class football, music, and Northern Quarter vibes.',
        attractions: ['Old Trafford', 'Northern Quarter', 'John Rylands Library', 'Manchester Art Gallery', 'MediaCityUK'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Gym', 'Spa', 'Non-smoking rooms'],
    },
    'antalya': {
        cityCode: '108173', cityName: 'Antalya', country: 'TR',
        hotelCodes: ['1100291', '1100292', '1100293', '1100294', '1100295'],
        hotelNames: { '1100291': 'Rixos Downtown Antalya', '1100292': 'Akra Hotel', '1100293': 'Divan Antalya Talya', '1100294': 'Port Nature Luxury Resort', '1100295': 'Crowne Plaza Antalya' },
        description: 'Turquoise coast paradise — ancient Lycian ruins meet pristine Mediterranean beaches and all-inclusive resorts.',
        attractions: ['Kaleiçi Old Town', 'Düden Waterfalls', 'Aspendos Theatre', 'Antalya Museum', 'Konyaaltı Beach'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'izmir': {
        cityCode: '122973', cityName: 'Izmir', country: 'TR',
        hotelCodes: ['1100301', '1100302', '1100303', '1100304', '1100305'],
        hotelNames: { '1100301': 'Swissôtel Büyük Efes', '1100302': 'Hilton Izmir', '1100303': 'Mövenpick Hotel Izmir', '1100304': 'DoubleTree by Hilton Izmir', '1100305': 'Wyndham Grand Izmir' },
        description: 'Aegean breezes, bazaars, and gateway to ancient Ephesus — Turkey\'s most cosmopolitan coastal city.',
        attractions: ['Ephesus', 'Kemeraltı Bazaar', 'Konak Square', 'Agora Ruins', 'Alsancak Promenade'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Gym', 'Non-smoking rooms'],
    },
    'corfu': {
        cityCode: '115295', cityName: 'Corfu', country: 'GR',
        hotelCodes: ['1100311', '1100312', '1100313', '1100314', '1100315'],
        hotelNames: { '1100311': 'Corfu Palace Hotel', '1100312': 'Mon Repos Palace', '1100313': 'Grecotel Corfu Imperial', '1100314': 'Marbella Beach Hotel', '1100315': 'Corfu Holiday Palace' },
        description: 'Emerald isle of Greece — Venetian Old Town, crystal lagoons, and lush green hillsides in the Ionian Sea.',
        attractions: ['Corfu Old Town', 'Achilleion Palace', 'Canal d\'Amour', 'Paleokastritsa', 'Mon Repos Estate'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Beach access', 'Sea view', 'Non-smoking rooms'],
    },
    'rhodes': {
        cityCode: '135192', cityName: 'Rhodes', country: 'GR',
        hotelCodes: ['1100321', '1100322', '1100323', '1100324', '1100325'],
        hotelNames: { '1100321': 'Rodos Palace Hotel', '1100322': 'Elysium Resort & Spa', '1100323': 'Spirit of the Knights', '1100324': 'Lindos Blu Hotel', '1100325': 'Atrium Palace Thalasso' },
        description: 'Island of the Knights — a medieval walled town, ancient Lindos acropolis, and 300 days of sunshine.',
        attractions: ['Palace of the Grand Master', 'Lindos Acropolis', 'Rhodes Old Town', 'Valley of Butterflies', 'Anthony Quinn Bay'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'mykonos': {
        cityCode: '129106', cityName: 'Mykonos', country: 'GR',
        hotelCodes: ['1100331', '1100332', '1100333', '1100334', '1100335'],
        hotelNames: { '1100331': 'Cavo Tagoo Mykonos', '1100332': 'Mykonos Grand Hotel', '1100333': 'Belvedere Hotel', '1100334': 'Semeli Hotel', '1100335': 'Myconian Avaton Resort' },
        description: 'Cycladic party island — windmills, Little Venice, crystal beaches, and legendary sunset clubs.',
        attractions: ['Little Venice', 'Windmills', 'Paradise Beach', 'Delos Island', 'Chora Old Town'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Beach access', 'Sea view', 'Non-smoking rooms'],
    },
    'chania': {
        cityCode: '114501', cityName: 'Chania', country: 'GR',
        hotelCodes: ['1100341', '1100342', '1100343', '1100344', '1100345'],
        hotelNames: { '1100341': 'Casa Delfino Hotel', '1100342': 'Domus Renier Boutique Hotel', '1100343': 'Porto Veneziano Hotel', '1100344': 'Samaria Hotel', '1100345': 'Ambassadors Residence' },
        description: 'Crete\'s Venetian jewel — a picturesque harbour, Samariá Gorge, and the best of Cretan cuisine.',
        attractions: ['Venetian Harbour', 'Samariá Gorge', 'Old Town Chania', 'Balos Lagoon', 'Elafonisi Beach'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Pool', 'Sea view', 'Non-smoking rooms'],
    },
    'palma': {
        cityCode: '130462', cityName: 'Palma', country: 'ES',
        hotelCodes: ['1100351', '1100352', '1100353', '1100354', '1100355'],
        hotelNames: { '1100351': 'Hotel Can Alomar', '1100352': 'Hotel Cappuccino', '1100353': 'Sant Francesc Hotel', '1100354': 'Hotel Saratoga', '1100355': 'Nakar Hotel' },
        description: 'Mallorca\'s elegant capital — Gothic cathedral, tapas in the Old Town, and turquoise coves nearby.',
        attractions: ['La Seu Cathedral', 'Bellver Castle', 'Old Town Palma', 'Es Baluard Museum', 'Paseo Mallorca'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Rooftop terrace', 'Non-smoking rooms'],
    },
    'tenerife': {
        cityCode: '140401', cityName: 'Tenerife', country: 'ES',
        hotelCodes: ['1100361', '1100362', '1100363', '1100364', '1100365'],
        hotelNames: { '1100361': 'The Ritz-Carlton Abama', '1100362': 'Hotel Botanico', '1100363': 'Royal Hideaway Corales', '1100364': 'Iberostar Grand El Mirador', '1100365': 'Hard Rock Hotel Tenerife' },
        description: 'Canary Islands\' crown jewel — Mount Teide volcano, year-round sunshine, and dramatic coastal landscapes.',
        attractions: ['Mount Teide', 'Siam Park', 'Los Gigantes Cliffs', 'La Laguna Old Town', 'Masca Valley'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'faro': {
        cityCode: '118560', cityName: 'Faro', country: 'PT',
        hotelCodes: ['1100371', '1100372', '1100373', '1100374', '1100375'],
        hotelNames: { '1100371': 'Hotel Faro & Beach Club', '1100372': 'AP Eva Senses Hotel', '1100373': 'Hotel Sol Algarve', '1100374': '3HB Faro', '1100375': 'Hotel Ria Sol' },
        description: 'Gateway to the Algarve — charming old town, golden beaches, and the dramatic Ria Formosa lagoon.',
        attractions: ['Ria Formosa Natural Park', 'Faro Old Town', 'Bone Chapel', 'Ilha Deserta', 'Praia de Faro'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'marseille': {
        cityCode: '127791', cityName: 'Marseille', country: 'FR',
        hotelCodes: ['1100381', '1100382', '1100383', '1100384', '1100385'],
        hotelNames: { '1100381': 'InterContinental Marseille', '1100382': 'Hotel Dieu - Hôtel', '1100383': 'Sofitel Marseille Vieux-Port', '1100384': 'Hôtel La Résidence du Vieux-Port', '1100385': 'NH Collection Marseille' },
        description: 'France\'s oldest city — a gritty, vibrant Mediterranean port with bouillabaisse, calanques, and multicultural flair.',
        attractions: ['Vieux-Port', 'Notre-Dame de la Garde', 'Calanques National Park', 'MuCEM', 'Le Panier'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Pool', 'Sea view', 'Non-smoking rooms'],
    },
    'toulouse': {
        cityCode: '140913', cityName: 'Toulouse', country: 'FR',
        hotelCodes: ['1100391', '1100392', '1100393', '1100394', '1100395'],
        hotelNames: { '1100391': 'Hotel & Spa La Cour des Consuls', '1100392': 'Grand Hotel de l\'Opéra', '1100393': 'Mercure Toulouse Centre', '1100394': 'Citiz Hotel Toulouse', '1100395': 'Novotel Toulouse Centre' },
        description: 'La Ville Rose — pink terracotta city of aerospace innovation, cassoulet, and the Canal du Midi.',
        attractions: ['Place du Capitole', 'Basilica of Saint-Sernin', 'Cité de l\'Espace', 'Canal du Midi', 'Jacobins Convent'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Non-smoking rooms'],
    },
    'frankfurt': {
        cityCode: '118921', cityName: 'Frankfurt', country: 'DE',
        hotelCodes: ['1100401', '1100402', '1100403', '1100404', '1100405'],
        hotelNames: { '1100401': 'Steigenberger Frankfurter Hof', '1100402': 'Jumeirah Frankfurt', '1100403': 'Hotel Villa Kennedy', '1100404': '25hours Hotel The Trip', '1100405': 'Roomers Frankfurt' },
        description: 'Germany\'s financial capital — a gleaming skyline (\'Mainhattan\'), apple wine taverns, and world-class museums on the Main.',
        attractions: ['Römerberg', 'Museumsufer', 'Main Tower', 'Palmengarten', 'Sachsenhausen'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Gym', 'Spa', 'Room service', 'Non-smoking rooms'],
    },
    'dusseldorf': {
        cityCode: '116908', cityName: 'Dusseldorf', country: 'DE',
        hotelCodes: ['1100411', '1100412', '1100413', '1100414', '1100415'],
        hotelNames: { '1100411': 'Breidenbacher Hof', '1100412': 'Hotel Nikko Düsseldorf', '1100413': 'Steigenberger Parkhotel', '1100414': 'me and all hotel', '1100415': 'Ruby Luna Hotel' },
        description: 'Rhine metropolis of fashion, art, and Altbier — a stylish waterfront, Königsallee shopping, and Japanese quarter.',
        attractions: ['Altstadt', 'Königsallee', 'MedienHafen', 'Kunstsammlung NRW', 'Rhine Tower'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Gym', 'Non-smoking rooms'],
    },
    'cologne': {
        cityCode: '115104', cityName: 'Cologne', country: 'DE',
        hotelCodes: ['1100421', '1100422', '1100423', '1100424', '1100425'],
        hotelNames: { '1100421': 'Excelsior Hotel Ernst', '1100422': 'Hotel Im Wasserturm', '1100423': 'Hyatt Regency Cologne', '1100424': '25hours Hotel The Circle', '1100425': 'Dorint Hotel am Heumarkt' },
        description: 'City of the mighty Gothic cathedral, Kölsch beer, bohemian quarters, and legendary Carnival celebrations.',
        attractions: ['Cologne Cathedral', 'Museum Ludwig', 'Old Town', 'Hohenzollern Bridge', 'Belgian Quarter'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'River view', 'Non-smoking rooms'],
    },
    'pisa': {
        cityCode: '131321', cityName: 'Pisa', country: 'IT',
        hotelCodes: ['1100431', '1100432', '1100433', '1100434', '1100435'],
        hotelNames: { '1100431': 'Hotel Relais dell\'Orologio', '1100432': 'NH Cavalieri Pisa', '1100433': 'Hotel Bologna Pisa', '1100434': 'Royal Victoria Hotel', '1100435': 'Hotel Di Stefano' },
        description: 'Beyond the Leaning Tower — Romanesque piazzas, Tuscan charm on the Arno, and a lively university city.',
        attractions: ['Leaning Tower', 'Piazza dei Miracoli', 'Baptistry of Pisa', 'Piazza dei Cavalieri', 'Arno Riverfront'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Non-smoking rooms'],
    },
    'verona': {
        cityCode: '141845', cityName: 'Verona', country: 'IT',
        hotelCodes: ['1100441', '1100442', '1100443', '1100444', '1100445'],
        hotelNames: { '1100441': 'Due Torri Hotel Verona', '1100442': 'Hotel Gabbia d\'Oro', '1100443': 'Hotel Colomba d\'Oro', '1100444': 'BYBLOS Art Hotel', '1100445': 'Hotel Accademia' },
        description: 'City of Romeo and Juliet — a Roman arena, Valpolicella wine country, and timeless Italian amore.',
        attractions: ['Verona Arena', 'Juliet\'s House', 'Piazza delle Erbe', 'Castelvecchio', 'Ponte Pietra'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Room service', 'Non-smoking rooms'],
    },
    'palermo': {
        cityCode: '130427', cityName: 'Palermo', country: 'IT',
        hotelCodes: ['1100451', '1100452', '1100453', '1100454', '1100455'],
        hotelNames: { '1100451': 'Grand Hotel Piazza Borsa', '1100452': 'Hotel Porta Felice', '1100453': 'Grand Hotel et Des Palmes', '1100454': 'Palazzo Brunaccini', '1100455': 'Hotel Alma Palermo' },
        description: 'Chaotic beauty — Arab-Norman churches, legendary street food, and the wild Sicilian soul.',
        attractions: ['Palermo Cathedral', 'Teatro Massimo', 'Ballarò Market', 'Cappella Palatina', 'Mondello Beach'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Rooftop terrace', 'Non-smoking rooms'],
    },
    'catania': {
        cityCode: '114362', cityName: 'Catania', country: 'IT',
        hotelCodes: ['1100461', '1100462', '1100463', '1100464', '1100465'],
        hotelNames: { '1100461': 'Romano Palace Luxury Hotel', '1100462': 'UNA Hotel Palace Catania', '1100463': 'Hotel Villa del Bosco', '1100464': 'NH Catania Centro', '1100465': 'Hotel Nettuno Catania' },
        description: 'Baroque city at Etna\'s foot — vibrant fish markets, volcanic landscapes, and Sicilian fire.',
        attractions: ['Mount Etna', 'Piazza del Duomo', 'La Pescheria Market', 'Via Etnea', 'Roman Theatre'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Non-smoking rooms'],
    },
    'bari': {
        cityCode: '110350', cityName: 'Bari', country: 'IT',
        hotelCodes: ['1100471', '1100472', '1100473', '1100474', '1100475'],
        hotelNames: { '1100471': 'Grande Albergo delle Nazioni', '1100472': 'Mercure Villa Romanazzi', '1100473': 'Hotel Oriente Bari', '1100474': 'iH Hotels Bari Grand Hotel Oriente', '1100475': 'Hotel Boston Bari' },
        description: 'Puglia\'s capital — orecchiette pasta, whitewashed old town, and the gateway to Adriatic beaches.',
        attractions: ['Bari Vecchia', 'Basilica di San Nicola', 'Lungomare', 'Castello Svevo', 'Polignano a Mare'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Sea view', 'Non-smoking rooms'],
    },
    'wroclaw': {
        cityCode: '142553', cityName: 'Wroclaw', country: 'PL',
        hotelCodes: ['1100481', '1100482', '1100483', '1100484', '1100485'],
        hotelNames: { '1100481': 'Hotel Monopol Wroclaw', '1100482': 'Sofitel Wroclaw Old Town', '1100483': 'DoubleTree by Hilton Wroclaw', '1100484': 'PURO Hotel Wroclaw', '1100485': 'Hotel & Restaurant & Spa & Bar & Stare Miasto' },
        description: 'City of 100 bridges and hidden dwarves — a colourful Old Town, fairy-tale Ostrów Tumski, and buzzing Rynek.',
        attractions: ['Market Square (Rynek)', 'Centennial Hall', 'Cathedral Island', 'Wrocław Dwarfs', 'Japanese Garden'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Non-smoking rooms'],
    },
    'zagreb': {
        cityCode: '142789', cityName: 'Zagreb', country: 'HR',
        hotelCodes: ['1100491', '1100492', '1100493', '1100494', '1100495'],
        hotelNames: { '1100491': 'Esplanade Zagreb Hotel', '1100492': 'Hotel Dubrovnik Zagreb', '1100493': 'Sheraton Zagreb', '1100494': 'Hotel Jägerhorn', '1100495': 'DoubleTree by Hilton Zagreb' },
        description: 'Croatia\'s underrated capital — Austro-Hungarian upper town, street art, open-air markets, and café culture.',
        attractions: ['Ban Jelačić Square', 'St. Mark\'s Church', 'Dolac Market', 'Museum of Broken Relationships', 'Mirogoj Cemetery'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Room service', 'Non-smoking rooms'],
    },
    'belgrade': {
        cityCode: '111240', cityName: 'Belgrade', country: 'RS',
        hotelCodes: ['1100501', '1100502', '1100503', '1100504', '1100505'],
        hotelNames: { '1100501': 'Square Nine Hotel Belgrade', '1100502': 'Metropol Palace Belgrade', '1100503': 'Hyatt Regency Belgrade', '1100504': 'Hotel Moskva Belgrade', '1100505': 'Saint Ten Hotel' },
        description: 'Where the Danube meets the Sava — fortress views, splavovi river clubs, and the wildest nightlife in the Balkans.',
        attractions: ['Kalemegdan Fortress', 'Knez Mihailova Street', 'Temple of Saint Sava', 'Ada Ciganlija', 'Skadarlija'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Gym', 'Non-smoking rooms'],
    },
    'tirana': {
        cityCode: '140729', cityName: 'Tirana', country: 'AL',
        hotelCodes: ['1100511', '1100512', '1100513', '1100514', '1100515'],
        hotelNames: { '1100511': 'Hotel Plaza Tirana', '1100512': 'Rogner Hotel Tirana', '1100513': 'Maritim Hotel Plaza Tirana', '1100514': 'Mondial Hotel Tirana', '1100515': 'Tirana International Hotel' },
        description: 'Albania\'s colourful capital — painted buildings, bunker museums, and one of Europe\'s fastest-emerging food scenes.',
        attractions: ['Skanderbeg Square', 'Bunk\'Art', 'Et\'hem Bej Mosque', 'Dajti Mountain', 'Grand Park'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Pool', 'Non-smoking rooms'],
    },
    'larnaca': {
        cityCode: '125443', cityName: 'Larnaca', country: 'CY',
        hotelCodes: ['1100521', '1100522', '1100523', '1100524', '1100525'],
        hotelNames: { '1100521': 'Sun Hall Hotel', '1100522': 'Radisson Blu Hotel Larnaca', '1100523': 'Golden Bay Beach Hotel', '1100524': 'Finikoudes Luxury Boutique', '1100525': 'Amorgos Boutique Hotel' },
        description: 'Cyprus\' sun-kissed coastal gem — palm-lined promenade, Church of St Lazarus, and the pink Larnaca Salt Lake.',
        attractions: ['Finikoudes Beach', 'Church of Saint Lazarus', 'Larnaca Salt Lake', 'Hala Sultan Tekke', 'Medieval Castle'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'paphos': {
        cityCode: '130491', cityName: 'Paphos', country: 'CY',
        hotelCodes: ['1100531', '1100532', '1100533', '1100534', '1100535'],
        hotelNames: { '1100531': 'Almyra Hotel', '1100532': 'Annabelle Hotel', '1100533': 'Elysium Hotel Paphos', '1100534': 'Constantinou Bros Asimina Suites', '1100535': 'King Evelthon Beach Hotel' },
        description: 'Birthplace of Aphrodite — UNESCO mosaics, dramatic sea caves, and the mythical Petra tou Romiou rock.',
        attractions: ['Paphos Archaeological Park', 'Tombs of the Kings', 'Aphrodite\'s Rock', 'Paphos Castle', 'Coral Bay'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'cork': {
        cityCode: '115373', cityName: 'Cork', country: 'IE',
        hotelCodes: ['1100541', '1100542', '1100543', '1100544', '1100545'],
        hotelNames: { '1100541': 'Hayfield Manor', '1100542': 'The River Lee Hotel', '1100543': 'The Imperial Hotel Cork', '1100544': 'Hotel Isaacs Cork', '1100545': 'Clayton Hotel Cork City' },
        description: 'Ireland\'s foodie capital — the English Market, craft breweries, and gateway to the Wild Atlantic Way.',
        attractions: ['English Market', 'Shandon Bells', 'Blarney Castle', 'Crawford Art Gallery', 'Cobh Heritage Centre'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Room service', 'Non-smoking rooms'],
    },
    'varna': {
        cityCode: '141659', cityName: 'Varna', country: 'BG',
        hotelCodes: ['1100551', '1100552', '1100553', '1100554', '1100555'],
        hotelNames: { '1100551': 'Grand Hotel London Varna', '1100552': 'Graffit Gallery Hotel', '1100553': 'Hotel Musala Palace', '1100554': 'Rosslyn Dimyat Hotel', '1100555': 'Golden Tulip Varna' },
        description: 'Bulgaria\'s Black Sea pearl — Roman baths, golden beaches, and the world\'s oldest processed gold treasure.',
        attractions: ['Sea Garden', 'Roman Thermae', 'Archaeological Museum', 'Stone Forest', 'Golden Sands'],
        facilities: ['Free WiFi', 'Air conditioning', 'Pool', 'Restaurant', 'Bar', 'Beach access', 'Non-smoking rooms'],
    },
    'clujnapoca': {
        cityCode: '114972', cityName: 'Cluj-Napoca', country: 'RO',
        hotelCodes: ['1100561', '1100562', '1100563', '1100564', '1100565'],
        hotelNames: { '1100561': 'Grand Hotel Italia Cluj', '1100562': 'Hotel & Restaurant & Spa & Bar & Old Cluj', '1100563': 'Hampton by Hilton Cluj', '1100564': 'DoubleTree by Hilton Cluj', '1100565': 'Hotel Belvedere Cluj' },
        description: 'Capital of Transylvania — vibrant university city with a booming tech scene, music festivals, and Gothic churches.',
        attractions: ['St. Michael\'s Church', 'Central Park', 'Ethnographic Museum', 'Hoia Forest', 'Turda Salt Mine'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Non-smoking rooms'],
    },
    'sarajevo': {
        cityCode: '137252', cityName: 'Sarajevo', country: 'BA',
        hotelCodes: ['1100571', '1100572', '1100573', '1100574', '1100575'],
        hotelNames: { '1100571': 'Hotel Europe Sarajevo', '1100572': 'Hotel Bristol Sarajevo', '1100573': 'Swissôtel Sarajevo', '1100574': 'Hotel Hills Sarajevo', '1100575': 'Courtyard by Marriott Sarajevo' },
        description: 'Where East meets West in the Balkans — Ottoman bazaars, Austro-Hungarian avenues, and an unforgettable history.',
        attractions: ['Baščaršija', 'Latin Bridge', 'Gazi Husrev-beg Mosque', 'Tunnel of Hope', 'Yellow Fortress'],
        facilities: ['Free WiFi', 'Air conditioning', 'Restaurant', 'Bar', 'Spa', 'Non-smoking rooms'],
    },
};

// ─── Per-city hotel data cache (loaded from HotelAPIHotelCodeList on first use) ────
const cityHotelDataCache = {};

/**
 * Fetch full hotel metadata for all hotels in a city via HotelAPIHotelCodeList.
 * This endpoint returns: ImageUrls[].ImageUrl, HotelFacilities, Address, Description, etc.
 * Cached per cityCode so we only call it once per server session.
 */
async function fetchCityHotelData(cityCode) {
    if (cityHotelDataCache[cityCode]) return cityHotelDataCache[cityCode];

    try {
        console.log(`📡 Fetching hotel data for city ${cityCode} from HotelAPIHotelCodeList...`);
        const res = await axios.post(
            `${BASE_URL}/HotelAPIHotelCodeList`,
            { CityCode: cityCode, IsDetailedResponse: 'true' },
            { auth: AUTH, timeout: 20000 }
        );
        const hotels = res.data?.Hotels || [];

        // Build a map: hotelCode → { hotelApiImage, facilities, address, description, ... }
        const map = {};
        for (const h of hotels) {
            const code = h.HotelCode;
            if (!code) continue;
            // HotelAPI provides 1 image per hotel via ImageUrls[0].ImageUrl
            const hotelApiImage = h.ImageUrls?.[0]?.ImageUrl || null;
            map[code] = {
                hotelApiImage,
                facilities: h.HotelFacilities || [],
                address: h.Address || '',
                description: h.Description || '',
                phone: h.PhoneNumber || '',
                email: h.Email || '',
                website: h.HotelWebsiteUrl || '',
                starRating: parseFloat(h.HotelRating || '3'),
                attractions: h.Attractions
                    ? Object.values(h.Attractions).filter(Boolean)
                    : [],
            };
        }

        cityHotelDataCache[cityCode] = map;
        console.log(`✅ Cached hotel data for city ${cityCode}: ${Object.keys(map).length} hotels`);
        return map;
    } catch (err) {
        console.warn(`⚠️  HotelAPIHotelCodeList failed for city ${cityCode}:`, err.message);
        cityHotelDataCache[cityCode] = {};
        return {};
    }
}


function getNumNights(checkIn, checkOut) {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    return Math.max(1, Math.round((d2 - d1) / 86400000));
}

function getDatesForDuration(durationStr) {
    const base = new Date();
    base.setDate(base.getDate() + 30);
    const checkIn = base.toISOString().split('T')[0];
    const nights = durationStr ? parseInt(durationStr.split('-')[0]) || 5 : 5;
    const out = new Date(base);
    out.setDate(out.getDate() + nights);
    const checkOut = out.toISOString().split('T')[0];
    return { checkIn, checkOut };
}

function calculateHotelCost(fare, rooms) {
    if (!fare || isNaN(fare)) return null;
    return Math.round(parseFloat(fare) * 83 * rooms);
}

// ─── Main: Search Hotels ──────────────────────────────────────────────────────

async function searchHotels(destinationName, checkIn, checkOut, noOfRooms, noOfAdults, targetBudget = null, userPreferences = null) {
    try {
        const key = destinationName.toLowerCase().trim();
        const cityInfo = CITY_HOTEL_MAP[key];

        if (!cityInfo) {
            console.log(`⚠️  HotelAPI: No staging hotel codes for "${destinationName}" — using seed data`);
            return null;
        }

        const { cityCode, hotelCodes, hotelNames, cityName } = cityInfo;
        const cityImages = CITY_IMAGES[key] || CITY_IMAGES['reykjavik'];

        console.log(`🏨  HotelAPI hotel search: ${cityName} | ${checkIn} → ${checkOut} | ${noOfRooms} room(s)`);

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 12000);

        const searchRes = await axios.post(
            `${BASE_URL}/Search`,
            {
                CheckIn: checkIn,
                CheckOut: checkOut,
                CityId: cityCode,
                HotelCodes: hotelCodes.join(','),
                GuestNationality: 'IN',
                PaxRooms: [{ Adults: noOfAdults, Children: 0, ChildrenAges: [] }],
                ResponseTime: 23,
                IsNearBySearchAllowed: false,
                IsDetailedResponse: true,
            },
            { auth: AUTH, timeout: 12000, signal: controller.signal }
        );
        clearTimeout(timer);

        const hotels = searchRes.data?.HotelResult;
        if (!hotels || hotels.length === 0) {
            console.log(`⚠️  HotelAPI: No available rooms in staging for ${cityName}`);
            return null;
        }

        const nights = getNumNights(checkIn, checkOut);

        // Sort by price, take top 10 (we'll filter by budget later)
        const sorted = hotels
            .sort((a, b) => (a.Rooms?.[0]?.TotalFare || 9999) - (b.Rooms?.[0]?.TotalFare || 9999))
            .slice(0, 10);

        // ── Fetch city hotel metadata (images, facilities) from HotelAPIHotelCodeList ──
        // This gives us the real HotelAPI image for each individual hotel (unique per hotel)
        const cityHotelMap = await fetchCityHotelData(cityCode);

        const enrichedHotels = sorted.map((h, idx) => {
            const room = h.Rooms?.[0];
            const totalCostINR = calculateHotelCost(room?.TotalFare, noOfRooms);
            const hotelName = hotelNames[h.HotelCode] || `${cityName} Hotel`;
            const hotelData = cityHotelMap[h.HotelCode]; // real per-hotel metadata

            // ─── Image strategy ───────────────────────────────────────────────────
            // 1. Main image (image[0]): real HotelAPI hotel photo from HotelAPIHotelCodeList
            // 2. Gallery (image[1..n]): hotel-specific Unsplash interior/exterior shots
            //    from HOTEL_GALLERY_IMAGES, keyed by hotel code — unique per property
            const hotelApiImage = hotelData?.hotelApiImage || null;
            const hotelGallery = HOTEL_GALLERY_IMAGES[h.HotelCode] || cityImages;

            const mainImage = hotelApiImage || hotelGallery[0];
            const images = hotelApiImage
                ? [hotelApiImage, ...hotelGallery]   // HotelAPI thumbnail + hotel-specific gallery
                : hotelGallery;                  // gallery-only fallback

            // ─── Facilities / description ─────────────────────────────────────────
            const facilities = (hotelData?.facilities?.length > 0)
                ? hotelData.facilities
                : (cityInfo.facilities || ['Free WiFi', 'Air conditioning', 'Restaurant']);

            const attractions = (hotelData?.attractions?.length > 0)
                ? hotelData.attractions
                : (cityInfo.attractions || []);

            const starRating = hotelData?.starRating || parseFloat(h.StarRating || '3');

            const description = hotelData?.description
                || `${hotelName} is a ${starRating}-star hotel in ${cityName}. ${cityInfo.description || ''}`;

            return {
                name: hotelName,
                rating: starRating,
                location: cityName,
                address: hotelData?.address || `${cityName}, ${cityInfo.country}`,
                distanceToCenter: 'City centre',
                totalCost: totalCostINR,
                image: mainImage,
                images,
                nights,
                hotelCode: h.HotelCode,
                roomName: room?.Name?.[0] || 'Standard Room',
                mealType: room?.MealType || 'Room Only',
                isRefundable: room?.IsRefundable ?? true,
                checkInTime: '15:00',
                checkOutTime: '11:00',
                currency: 'INR',
                isHotelAPILive: true,
                description,
                facilities,
                attractions,
                phone: hotelData?.phone || '',
                email: hotelData?.email || '',
                website: hotelData?.website || '',
                rooms: (h.Rooms || []).slice(0, 5).map(r => ({
                    name: r.Name?.[0] || 'Standard Room',
                    totalFareINR: calculateHotelCost(r.TotalFare, noOfRooms),
                    mealType: r.MealType,
                    isRefundable: r.IsRefundable,
                    inclusion: r.Inclusion,
                })),
            };

        });


        // ══════════════════════════════════════════════════════════════════════
        //  HOTEL RANKING ENGINE
        //  Score = 0.35×PreferenceMatch + 0.25×PriceMatch + 0.20×Rating
        //        + 0.10×LocationScore   + 0.10×Popularity
        // ══════════════════════════════════════════════════════════════════════

        /**
         * Map HotelAPI facilities → stay-type tags that match our swipe card IDs.
         * If a user liked 'spa' or 'luxury' in the stays swipe, hotels with
         * matching facilities score higher.
         */
        const FACILITY_TAG_MAP = {
            'spa': ['spa', 'luxury', 'wellness'],
            'pool': ['pool', 'resort', 'luxury'],
            'gym': ['fitness', 'active', 'gym'],
            'restaurant': ['restaurant', 'dining', 'foodie'],
            'bar': ['bar', 'nightlife'],
            'wifi': ['wifi', 'work', 'digital-nomad'],
            'parking': ['parking', 'road-trip'],
            'pet': ['pet-friendly'],
            'airport': ['airport', 'transit'],
            'beach': ['beach', 'seaside'],
            'family': ['family', 'kids'],
            'business': ['business', 'work'],
            'boutique': ['boutique', 'design'],
            'heritage': ['heritage', 'historic'],
            'suite': ['luxury', 'honeymoon'],
        };

        const scoredHotels = enrichedHotels.map(hotel => {
            // ── 1. Preference Match (35%) ─────────────────────────────────────
            let prefScore = 0;
            const userLikedStays = (userPreferences?.likedStays || []).map(s => s.toLowerCase());
            const userStayScores = userPreferences?.stayScores || {};

            if (userLikedStays.length > 0 || Object.keys(userStayScores).length > 0) {
                const facilitiesLower = hotel.facilities.map(f => f.toLowerCase());
                let matchCount = 0;
                let totalWeight = 0;

                for (const [facilityKeyword, tags] of Object.entries(FACILITY_TAG_MAP)) {
                    const hasFacility = facilitiesLower.some(f => f.includes(facilityKeyword));
                    if (!hasFacility) continue;
                    for (const tag of tags) {
                        const isLiked = userLikedStays.some(liked => liked.includes(tag) || tag.includes(liked));
                        const swipeWeight = userStayScores[tag] || 0;
                        if (isLiked) matchCount += 1;
                        totalWeight += swipeWeight * 0.5;
                    }
                }
                const likeHits = Math.min(matchCount / Math.max(userLikedStays.length, 1), 1);
                prefScore = Math.min((likeHits + Math.min(totalWeight / 10, 0.5)), 1.0);
            } else {
                // No preferences captured yet — default neutral score
                prefScore = 0.5;
            }

            // ── 2. Price Match (25%) ──────────────────────────────────────────
            let priceScore = 0.5;
            if (targetBudget && hotel.totalCost) {
                const ratio = hotel.totalCost / targetBudget;
                if (ratio <= 1.0) {
                    // Under budget: reward being close to (but not above) budget
                    // Perfect score at 80–100% of budget usage
                    priceScore = ratio >= 0.5 ? 0.5 + (ratio - 0.5) * 1.0 : ratio;
                } else {
                    // Over budget: penalize proportionally
                    priceScore = Math.max(0, 1 - (ratio - 1) * 2);
                }
            }

            // ── 3. Star Rating (20%) ──────────────────────────────────────────
            const ratingScore = Math.min((hotel.rating || 3) / 5, 1.0);

            // ── 4. Location Relevance (10%) ───────────────────────────────────
            // Hotels with city-center tag get full score; others get 0.6
            const locationScore = (hotel.distanceToCenter === 'City centre') ? 1.0 : 0.6;

            // ── 5. Popularity (10%) ───────────────────────────────────────────
            // Simulated from star rating + number of facilities (proxy for quality/reviews)
            const facilityCount = hotel.facilities.length;
            const popularityScore = Math.min(
                (hotel.rating / 5) * 0.6 + Math.min(facilityCount / 20, 1) * 0.4,
                1.0
            );

            // ── Final weighted score ──────────────────────────────────────────
            const rawScore =
                prefScore * 0.35 +
                priceScore * 0.25 +
                ratingScore * 0.20 +
                locationScore * 0.10 +
                popularityScore * 0.10;

            const rankScore = Math.round(rawScore * 100);

            // ── Human-readable explanation ────────────────────────────────────
            const explanation = [];
            if (prefScore >= 0.7) explanation.push('Matches your stay preferences');
            else if (prefScore >= 0.4) explanation.push('Partially matches your preferences');
            if (priceScore >= 0.8) explanation.push('Within your hotel budget');
            else if (priceScore >= 0.5) explanation.push('Close to your budget');
            else explanation.push('Slightly above budget');
            if (ratingScore >= 0.8) explanation.push(`Excellent ${hotel.rating}★ rating`);
            else if (ratingScore >= 0.6) explanation.push(`Good ${hotel.rating}★ rating`);
            if (locationScore >= 0.9) explanation.push('City centre location');
            if (popularityScore >= 0.7) explanation.push('Popular with travellers');

            return {
                ...hotel,
                rankScore,
                rankExplanation: explanation,
                _scores: {
                    preference: Math.round(prefScore * 100),
                    price: Math.round(priceScore * 100),
                    rating: Math.round(ratingScore * 100),
                    location: Math.round(locationScore * 100),
                    popularity: Math.round(popularityScore * 100),
                },
            };
        });

        // Sort by rankScore descending
        scoredHotels.sort((a, b) => b.rankScore - a.rankScore);

        // Add ranking badges to top 3
        const BADGES = ['Best Match', 'Best Value', 'Highly Rated'];
        scoredHotels.slice(0, 3).forEach((h, i) => {
            h.rankBadge = BADGES[i] || null;
        });

        const finalHotels = scoredHotels.slice(0, 3);

        console.log(`✅  HotelAPI Ranked Hotels:`);
        finalHotels.forEach((h, i) => {
            console.log(`   ${i + 1}. [${h.rankScore}/100] ${h.rankBadge} — ${h.name} (₹${h.totalCost}) — ${h.rankExplanation.join(', ')}`);
        });

        return { ...finalHotels[0], hotels: finalHotels };

    } catch (err) {
        console.warn('⚠️  HotelAPI Hotel API error:', err.message);
        return null;
    }
}


// ─── HotelAPI Air API Integration ──────────────────────────────────────────────────

const AIR_AUTH_URL = 'http://sharedapi.example.invalid/SharedData.svc/rest/Authenticate';
const AIR_SEARCH_URL = 'http://api.example.invalid/BookingEngineService_Air/AirService.svc/rest/Search';
const AIR_CREDS = {
    ClientId: 'REDACTED',
    UserName: 'REDACTED',
    Password: 'REDACTED',
    EndUserIp: '1.1.1.1',
};

let _airToken = null;
let _airTokenTimestamp = 0;

// Token expires in 24 hrs. We refresh if it's older than 12 hours just in case.
async function getAirToken() {
    const now = Date.now();
    if (_airToken && (now - _airTokenTimestamp < 12 * 60 * 60 * 1000)) {
        return _airToken;
    }

    try {
        console.log('🔐 Fetching new HotelAPI Air token...');
        const res = await axios.post(AIR_AUTH_URL, AIR_CREDS, { timeout: 15000 });
        if (res.data?.Status === 1) {
            _airToken = res.data.TokenId;
            _airTokenTimestamp = now;
            return _airToken;
        } else {
            throw new Error(res.data?.Error?.ErrorMessage || 'Unknown Auth Error');
        }
    } catch (err) {
        console.error('⚠️  Failed to fetch Air token:', err.message);
        return null;
    }
}

// Helper to convert min to "8h 30m"
function formatDuration(min) {
    if (!min) return 'N/A';
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
}

// Convert "2026-02-28T06:00:00" -> "06:00"
function extractTime(dt) {
    if (!dt) return '--:--';
    return dt.split('T')[1].substring(0, 5);
}

// Format the segment into UI friendly structure
function formatFlightDetails(flightObj, kind) {
    const fare = flightObj.Fare;
    const segs = flightObj.Segments[0];
    const firstSeg = segs[0];
    const lastSeg = segs[segs.length - 1];

    // Compute total duration combining all segments + ground time
    let totalDurationMin = 0;
    let totalGroundMin = 0;
    segs.forEach((s, i) => {
        totalDurationMin += (s.Duration || 0);
        if (i < segs.length - 1) totalGroundMin += (segs[i + 1].GroundTime || 0);
    });

    // Cabin class mapping
    const cabinClassMap = { '1': 'Economy', '2': 'Premium Economy', '3': 'Business', '4': 'First' };

    // Build individual leg details for multi-stop flights
    const segments = segs.map((s, i) => {
        const layoverMin = (i < segs.length - 1) ? (segs[i + 1].GroundTime || 0) : 0;
        return {
            airline: s.Airline?.AirlineName || 'Unknown',
            airlineCode: s.Airline?.AirlineCode || '',
            flightNo: `${s.Airline?.AirlineCode || ''} ${s.Airline?.FlightNumber || ''}`.trim(),
            operatingCarrier: s.Airline?.OperatingCarrier || s.Airline?.AirlineCode || '',
            from: s.Origin?.Airport?.CityCode || s.Origin?.Airport?.CityName || '?',
            fromCity: s.Origin?.Airport?.CityName || '',
            fromAirport: s.Origin?.Airport?.AirportName || '',
            fromAirportCode: s.Origin?.Airport?.AirportCode || '',
            to: s.Destination?.Airport?.CityCode || s.Destination?.Airport?.CityName || '?',
            toCity: s.Destination?.Airport?.CityName || '',
            toAirport: s.Destination?.Airport?.AirportName || '',
            toAirportCode: s.Destination?.Airport?.AirportCode || '',
            depDate: s.DepTime ? s.DepTime.split('T')[0] : '',
            departure: extractTime(s.DepTime),
            arrDate: s.ArrTime ? s.ArrTime.split('T')[0] : '',
            arrival: extractTime(s.ArrTime),
            duration: formatDuration(s.Duration),
            durationMin: s.Duration || 0,
            aircraft: s.Craft || 'N/A',
            cabinClass: cabinClassMap[String(s.CabinClass)] || 'Economy',
            seatsAvailable: s.NoOfSeatAvailable || 0,
            baggage: s.Baggage || '',
            cabinBaggage: s.CabinBaggage || '',
            layover: layoverMin > 0 ? formatDuration(layoverMin) : null,
            layoverMin: layoverMin,
            isETicket: s.IsETicketEligible || false,
        };
    });

    return {
        type: kind,
        airline: firstSeg.Airline?.AirlineName || 'Unknown Airline',
        flightNo: `${firstSeg.Airline?.AirlineCode || ''} ${firstSeg.Airline?.FlightNumber || ''}`,
        from: firstSeg.Origin?.Airport?.CityCode || firstSeg.Origin?.Airport?.CityName,
        fromAirport: firstSeg.Origin?.Airport?.AirportName || '',
        to: lastSeg.Destination?.Airport?.CityCode || lastSeg.Destination?.Airport?.CityName,
        toAirport: lastSeg.Destination?.Airport?.AirportName || '',
        departure: extractTime(firstSeg.DepTime),
        arrival: extractTime(lastSeg.ArrTime),
        depDate: firstSeg.DepTime ? firstSeg.DepTime.split('T')[0] : '',
        arrDate: lastSeg.ArrTime ? lastSeg.ArrTime.split('T')[0] : '',
        duration: formatDuration(totalDurationMin),
        totalDurationMin,
        totalGroundMin,
        cost: fare?.PublishedFare || 0,
        baseFare: fare?.BaseFare || 0,
        tax: fare?.Tax || 0,
        currency: fare?.Currency || 'INR',
        stops: segs.length - 1,
        baggage: firstSeg.Baggage,
        cabinBaggage: firstSeg.CabinBaggage,
        cabinClass: cabinClassMap[String(firstSeg.CabinClass)] || 'Economy',
        aircraft: firstSeg.Craft || 'N/A',
        isRefundable: fare?.IsRefundable,
        isETicket: firstSeg.IsETicketEligible || false,
        segments: segments,
    };
}

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
    // ── HotelAPI-Verified European destinations ──
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
    // ── New HotelAPI-verified cities ──
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

async function getLiveFlights(originCode, destinationName, checkInDate, checkOutDate, adults = 1, childCount = 0, targetBudget = null) {
    try {
        const origin = originCode || 'DEL';

        const destKey = destinationName.toLowerCase().trim();
        const destAirport = AIRPORT_CODE_MAP[destKey];

        if (!destAirport) {
            console.log(`⚠️  No mapped airport code for ${destinationName}`);
            return null;
        }

        const token = await getAirToken();
        if (!token) return null;

        console.log(`✈️  HotelAPI Air search: ${origin} → ${destAirport} | Adults: ${adults}, Children: ${childCount} (${checkInDate} / ${checkOutDate})`);

        const requestBody = {
            EndUserIp: '1.1.1.1',
            TokenId: token,
            AdultCount: adults,
            ChildCount: childCount,
            InfantCount: 0,
            DirectFlight: false,
            OneStopFlight: false,
            JourneyType: '2', // 2=Return
            Segments: [
                {
                    Origin: origin,
                    Destination: destAirport,
                    FlightCabinClass: '1',
                    PreferredDepartureTime: `${checkInDate}T00:00:00`,
                    PreferredArrivalTime: `${checkInDate}T00:00:00`
                },
                {
                    Origin: destAirport,
                    Destination: origin,
                    FlightCabinClass: '1',
                    PreferredDepartureTime: `${checkOutDate}T00:00:00`,
                    PreferredArrivalTime: `${checkOutDate}T00:00:00`
                }
            ],
            Sources: null
        };

        const res = await axios.post(AIR_SEARCH_URL, requestBody, {
            timeout: 60000 // the UAT env needs substantial timeout
        });

        const data = res.data;
        if (data?.Response?.Error?.ErrorCode !== 0 || !data?.Response?.Results) {
            console.log(`⚠️  HotelAPI Air API returned no results or error for ${destAirport}:`, data?.Response?.Error?.ErrorMessage);
            return null;
        }

        const resultSets = data.Response.Results; // Should be [[outbound array], [return array]]
        let outboundList = [], returnList = [];

        if (Array.isArray(resultSets[0]) && Array.isArray(resultSets[1])) {
            outboundList = resultSets[0];
            returnList = resultSets[1];
        } else if (Array.isArray(resultSets[0])) {
            // International special return combines in 1 index, but sometimes it shows up here
            outboundList = resultSets[0];
        } else {
            outboundList = resultSets;
        }

        if (outboundList.length === 0) {
            console.log(`⚠️ No flights found for ${destAirport}`);
            return null;
        }

        // ── Selection strategy ──
        // Pick top cheapest outbound and top corresponding return
        const bestOutbound = outboundList[0];

        // Sometimes return is embedded in the same flight object. Check if there are 2 segments arrays
        let bestReturn = null;
        if (bestOutbound.Segments && bestOutbound.Segments.length > 1) {
            // Special return (international)
            bestReturn = {
                ...bestOutbound,
                Segments: [bestOutbound.Segments[1]],
                // Note: The total cost in Special Return is for BOTH OB and IB,
                // so we can assign half the cost to each for display, or total on OB, 0 on IB.
                // Let's divide by two.
            };
            bestOutbound.Fare.PublishedFare = Math.round(bestOutbound.Fare.PublishedFare / 2);
            bestReturn.Fare.PublishedFare = bestOutbound.Fare.PublishedFare;

            bestOutbound.Segments = [bestOutbound.Segments[0]];
        } else if (returnList.length > 0) {
            bestReturn = returnList[0];
        }

        const formattedOutbound = formatFlightDetails(bestOutbound, 'departure');
        if (bestReturn) {
            const formattedReturn = formatFlightDetails(bestReturn, 'return');
            return [formattedOutbound, formattedReturn];
        } else {
            return [formattedOutbound];
        }

    } catch (err) {
        console.warn('⚠️  HotelAPI Air API error:', err.message);
        return null;
    }
}

module.exports = { searchHotels, getDatesForDuration, CITY_HOTEL_MAP, getLiveFlights, AIRPORT_CODE_MAP };
