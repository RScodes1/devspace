const express = require("express");
const { login, signup, refreshToken } = require("../controllers/auth.controller");
const { validateBody } = require("../middlewares/validate.middleware");
const { signupSchema, loginSchema } = require("../validations/auth.schema");
const { getUserById, getUsers } = require("../services/user.service");

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */

router.post(
  "/signup",
  validateBody(signupSchema),
  signup
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  validateBody(loginSchema),
  login
);


/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [Auth]
 */
router.post("/refresh", refreshToken); // done


module.exports = router;
