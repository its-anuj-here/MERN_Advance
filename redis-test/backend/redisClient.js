import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
})

redisClient.on("error", (err)=>{
    console.log("Redis Client Error", err);
})

await redisClient.connect();

export default redisClient;

/*
1. Basic Key-Value Operations :
    await redisClient.set("key", "value");           // set key
    await redisClient.get("key");                    // get key
    await redisClient.del("key");                    // delete key
    await redisClient.exists("key");                 // check if key exists (1 or 0)
    await redisClient.expire("key", 60);             // set expiration (in seconds)
    await redisClient.ttl("key");                    // check remaining TTL

2. Hash (Object-like storage) :
    await redisClient.hSet("user:1", { name: "Anuj", age: "25" });  // set multiple fields
    await redisClient.hGet("user:1", "name");                       // get single field
    await redisClient.hGetAll("user:1");                            // get all fields
    await redisClient.hDel("user:1", "age");                        // delete a field

3. Lists (Queues / Recent Logs) :
    await redisClient.lPush("tasks", "task1");    // add to start
    await redisClient.rPush("tasks", "task2");    // add to end
    await redisClient.lPop("tasks");              // remove from start
    await redisClient.rPop("tasks");              // remove from end
    await redisClient.lRange("tasks", 0, -1);     // get all items

4. Sets (Unique Collections) :
    await redisClient.sAdd("onlineUsers", "user1", "user2");   // add unique users
    await redisClient.sMembers("onlineUsers");                 // get all members
    await redisClient.sIsMember("onlineUsers", "user1");       // check membership
    await redisClient.sRem("onlineUsers", "user2");            // remove user

5. Sorted Sets (Leaderboards) :
    await redisClient.zAdd("leaderboard", [
    { score: 100, value: "player1" },
    { score: 200, value: "player2" },
    ]);
    await redisClient.zRange("leaderboard", 0, -1, { WITHSCORES: true });  // ascending
    await redisClient.zRevRange("leaderboard", 0, -1, { WITHSCORES: true }); // descending
    await redisClient.zRem("leaderboard", "player1");  // remove player

6. Pub/Sub (Real-time Messaging) :
    // Publisher
    await redisClient.publish("chat", "Hello world!");

    // Subscriber
    await subscriber.subscribe("chat", (message) => console.log("Received:", message));

7. Utility :
    await redisClient.keys("*");      // list all keys (use with care in production)
    await redisClient.flushAll();     // clear entire database (dangerous!)
    await redisClient.dbSize();       // count keys in DB
 */