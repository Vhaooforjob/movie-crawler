const MovieService = require("../services/MovieService");
const fetchAndStoreMovieFunc = require("../utils/updateMovieDetail");

const categories = ["phim-bo", "phim-le", "tv-shows", "hoat-hinh", "phim-vietsub", "phim-thuyet-minh", "phim-long-tieng"];

const crawlMoviesByCategory = async () => {
    console.log("Crawling movies by category...");
    try {
        for (const category of categories) {
            console.log(`Crawling category: ${category}`);

            const movies = await MovieService.fetchMoviesCate({ type_list: category });
            console.log(`Fetched ${movies.length} movies for category`);
            
            if (movies.length > 0) {
                await MovieService.saveMovies(movies);
                console.log(`Completed ${movies.length} movies for category: ${category}`);
                await fetchAndStoreMovieFunc.fetchAndStoreMovies(movies);
            } else {
                console.log(`No movies found for category: ${category}`);
            }
        }
        console.log("Successfully crawled movies by category!");
    } catch (error) {
        console.error("Error in crawlMoviesByCategory:", error.message);
    }
};

module.exports = crawlMoviesByCategory;
