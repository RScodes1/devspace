/**
 * Middleware to restrict access based on user role
 * @param {Array<String>} allowedRoles
 */
const rbac = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role; // assume auth middleware sets req.user

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions"
      });
    }

    next();
  };
};

module.exports = { rbac };
