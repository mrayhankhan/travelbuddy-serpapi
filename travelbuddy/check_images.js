const https = require('https');

const CITY_IMAGES = {
    'tromsø': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    'reykjavik': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    'tallinn': 'https://images.unsplash.com/photo-1549893072-4bc678117f45?w=800&q=80',
    'prague': 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    'bergen': 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80',
    'santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    'istanbul': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    'helsinki': 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800&q=80',
    'amsterdam': 'https://images.unsplash.com/photo-1459679749680-18eb1eb37418?q=80&w=1170&auto=format&fit=crop',
    'vienna': 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
    'budapest': 'https://images.unsplash.com/photo-1565863016310-d78b7cdc6eda?w=800&q=80',
    'lisbon': 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=800&q=80',
    'copenhagen': 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80',
    'dubrovnik': 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80',
    'athens': 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=800&q=80',
    'edinburgh': 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=800&q=80',
    'geneva': 'https://images.unsplash.com/photo-1594514588825-e51cbea881cd?w=800&q=80',
    'oslo': 'https://images.unsplash.com/photo-1507726422365-2bc36b2d2fcd?w=800&q=80',
    'florence': 'https://images.unsplash.com/photo-1542103448-ce2cf5b71db3?w=800&q=80',
    'stockholm': 'https://images.unsplash.com/photo-1509895697621-125032b5cfb5?w=800&q=80',
};

for (const [city, url] of Object.entries(CITY_IMAGES)) {
    https.get(url, (res) => {
        console.log(`${city}: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Error with ${city}: ${e.message}`);
    });
}
