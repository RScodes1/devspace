const crypto = require("crypto");

/**
 * Generate a secure random string
 */
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

/**
 * Hash a string using SHA256
 */
const hashString = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

module.exports = { generateRandomString, hashString };
