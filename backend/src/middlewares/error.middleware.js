const errorMiddleware = (err, req, res, next) => {
  console.error(err); // can replace with Winston / Bunyan

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message
  });
};

module.exports = { errorMiddleware };
