const axios = require("axios");
const cron = require("node-cron");
require("dotenv").config();

const API_URL_RUNNER = process.env.API_URL_RUNNER;
const CallAPI = async () => {
    try {
        console.log(`🔄 Calling API: ${API_URL_RUNNER}`);
        const response = await axios.get(API_URL_RUNNER);
        console.log("✅ API response:", response.data);
    } catch (error) {
        console.error("❌ Error calling API:", error.message);
    }
};

module.exports = CallAPI;
