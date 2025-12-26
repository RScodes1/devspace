const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { env } = require("./env");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevSpace API",
      version: "1.0.0",
      description:
        "DevSpace – Real-Time Collaborative Workspace Backend API",
      contact: {
        name: "DevSpace Backend"
      }
    },
    servers: [
      {
        url: env.API_BASE_URL || "http://localhost:5000/api/v1",
        description: "API Server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    "./src/routes/**/*.js",
    "./src/models/**/*.js"
  ]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * Swagger setup function
 */
function setupSwagger(app) {
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true
      }
    })
  );
}

module.exports = setupSwagger;
