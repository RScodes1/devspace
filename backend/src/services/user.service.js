const {pool} = require("../config/postgres"); // or your ORM/knex instance
const bcrypt = require("bcrypt");
const { signToken, signRefreshToken, verifyRefreshToken } = require("../utils/jwt");

const signupService = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

const loginService = async ({ email, password }) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw { status: 401, message: "Invalid credentials" };

  const token = signToken({ userId: user.id, role: user.role }, expiresIn = '1h')
    const refreshToken = signRefreshToken({ userId: user.id }, expiresIn = '1h')

  return { token, refreshToken, user: { id: user.id, name: user.name, email: user.email } };
};

const refreshTokenService = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  const token = signToken({ userId: decoded.userId }, expiresIn = "1h"  )
  return token;
};

const getUserById = async (id) => {
  const result = await pool.query("SELECT id, name, email FROM users WHERE id=$1", [id]);
  return result.rows[0];
};

module.exports = { signupService, loginService, refreshTokenService, getUserById };
