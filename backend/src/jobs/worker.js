const { jobQueue } = require("./queue");

const addJob = async (data) => {
  const idempotencyKey = `exec:${data.userId}:${data.workspaceId}:${Buffer.from(
    data.code
  ).toString("base64")}`;

  const job = await jobQueue.add("codeExecution", data, {
    jobId: idempotencyKey,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  });

  return job.id;
};

module.exports = { addJob };
