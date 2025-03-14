const cron = require("node-cron");
const crawlUpdatedMovies = require("./crawlUpdatedMovies");
const crawlMoviesByCategory = require("./crawlMoviesByCategory");
const crawlMoviesByGenre = require("./crawlMoviesByGenre");
const startJobs = () => {
    console.log("⏳ Starting scheduled jobs...");

    // cron.schedule(process.env.CRAWL_INTERVAL, async () => {
    //     console.log("🔄 Running scheduled movie update crawl...");
    //     await crawlUpdatedMovies();
    // });
    cron.schedule(process.env.CRAWL_INTERVAL, async () => {
        console.log('🚀 Crawling movies...');
        await crawlUpdatedMovies();
    });
    cron.schedule(process.env.CRAWL_INTERVAL, async () => {
        console.log("🔄 Running scheduled category movie crawl...");
        await crawlMoviesByCategory();
    });
    cron.schedule(process.env.CRAWL_INTERVAL, async () => {
        console.log("🔄 Running scheduled genre movie crawl...");
        await crawlMoviesByGenre();
    });
};

module.exports = startJobs;
