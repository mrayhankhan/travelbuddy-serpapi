const https = require('https');

const candidates = {
    bergen: 'https://images.unsplash.com/photo-1596422846543-74ce0ce37989?w=800&q=80', // valid street in bergen
    geneva: 'https://images.unsplash.com/photo-1594514588825-e51cbea881cd?w=800&q=80',
    oslo: 'https://images.unsplash.com/photo-1507726422365-2bc36b2d2fcd?w=800&q=80',
    florence: 'https://images.unsplash.com/photo-1542103448-ce2cf5b71db3?w=800&q=80',
    stockholm: 'https://images.unsplash.com/photo-1509895697621-125032b5cfb5?w=800&q=80',
    budapest: 'https://images.unsplash.com/photo-1565863016310-d78b7cdc6eda?w=800&q=80',
};

let checked = 0;
for (const [city, url] of Object.entries(candidates)) {
    https.get(url, (res) => {
        let result = (res.statusCode >= 200 && res.statusCode < 400) ? 'OK' : 'FAIL';
        console.log(`${city}: ${result} (${res.statusCode}) - ${url}`);
        checked++;
    }).on('error', (e) => {
        console.error(`Error with ${city}: ${e.message}`);
        checked++;
    });
}
