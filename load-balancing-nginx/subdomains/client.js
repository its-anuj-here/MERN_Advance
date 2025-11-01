import express from "express";
const app = express();
app.get("/", (req, res) => res.send("Client Frontend"));
app.listen(3003, () => console.log("Client running on port 3003"));