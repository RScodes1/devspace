const {pool} = require("../config/postgres");

const addMemberService = async ({ userId, projectId, role }) => {
  const result = await pool.query(
    "INSERT INTO memberships (user_id, project_id, role) VALUES ($1, $2, $3) RETURNING *",
    [userId, projectId, role]
  );
  return result.rows[0];
};

const updateRoleService = async (projectId, userId, role) => {
  const result = await pool.query(
    "UPDATE memberships SET role=$1 WHERE project_id=$2 AND user_id=$3 RETURNING *",
    [role, projectId, userId]
  );
  return result.rows[0];
};

const removeMemberService = async (membershipId) => {
  await pool.query("DELETE FROM memberships WHERE id=$1", [membershipId]);
  return true;
};

const getMembersService = async (userId,projectId) => {
   const result = await pool.query("SELECT * FROM memberships WHERE id=$1 AND project_id=$2", [userId, projectId]);
    console.log(result.rows);
  return result.rows;
}

module.exports = { addMemberService, getMembersService, updateRoleService, removeMemberService };

