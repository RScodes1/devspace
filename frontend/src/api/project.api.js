import api from "../utils/axios";

export const getProjects = () => api.get("/projects");

export const getProject = (projectId) => api.get(`/projects/${projectId}`);

export const createProject = (data) => api.post("/projects", data);

export const updateProject = (projectId, data) => api.put(`/projects/${projectId}`, data);

export const deleteProject = (projectId) => api.delete(`/projects/${projectId}`);

export const getProjectMembers = (projectId) => api.get(`/projects/${projectId}/members`);

export const updateMemberRole = (projectId, userId, role) =>
  api.put(`/projects/${projectId}/members/${userId}/role`, { role });