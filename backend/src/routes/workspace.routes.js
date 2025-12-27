const express = require("express");
const {  } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { createWorkspace, getWorkspace, getWorkspaces,  updateWorkspace, deleteWorkspace } = require("../controllers/workspace.controller");
const { updateWorkspaceSchema, createWorkspaceSchema } = require("../validations/workspace.schema");
const { validateBody } = require("../middlewares/validate.middleware");
const { projectContext } = require("../middlewares/projectContext.middleware");
const { executeCode, getExecutionStatus } = require("../controllers/workspaceExecution.controller");

const router = express.Router({ mergeParams: true });

router.post("/", projectContext, rbac(["Owner", "Collaborator"]), validateBody(createWorkspaceSchema), createWorkspace); // done 
router.get("/:id",  projectContext,  rbac(["Owner", "Collaborator"]), getWorkspace); // done 
router.get("/",  projectContext, getWorkspaces); // done 
router.put("/:id",  projectContext, rbac(["Owner", "Collaborator"]), validateBody(updateWorkspaceSchema), updateWorkspace); // done 
router.delete("/:id", projectContext, rbac(["Owner"]),  deleteWorkspace); // done 
router.post("/:id/execute", projectContext, rbac(["Owner", "Collaborator"]), executeCode );
router.get("/jobs/:jobId", getExecutionStatus);

module.exports = router;
