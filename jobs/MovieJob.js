const cron = require("node-cron");
const crawlUpdatedMovies = require("./crawlUpdatedMovies");
const crawlMoviesByCategory = require("./crawlMoviesByCategory");
const crawlMoviesByGenre = require("./crawlMoviesByGenre");
const CallAPI = require("./callApi");
require("dotenv").config();

const getCurrentTime = () => {
    return new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};

const startJobs = () => {
    console.log("⏳ Starting scheduled jobs...");

    cron.schedule(process.env.CRAWL_INTERVAL_30M, async () => {
        console.log(`[${getCurrentTime()}] 🔄 Running scheduled movie update crawl...`);
        await crawlUpdatedMovies();
    });

    cron.schedule(process.env.CRAWL_INTERVAL_30M, async () => {
        console.log(`[${getCurrentTime()}] 🔄 Running scheduled category movie crawl...`);
        await crawlMoviesByCategory();
    });

    cron.schedule(process.env.CRAWL_INTERVAL_30M, async () => {
        console.log(`[${getCurrentTime()}] 🔄 Running scheduled genre movie crawl...`);
        await crawlMoviesByGenre();
    });

    cron.schedule(process.env.CRAWL_INTERVAL_5M, async () => {
        console.log(`[${getCurrentTime()}] ⏳ Running scheduled API call...`);
        await CallAPI();
    });
};

module.exports = startJobs;
