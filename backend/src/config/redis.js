const Redis = require("ioredis");
const { env } = require("./env");

 const url = env.REDIS_URL;
 
const redis = new Redis(url, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error", err);
});

/**
 * Graceful shutdown
 */
const disconnectRedis = async () => {
  await redis.quit();
  console.log("Redis disconnected");
};

module.exports = {
  redis,
  disconnectRedis
};
