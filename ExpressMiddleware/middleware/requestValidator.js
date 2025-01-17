/**
 * Request validation middleware
 * 
 * This middleware validates the username and password fields
 * in the request body for the login route.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function requestValidator(req, res, next) {
  const { username, password } = req.body;

  if (!username || username.length < 5) {
    return res.status(400).json({ error: 'Username must be at least 5 characters long' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  next();
}

module.exports = requestValidator;

