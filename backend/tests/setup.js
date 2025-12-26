const { env } = require("../src/config/env");
const { redisClient } = require("../src/config/redis");
const db = require("../src/config/postgres");

beforeAll(async () => {
  // Connect to Postgres
  await db.connect();

  // Connect to Redis
  await redisClient.connect();

  console.log("Test setup complete");
});

afterAll(async () => {
  // Disconnect Postgres
  await db.end();

  // Disconnect Redis
  await redisClient.quit();

  console.log("Test teardown complete");
});
