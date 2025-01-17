// Import required modules
const express = require('express');  // Express.js framework for building web applications
const path = require('path');  // Node.js module for working with file and directory paths

// Create an instance of an Express application
const app = express();
const port = 3000;  // Port number on which the server will listen

// Set up the view engine
app.set('view engine', 'pug');  // Use Pug as the template engine
app.set('views', path.join(__dirname, 'views'));  // Set the directory for the view files

// Middleware setup
app.use(express.json());  // Parse incoming requests with JSON payloads

// Define routes

// Home route
app.get('/', (req, res) => {
  // Render the 'index' template with specified title and message
  res.render('index', { title: 'Express Pug App', message: 'Welcome to our Express app with Pug!' });
});

// About route
app.get('/about', (req, res) => {
  // Render the 'about' template with specified title and content
  res.render('about', { title: 'About Us', content: 'This is a demo Express app using Pug templating.' });
});

// API data route
app.get('/api/data', (req, res) => {
  // Send a JSON response with a message and current timestamp
  res.json({ message: 'This is some API data', timestamp: new Date().toISOString() });
});

// Echo API route
app.post('/api/echo', (req, res) => {
  // Send back the received request body as a JSON response
  res.json(req.body);
});

// Slow response route
app.get('/slow', (req, res) => {
  // Simulate a slow response by waiting for 1 second before sending the response
  setTimeout(() => {
    res.send('This is a slow response');
  }, 1000);
});

// Start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

// Export the app for testing purposes
module.exports = app;

