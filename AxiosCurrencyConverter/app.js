// Import the axios library for making HTTP requests
const axios = require('axios');

// Define the base URL for the Exchange Rate API
// This API provides free access without requiring an API key
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

/**
 * Fetches the exchange rate between two currencies.
 * 
 * @param {string} fromCurrency - The currency to convert from (e.g., 'USD')
 * @param {string} toCurrency - The currency to convert to (e.g., 'EUR')
 * @returns {Promise<number|null>} The exchange rate or null if an error occurs
 */
async function getExchangeRate(fromCurrency, toCurrency) {
  try {
    // Make a GET request to the Exchange Rate API
    // The API returns the latest exchange rates for the base currency (fromCurrency)
    const response = await axios.get(`${BASE_URL}/${fromCurrency}`);

    // Extract the exchange rate for the target currency from the response
    const rate = response.data.rates[toCurrency];
    
    if (rate) {
      // If the rate is found, log it and return the value
      console.log(`1 ${fromCurrency} = ${rate} ${toCurrency}`);
      return rate;
    } else {
      // If the rate is not found, log an error message and return null
      console.log(`Unable to get rate for ${fromCurrency} to ${toCurrency}`);
      return null;
    }
  } catch (error) {
    // If an error occurs during the API request, log it and return null
    console.error('Error fetching exchange rate:', error.message);
    return null;
  }
}

/**
 * Converts an amount from one currency to another.
 * 
 * @param {number} amount - The amount to convert
 * @param {string} fromCurrency - The currency of the amount
 * @param {string} toCurrency - The currency to convert to
 * @returns {Promise<string|null>} The converted amount as a string or null if conversion fails
 */
async function convertCurrency(amount, fromCurrency, toCurrency) {
  // Fetch the exchange rate
  const rate = await getExchangeRate(fromCurrency, toCurrency);
  
  if (rate) {
    // If a valid rate is returned, perform the conversion
    const convertedAmount = (amount * rate).toFixed(2);
    console.log(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    return convertedAmount;
  }
  // If no valid rate is found, return null
  return null;
}

/**
 * Runs example currency conversions to demonstrate the functionality.
 */
async function runExamples() {
  console.log("Fetching exchange rates:");
  // Example 1: USD to EUR
  await getExchangeRate('USD', 'EUR');
  // Example 2: EUR to GBP
  await getExchangeRate('EUR', 'GBP');
  // Example 3: GBP to JPY
  await getExchangeRate('GBP', 'JPY');
  
  console.log("\nConverting currencies:");
  // Example 4: Convert 100 USD to EUR
  await convertCurrency(100, 'USD', 'EUR');
  // Example 5: Convert 50 GBP to JPY
  await convertCurrency(50, 'GBP', 'JPY');
  
  // Example similar to the provided code for product price conversion
  console.log("\nSimulating product price conversion:");
  const productPrice = 29.99;
  const fromCurrency = 'GBP';
  const toCurrency = 'USD';
  
  // Perform the conversion
  const convertedPrice = await convertCurrency(productPrice, fromCurrency, toCurrency);
  if (convertedPrice) {
    console.log(`Product price: ${productPrice} ${fromCurrency}`);
    console.log(`Converted price: ${convertedPrice} ${toCurrency}`);
  }
}

// Execute the example functions
runExamples();

