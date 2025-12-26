const db = require("../config/postgres");

const addMemberService = async ({ userId, projectId, role }) => {
  const result = await db.query(
    "INSERT INTO memberships (user_id, project_id, role) VALUES ($1, $2, $3) RETURNING *",
    [userId, projectId, role]
  );
  return result.rows[0];
};

const updateRoleService = async (membershipId, role) => {
  const result = await db.query(
    "UPDATE memberships SET role=$1 WHERE id=$2 RETURNING *",
    [role, membershipId]
  );
  return result.rows[0];
};

const removeMemberService = async (membershipId) => {
  await db.query("DELETE FROM memberships WHERE id=$1", [membershipId]);
  return true;
};

module.exports = { addMemberService, updateRoleService, removeMemberService };
