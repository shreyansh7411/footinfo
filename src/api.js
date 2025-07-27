const axios = require('axios');

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

module.exports = api;