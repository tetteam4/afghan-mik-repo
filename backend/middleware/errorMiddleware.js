// backend/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If status is 200, it means there was no explicit status set
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Don't show stack in production
  });
};

export default errorHandler;
