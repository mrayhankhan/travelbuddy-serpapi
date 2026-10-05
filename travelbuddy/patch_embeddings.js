const fs = require('fs');
const path = require('path');

const embeddingsPath = path.resolve(__dirname, 'tagEmbeddings.json');
const embeddings = require(embeddingsPath);

function averageVectors(vecArr) {
    const dim = vecArr[0].length;
    const res = new Array(dim).fill(0);
    for (let i = 0; i < dim; i++) {
        for (const vec of vecArr) {
            res[i] += vec[i];
        }
        res[i] /= vecArr.length;
    }
    return res;
}

// Map fine-grained tags to existing ones or combinations
const newTags = {
    "Snowy": ["Snow", "Winter", "Cold"],
    "Volcanic": ["Nature", "Mountains", "Adventure"],
    "Green": ["Nature", "Forest", "Eco"],
    "Beaches": ["Beach", "Coastal", "Sea"],
    "Historic City": ["City", "Historic", "Culture"],
    "Metropolis": ["City", "Urban", "Social"]
};

let added = 0;
for (const [tag, baseTags] of Object.entries(newTags)) {
    if (!embeddings[tag]) {
        const vectors = baseTags.map(b => embeddings[b]).filter(Boolean);
        if (vectors.length > 0) {
            embeddings[tag] = averageVectors(vectors);
            added++;
        }
    }
}

fs.writeFileSync(embeddingsPath, JSON.stringify(embeddings, null, 2));
console.log(`Added ${added} new fine-grained tag embeddings.`);
