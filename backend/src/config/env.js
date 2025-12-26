const dotenv = require("dotenv");
const Joi = require("joi");

// Load environment variables
dotenv.config();

/**
 * Environment variable schema
 * Fail fast if anything critical is missing
 */
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "test", "production")
    .default("development"),

  PORT: Joi.number().default(5000),

  // Auth
  JWT_SECRET: Joi.string().min(10).required(),
  JWT_REFRESH_SECRET: Joi.string().min(10).required(),
  JWT_EXPIRES_IN: Joi.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default("7d"),

  // PostgreSQL
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),

  // MongoDB
  MONGO_URI: Joi.string().uri().required(),

  // Redis
  REDIS_URL: Joi.string().required(),

  // CORS
  CORS_ORIGINS: Joi.string().allow("").optional(),

  // Rate limiting
  RATE_LIMIT_POINTS: Joi.number().default(100),
  RATE_LIMIT_DURATION: Joi.number().default(60), // seconds

  // Swagger
  SWAGGER_ENABLED: Joi.boolean().default(true),

  // Logging
  LOG_LEVEL: Joi.string()
    .valid("error", "warn", "info", "debug")
    .default("info")
})
  .unknown(true); // allow extra env vars (cloud providers add many)

/**
 * Validate environment
 */
const { value: env, error } = envSchema.validate(process.env);

if (error) {
  console.error("❌ Environment variable validation error:");
  console.error(error.message);
  process.exit(1);
}

module.exports = {
  env
};
