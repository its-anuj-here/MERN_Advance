import express, { json } from "express";
import User from "../models/User.js";
import redisClient from "../redisClient.js";

const router = express.Router();

router.get("/:id", async (req, res)=>{
    const userId = req.params.id;

    try {
        const cachedUser = await redisClient.get(`user:${userId}`);
        if(cachedUser){
            console.log("User found in Redis");
            //await redisClient.del(`user:${userId}`);

            return res.json(JSON.parse(cachedUser));
        }

        const user = await User.findById(userId);
        if(!user){
            console.log("User not found in database");
            return res.status(404).json({msg: "User not found"});
        }

        await redisClient.setEx(`user:${userId}`, 60, JSON.stringify(user));

        console.log("Fetched from DB - User was not in cache, now added for next 120 seconds");
        res.json(user);
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error"});
    }
});

export default router;