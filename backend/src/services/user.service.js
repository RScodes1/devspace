const db = require("../config/postgres"); // or your ORM/knex instance
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const signupService = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role",
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

const loginService = async ({ email, password }) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: "Invalid credentials" };

  const token = jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ userId: user.id }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

  return { token, refreshToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

const refreshTokenService = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
  const token = jwt.sign({ userId: decoded.userId }, env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

const getUserById = async (id) => {
  const result = await db.query("SELECT id, name, email, role FROM users WHERE id=$1", [id]);
  return result.rows[0];
};

module.exports = { signupService, loginService, refreshTokenService, getUserById };
