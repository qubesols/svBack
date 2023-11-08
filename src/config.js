// config.js
const dotenv = require("dotenv");

dotenv.config();
// Export env variables
module.exports = {
  API_KEY: process.env.CLIENT_ID,
  API_SECRET: process.env.CLIENT_SECRET,
};
