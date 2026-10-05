const http = require('http');
const fs = require('fs');

async function testApi() {
  let log = '';
  const pushLog = msg => { log += msg + '\n'; console.log(msg); };

  const request = (path, data) => new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost', port: 5000, path: path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(data)) }
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });

  try {
    pushLog('Creating session...');
    const sessionRes = await request('/api/session', { departureCity: 'NY', duration: 7, travelers: 2, budget: 150000 });
    pushLog(`Session Response: ${sessionRes.status} ${sessionRes.body}`);
    if (sessionRes.status !== 201) throw new Error('Failed to create session');
    
    const sid = JSON.parse(sessionRes.body).sessionId;
    
    pushLog('Requesting shortlist...');
    const shortlistRes = await request('/api/destinations/shortlist', { sessionId: sid });
    pushLog(`Shortlist Response: ${shortlistRes.status} \n${shortlistRes.body.substring(0,200)}...`);
    
  } catch (err) {
    pushLog('ERROR: ' + err.message);
  }
  fs.writeFileSync('test_out.txt', log);
}
testApi();
