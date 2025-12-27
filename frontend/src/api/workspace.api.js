import api from "../utils/axios";

export const getWorkspace = (projectId, workspaceId) =>
  api.get(`/projects/${projectId}/workspaces/${workspaceId}`);

export const getWorkspaces = (projectId) =>
  api.get(`/projects/${projectId}/workspaces`);

export const createWorkspace = (projectId, data) =>
  api.post(`/projects/${projectId}/workspaces`, data);

export const updateWorkspace = (projectId, workspaceId, data) =>
  api.put(`/projects/${projectId}/workspaces/${workspaceId}`, data);

export const deleteWorkspace = (projectId, workspaceId) =>
  api.delete(`/projects/${projectId}/workspaces/${workspaceId}`);
