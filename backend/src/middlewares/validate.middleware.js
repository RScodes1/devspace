const Joi = require("joi");

/**
 * Middleware to validate request body against a Joi schema
 * @param {Joi.Schema} schema
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message)
      });
    }
    req.body = value; // sanitized body
    next();
  };
};

module.exports = { validateBody };
