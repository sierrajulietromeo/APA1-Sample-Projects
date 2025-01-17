/**
 * Custom logging middleware
 * 
 * This middleware logs information about each incoming request,
 * including the method, URL, and response time.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function customLogger(req, res, next) {
  // Record the start time of the request
  const start = Date.now();
  
  // Log when the response is finished
  res.on('finish', () => {
    // Calculate the duration of the request
    const duration = Date.now() - start;
    // Log the request details and duration
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });

  // Pass control to the next middleware function
  next();
}

module.exports = customLogger;

