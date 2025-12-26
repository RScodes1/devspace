const { jobQueue } = require("./queue");

const addJob = async (data) => {
  const job = await jobQueue.add("codeExecution", data, {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  });
  console.log("Job added:", job.id);
  return job.id;
};

module.exports = { addJob };
