const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { getUserById } = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = { id: user.id, role: user.role, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = { authMiddleware };
