const candidates = {
    bergen: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Bryggen_2011.jpg',
    geneva: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Geneve_2005_001_p1000626.jpg',
    oslo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Oslo_Operahuset.jpg',
    florence: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Florence_view_from_Piazzale_Michelangelo.jpg',
    stockholm: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Stockholm_Gamla_Stan_City_Skyline.jpg',
    budapest: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Budapest_-_Hungarian_Parliament_%2827184206013%29.jpg',
};

const https = require('https');
let checked = 0;

for (const [city, url] of Object.entries(candidates)) {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let result = (res.statusCode >= 200 && res.statusCode < 400) ? 'OK' : 'FAIL';
        console.log(`${city}: ${result} (${res.statusCode}) - ${url}`);
        checked++;
    }).on('error', (e) => {
        console.error(`Error with ${city}: ${e.message}`);
        checked++;
    });
}
