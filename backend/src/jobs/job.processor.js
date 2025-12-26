const { Worker } = require("bullmq");
const { redisClient } = require("../config/redis");
const { env } = require("../config/env");

// Simulate async job processing
const processJob = async (job) => {
  console.log(`Processing job ${job.id} with data:`, job.data);
  try {
    // Mock code execution: just delay for a few seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock result
    const result = { output: `Executed: ${job.data.code}` };

    // Save to Redis or Mongo as job result
    await redisClient.set(`job:${job.id}`, JSON.stringify(result));

    return result;
  } catch (err) {
    console.error("Job failed", err);
    throw err; // BullMQ handles retry if configured
  }
};

// Create a worker
const worker = new Worker(
  "jobQueue",
  async (job) => processJob(job),
  {
    connection: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
    attempts: 3, // retry logic
    backoff: { type: "exponential", delay: 5000 }, // retry delay
  }
);

worker.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed`, result);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed:`, err.message);
});

module.exports = worker;
