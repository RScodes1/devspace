const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { rbac } = require("../middlewares/rbac.middleware");
const { addMember, updateRole, removeMember } = require("../controllers/membership.controller");
const { projectContext } = require("../middlewares/projectContext.middleware");

const router = express.Router();

router.post("/", rbac(["Owner"]),projectContext,  addMember);
router.put("/:id",  rbac(["Owner"]), projectContext,  updateRole);
// router.get("/", rbac(["Owner"]), projectContext);
router.delete("/:userId",  rbac(["Owner"]), projectContext, removeMember);

module.exports = router;
