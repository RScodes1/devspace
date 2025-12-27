const express = require("express");
const { rbac } = require("../middlewares/rbac.middleware");
const {
  addMember,
  updateRole,
  getMembers,
  removeMember
} = require("../controllers/membership.controller");
const { projectContext } = require("../middlewares/projectContext.middleware");

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/projects/{projectId}/members:
 *   post:
 *     summary: Add a user as a project member
 *     tags: [Members]
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
 *             required: [userId, role]
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 42
 *               role:
 *                 type: string
 *                 example: Collaborator
 *     responses:
 *       201:
 *         description: Member added successfully
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  projectContext,
  rbac(["Owner"]),
  addMember
);

/**
 * @swagger
 * /api/projects/{projectId}/members/{userId}:
 *   put:
 *     summary: Update a project member's role
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 example: Viewer
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:userId",
  projectContext,
  rbac(["Owner"]),
  updateRole
);

/**
 * @swagger
 * /api/projects/{projectId}/members:
 *   get:
 *     summary: Get all members of a project
 *     tags: [Members]
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
 *         description: List of project members
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  projectContext,
  rbac(["Owner"]),
  getMembers
);

/**
 * @swagger
 * /api/projects/{projectId}/members/{userId}:
 *   delete:
 *     summary: Remove a user from a project
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:userId",
  
  projectContext,
  rbac(["Owner"]),
  removeMember
);

module.exports = router;
