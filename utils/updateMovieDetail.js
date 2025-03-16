const MovieService = require("./../services/MovieService");

const fetchAndStoreMovieFunc = {
    async fetchAndStoreMovies(movies) {
        console.log("Gọi fetchAndStoreMovie cho từng phim...");
        await Promise.all(movies.map(async (movie) => {
            if (!movie.slug) {
                console.log("Bỏ qua phim không có slug!", movie);
                return;
            }
            try {
                await MovieService.fetchAndStoreMovie(movie.slug);
            } catch (error) {
                console.error(`Lỗi khi fetch phim ${movie.slug}:`, error.message);
            }
        }));
    }
};

module.exports = fetchAndStoreMovieFunc;
