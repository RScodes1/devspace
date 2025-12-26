const Joi = require("joi");

/**
 * Create Project
 */
const createProjectSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    "string.empty": "Project name is required"
  }),
  description: Joi.string().optional()
});

/**
 * Update Project
 * `id` should be validated separately (params)
 */
const updateProjectSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional()
});

module.exports = {
  createProjectSchema,
  updateProjectSchema
};
