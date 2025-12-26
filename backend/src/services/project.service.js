const db = require("../config/postgres");

const createProjectService = async (userId, data) => {
  const result = await db.query(
    "INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
    [data.name, data.description, userId]
  );
  return result.rows[0];
};

const getProjectService = async (projectId) => {
  const result = await db.query("SELECT * FROM projects WHERE id=$1", [projectId]);
  return result.rows[0];
};

const updateProjectService = async (projectId, data) => {
  const result = await db.query(
    "UPDATE projects SET name=$1, description=$2 WHERE id=$3 RETURNING *",
    [data.name, data.description, projectId]
  );
  return result.rows[0];
};

const deleteProjectService = async (projectId) => {
  await db.query("DELETE FROM projects WHERE id=$1", [projectId]);
  return true;
};

module.exports = { createProjectService, getProjectService, updateProjectService, deleteProjectService };
