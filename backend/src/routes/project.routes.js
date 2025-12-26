const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { createProject, getProject, updateProject, deleteProject } = require("../controllers/project.controller");

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 */
router.post("/", authMiddleware, rbac(["Owner"]), createProject);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 */
router.get("/:id", authMiddleware, getProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 */
router.put("/:id", authMiddleware, rbac(["Owner"]), updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 */
router.delete("/:id", authMiddleware, rbac(["Owner"]), deleteProject);

module.exports = router;
