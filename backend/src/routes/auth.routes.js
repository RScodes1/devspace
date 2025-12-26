const express = require("express");
const { body } = require("express-validator");
const { login, signup, refreshToken } = require("../controllers/auth.controller");
const { validateBody } = require("../middlewares/validate.middleware");

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
  validateBody(
    body().isObject().withMessage("Body must be an object")
  ),
  signup
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 */
router.post(
  "/login",
  validateBody(
    body().isObject().withMessage("Body must be an object")
  ),
  login
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [Auth]
 */
router.post("/refresh", refreshToken);

module.exports = router;
