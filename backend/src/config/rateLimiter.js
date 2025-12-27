const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis").default;
const { redis } = require("./redis");
const { env } = require("./env");


const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX, 
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
