const express = require("express");
const {  } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { createWorkspace, getWorkspace, updateWorkspace, deleteWorkspace } = require("../controllers/workspace.controller");
const { updateWorkspaceSchema, createWorkspaceSchema } = require("../validations/workspace.schema");
const { validateBody } = require("../middlewares/validate.middleware");
const { projectContext } = require("../middlewares/projectContext.middleware");

const router = express.Router({ mergeParams: true });

router.post("/", projectContext, rbac(["Owner", "Collaborator"]), validateBody(createWorkspaceSchema), createWorkspace); // done 
router.get("/:id",  projectContext, getWorkspace); // done 
router.put("/:id",  projectContext, rbac(["Owner", "Collaborator"]), 
// validateParams(workspaceIdParamSchema),
validateBody(updateWorkspaceSchema), updateWorkspace); // done 
router.delete("/:id", projectContext, rbac(["Owner"]),  deleteWorkspace); // done 

module.exports = router;
