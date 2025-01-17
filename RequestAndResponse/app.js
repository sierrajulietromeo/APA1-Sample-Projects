// Import required modules
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');

// Initialize Express application
const app = express();
const port = 3000;

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Set up routes
app.use('/', taskRoutes); // Use taskRoutes for the root path
app.use('/team', teamRoutes); // Use teamRoutes for the '/team' path

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced'); // Log when database is synced
  app.listen(port, () => {
    console.log(`Task Management System is running on http://localhost:${port}`);
  });
});

