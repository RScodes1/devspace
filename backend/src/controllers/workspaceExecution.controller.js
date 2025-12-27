const { enqueueCodeExecution } = require("../services/execution.service");
const { redisClient } = require("../config/redis");

/**
 * POST /workspaces/:workspaceId/execute
 */
const executeCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const { workspaceId } = req.params;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    const job = await enqueueCodeExecution({
      userId: req.user.id,
      projectId: req.projectId,
      workspaceId,
      code,
    });

    res.status(202).json({
      success: true,
      message: "Execution started",
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /workspaces/jobs/:jobId
 */
const getExecutionStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Fetch result from Redis (written by worker)
    const result = await redisClient.get(`job:${jobId}`);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Job not completed or not found",
      });
    }

    res.json({
      success: true,
      data: {
        jobId,
        status: "completed",
        result: JSON.parse(result),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  executeCode,
  getExecutionStatus,
};
