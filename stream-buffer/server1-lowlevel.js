// server-lowlevel.js
const http = require('http');
const { StringDecoder } = require('string_decoder');

const MAX_BYTES = 1 * 1024 * 1024; // 1 MB limit

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/json') {
    // Parse JSON manually using 'data'/'end'
    let received = 0;
    const chunks = [];
    req.on('data', chunk => {
      received += chunk.length;
      if (received > MAX_BYTES) {
        // Protect from DoS — stop reading
        res.writeHead(413, { 'Content-Type': 'text/plain' });
        res.end('Payload too large');
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        const obj = JSON.parse(raw);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, got: obj }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });

    req.on('error', (err) => {
      console.error('Request error', err);
      res.writeHead(500); res.end('Server error');
    });
    return;
  }

  // Demo: stream a file back to client
  if (req.method === 'GET' && req.url === '/bigfile') {
    const fs = require('fs');
    const stream = fs.createReadStream('some-large-file.dat');
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    // Stream to client; Node manages backpressure.
    stream.pipe(res);
    stream.on('error', (err) => {
      console.error(err); res.end();
    });
    return;
  }

  // default
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<h3>Send POST to /json</h3>`);
});

server.listen(3000, () => console.log('Low-level server on http://localhost:3000'));
