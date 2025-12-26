const db = require("../config/postgres");

const createWorkspaceService = async (data, userId) => {
  const result = await db.query(
    "INSERT INTO workspaces (name, project_id, owner_id) VALUES ($1, $2, $3) RETURNING *",
    [data.name, data.projectId, userId]
  );
  return result.rows[0];
};

const getWorkspaceService = async (workspaceId) => {
  const result = await db.query("SELECT * FROM workspaces WHERE id=$1", [workspaceId]);
  return result.rows[0];
};

const updateWorkspaceService = async (workspaceId, data) => {
  const result = await db.query(
    "UPDATE workspaces SET name=$1 WHERE id=$2 RETURNING *",
    [data.name, workspaceId]
  );
  return result.rows[0];
};

const deleteWorkspaceService = async (workspaceId) => {
  await db.query("DELETE FROM workspaces WHERE id=$1", [workspaceId]);
  return true;
};

module.exports = { createWorkspaceService, getWorkspaceService, updateWorkspaceService, deleteWorkspaceService };
