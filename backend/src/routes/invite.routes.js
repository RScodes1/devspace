const express = require("express");
const { rbac } = require("../middlewares/rbac.middleware");
const {
  createInvite,
  getInvites,
  acceptInvite,
  getProjectInvites
} = require("../controllers/invite.controller");
const { projectContext } = require("../middlewares/projectContext.middleware");

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/projects/{projectId}/invites:
 *   post:
 *     summary: Invite a user to a project
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, role]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               role:
 *                 type: string
 *                 example: Collaborator
 *     responses:
 *       201:
 *         description: Invite created successfully
 *       403:
 *         description: Forbidden
 */
router.post(
  "/projects/:projectId/invites",
  projectContext,
  rbac(["Owner"]),
  createInvite
);

/**
 * @swagger
 * /api/projects/{projectId}/invites:
 *   get:
 *     summary: Get all invites for a specific project
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of project invites
 *       403:
 *         description: Forbidden
 */
router.get(
  "/projects/:projectId/invites",
  projectContext,
  rbac(["Owner", "Collaborator"]),
  getProjectInvites
);

/**
 * @swagger
 * /api/invites:
 *   get:
 *     summary: Get all pending invites for the logged-in user
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user invites
 */
router.get(
  "/invites",
  getInvites
);

/**
 * @swagger
 * /api/invites/accept:
 *   post:
 *     summary: Accept a project invite
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invite accepted successfully
 *       404:
 *         description: Invite not found
 */
router.post(
  "/invites/accept",
  acceptInvite
);

module.exports = router;
