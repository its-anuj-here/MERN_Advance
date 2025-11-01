const rs = getReadableSomehow();
const ws = getWritableSomehow();

rs.on('data', (chunk) => {
  const ok = ws.write(chunk);
  if (!ok) {
    rs.pause();
    ws.once('drain', () => rs.resume());
  }
});

rs.on('end', () => ws.end());
