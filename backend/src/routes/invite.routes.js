const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { createInvite, getInvites, acceptInvite } = require("../controllers/invite.controller");
const { projectContext } = require("../middlewares/projectContext.middleware");

const router = express.Router({ mergeParams: true });

router.post("/projects/:projectId/invites", projectContext, rbac(["Owner"]), createInvite);
router.get("/projects/:projectId/invites",  projectContext,  rbac(["Owner", "Collaborator"]), getProjectInvites);
router.get("/invites",  projectContext,  rbac(["Collaborator"]), getInvites);
router.post("/invites/accept", acceptInvite);

module.exports = router;
