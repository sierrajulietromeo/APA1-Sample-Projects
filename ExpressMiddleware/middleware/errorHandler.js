/**
 * Global error handling middleware
 * 
 * This middleware catches any errors that occur during the request-response cycle
 * and sends an appropriate error response to the client.
 * 
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function errorHandler(err, req, res, next) {
  // Log the error for server-side debugging
  console.error(err.stack);

  // Determine the status code (use 500 if not specified)
  const statusCode = err.statusCode || 500;

  // Send an error response to the client
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  });
}

module.exports = errorHandler;

