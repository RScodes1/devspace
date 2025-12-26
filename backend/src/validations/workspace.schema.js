const { body, param } = require("express-validator");

const createWorkspaceSchema = [
  body("name").notEmpty().withMessage("Workspace name is required"),
  body("projectId").notEmpty().withMessage("Project ID is required"),
];

const updateWorkspaceSchema = [
  param("id").notEmpty().withMessage("Workspace ID is required"),
  body("name").optional().isString(),
];

module.exports = { createWorkspaceSchema, updateWorkspaceSchema };
