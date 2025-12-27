const { enqueueCodeExecution } = require("../../src/services/execution.service");

jest.mock("../../src/jobs/worker", () => ({
  addJob: jest.fn().mockResolvedValue("job-123"),
}));

describe("Execution Service", () => {
  test("enqueueCodeExecution queues a job", async () => {
    const job = await enqueueCodeExecution({
      userId: 1,
      projectId: 1,
      workspaceId: 1,
      code: "console.log(1)",
    });

    expect(job.jobId).toBe("job-123");
    expect(job.status).toBe("queued");
  });
});
