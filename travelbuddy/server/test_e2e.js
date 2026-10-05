const http = require('http');

function makeRequest(path, data) {
    return new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'localhost',
            port: 5001,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(data))
            }
        }, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });
        req.on('error', e => reject(e));
        req.write(JSON.stringify(data));
        req.end();
    });
}

async function run() {
    try {
        console.log('1. Creating session...');
        const sessionRes = await makeRequest('/api/session', { budget: 150000, travelers: 2, duration: 7 });
        console.log('Session response:', sessionRes.status, sessionRes.body);
        if (sessionRes.status !== 200) return;
        
        const { sessionId } = JSON.parse(sessionRes.body);
        
        console.log('\n2. Swiping...');
        await makeRequest('/api/swipe', { sessionId, cardId: 'v-nature-1', stage: 'vibes', direction: 'LIKE' });
        await makeRequest('/api/swipe', { sessionId, cardId: 'v-nature-2', stage: 'vibes', direction: 'LIKE' });
        await makeRequest('/api/swipe', { sessionId, cardId: 'a-hiking-1', stage: 'activities', direction: 'LIKE' });
        
        console.log('\n3. Getting Shortlist...');
        const shortlistRes = await makeRequest('/api/destinations/shortlist', { sessionId });
        console.log('Shortlist status:', shortlistRes.status);
        console.log('Shortlist body:', shortlistRes.body.substring(0, 500) + '...');
    } catch (err) {
        console.error('Test failed:', err);
    }
}
run();
