const http = require('http');
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const stream = require('stream');

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const busboy = new Busboy({ headers: req.headers, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB per file

    busboy.on('file', (fieldname, fileStream, filename, encoding, mimetype) => {
      console.log(`Receiving file [${fieldname}]: ${filename} (${mimetype})`);
      const saveTo = path.join(os.tmpdir(), `${Date.now()}-${path.basename(filename)}`);
      const writeStream = fs.createWriteStream(saveTo);

        // Use pipeline to handle errors and backpressure
        stream.pipeline(fileStream, writeStream, (err) => {
            if (err) {
            console.error('Pipeline failed', err);
            } else {
            console.log('Saved to', saveTo);
            }
        });
    });

    busboy.on('field', (fieldname, val) => {
      console.log('Field', fieldname, val);
    });

    busboy.on('finish', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Upload complete');
    });

    req.pipe(busboy);
    return;
  }

  // small upload page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<form method="POST" action="/upload" enctype="multipart/form-data">
    <input type="file" name="file"><button>Upload</button></form>`);
}).listen(3001, () => console.log('Busboy server on http://localhost:3001'));
