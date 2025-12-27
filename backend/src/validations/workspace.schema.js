const Joi = require("joi");

const createWorkspaceSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    "string.empty": "Workspace name is required"
  })
});

const updateWorkspaceSchema = Joi.object({
  name: Joi.string().optional()
});

module.exports = {
  createWorkspaceSchema,
  updateWorkspaceSchema
};
