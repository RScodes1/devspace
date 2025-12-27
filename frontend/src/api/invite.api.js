import api from "../utils/axios";

export const inviteCollaborator = (id, email, role, projectId) =>
  api.post(`/projects/${projectId}/invites`, {id, email, role});

export const getInvites = (projectId) =>
  api.get(`/projects/${projectId}/invites`);

export const acceptInvities = () =>
   api.post(`/invites/accept`);
