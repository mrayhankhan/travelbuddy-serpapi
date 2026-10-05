const http = require('http');

const data = JSON.stringify({
  sessionId: "65d8b849e7b1c4a0fd1a5f6a" // Need a real Session object ID if we want to test finding it
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/destinations/shortlist',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
