const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const signToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

const signRefreshToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};

module.exports = { signToken, verifyToken, signRefreshToken, verifyRefreshToken };
