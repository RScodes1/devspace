const { addJob } = require("../jobs/worker");


const enqueueCodeExecution = async ({
  userId,
  projectId,
  workspaceId,
  code,
}) => {
  const jobId = await addJob({
    userId,
    projectId,
    workspaceId,
    code,
  });

  return {
    jobId,
    status: "queued",
  };
};

module.exports = {
  enqueueCodeExecution,
};
