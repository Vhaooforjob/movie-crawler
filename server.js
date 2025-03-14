const express = require("express");
const connectDB = require("./config/database");
const crawlUpdatedMovies = require("./jobs/crawlUpdatedMovies");
const crawlMoviesByCategory = require("./jobs/crawlMoviesByCategory");
const startJobs = require("./jobs/MovieJob");
require("dotenv").config();

const app = express();
connectDB();

app.get("/", (req, res) => res.send("🎬 Movie Crawler API is running..."));
app.get("/crawl/updated", async (req, res) => {
    await crawlUpdatedMovies();
    res.send("✅ Crawled updated movies");
});
app.get("/crawl/category", async (req, res) => {
    await crawlMoviesByCategory();
    res.send("✅ Crawled movies by category");
});

startJobs();

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
