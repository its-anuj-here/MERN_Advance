import express from "express";
const app = express();
app.get("/", (req, res) => res.send("Admin Service"));
app.listen(3002, () => console.log("Admin running on port 3002"));