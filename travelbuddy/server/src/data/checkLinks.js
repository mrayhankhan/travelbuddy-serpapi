const cards = require('./swipeCards.js');

async function checkImageUrls() {
    // 1. Map URLs to their respective Card IDs and Titles
    const urlTracker = new Map();
    
    cards.forEach(card => {
        // Handle both swipeCards.js and mockData.ts ID structures
        const id = card.cardId || card.id; 
        const title = card.title || 'Unknown Title';
        
        // Combine ID and Title for better readability
        const cardIdentifier = `${id} (${title})`;

        const trackUrl = (url) => {
            if (!urlTracker.has(url)) {
                urlTracker.set(url, new Set());
            }
            urlTracker.get(url).add(cardIdentifier);
        };

        if (card.image) trackUrl(card.image);
        if (Array.isArray(card.extraImages)) {
            card.extraImages.forEach(url => trackUrl(url));
        }
    });

    console.log(`🔍 Extracted ${urlTracker.size} unique image URLs to check.\n`);
    
    const brokenUrls = [];

    // 2. Ping each URL
    for (const [url, cardSet] of urlTracker.entries()) {
        const affectedCards = Array.from(cardSet).join(', ');

        try {
            const response = await fetch(url, { method: 'HEAD' });
            
            if (!response.ok) {
                // Changed key to 'affectedCards' so the table column header makes sense
                brokenUrls.push({ affectedCards, status: response.status, url });
                console.log(`❌ Broken: ${url} (HTTP ${response.status}) -> Cards: [${affectedCards}]`);
            }
        } catch (error) {
            brokenUrls.push({ affectedCards, error: error.message, url });
            console.log(`⚠️ Error: ${url} - ${error.message} -> Cards: [${affectedCards}]`);
        }
    }

    // 3. Print Summary
    console.log('\n\n═══ SUMMARY ═══');
    if (brokenUrls.length === 0) {
        console.log('✅ All image URLs are working perfectly!');
    } else {
        console.log(`🚨 Found ${brokenUrls.length} broken or inaccessible URLs.`);
        console.table(brokenUrls);
    }
}

checkImageUrls();