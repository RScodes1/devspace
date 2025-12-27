import api from "../utils/axios";

export const inviteCollaborator = (email, role, projectId) =>
  api.post(`/projects/${projectId}/invites`, {email, role});
