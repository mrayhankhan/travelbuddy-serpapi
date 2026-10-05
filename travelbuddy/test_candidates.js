const https = require('https');

const candidates = {
    bergen: 'https://images.unsplash.com/photo-1542105436-12c5bda2fb0d?w=800&q=80',
    geneva: 'https://images.unsplash.com/photo-1601625463688-6921319c8f04?w=800&q=80',
    oslo: 'https://images.unsplash.com/photo-1555523916-d86b72eddf2c?w=800&q=80',
    florence: 'https://images.unsplash.com/photo-1541358983935-80252cf91f03?w=800&q=80',
    stockholm: 'https://images.unsplash.com/photo-1509356843151-383321155919?w=800&q=80',
    budapest: 'https://images.unsplash.com/photo-1549877452-9c38728ec085?w=800&q=80',
};

let checked = 0;
for (const [city, url] of Object.entries(candidates)) {
    https.get(url, (res) => {
        console.log(`${city}: ${res.statusCode === 200 ? 'OK' : 'FAIL'} - ${url}`);
        checked++;
    }).on('error', (e) => {
        console.error(`Error with ${city}: ${e.message}`);
        checked++;
    });
}
