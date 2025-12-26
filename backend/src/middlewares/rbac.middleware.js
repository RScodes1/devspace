/**
 * Middleware to restrict access based on project membership role
 * @param {Array<String>} allowedRoles
 */
const rbac = (allowedRoles = []) => {
  return (req, res, next) => {
    const membership = req.membership;

    if (!membership) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: no project access"
      });
    }

    if (!allowedRoles.includes(membership.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions"
      });
    }

    next();
  };
};

module.exports = { rbac };
