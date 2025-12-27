const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { addMember, updateRole, getMembers, removeMember } = require("../controllers/membership.controller");
const { projectContext } = require("../middlewares/projectContext.middleware");

const router = express.Router({mergeParams : true});

router.post("/", projectContext, rbac(["Owner"]),  addMember);
router.put("/:userId", projectContext,  rbac(["Owner"]),  updateRole);
router.get("/", projectContext, rbac(["Owner"]), getMembers);
router.delete("/:userId",  projectContext,  rbac(["Owner"]), removeMember);

module.exports = router;
