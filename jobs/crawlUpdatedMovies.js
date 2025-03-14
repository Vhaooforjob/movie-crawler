const MovieService = require("../services/MovieService");

const crawlUpdatedMovies = async () => {
    console.log("🚀 Crawling updated movies...");
    try {
        const movies = await MovieService.fetchMovies({ type_list: "phim-moi-cap-nhat", page: 1 });
        await MovieService.saveMovies(movies);
        console.log("✅ Successfully crawled updated movies!");
    } catch (error) {
        console.error("❌ Error in crawlUpdatedMovies:", error.message);
    }
};

module.exports = crawlUpdatedMovies;
