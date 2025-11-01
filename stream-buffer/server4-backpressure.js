const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/sink') {
    const out = fs.createWriteStream('sink.bin');

    req.on('data', chunk => {
      // write returns false if the internal buffer is full
      const ok = out.write(chunk);
      if (!ok) {
        console.log('Pausing incoming stream because writable buffer full');
        req.pause(); // stop 'data' events
        out.once('drain', () => {
          console.log('Writable drained — resuming incoming stream');
          req.resume();
        });
      }
    });

    req.on('end', () => {
      out.end();
      res.end('ok');
    });

    req.on('error', err => {
      console.error(err);
      res.destroy();
    });
  } else {
    res.end('Send POST to /sink');
  }
}).listen(3003);