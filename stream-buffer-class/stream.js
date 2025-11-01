const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const rs = fs.createReadStream('./big-file.text');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  rs.pipe(res); // backpressure handled automatically
}).listen(3000);
