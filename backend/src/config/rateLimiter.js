const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis").default;
const { redis } = require("./redis");
const { env } = require("./env");

/**
 * Global API rate limiter
 * Protects against abuse, bots, brute force
 */
const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS, // e.g. 15 mins
  max: env.RATE_LIMIT_MAX, // e.g. 100 requests
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args)
  }),
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});

/**
 * Stricter limiter for auth routes
 */
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args)
  }),
  message: {
    success: false,
    message: "Too many authentication attempts."
  }
});

module.exports = {
  apiRateLimiter,
  authRateLimiter
};
