const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { createWorkspace, getWorkspace, updateWorkspace, deleteWorkspace } = require("../controllers/workspace.controller");

const router = express.Router();

router.post("/", authMiddleware, rbac(["Owner", "Collaborator"]), createWorkspace);
router.get("/:id", authMiddleware, getWorkspace);
router.put("/:id", authMiddleware, rbac(["Owner", "Collaborator"]), updateWorkspace);
router.delete("/:id", authMiddleware, rbac(["Owner"]), deleteWorkspace);

module.exports = router;
