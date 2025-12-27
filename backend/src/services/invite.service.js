const { pool } = require("../config/postgres");

/**
 * Create an invite
 */
const createInviteService = async (
  { email, role, expiresAt }, projectId,
  inviterId
) => {
  // expires at need
  console.log({email, role});
  const result = await pool.query(
    `
    INSERT INTO invites (email, project_id, role)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [email, projectId, role || null]
  );

  return result.rows[0];
};

/**
 * Get all invites for a project
 */
const getInvitesService = async (projectId) => {
  const result = await pool.query(
    "SELECT * FROM invites WHERE project_id = $1",
    [projectId]
  );
  return result.rows;
};

/**
 * Accept invite
 */
const acceptInviteService = async (userId, userEmail) => {
  // 1. Find invite by email
  const inviteRes = await pool.query(
    `
    SELECT * FROM invites
    WHERE email = $1
      AND (expires_at IS NULL OR expires_at > NOW())
    `,
    [userEmail]
  );

  if (inviteRes.rows.length === 0) {
    throw { status: 404, message: "No valid invite found" };
  }

  const invite = inviteRes.rows[0];

  // 2. Check if already member
  const existingMember = await pool.query(
    `
    SELECT id FROM memberships
    WHERE user_id = $1 AND project_id = $2
    `,
    [userId, invite.project_id]
  );

  if (existingMember.rows.length > 0) {
    throw { status: 400, message: "Already a project member" };
  }

  // 3. Create membership with invited role
  const membershipRes = await pool.query(
    `
    INSERT INTO memberships (user_id, project_id, role)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [userId, invite.project_id, invite.role]
  );

  // 4. Delete invite after acceptance
  await pool.query(
    "DELETE FROM invites WHERE id = $1",
    [invite.id]
  );

  return membershipRes.rows[0];
};

module.exports = {
  createInviteService,
  getInvitesService,
  acceptInviteService
};
