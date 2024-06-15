const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const API_KEY = process.env.API_KEY;

app.use(cors());

app.get('/api/crypto-prices', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
      params: {
        start: 1,
        limit: 100,
        convert: 'USD',
      },
    });
    const data = response.data.data.filter(crypto => ['vechain', 'solana', 'usd-coin'].includes(crypto.slug));
    res.json(data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

module.exports = app; 
