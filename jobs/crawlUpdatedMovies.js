const MovieService = require("../services/MovieService");
const fetchAndStoreMovieFunc = require("../utils/updateMovieDetail");

const crawlUpdatedMovies = async () => {
    console.log("Crawling updated movies...");
    try {
        const movies = await MovieService.fetchMovies({ type_list: "phim-moi-cap-nhat", page: 1 });
        
        if (!movies || movies.length === 0) {
            console.log("Không có phim mới cập nhật!");
            return;
        } 
        console.log(`Tìm thấy ${movies.length} phim mới!`);

        await MovieService.saveMovies(movies);

        await fetchAndStoreMovieFunc.fetchAndStoreMovies(movies);
        console.log("Successfully crawled updated movies!");
    } catch (error) {
        console.error("Error in crawlUpdatedMovies:", error.message);
    }
};

module.exports = crawlUpdatedMovies;
