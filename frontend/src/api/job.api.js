import api from "../utils/axios";


/**
 * Start a background job
 * @param {string} type - job type (e.g. "PDF_GENERATION")
 * @param {object} payload - job data
 */
export const createJob = (type, payload) => {
  return api.post("/jobs", {
    type,
    payload,
  });
};

/**
 * Get job status
 * @param {string} jobId
 */
export const getJobStatus = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};

/**
 * Get jobs for current user
 */
export const getMyJobs = () => {
  return api.get("/jobs");
};

export const executeCode = (workspaceId, {code}) => {
  return api.post(`/execut/${workspaceId}`, {
    code
  });
}