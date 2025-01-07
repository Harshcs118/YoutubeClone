const errorMiddleware = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Set default status code and message
  const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not provided
  const message = err.message || 'Internal Server Error';

  // Send JSON response with error details
  res.status(statusCode).json({ 
    message: message,
    ...(process.env.NODE_ENV === 'development' && { error: err.stack }) // Include stack trace in development mode
  });
};

module.exports = errorMiddleware;
