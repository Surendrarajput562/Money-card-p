const plaid = require('plaid');
require('dotenv').config();

// Plaid client setup
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox, // Use 'plaid.environments.production' for production
});

// Generate a link token
const createLinkToken = async (req, res) => {
  try {
    const tokenResponse = await client.linkTokenCreate({
      user: { client_user_id: 'unique_user_id' },
      client_name: 'Your App Name',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://sample-web-hook.com',
    });
    res.json(tokenResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating token');
  }
};

module.exports = { createLinkToken };

const exchangePublicToken = async (publicToken) => {
  try {
    const response = await client.exchangePublicToken(publicToken);
    console.log('Access Token:', response.access_token);
    return response.access_token;
  } catch (err) {
    console.error('Error exchanging public token:', err);
    return null;
  }
};