const cors = require("cors");

/**
 * Allowed origins:
 * - In development: allow localhost
 * - In production: allow only frontend URLs from env
 */
const allowedOrigins = (
  process.env.CORS_ORIGINS || ""
)
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser requests (Postman, curl)
    if (!origin) {
      return callback(null, true);
    }

    // If no CORS_ORIGINS set, allow all (safe for local/dev)
    if (allowedOrigins.length === 0) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS policy: Origin ${origin} not allowed`),
      false
    );
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-Idempotency-Key"
  ],

  credentials: true, // allow cookies / auth headers
  maxAge: 86400 // cache preflight for 24 hours
};

module.exports = cors(corsOptions);
