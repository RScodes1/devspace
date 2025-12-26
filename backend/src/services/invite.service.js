const pool = require("../config/postgres");
const { v4: uuidv4 } = require("uuid");

const createInviteService = async ({ email, projectId }, inviterId) => {
  const token = uuidv4();
  const result = await pool.query(
    "INSERT INTO invites (email, project_id, inviter_id, token) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, projectId, inviterId, token]
  );
  return result.rows[0];
};

const getInvitesService = async (projectId) => {
  const result = await pool.query("SELECT * FROM invites WHERE project_id=$1", [projectId]);
  return result.rows;
};

const acceptInviteService = async ({ token }, userId) => {
  const inviteResult = await pool.query("SELECT * FROM invites WHERE token=$1", [token]);
  const invite = inviteResult.rows[0];
  if (!invite) throw { status: 404, message: "Invite not found" };

  // Add to membership
  const membership = await pool.query(
    "INSERT INTO memberships (user_id, project_id, role) VALUES ($1, $2, $3) RETURNING *",
    [userId, invite.project_id, "Collaborator"]
  );

  // Delete invite after acceptance
  await pool.query("DELETE FROM invites WHERE id=$1", [invite.id]);

  return membership.rows[0];
};

module.exports = { createInviteService, getInvitesService, acceptInviteService };
