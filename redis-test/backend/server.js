import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(()=>{
        console.log("Connected to MongoDB...");
        app.listen(PORT, () => console.log(`Redis test app listening on port ${PORT}!`));
    })
    .catch(err => console.log(err));