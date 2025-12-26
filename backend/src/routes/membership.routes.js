const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { addMember, updateRole, removeMember } = require("../controllers/membership.controller");

const router = express.Router();

router.post("/", authMiddleware, rbac(["Owner"]), addMember);
router.put("/:id", authMiddleware, rbac(["Owner"]), updateRole);
router.delete("/:id", authMiddleware, rbac(["Owner"]), removeMember);

module.exports = router;
