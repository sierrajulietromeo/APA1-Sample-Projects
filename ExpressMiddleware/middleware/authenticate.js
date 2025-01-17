/**
 * Authentication middleware
 * 
 * This middleware checks for a mock token in the Authorization header.
 * In a real application, this would verify a JWT or session token.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function authenticate(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    // If there's no token, return an unauthorized response
    return res.sendStatus(401);
  }

  // In a real application, you would verify the token here
  // For this example, we'll just check if it's our mock token
  if (token === 'mock-jwt-token') {
    // If the token is valid, add mock user information to the request object
    req.user = { username: 'admin' };
    next(); // Pass control to the next middleware function
  } else {
    // If the token is invalid, return a forbidden response
    return res.sendStatus(403);
  }
}

module.exports = authenticate;

