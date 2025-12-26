const morgan = require("morgan");

// HTTP logger middleware
const loggingMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms"
);

module.exports = { loggingMiddleware };
