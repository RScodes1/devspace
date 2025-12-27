const express = require("express");
const { rbac } = require("../middlewares/rbac.middleware");
const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjects
} = require("../controllers/project.controller");
const { validateBody } = require("../middlewares/validate.middleware");
const { createProjectSchema } = require("../validations/project.schema");
const { projectContext } = require("../middlewares/projectContext.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Real-Time Workspace
 *               description:
 *                 type: string
 *                 example: Collaborative coding backend
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/",
  
  validateBody(createProjectSchema),
  createProject
);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects for the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get(
  "/",
  
  getProjects
);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.get(
  "/:id",
  
  projectContext,
  rbac(["Owner", "Collaborator"]),
  getProject
);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project details
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Project Name
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:id",
  
  projectContext,
  rbac(["Owner"]),
  updateProject
);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  
  projectContext,
  rbac(["Owner"]),
  deleteProject
);

module.exports = router;
