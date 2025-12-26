// src/app.js
const express = require("express");
const cors = require("./config/cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const { apiRateLimiter, authRateLimiter } = require("./config/rateLimiter");
const { errorMiddleware } = require("./middlewares/error.middleware");
const { authMiddleware } = require("./middlewares/auth.middleware");

// Route imports
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const inviteRoutes = require("./routes/invite.routes");
const membershipRoutes = require("./routes/membership.routes");

const app = express();

// Middlewares
app.use(cors);
app.use(express.json());
app.use(apiRateLimiter);

// Swagger Docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);
app.use("/api/projects/:projectId/workspaces", authMiddleware, workspaceRoutes);
app.use("/api/invites", authMiddleware, inviteRoutes);
app.use("/api/projects/:projectId/members", authMiddleware, membershipRoutes);

// Error handler
app.use(errorMiddleware);

module.exports = app;

