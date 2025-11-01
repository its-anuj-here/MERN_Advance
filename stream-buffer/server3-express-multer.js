// server-express-multer.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: path.join(__dirname, 'uploads/') }); 

const app = express();

app.post('/profile', upload.single('avatar'), (req, res) => {

  res.json({ file: req.file, body: req.body });
});

app.listen(3002, () => console.log('Express+multer on http://localhost:3002'));