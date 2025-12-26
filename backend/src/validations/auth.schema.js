const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


module.exports = { signupSchema, loginSchema };


// body("name").notEmpty().withMessage("Name is required"), body("email").isEmail().withMessage("Valid email is required"), body("password") .isLength({ min: 6 }) .withMessage("Password must be at least 6 characters"),