// Import the core Express module
const express = require('express');

// Import the path module for working with file and directory paths
const path = require('path');

// Import custom middleware modules
const customLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authenticate = require('./middleware/authenticate');
const requestValidator = require('./middleware/requestValidator');
const rateLimiter = require('./middleware/rateLimiter');

// Create an instance of an Express application
// This is the foundation of our web application
const app = express();

// Define the port number on which the server will listen
// Using 3000 as it's a common default for development
const port = 3000;

// Set up the view engine for the Express application
// We're using Pug as our template engine
app.set('view engine', 'pug');

// Set the directory for the views
// __dirname is the directory of the current module (app.js)
// We're telling Express to look for views in the 'views' directory
app.set('views', path.join(__dirname, 'views'));

// Middleware setup

// Built-in middleware

// Parse incoming requests with JSON payloads
// This allows us to access request body data in req.body for JSON requests
app.use(express.json());

// Parse URL-encoded bodies
// This allows us to access form data in req.body
// extended: true allows for rich objects and arrays to be encoded
app.use(express.urlencoded({ extended: true }));

// Custom middleware

// Apply our custom logging middleware
// This will log details about each request
app.use(customLogger);

// Apply our custom rate limiting middleware
// This will restrict the number of requests from a single IP
app.use(rateLimiter);

// Routes

// Home route
// This renders our index page when a user visits the root URL
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Express Middleware Demo', 
    message: 'Welcome to our Express app with custom middleware!' 
  });
});

// Login route
// This handles POST requests to /login
// It uses our requestValidator middleware before processing the login
app.post('/login', requestValidator, (req, res) => {
  // Mock authentication
  // In a real application, you would check against a database
  if (req.body.username === 'admin' && req.body.password === 'password123') {
    // If authentication is successful, send a success message and mock token
    res.json({ message: 'Login successful', token: 'mock-jwt-token' });
  } else {
    // If authentication fails, send a 401 Unauthorized response
    res.status(401).json({ message: 'Authentication failed' });
  }
});

// Protected route
// This route uses our authenticate middleware to ensure only authenticated users can access it
app.get('/protected', authenticate, (req, res) => {
  // If authentication is successful, send a success message and user info
  res.json({ message: 'This is a protected route', user: req.user });
});

// Error route for testing error handling middleware
// This intentionally throws an error to demonstrate our error handling
app.get('/error', (req, res, next) => {
  // Pass an error to the next middleware
  next(new Error('This is a test error'));
});

// Error handling middleware
// This should be the last middleware used
// It will catch any errors that occur in our application
app.use(errorHandler);

// Start the server
// This tells Express to start listening for requests on the specified port
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

