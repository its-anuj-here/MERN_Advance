const express = require("express");
const path = require("path");
const busboyUploadMiddleware = require("./middleware/upload");

const app = express();
const PORT = 3000;
app.use(express.static("public"));
app.use(express.json());

app.use(busboyUploadMiddleware(path.join(__dirname, "uploads")));

app.post("/upload", (req, res) => {
  console.log("Fields:", req.body);
  console.log("Files:", req.files);

  res.json({
    status: "success",
    fields: req.body,
    files: req.files,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
