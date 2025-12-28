const express = require("express");
const cors = require("./config/cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const { errorMiddleware } = require("./middlewares/error.middleware");
const { authMiddleware } = require("./middlewares/auth.middleware");

// Routes
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const inviteRoutes = require("./routes/invite.routes");
const membershipRoutes = require("./routes/membership.routes");
const { apiRateLimiter, authRateLimiter } = require("./config/rateLimiter");

const app = express();

// Middlewares
app.use(cors);
app.use(express.json());
app.use(apiRateLimiter);
app.use(authRateLimiter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "DevSpace Backend API is running",
    docs: "/api/docs"
  });
});

// Swagger
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);
app.use("/api/projects/:projectId/workspaces", authMiddleware, workspaceRoutes);
app.use("/api", authMiddleware, inviteRoutes);
app.use("/api/projects/:projectId/members", authMiddleware, membershipRoutes);

// Error handler
app.use(errorMiddleware);

module.exports = app;


