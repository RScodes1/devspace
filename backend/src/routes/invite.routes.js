const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { createInvite, getInvites, acceptInvite } = require("../controllers/invite.controller");

const router = express.Router();

router.post("/",  rbac(["Owner"]), createInvite);
router.get("/projects/:projectId/invites",  rbac(["Owner", "Collaborator"]), getInvites);
router.post("/accept",  acceptInvite);

module.exports = router;
