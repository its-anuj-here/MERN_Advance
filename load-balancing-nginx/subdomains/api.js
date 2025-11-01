import express from "express";
const app = express();
app.get("/", (req, res) => res.send("API Service"));
app.listen(3001, () => console.log("API running on port 3001"));
