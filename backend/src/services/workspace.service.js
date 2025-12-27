const {pool} = require("../config/postgres");

const createWorkspaceService = async (name, projectId) => {
  const result = await pool.query(
    "INSERT INTO workspaces (name, project_id) VALUES ($1, $2) RETURNING *",
    [name, projectId]
  );
  return result.rows[0];
};

const getWorkspaceService = async (workspaceId) => {
  const result = await pool.query("SELECT * FROM workspaces WHERE id=$1", [workspaceId]);
  return result.rows[0];
};

const getWorkspacesService = async (projectId) => {
  const result = await pool.query("SELECT * FROM workspaces WHERE project_id=$1", [projectId]);
  return result.rows;
};


const updateWorkspaceService = async (workspaceId, data) => {
  const result = await pool.query(
    "UPDATE workspaces SET name=$1 WHERE id=$2 RETURNING *",
    [data.name, workspaceId]
  );
  return result.rows[0];
};

const deleteWorkspaceService = async (workspaceId) => {
  await pool.query("DELETE FROM workspaces WHERE id=$1", [workspaceId]);
  return true;
};

module.exports = { createWorkspaceService,  getWorkspacesService,getWorkspaceService, updateWorkspaceService, deleteWorkspaceService };
