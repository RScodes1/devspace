const swaggerJSDoc = require("swagger-jsdoc");
const { env } = require("./env");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevSpace API",
      version: "1.0.0",
      description: "Real-Time Collaborative Workspace Backend API",
    },
    servers: [
      {
        url: env.API_BASE_URL || "http://localhost:4500",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/**/*.js"],
};

module.exports = swaggerJSDoc(swaggerOptions);
