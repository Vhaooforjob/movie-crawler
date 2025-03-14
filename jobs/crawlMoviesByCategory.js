const MovieService = require("../services/MovieService");

const categories = ["phim-bo", "phim-le", "tv-shows", "hoat-hinh", "phim-vietsub", "phim-thuyet-minh", "phim-long-tieng"];

const crawlMoviesByCategory = async () => {
    console.log("🚀 Crawling movies by category...");
    try {
        for (const category of categories) {
            console.log(`🔍 Crawling category: ${category}`);
            const movies = await MovieService.fetchMoviesCate({ type_list: category });
            await MovieService.saveMovies(movies);
        }
        console.log("✅ Successfully crawled movies by category!");
    } catch (error) {
        console.error("❌ Error in crawlMoviesByCategory:", error.message);
    }
};

module.exports = crawlMoviesByCategory;
