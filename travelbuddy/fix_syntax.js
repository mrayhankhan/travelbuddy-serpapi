const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'server/src/data');
const files = [
    'destinations.js',
    'europeanDestinations.js',
    'europeanDestinations2.js',
    'europeanDestinations3.js',
    'europeanDestinations4.js',
    'europeanDestinations5.js',
    'europeanDestinations6.js'
];

files.forEach(filename => {
    const filePath = path.join(srcDir, filename);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    // Replace Historic City: 0.8 with 'Historic City': 0.8
    content = content.replace(/Historic City: /g, "'Historic City': ");
    // Do the same for Metropolis just in case, though it doesn't have spaces, it's safer. Actually Metropolis is single word, it's fine.
    fs.writeFileSync(filePath, content);
    console.log('Fixed', filename);
});
