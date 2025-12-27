const { Worker, Queue } = require("bullmq");
const { redis } = require("../config/redis");
const { env } = require("../config/env");
const crypto = require("crypto");
const { checkAndSetIdempotency } = require("../utils/idempotency");

// Queue instance
const jobQueue = new Queue("jobQueue", {
  connection: { host: env.REDIS_HOST, port: env.REDIS_PORT },
});

const addJob = async (data) => {
  const jobId = crypto
    .createHash("sha256")
    .update(`${data.userId}-${data.workspaceId}-${data.code}`)
    .digest("hex");

  const job = await jobQueue.add("codeExecution", data, {
    jobId,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  });

  return job.id;
};

// Worker to process jobs
const worker = new Worker(
  "jobQueue",
  async (job) => {
    console.log(`Processing job ${job.id}`, job.data);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      const result = { output: `Executed: ${job.data.code}` };
      await redis.set(`job:${job.id}`, JSON.stringify(result));
      return result;
    } catch (err) {
      console.error("Job failed", err);
      throw err;
    }
  },
  {
    connection: { host: env.REDIS_HOST, port: env.REDIS_PORT },
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  }
);

worker.on("completed", (job, result) => console.log(`Job ${job.id} completed`, result));
worker.on("failed", (job, err) => console.log(`Job ${job.id} failed:`, err.message));

module.exports = { jobQueue, addJob, worker };
