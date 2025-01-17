/**
 * Simple rate limiting middleware
 * 
 * This middleware implements a basic rate limiter that restricts
 * each IP to a maximum number of requests within a specified time window.
 */

// Store request counts for each IP
// Using a Map for efficient key-value pair storage
const requestCounts = new Map();

// Define the time window for rate limiting (in milliseconds)
// 15 minutes = 15 * 60 * 1000 milliseconds
const WINDOW_MS = 15 * 60 * 1000;

// Define the maximum number of requests allowed within the time window
const MAX_REQUESTS = 100;

/**
 * Rate limiting middleware function
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function rateLimiter(req, res, next) {
  // Get the IP address of the client
  // This assumes the application is not behind a reverse proxy
  // In production, you might need to use req.headers['x-forwarded-for'] or similar
  const ip = req.ip;
  
  // Get the current timestamp
  const now = Date.now();
  
  // If this IP hasn't made any requests yet, initialize its request array
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }
  
  // Get the array of request timestamps for this IP
  const requests = requestCounts.get(ip);
  
  // Remove requests outside the current time window
  // This loop continues until we find a request within the current window
  while (requests.length > 0 && requests[0] <= now - WINDOW_MS) {
    requests.shift();  // Remove the oldest request
  }
  
  // Check if the number of requests in the current window exceeds the limit
  if (requests.length >= MAX_REQUESTS) {
    // If limit is exceeded, send a 429 (Too Many Requests) response
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }
  
  // If the limit is not exceeded, add the current request timestamp
  requests.push(now);
  
  // Pass control to the next middleware
  next();
}

// Export the middleware function so it can be used in other files
module.exports = rateLimiter;

