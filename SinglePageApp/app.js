// Import the Express.js framework into our application
const express = require('express');

// Create a new Express application instance
const app = express();

// Define which port number our server will listen on
const port = 3000;

// Tell Express to use Pug as our template engine
app.set('view engine', 'pug');

// Tell Express where to find our template files (in the './views' directory)
app.set('views', './views');

// Configure Express to serve static files (like CSS, images) from the 'public' directory
// This means files in 'public' can be accessed directly from the browser
app.use(express.static('public'));

// Create an array to store our recipe data
// Each recipe is an object within this array
const recipes = [
  {
    // First recipe object
    // Define the name of the recipe as a string
    name: "Chocolate Chip Cookies",
    
    // Create an array to store the ingredients
    // Each ingredient is a string in this array
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      // ... other ingredients
    ],
    
    // Create an array to store the cooking instructions
    // Each instruction is a string in this array
    instructions: [
      "Preheat the oven to 375°F (190°C).",
      // ... other instructions
    ]
  },
  {
    // Second recipe object with the same structure
    name: "Classic Banana Bread",
    ingredients: [
      "3 ripe bananas, mashed",
      "1/3 cup melted butter",
      "1/2 cup sugar",
      // ... other ingredients
    ],
    instructions: [
      "Preheat oven to 350°F (175°C)",
      // ... other instructions
    ]
  }
];

// Set up a route for the homepage ('/')
app.get('/', (req, res) => {
  // When someone visits the homepage:
  // - 'req' contains information about the incoming request
  // - 'res' contains methods to send back a response
  
  // Render the 'index' template (index.pug)
  // Pass the recipes array to the template as a variable named 'recipes'
  res.render('index', { recipes: recipes });
});

// Start the server and make it listen for incoming requests
app.listen(port, () => {
  // When the server starts successfully, log a message to the console
  // Uses a template literal (backticks) to include the port number in the message
  console.log(`Recipe app listening at http://localhost:${port}`);
});
