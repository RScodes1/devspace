const { body, param } = require("express-validator");

const createProjectSchema = [
  body("name").notEmpty().withMessage("Project name is required"),
  body("description").optional().isString(),
];

const updateProjectSchema = [
  param("id").notEmpty().withMessage("Project ID is required"),
  body("name").optional().isString(),
  body("description").optional().isString(),
];

module.exports = { createProjectSchema, updateProjectSchema };
