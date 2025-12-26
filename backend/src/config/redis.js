const Redis = require("ioredis");
const { env } = require("./env");

/**
 * Redis client
 * Used for:
 * - Caching
 * - Rate limiting
 * - Pub/Sub (WebSockets)
 * - Queues (BullMQ)
 * - Idempotency keys
 */
const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error", err);
});

/**
 * Graceful shutdown
 */
const disconnectRedis = async () => {
  await redis.quit();
  console.log("🛑 Redis disconnected");
};

module.exports = {
  redis,
  disconnectRedis
};
