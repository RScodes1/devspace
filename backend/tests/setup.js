const { env } = require("../src/config/env");
const { redis } = require("../src/config/redis");
const pool = require("../src/config/postgres");

beforeAll(async () => {
  // Connect to Postgres
  await pool.connect();

  // Connect to Redis
  await redis.connect();

  console.log("Test setup complete");
});

afterAll(async () => {
  // Disconnect Postgres
  await pool.end();

  // Disconnect Redis
  await redis.quit();

  console.log("Test teardown complete");
});
