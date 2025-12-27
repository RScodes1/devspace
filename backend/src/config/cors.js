const cors = require("cors");

const allowedOrigins = (
  process.env.CORS_ORIGINS || ""
)
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {

    if (!origin) {
      return callback(null, true);
    }
    
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

  credentials: true,
  maxAge: 86400
};

module.exports = cors(corsOptions);
