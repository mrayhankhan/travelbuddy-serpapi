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
    'europeanDestinations6.js',
    'swipeCards.js'
];

// Mapping keywords to fine-grained tags
const keywordMap = {
    'Beaches': ['beach', 'coast', 'sea', 'ocean', 'island', 'mediterranean', 'sand'],
    'Mountains': ['mountain', 'alps', 'peak', 'hike', 'climb', 'dolomites', 'highland'],
    'Green': ['forest', 'eco', 'park', 'lush', 'tree', 'garden'],
    'Volcanic': ['volcanic', 'volcano', 'geyser', 'lava', 'hot spring', 'crater'],
    'Snowy': ['snow', 'ski', 'winter', 'glacier', 'ice', 'arctic', 'aurora', 'frozen'],
    'Historic City': ['ruin', 'ancient', 'history', 'medieval', 'castle', 'renaissance', 'empire'],
    'Metropolis': ['capital', 'nightlife', 'urban', 'shopping', 'trendy', 'club', 'modern']
};

files.forEach(filename => {
    const filePath = path.join(srcDir, filename);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let matchedCount = 0;

    // For destinations data
    if (filename.includes('estinations')) {
        // Regex to match a destination block simply by matching { destinationId: ..., description: ..., tags: ..., vibeVector: ... }
        // It's easier to process line by line and track state.
        const lines = content.split('\n');
        let currentTags = [];
        let desc = '';

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let lineLower = line.toLowerCase();

            // Accumulate context (poor man's object tracking)
            if (lineLower.includes('description:')) {
                desc = lineLower;
            }

            // Check tags line
            if (lineLower.includes('tags:')) {
                let addedTags = [];
                let combinedContext = desc + ' ' + lineLower;
                for (const [newTag, keywords] of Object.entries(keywordMap)) {
                    if (keywords.some(k => combinedContext.includes(k))) {
                        addedTags.push(`'${newTag}'`);
                    }
                }

                if (addedTags.length > 0) {
                    // insert before closing bracket
                    lines[i] = line.replace(/]\s*,/, `, ${addedTags.join(', ')}],`).replace(/\[\s*,/, '['); // fix if empty, unlikely
                    matchedCount++;
                }
            }

            // Check vibeVector line
            if (lineLower.includes('vibevector:')) {
                let addedVecs = [];
                let combinedContext = desc + ' ' + lines[i - 1].toLowerCase(); // Look at tags line for context
                for (const [newTag, keywords] of Object.entries(keywordMap)) {
                    if (keywords.some(k => combinedContext.includes(k))) {
                        addedVecs.push(`${newTag}: 0.8`);
                    }
                }

                if (addedVecs.length > 0) {
                    lines[i] = line.replace(/}\s*,/, `, ${addedVecs.join(', ')} },`).replace(/{\s*,/, '{');
                }
            }
        }
        content = lines.join('\n');
    } else if (filename === 'swipeCards.js') {
        // similar but the structure is one long line per card usually
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let lineLower = line.toLowerCase();
            if (lineLower.includes('cardid:') && lineLower.includes('tags:')) {
                let addedTags = [];
                for (const [newTag, keywords] of Object.entries(keywordMap)) {
                    if (keywords.some(k => lineLower.includes(k))) {
                        addedTags.push(`'${newTag}'`);
                    }
                }
                if (addedTags.length > 0) {
                    // Find tags: [ ... ] and inject
                    lines[i] = line.replace(/tags:\s*\[([^\]]+)\]/, (match, p1) => {
                        return `tags: [${p1}, ${addedTags.join(', ')}]`;
                    });
                    matchedCount++;
                }
            }
        }
        content = lines.join('\n');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${matchedCount} objects in ${filename}`);
});
