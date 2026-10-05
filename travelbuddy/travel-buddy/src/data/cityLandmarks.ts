/**
 * cityLandmarks.ts
 *
 * Predefined city coordinates + landmark pins for Google Maps integration.
 * Using a static list avoids the Places API dynamic search entirely,
 * protecting your $300 free trial credit.
 *
 * ⚠️  IMPORTANT: Only cities with BOTH HotelAPI Hotel API + Air API support are listed.
 *     Source of truth: server/hotelApi_verification_report.json (bothAvailable: true)
 *     38 verified cities as of March 2026.
 *
 * To add a new city: copy any block and update coords/landmarks.
 * Landmark lat/lng values are fixed real-world coordinates.
 */
// elooo

export interface Landmark {
  name: string;
  lat: number;
  lng: number;
  description?: string; // short tooltip shown in the Street View card
}

export interface CityMapData {
  center: { lat: number; lng: number };
  zoom?: number; // optional per-city zoom override (default: 13)
  landmarks: Landmark[];
}

export const CITY_MAP_DATA: Record<string, CityMapData> = {

  // ── Paris (CDG) ──────────────────────────────────────────────────────────
  paris: {
    center: { lat: 48.8566, lng: 2.3522 },
    landmarks: [
      { name: 'Eiffel Tower',        lat: 48.8584, lng: 2.2945,  description: 'Iconic iron lattice tower on the Champ de Mars' },
      { name: 'Louvre Museum',       lat: 48.8606, lng: 2.3376,  description: "World's largest art museum" },
      { name: 'Arc de Triomphe',     lat: 48.8738, lng: 2.2950,  description: 'Iconic triumphal arch at the western end of the Champs-Élysées' },
      { name: 'Notre-Dame Cathedral',lat: 48.8530, lng: 2.3499,  description: 'Medieval Catholic cathedral on the Île de la Cité' },
      { name: 'Sacré-Cœur Basilica', lat: 48.8867, lng: 2.3431,  description: 'Stunning white basilica atop Montmartre hill' },
    ],
  },

  // ── Reykjavik (KEF) ──────────────────────────────────────────────────────
  reykjavik: {
    center: { lat: 64.1466, lng: -21.9426 },
    landmarks: [
      { name: 'Hallgrímskirkja',     lat: 64.1420, lng: -21.9267, description: 'Iceland\'s largest church with sweeping panoramic views' },
      { name: 'Harpa Concert Hall',  lat: 64.1503, lng: -21.9324, description: 'Stunning glass concert hall on the waterfront' },
      { name: 'Sun Voyager',         lat: 64.1472, lng: -21.9249, description: 'Iconic steel sculpture of a Viking dreamboat' },
      { name: 'Reykjavik Old Town',  lat: 64.1466, lng: -21.9426, description: 'Historic city centre with colourful houses' },
      { name: 'Perlan Museum',       lat: 64.1281, lng: -21.9221, description: 'Futuristic dome museum about Icelandic nature' },
    ],
  },

  // ── Bergen (BGO) ─────────────────────────────────────────────────────────
  bergen: {
    center: { lat: 60.3913, lng: 5.3221 },
    landmarks: [
      { name: 'Bryggen Wharf',       lat: 60.3975, lng: 5.3246, description: 'UNESCO World Heritage Hanseatic wharf' },
      { name: 'Fløibanen Funicular', lat: 60.3939, lng: 5.3296, description: 'Funicular railway up Mount Fløyen' },
      { name: 'Fish Market',         lat: 60.3938, lng: 5.3224, description: 'Vibrant outdoor seafood market since the 1200s' },
      { name: 'Bergenhus Fortress',  lat: 60.3984, lng: 5.3185, description: 'One of Norway\'s oldest and best-preserved fortresses' },
      { name: 'Fantoft Stave Church',lat: 60.3468, lng: 5.3350, description: 'Rebuilt medieval wooden stave church' },
    ],
  },

  // ── Istanbul (IST) ───────────────────────────────────────────────────────
  istanbul: {
    center: { lat: 41.0082, lng: 28.9784 },
    landmarks: [
      { name: 'Hagia Sophia',        lat: 41.0086, lng: 28.9802, description: 'Ancient cathedral-turned-mosque, a UNESCO site' },
      { name: 'Blue Mosque',         lat: 41.0054, lng: 28.9768, description: 'Ottoman masterpiece with six minarets' },
      { name: 'Topkapi Palace',      lat: 41.0115, lng: 28.9833, description: 'Lavish palace of Ottoman sultans for 400 years' },
      { name: 'Grand Bazaar',        lat: 41.0107, lng: 28.9681, description: 'One of the world\'s oldest and largest covered markets' },
      { name: 'Galata Tower',        lat: 41.0256, lng: 28.9742, description: 'Medieval stone tower with city panorama views' },
    ],
  },

  // ── Vienna (VIE) ─────────────────────────────────────────────────────────
  vienna: {
    center: { lat: 48.2082, lng: 16.3738 },
    landmarks: [
      { name: 'Schönbrunn Palace',   lat: 48.1845, lng: 16.3122, description: 'Imperial Baroque palace with 1,441 rooms' },
      { name: 'St. Stephen\'s Cathedral', lat: 48.2083, lng: 16.3731, description: 'Gothic cathedral at the heart of Vienna' },
      { name: 'Belvedere Palace',    lat: 48.1914, lng: 16.3806, description: 'Baroque palace complex housing Austrian art' },
      { name: 'Prater Park',         lat: 48.2167, lng: 16.4000, description: 'Famous park with the historic Riesenrad ferris wheel' },
      { name: 'Vienna State Opera',  lat: 48.2030, lng: 16.3694, description: 'One of the world\'s premier opera houses' },
    ],
  },

  // ── Lisbon (LIS) ─────────────────────────────────────────────────────────
  lisbon: {
    center: { lat: 38.7169, lng: -9.1395 },
    landmarks: [
      { name: 'Jerónimos Monastery', lat: 38.6977, lng: -9.2063, description: 'UNESCO World Heritage Manueline monastery' },
      { name: 'Tower of Belém',      lat: 38.6916, lng: -9.2160, description: 'Renaissance fortified tower on the Tagus River' },
      { name: 'Alfama District',     lat: 38.7138, lng: -9.1309, description: 'Oldest neighbourhood with Moorish origins' },
      { name: 'Sintra Palace',       lat: 38.7976, lng: -9.3908, description: 'Colourful royal palace in the mountains' },
      { name: 'Praça do Comércio',   lat: 38.7079, lng: -9.1364, description: 'Grand riverside plaza fronting the Tagus' },
    ],
  },

  // ── Copenhagen (CPH) ─────────────────────────────────────────────────────
  copenhagen: {
    center: { lat: 55.6761, lng: 12.5683 },
    landmarks: [
      { name: 'Tivoli Gardens',      lat: 55.6728, lng: 12.5684, description: 'Historic amusement park in the city centre' },
      { name: 'Nyhavn Harbour',      lat: 55.6800, lng: 12.5900, description: 'Colourful 17th-century waterfront canal' },
      { name: 'The Little Mermaid',  lat: 55.6930, lng: 12.5990, description: 'Famous bronze mermaid sculpture on a rock' },
      { name: 'Rosenborg Castle',    lat: 55.6855, lng: 12.5768, description: 'Renaissance castle home to the Crown Jewels' },
      { name: 'Christiansborg Palace', lat: 55.6763, lng: 12.5797, description: 'Denmark\'s parliament, Supreme Court, and PM\'s office' },
    ],
  },

  // ── Barcelona (BCN) ──────────────────────────────────────────────────────
  barcelona: {
    center: { lat: 41.3851, lng: 2.1734 },
    landmarks: [
      { name: 'Sagrada Família',     lat: 41.4036, lng: 2.1744, description: 'Gaudí\'s unfinished Modernist basilica masterpiece' },
      { name: 'Park Güell',          lat: 41.4145, lng: 2.1527, description: 'Gaudí-designed park with iconic mosaic terraces' },
      { name: 'Casa Batlló',         lat: 41.3916, lng: 2.1650, description: 'Gaudí\'s jaw-dropping renovated apartment block' },
      { name: 'La Rambla',           lat: 41.3783, lng: 2.1737, description: 'Famous tree-lined boulevard in the city centre' },
      { name: 'Gothic Quarter',      lat: 41.3833, lng: 2.1766, description: 'Medieval heart of the city with winding streets' },
    ],
  },

  // ── London (LHR) ─────────────────────────────────────────────────────────
  london: {
    center: { lat: 51.5074, lng: -0.1278 },
    landmarks: [
      { name: 'Tower of London',     lat: 51.5081, lng: -0.0759, description: 'Historic royal castle and home of the Crown Jewels' },
      { name: 'Big Ben',             lat: 51.5007, lng: -0.1246, description: 'Iconic clock tower at the Houses of Parliament' },
      { name: 'Buckingham Palace',   lat: 51.5014, lng: -0.1419, description: 'Official residence of the British sovereign' },
      { name: 'British Museum',      lat: 51.5194, lng: -0.1270, description: 'World-class museum of human history and culture' },
      { name: 'Tower Bridge',        lat: 51.5055, lng: -0.0754, description: 'Victorian bascule bridge over the Thames' },
    ],
  },

  // ── Nice (NCE) ───────────────────────────────────────────────────────────
  nice: {
    center: { lat: 43.7102, lng: 7.2620 },
    landmarks: [
      { name: 'Promenade des Anglais', lat: 43.6955, lng: 7.2686, description: 'Famous seafront boulevard along the Côte d\'Azur' },
      { name: 'Old Town Nice',       lat: 43.6961, lng: 7.2770, description: 'Baroque old town with Italian influence' },
      { name: 'Castle Hill',         lat: 43.6952, lng: 7.2809, description: 'Hilltop park with sweeping sea views' },
      { name: 'Matisse Museum',      lat: 43.7191, lng: 7.2729, description: 'Museum dedicated to Henri Matisse\'s work' },
      { name: 'Cours Saleya Market', lat: 43.6956, lng: 7.2763, description: 'Colourful daily flower and food market' },
    ],
  },

  // ── Milan (MXP) ──────────────────────────────────────────────────────────
  milan: {
    center: { lat: 45.4654, lng: 9.1859 },
    landmarks: [
      { name: 'Milano Duomo',        lat: 45.4641, lng: 9.1919, description: 'Gothic cathedral — 500 years in the making' },
      { name: 'Galleria Vittorio Emanuele II', lat: 45.4655, lng: 9.1896, description: 'World\'s oldest shopping mall with glass roof' },
      { name: 'Sforza Castle',       lat: 45.4706, lng: 9.1793, description: 'Monumental castle housing art collections' },
      { name: 'The Last Supper (Cenacolo)', lat: 45.4660, lng: 9.1708, description: 'Da Vinci\'s famous mural in Santa Maria delle Grazie' },
      { name: 'Pinacoteca di Brera', lat: 45.4717, lng: 9.1880, description: 'Italy\'s premier collection of Italian painting' },
    ],
  },

  // ── Lyon (LYS) ───────────────────────────────────────────────────────────
  lyon: {
    center: { lat: 45.7640, lng: 4.8357 },
    landmarks: [
      { name: 'Vieux Lyon',          lat: 45.7603, lng: 4.8272, description: 'UNESCO-listed medieval and Renaissance quarter' },
      { name: 'Fourvière Basilica',  lat: 45.7621, lng: 4.8222, description: 'Stunning basilica atop Fourvière hill' },
      { name: 'Parc de la Tête d\'Or', lat: 45.7767, lng: 4.8555, description: 'Vast park with a lake and free zoo' },
      { name: 'Les Halles de Lyon',  lat: 45.7609, lng: 4.8461, description: 'Paul Bocuse indoor gourmet food market' },
      { name: 'Place Bellecour',     lat: 45.7579, lng: 4.8328, description: 'One of Europe\'s largest public squares' },
    ],
  },

  // ── Thessaloniki (SKG) ───────────────────────────────────────────────────
  thessaloniki: {
    center: { lat: 40.6401, lng: 22.9444 },
    landmarks: [
      { name: 'White Tower',         lat: 40.6264, lng: 22.9484, description: 'Iconic Byzantine tower on the seafront' },
      { name: 'Rotunda',             lat: 40.6333, lng: 22.9516, description: 'Ancient Roman monument turned Byzantine church' },
      { name: 'Upper Town (Ano Poli)', lat: 40.6450, lng: 22.9472, description: 'Ottoman-era district with panoramic views' },
      { name: 'Arch of Galerius',    lat: 40.6330, lng: 22.9511, description: 'Triumphal arch from the 3rd century AD' },
      { name: 'Aristotelous Square', lat: 40.6322, lng: 22.9407, description: 'Central square lined with elegant arcaded buildings' },
    ],
  },

  // ── Glasgow (GLA) ────────────────────────────────────────────────────────
  glasgow: {
    center: { lat: 55.8642, lng: -4.2518 },
    landmarks: [
      { name: 'Glasgow Cathedral',   lat: 55.8630, lng: -4.2330, description: 'Medieval cathedral dating back to the 12th century' },
      { name: 'Kelvingrove Art Gallery', lat: 55.8682, lng: -4.2924, description: 'Outstanding free museum and art gallery' },
      { name: 'George Square',       lat: 55.8609, lng: -4.2499, description: 'Central civic square ringed with statues' },
      { name: 'Riverside Museum',    lat: 55.8627, lng: -4.3067, description: 'Award-winning museum of transport and travel' },
      { name: 'Glasgow Necropolis',  lat: 55.8641, lng: -4.2284, description: 'Victorian garden cemetery with grand monuments' },
    ],
  },

  // ── Stockholm (ARN) ──────────────────────────────────────────────────────
  stockholm: {
    center: { lat: 59.3293, lng: 18.0686 },
    landmarks: [
      { name: 'Gamla Stan',          lat: 59.3254, lng: 18.0714, description: 'Stockholm\'s old town on a medieval island' },
      { name: 'Vasa Museum',         lat: 59.3282, lng: 18.0914, description: 'Museum of a 17th-century warship salvaged intact' },
      { name: 'ABBA Museum',         lat: 59.3256, lng: 18.0978, description: 'Interactive museum celebrating the iconic pop group' },
      { name: 'Skansen',             lat: 59.3246, lng: 18.1043, description: 'World\'s first open-air museum with historic buildings' },
      { name: 'Royal Palace',        lat: 59.3267, lng: 18.0715, description: 'Official residence of the Swedish royal family' },
    ],
  },

  // ── Oslo (OSL) ───────────────────────────────────────────────────────────
  oslo: {
    center: { lat: 59.9139, lng: 10.7522 },
    landmarks: [
      { name: 'Vigeland Sculpture Park', lat: 59.9272, lng: 10.6997, description: 'World\'s largest sculpture park by a single artist' },
      { name: 'Viking Ship Museum',  lat: 59.9047, lng: 10.6847, description: 'Museum housing three remarkably preserved Viking ships' },
      { name: 'Oslo Opera House',    lat: 59.9076, lng: 10.7541, description: 'Modern opera house with a marble roof to walk on' },
      { name: 'Akershus Fortress',   lat: 59.9081, lng: 10.7369, description: 'Medieval castle and fortress overlooking the fjord' },
      { name: 'Fram Museum',         lat: 59.9024, lng: 10.6999, description: 'Museum of the famous polar exploration ship Fram' },
    ],
  },

  // ── Berlin (BER) ─────────────────────────────────────────────────────────
  berlin: {
    center: { lat: 52.5200, lng: 13.4050 },
    landmarks: [
      { name: 'Brandenburg Gate',    lat: 52.5163, lng: 13.3777, description: 'Neoclassical triumphal arch — Berlin\'s most famous landmark' },
      { name: 'Reichstag Building',  lat: 52.5186, lng: 13.3762, description: 'Historic parliament building with glass dome' },
      { name: 'Museum Island',       lat: 52.5169, lng: 13.4017, description: 'UNESCO World Heritage site with 5 world-class museums' },
      { name: 'Berlin Wall Memorial',lat: 52.5351, lng: 13.3900, description: 'Preserved section of the historic Berlin Wall' },
      { name: 'Checkpoint Charlie',  lat: 52.5076, lng: 13.3904, description: 'Famous Cold War crossing point between East and West Berlin' },
    ],
  },

  // ── Brussels (BRU) ───────────────────────────────────────────────────────
  brussels: {
    center: { lat: 50.8503, lng: 4.3517 },
    landmarks: [
      { name: 'Grand Place',         lat: 50.8467, lng: 4.3525, description: 'UNESCO-listed central square with Gothic Town Hall' },
      { name: 'Atomium',             lat: 50.8947, lng: 4.3415, description: 'Iconic 102m steel atom structure from Expo 58' },
      { name: 'Manneken Pis',        lat: 50.8450, lng: 4.3498, description: 'The tiny but famous bronze boy fountain' },
      { name: 'Royal Palace',        lat: 50.8421, lng: 4.3637, description: 'Official palace of the Belgian royal family' },
      { name: 'Cinquantenaire Park', lat: 50.8406, lng: 4.3941, description: 'Stunning park with a majestic triumphal arch' },
    ],
  },

  // ── Warsaw (WAW) ─────────────────────────────────────────────────────────
  warsaw: {
    center: { lat: 52.2297, lng: 21.0122 },
    landmarks: [
      { name: 'Old Town Market Place', lat: 52.2497, lng: 21.0120, description: 'Beautifully reconstructed UNESCO World Heritage square' },
      { name: 'Palace of Culture',   lat: 52.2317, lng: 21.0063, description: 'Iconic Soviet-era skyscraper dominating the skyline' },
      { name: 'Royal Castle',        lat: 52.2478, lng: 21.0144, description: 'Residences of Polish monarchs on the castle square' },
      { name: 'Lazienki Park',       lat: 52.2150, lng: 21.0353, description: 'Romantic park with the Palace on the Isle' },
      { name: 'Warsaw Uprising Museum', lat: 52.2322, lng: 20.9812, description: 'Moving tribute to the 1944 Warsaw Uprising' },
    ],
  },

  // ── Split (SPU) ──────────────────────────────────────────────────────────
  split: {
    center: { lat: 43.5081, lng: 16.4402 },
    landmarks: [
      { name: 'Diocletian\'s Palace', lat: 43.5083, lng: 16.4394, description: 'UNESCO-listed Roman palace where people still live' },
      { name: 'Meštrović Gallery',   lat: 43.5082, lng: 16.4264, description: 'Gallery in sculptor Ivan Meštrović\'s former home' },
      { name: 'Riva Promenade',      lat: 43.5066, lng: 16.4394, description: 'Bustling palm-lined seafront promenade' },
      { name: 'Klis Fortress',       lat: 43.5436, lng: 16.5397, description: 'Medieval hilltop fortress with panoramic views' },
      { name: 'Cathedral of Saint Domnius', lat: 43.5084, lng: 16.4403, description: 'One of the world\'s oldest Catholic cathedrals' },
    ],
  },

  // ── Prague (PRG) ─────────────────────────────────────────────────────────
  prague: {
    center: { lat: 50.0755, lng: 14.4378 },
    landmarks: [
      { name: 'Prague Castle',       lat: 50.0911, lng: 14.4008, description: 'Largest ancient castle complex in the world' },
      { name: 'Charles Bridge',      lat: 50.0865, lng: 14.4114, description: 'Baroque bridge adorned with 30 statues' },
      { name: 'Old Town Square',     lat: 50.0875, lng: 14.4213, description: 'Historic square with medieval Astronomical Clock' },
      { name: 'Wenceslas Square',    lat: 50.0813, lng: 14.4280, description: 'City\'s commercial centre and gathering place' },
      { name: 'Josefov Quarter',     lat: 50.0904, lng: 14.4178, description: 'Historic Jewish quarter with six synagogues' },
    ],
  },

  // ── Helsinki (HEL) ───────────────────────────────────────────────────────
  helsinki: {
    center: { lat: 60.1699, lng: 24.9384 },
    landmarks: [
      { name: 'Helsinki Cathedral',  lat: 60.1699, lng: 24.9505, description: 'Iconic neoclassical cathedral in Senate Square' },
      { name: 'Market Square',       lat: 60.1676, lng: 24.9522, description: 'Vibrant waterfront market — city\'s social hub' },
      { name: 'Suomenlinna Fortress',lat: 60.1454, lng: 24.9880, description: 'UNESCO sea fortress on islands off Helsinki' },
      { name: 'Temppeliaukio Church',lat: 60.1726, lng: 24.9252, description: 'Remarkable church carved directly into rock' },
      { name: 'Design Museum',       lat: 60.1644, lng: 24.9467, description: 'Leading authority on Finnish design and architecture' },
    ],
  },

  // ── Tallinn (TLL) ────────────────────────────────────────────────────────
  tallinn: {
    center: { lat: 59.4370, lng: 24.7536 },
    landmarks: [
      { name: 'Toompea Castle',      lat: 59.4360, lng: 24.7387, description: 'Historic limestone castle on Toompea hill' },
      { name: 'Alexander Nevsky Cathedral', lat: 59.4356, lng: 24.7399, description: 'Russian Orthodox cathedral with stunning domes' },
      { name: 'Tallinn Old Town',    lat: 59.4370, lng: 24.7484, description: 'UNESCO-listed medieval old town' },
      { name: 'Kadriorg Palace',     lat: 59.4377, lng: 24.7947, description: 'Baroque palace built by Peter the Great' },
      { name: 'Viru Gate',           lat: 59.4370, lng: 24.7519, description: 'Medieval tower gate into old town' },
    ],
  },

  // ── Vilnius (VNO) ────────────────────────────────────────────────────────
  vilnius: {
    center: { lat: 54.6872, lng: 25.2797 },
    landmarks: [
      { name: 'Vilnius Cathedral',   lat: 54.6861, lng: 25.2871, description: 'Grand neoclassical cathedral on Cathedral Square' },
      { name: 'Gediminas Castle Tower', lat: 54.6869, lng: 25.2896, description: 'Iconic hilltop tower with city panorama' },
      { name: 'Gates of Dawn',       lat: 54.6791, lng: 25.2863, description: 'Last surviving city gate hosting a sacred chapel' },
      { name: 'Uzupis Republic',     lat: 54.6813, lng: 25.2960, description: 'Quirky self-declared artistic micro-republic' },
      { name: 'Vilnius Old Town',    lat: 54.6837, lng: 25.2843, description: 'UNESCO-listed Baroque old town — largest in Eastern Europe' },
    ],
  },

  // ── Manchester (MAN) ─────────────────────────────────────────────────────
  manchester: {
    center: { lat: 53.4808, lng: -2.2426 },
    landmarks: [
      { name: 'Manchester Museum',   lat: 53.4663, lng: -2.2342, description: 'University museum with natural history collections' },
      { name: 'Castlefield Urban Heritage Park', lat: 53.4733, lng: -2.2516, description: 'Roman fort ruins in a canalside park' },
      { name: 'Spinningfields',      lat: 53.4795, lng: -2.2512, description: 'Modern business district with fine dining and bars' },
      { name: 'Manchester Cathedral',lat: 53.4847, lng: -2.2441, description: 'Medieval cathedral in the heart of the city' },
      { name: 'Northern Quarter',    lat: 53.4833, lng: -2.2334, description: 'Trendy creative district with indie cafés and shops' },
    ],
  },

  // ── Izmir (ADB) ──────────────────────────────────────────────────────────
  izmir: {
    center: { lat: 38.4237, lng: 27.1428 },
    landmarks: [
      { name: 'Kemeraltı Bazaar',    lat: 38.4190, lng: 27.1387, description: 'Historic Ottoman covered bazaar with 4,000 shops' },
      { name: 'Konak Square',        lat: 38.4176, lng: 27.1289, description: 'Central square with the famous clock tower' },
      { name: 'Ephesus',             lat: 37.9395, lng: 27.3417, description: 'Spectacular ancient Greek and Roman city ruins' },
      { name: 'Kadifekale Castle',   lat: 38.4144, lng: 27.1499, description: 'Ancient hilltop fortress with panoramic bay views' },
      { name: 'Kordon Promenade',    lat: 38.4300, lng: 27.1400, description: 'Breezy seafront promenade with cafés and sea views' },
    ],
  },

  // ── Corfu (CFU) ──────────────────────────────────────────────────────────
  corfu: {
    center: { lat: 39.6243, lng: 19.9217 },
    landmarks: [
      { name: 'Old Fortress of Corfu', lat: 39.6237, lng: 19.9295, description: 'Formidable Venetian sea fortress on a promontory' },
      { name: 'Spianada Square',     lat: 39.6239, lng: 19.9249, description: 'One of the largest squares in the Balkans' },
      { name: 'Achilleion Palace',   lat: 39.5742, lng: 19.9203, description: 'Empress Sissi\'s neoclassical palace and gardens' },
      { name: 'Palace of St. Michael & St. George', lat: 39.6252, lng: 19.9238, description: 'Neoclassical British colonial palace' },
      { name: 'Corfu Old Town',      lat: 39.6245, lng: 19.9215, description: 'UNESCO World Heritage Venetian old town' },
    ],
  },

  // ── Tenerife (TFS) ───────────────────────────────────────────────────────
  tenerife: {
    center: { lat: 28.2916, lng: -16.6291 },
    zoom: 11,
    landmarks: [
      { name: 'Mount Teide',         lat: 28.2726, lng: -16.6426, description: 'Spain\'s highest peak inside a spectacular national park' },
      { name: 'Los Gigantes Cliffs', lat: 28.2460, lng: -16.8418, description: 'Dramatic black volcanic cliffs rising 600m from the sea' },
      { name: 'Siam Park',           lat: 28.0739, lng: -16.7199, description: 'World\'s best water park in a Thai-themed setting' },
      { name: 'Anaga Rural Park',    lat: 28.5429, lng: -16.2157, description: 'UNESCO Biosphere with ancient Canarian laurisilva forest' },
      { name: 'Santa Cruz de Tenerife', lat: 28.4636, lng: -16.2518, description: 'Cosmopolitan capital with great shopping and carnival' },
    ],
  },

  // ── Faro (FAO) ───────────────────────────────────────────────────────────
  faro: {
    center: { lat: 37.0194, lng: -7.9322 },
    landmarks: [
      { name: 'Faro Old Town',       lat: 37.0155, lng: -7.9327, description: 'Walled Cidade Velha with Roman and Moorish history' },
      { name: 'Faro Cathedral',      lat: 37.0148, lng: -7.9316, description: 'Stunning cathedral with a rooftop view of the Ria Formosa' },
      { name: 'Ria Formosa Nature Reserve', lat: 37.0000, lng: -7.9000, description: 'Beautiful coastal lagoon with flamingos and wildlife' },
      { name: 'Bone Chapel (Carmo Church)', lat: 37.0182, lng: -7.9328, description: 'Gothic church with a chapel decorated with human bones' },
      { name: 'Faro Marina',         lat: 37.0178, lng: -7.9401, description: 'Pretty marina lined with seafood restaurants' },
    ],
  },

  // ── Marseille (MRS) ──────────────────────────────────────────────────────
  marseille: {
    center: { lat: 43.2965, lng: 5.3698 },
    landmarks: [
      { name: 'Notre-Dame de la Garde', lat: 43.2841, lng: 5.3713, description: 'Basilica on a hilltop with a golden Madonna statue' },
      { name: 'Vieux-Port',          lat: 43.2951, lng: 5.3749, description: 'Old port bustling with fishing boats and seafood' },
      { name: 'MuCEM',               lat: 43.2968, lng: 5.3618, description: 'Museum of European and Mediterranean Civilisations' },
      { name: 'Calanques National Park', lat: 43.2100, lng: 5.4700, description: 'Stunning coastal park with turquoise coves' },
      { name: 'Château d\'If',       lat: 43.2797, lng: 5.3248, description: 'Island fortress — inspiration for The Count of Monte Cristo' },
    ],
  },

  // ── Frankfurt (FRA) ──────────────────────────────────────────────────────
  frankfurt: {
    center: { lat: 50.1109, lng: 8.6821 },
    landmarks: [
      { name: 'Römerberg Square',    lat: 50.1107, lng: 8.6824, description: 'Historic medieval square with timbered houses' },
      { name: 'Städel Museum',       lat: 50.1043, lng: 8.6823, description: 'One of Germany\'s most important art museums' },
      { name: 'Frankfurt Cathedral', lat: 50.1107, lng: 8.6869, description: 'Gothic red-sandstone imperial cathedral' },
      { name: 'Palmengarten',        lat: 50.1237, lng: 8.6532, description: 'Beautiful botanical garden and greenhouse complex' },
      { name: 'Main Tower',          lat: 50.1130, lng: 8.6742, description: 'Observe deck with panoramic views of the city' },
    ],
  },

  // ── Düsseldorf (DUS) ─────────────────────────────────────────────────────
  dusseldorf: {
    center: { lat: 51.2217, lng: 6.7762 },
    landmarks: [
      { name: 'Altstadt (Old Town)', lat: 51.2229, lng: 6.7762, description: 'The "longest bar in the world" with 300+ pubs' },
      { name: 'Königsallee',         lat: 51.2220, lng: 6.7793, description: 'Elegant boulevard lined with luxury boutiques' },
      { name: 'Rheinturm',           lat: 51.2129, lng: 6.7656, description: 'TV tower with digital clock and viewing platform' },
      { name: 'K21 Museum',          lat: 51.2225, lng: 6.7847, description: 'Contemporary art in a 19th-century parliament' },
      { name: 'Media Harbour (Medienhafen)', lat: 51.2136, lng: 6.7649, description: 'Revitalised docks with Frank Gehry buildings' },
    ],
  },

  // ── Verona (VRN) ─────────────────────────────────────────────────────────
  verona: {
    center: { lat: 45.4384, lng: 10.9916 },
    landmarks: [
      { name: 'Verona Arena',        lat: 45.4388, lng: 10.9941, description: 'Remarkably preserved 1st-century Roman amphitheatre' },
      { name: 'Juliet\'s House',     lat: 45.4421, lng: 10.9986, description: 'Medieval house with famous balcony from Romeo & Juliet' },
      { name: 'Piazza delle Erbe',   lat: 45.4435, lng: 10.9981, description: 'Lively medieval market square with Roman ruins below' },
      { name: 'Castel San Pietro',   lat: 45.4467, lng: 11.0012, description: 'Hilltop castle with sweeping views of Verona' },
      { name: 'Basilica of San Zeno', lat: 45.4412, lng: 10.9830, description: 'Magnificent Romanesque basilica with a rose window' },
    ],
  },

  // ── Wrocław (WRO) ────────────────────────────────────────────────────────
  wroclaw: {
    center: { lat: 51.1079, lng: 17.0385 },
    landmarks: [
      { name: 'Old Market Square (Rynek)', lat: 51.1100, lng: 17.0327, description: 'One of the largest medieval market squares in Europe' },
      { name: 'Wrocław Cathedral',   lat: 51.1155, lng: 17.0469, description: 'Gothic cathedral on the picturesque Cathedral Island' },
      { name: 'Panorama of the Battle of Racławice', lat: 51.1025, lng: 17.0305, description: '114-meter panoramic painting of an 18th-century battle' },
      { name: 'Centennial Hall',     lat: 51.1069, lng: 17.0760, description: 'UNESCO landmark — monument of early 20th-century modernist architecture' },
      { name: 'Dwarf Statues',       lat: 51.1100, lng: 17.0327, description: 'Whimsical bronze dwarfs scattered around the city' },
    ],
  },

  // ── Belgrade (BEG) ───────────────────────────────────────────────────────
  belgrade: {
    center: { lat: 44.8176, lng: 20.4569 },
    landmarks: [
      { name: 'Belgrade Fortress (Kalemegdan)', lat: 44.8228, lng: 20.4486, description: 'Impressive fortress at the confluence of the Sava and Danube' },
      { name: 'Nikola Tesla Museum', lat: 44.8006, lng: 20.4682, description: 'Museum dedicated to the great inventor in his adopted city' },
      { name: 'Skadarlija',          lat: 44.8183, lng: 20.4643, description: 'Charming 19th-century bohemian quarter with restaurants' },
      { name: 'Temple of Saint Sava', lat: 44.7994, lng: 20.4686, description: 'One of the world\'s largest Orthodox churches' },
      { name: 'Knez Mihailova Street', lat: 44.8188, lng: 20.4586, description: 'Elegant pedestrian boulevard — the city\'s main promenade' },
    ],
  },

  // ── Paphos (PFO) ─────────────────────────────────────────────────────────
  paphos: {
    center: { lat: 34.7754, lng: 32.4244 },
    landmarks: [
      { name: 'Paphos Archaeological Park', lat: 34.7571, lng: 32.4072, description: 'UNESCO site with extraordinary Roman floor mosaics' },
      { name: 'Paphos Castle',       lat: 34.7530, lng: 32.4095, description: 'Medieval sea castle guarding the old harbour' },
      { name: 'Aphrodite\'s Rock',   lat: 34.7064, lng: 32.6139, description: 'Legendary birthplace of Aphrodite on the coast' },
      { name: 'Tombs of the Kings',  lat: 34.7755, lng: 32.3978, description: 'UNESCO site with underground 4th-century BC tombs' },
      { name: 'Kato Paphos Harbour', lat: 34.7539, lng: 32.4112, description: 'Charming old harbour lined with seafood restaurants' },
    ],
  },

  // ── Varna (VAR) ──────────────────────────────────────────────────────────
  varna: {
    center: { lat: 43.2141, lng: 27.9147 },
    landmarks: [
      { name: 'Varna Archaeological Museum', lat: 43.2089, lng: 27.9040, description: 'Home to the world\'s oldest gold treasure (6,000 years old)' },
      { name: 'Cathedral of the Assumption', lat: 43.2123, lng: 27.9155, description: 'Monumental neo-Byzantine cathedral in the city centre' },
      { name: 'Sea Garden',          lat: 43.2050, lng: 27.9350, description: 'Beautiful coastal park stretching along the Black Sea' },
      { name: 'Roman Thermae',       lat: 43.2074, lng: 27.9167, description: 'Largest Late Roman thermal baths in Bulgaria' },
      { name: 'Varna Beach',         lat: 43.2000, lng: 27.9400, description: 'Popular Golden Sands Black Sea beach resort' },
    ],
  },

  // ── Cluj-Napoca (CLJ) ────────────────────────────────────────────────────
  clujnapoca: {
    center: { lat: 46.7712, lng: 23.6236 },
    landmarks: [
      { name: 'St. Michael\'s Church', lat: 46.7700, lng: 23.5895, description: 'Gothic church — one of the largest in Transylvania' },
      { name: 'Unirii Square',       lat: 46.7699, lng: 23.5895, description: 'Grand central square with baroque and gothic buildings' },
      { name: 'Botanical Garden',    lat: 46.7598, lng: 23.5875, description: 'Beautiful 14-hectare garden with exotic plants' },
      { name: 'Cluj Napoca National Art Museum', lat: 46.7703, lng: 23.5893, description: 'Baroque palace housing Romanian fine art' },
      { name: 'Aleea Trandafirilor', lat: 46.7730, lng: 23.5990, description: 'Central park promenade perfect for an evening stroll' },
    ],
  },

};

/**
 * getLandmarksForCity
 *
 * Returns the map data for a city by name (case-insensitive).
 * Falls back to undefined if the city is not in our list.
 * Only cities with BOTH HotelAPI Hotel + Air API support are included.
 */
export function getCityMapData(cityName: string): CityMapData | undefined {
  const key = cityName.toLowerCase().replace(/[^a-z]/g, '');
  return CITY_MAP_DATA[key];
}

/**
 * HotelAPI-verified city list (for display/validation elsewhere in the app).
 * These 38 cities all have confirmed Hotel API + Air API availability.
 */
export const HotelAPI_VALID_CITIES = Object.keys(CITY_MAP_DATA);
