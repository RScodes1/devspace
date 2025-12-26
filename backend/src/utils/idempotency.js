const { redisClient } = require("../config/redis");

/**
 * Checks if a job/request ID has already been processed.
 * Returns true if it's a duplicate.
 */
const checkAndSetIdempotency = async (key, ttl = 300) => {
  const exists = await redisClient.exists(key);
  if (exists) return true; // duplicate
  await redisClient.setEx(key, ttl, "1"); // store key with TTL
  return false;
};

module.exports = { checkAndSetIdempotency };
