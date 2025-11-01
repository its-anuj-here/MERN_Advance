import express from 'express';
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send(`Hello from App 1 running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`App 1 is running on http://localhost:${PORT}`);
});
