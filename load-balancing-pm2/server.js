import http from 'http';

const server = http.createServer((req, res) => {
  console.log(`Request received by IP : ${req.socket.remoteAddress} on process : ${process.pid}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Handled by process : ${process.pid}\n`);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/ , handled by process ${process.pid}`);
});