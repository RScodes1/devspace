const express = require("express");
const { rbac } = require("../middlewares/rbac.middleware");
const {
  createWorkspace,
  getWorkspace,
  getWorkspaces,
  updateWorkspace,
  deleteWorkspace
} = require("../controllers/workspace.controller");
const {
  updateWorkspaceSchema,
  createWorkspaceSchema
} = require("../validations/workspace.schema");
const { validateBody } = require("../middlewares/validate.middleware");
const { projectContext } = require("../middlewares/projectContext.middleware");
const {
  executeCode,
  getExecutionStatus
} = require("../controllers/workspaceExecution.controller");

const router = express.Router({ mergeParams: true });


/**
 * @swagger
 * /api/projects/{projectId}/workspaces:
 *   post:
 *     summary: Create a workspace under a project
 *     tags: [Workspaces]
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
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Backend Sandbox
 *     responses:
 *       201:
 *         description: Workspace created successfully
 */
router.post(
  "/",
  projectContext,
  rbac(["Owner", "Collaborator"]),
  validateBody(createWorkspaceSchema),
  createWorkspace
);

/**
 * @swagger
 * /api/projects/{projectId}/workspaces:
 *   get:
 *     summary: Get all workspaces under a project
 *     tags: [Workspaces]
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
 *         description: List of workspaces
 */
router.get(
  "/",
  projectContext,
  getWorkspaces
);

/**
 * @swagger
 * /api/projects/{projectId}/workspaces/{id}:
 *   get:
 *     summary: Get workspace details
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Workspace details
 */
router.get(
  "/:id",
  projectContext,
  rbac(["Owner", "Collaborator"]),
  getWorkspace
);

/**
 * @swagger
 * /api/projects/{projectId}/workspaces/{id}:
 *   put:
 *     summary: Update workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Workspace
 *     responses:
 *       200:
 *         description: Workspace updated
 */
router.put(
  "/:id",
  projectContext,
  rbac(["Owner", "Collaborator"]),
  validateBody(updateWorkspaceSchema),
  updateWorkspace
);

/**
 * @swagger
 * /api/projects/{projectId}/workspaces/{id}:
 *   delete:
 *     summary: Delete workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Workspace deleted
 */
router.delete(
  "/:id",
  projectContext,
  rbac(["Owner"]),
  deleteWorkspace
);

/**
 * @swagger
 * /api/projects/{projectId}/workspaces/{id}/execute:
 *   post:
 *     summary: Execute code asynchronously in a workspace
 *     tags: [Execution]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
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
 *             required: [code]
 *             properties:
 *               code:
 *                 type: string
 *                 example: console.log("Hello World")
 *     responses:
 *       202:
 *         description: Job accepted for execution
 */
router.post(
  "/:id/execute",
  projectContext,
  rbac(["Owner", "Collaborator"]),
  executeCode
);


/**
 * @swagger
 * /api/projects/{projectId}/workspaces/jobs/{jobId}:
 *   get:
 *     summary: Get execution job status
 *     tags: [Execution]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job status and result
 *       404:
 *         description: Job not found or not completed
 */
router.get(
  "/jobs/:jobId",
  getExecutionStatus
);

module.exports = router;
