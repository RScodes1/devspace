const express = require("express");
const { body } = require("express-validator");
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
 */
router.post(
  "/signup",
  validateBody(signupSchema),
  signup
); // done

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 */
router.post(
  "/login",
  validateBody(loginSchema),
  login
); // done 

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [Auth]
 */
router.post("/refresh", refreshToken); // done


module.exports = router;
