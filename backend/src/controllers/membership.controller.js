const { addMemberService, updateRoleService, removeMemberService } = require("../services/membership.service");

const addMember = async (req, res, next) => {
  try {
    const member = await addMemberService(req.body);
    res.status(201).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const member = await updateRoleService(req.params.id, req.body.role);
    res.status(200).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

const removeMember = async (req, res, next) => {
  try {
    await removeMemberService(req.params.id);
    res.status(200).json({ success: true, message: "Member removed" });
  } catch (err) {
    next(err);
  }
};

module.exports = { addMember, updateRole, removeMember };
