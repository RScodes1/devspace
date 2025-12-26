const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { createInvite, getInvites, acceptInvite } = require("../controllers/invite.controller");

const router = express.Router();

router.post("/", authMiddleware, rbac(["Owner"]), createInvite);
router.get("/:projectId", authMiddleware, rbac(["Owner", "Collaborator"]), getInvites);
router.post("/accept", authMiddleware, acceptInvite);

module.exports = router;
