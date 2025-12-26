const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { createProject, getProject, updateProject, deleteProject } = require("../controllers/project.controller");
const { validateBody } = require("../middlewares/validate.middleware");
const { createProjectSchema } = require("../validations/project.schema");
const { projectContext } = require("../middlewares/projectContext.middleware");

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 */
router.post("/", validateBody(createProjectSchema), createProject); // done

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 */
router.get("/:id",  projectContext, rbac(["Owner"]), getProject); // done 

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 */
router.put("/:id",  projectContext, rbac(["Owner"]), updateProject); // done 

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 */
router.delete("/:id",  projectContext, rbac(["Owner"]), deleteProject); // done

module.exports = router;
