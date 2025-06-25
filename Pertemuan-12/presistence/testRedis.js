const { createClient } = require("redis");

const redisClient = createClient();

redisClient.on("error", (err) => console.error("Redis error:", err));

async function test() {
  await redisClient.connect();

  await redisClient.set("hello", "world", { EX: 10 });
  const value = await redisClient.get("hello");

  console.log("Value from Redis:", value);
  await redisClient.disconnect();
}

test();
