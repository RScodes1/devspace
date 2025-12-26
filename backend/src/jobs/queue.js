const { Queue } = require("bullmq");
const { redisClient } = require("../config/redis");
const { env } = require("../config/env");

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
};

const jobQueue = new Queue("jobQueue", { connection });

module.exports = { jobQueue };
