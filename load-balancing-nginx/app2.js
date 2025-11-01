import express from 'express';
const app = express();
const PORT = 3002;

app.get('/', (req, res) => {
  res.send(`Hello from App 2 running on port ${PORT}`);
});
app.listen(PORT, () => {
  console.log(`App 2 is running on http://localhost:${PORT}`);
});