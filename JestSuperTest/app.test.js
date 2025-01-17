const request = require('supertest');  // SuperTest library for HTTP assertions
const app = require('./app');  // Import the Express app we want to test

// Main describe block for the Express App tests
describe('Express App', () => {

  // Nested describe block for Page Rendering tests
  describe('Page Rendering', () => {
    // Test for the home route
    test('GET / should return 200 and render index page', async () => {
      const response = await request(app).get('/');  // Make a GET request to the root route
      expect(response.statusCode).toBe(200);  // Expect a 200 OK status code
      expect(response.text).toContain('Welcome to our Express app with Pug!');  // Check for expected content
    });

    // Test for the about route
    test('GET /about should return 200 and render about page', async () => {
      const response = await request(app).get('/about');  // Make a GET request to the about route
      expect(response.statusCode).toBe(200);  // Expect a 200 OK status code
      expect(response.text).toContain('This is a demo Express app using Pug templating.');  // Check for expected content
    });

    // Test for a non-existent route
    test('GET /nonexistent should return 404', async () => {
      const response = await request(app).get('/nonexistent');  // Make a GET request to a non-existent route
      expect(response.statusCode).toBe(404);  // Expect a 404 Not Found status code
    });
  });

  // Nested describe block for API Endpoints tests
  describe('API Endpoints', () => {
    // Test for the /api/data route
    test('GET /api/data should return JSON with message and timestamp', async () => {
      const response = await request(app).get('/api/data');  // Make a GET request to the API data route
      expect(response.statusCode).toBe(200);  // Expect a 200 OK status code
      expect(response.type).toBe('application/json');  // Check that the response type is JSON
      expect(response.body).toHaveProperty('message', 'This is some API data');  // Check for expected message property
      expect(response.body).toHaveProperty('timestamp');  // Check for timestamp property
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);  // Validate that the timestamp is a valid date
    });

    // Test for the /api/echo route
    test('POST /api/echo should return the same JSON sent', async () => {
      const testData = { key: 'value', number: 42 };  // Sample data to send
      const response = await request(app)
        .post('/api/echo')  // Make a POST request to the echo route
        .send(testData)  // Send the test data
        .set('Accept', 'application/json');  // Set the Accept header
      expect(response.statusCode).toBe(200);  // Expect a 200 OK status code
      expect(response.type).toBe('application/json');  // Check that the response type is JSON
      expect(response.body).toEqual(testData);  // Check that the response body matches the sent data
    });
  });

  // Nested describe block for Response Time tests
  describe('Response Time', () => {
    // Test for the /slow route
    test('GET /slow should respond within 2 seconds', async () => {
      const startTime = Date.now();  // Record the start time
      const response = await request(app).get('/slow');  // Make a GET request to the slow route
      const endTime = Date.now();  // Record the end time
      const duration = endTime - startTime;  // Calculate the duration

      expect(response.statusCode).toBe(200);  // Expect a 200 OK status code
      expect(response.text).toBe('This is a slow response');  // Check for expected response text
      expect(duration).toBeGreaterThanOrEqual(1000);  // Ensure the response took at least 1 second
      expect(duration).toBeLessThan(2000);  // Ensure the response took less than 2 seconds
    }, 3000);  // Set a 3-second timeout for this test
  });

  // Nested describe block for Error Handling tests
  describe('Error Handling', () => {
    // Test for using wrong HTTP method
    test('POST to GET endpoint should return 404', async () => {
      const response = await request(app).post('/');  // Make a POST request to a GET-only route
      expect(response.statusCode).toBe(404);  // Expect a 404 Not Found status code
    });

    // Test for sending invalid JSON
    test('Sending invalid JSON should return 400', async () => {
      const response = await request(app)
        .post('/api/echo')  // Make a POST request to the echo route
        .set('Content-Type', 'application/json')  // Set the Content-Type header
        .send('{"invalid": json}');  // Send invalid JSON
      expect(response.statusCode).toBe(400);  // Expect a 400 Bad Request status code
    });
  });

  // Nested describe block for Content Type tests
  describe('Content Type', () => {
    // Test for HTML content type
    test('HTML endpoints should return text/html', async () => {
      const response = await request(app).get('/');  // Make a GET request to the root route
      expect(response.type).toBe('text/html');  // Check that the response type is HTML
    });

    // Test for JSON content type
    test('API endpoints should return application/json', async () => {
      const response = await request(app).get('/api/data');  // Make a GET request to the API data route
      expect(response.type).toBe('application/json');  // Check that the response type is JSON
    });
  });
});

