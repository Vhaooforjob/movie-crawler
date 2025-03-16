const axios = require("axios");
const Movie = require("../models/Movie");
const MovieDetail = require("../models/MovieDetail");
require("dotenv").config();

class MovieService {
    static async fetchMovies() {
        try {
            const apiUrl = `${process.env.API_URL_NEWUPDATE}`;
            console.log(`Fetching movies from: ${apiUrl}`);

            const { data } = await axios.get(apiUrl);
            if (!data || !data.items) return [];

            return data.items.map((item) => ({
                slug: item.slug,
                title: item.name || item.title || "Unknown",
                name: item.name,
                origin_name: item.origin_name,
                category: item.category || [],
                country: item.country || "",
                language: item.lang || "Unknown",
                poster_url: item.poster_url,
                thumb_url: item.thumb_url,
                year: item.year || 0,
                modified_time: new Date(item.modified.time),
            }));
        } catch (error) {
            console.error("Error fetching movies:", error.message);
            return [];
        }
    }

    static async fetchMoviesCate({ type_list }) {
        try {
            const apiUrl = `${process.env.API_URL}/danh-sach/${type_list}`;
            console.log(`Fetching movies from: ${apiUrl}`);

            const { data } = await axios.get(apiUrl);
            if (!data || !data.data || !data.data.items) return [];

            return data.data.items.map((item) => {
                if (!item.name) {
                    console.log(`Skipped movie: Missing name`);
                    return null;
                }
    
                console.log(`Saved movie: ${item.name}`);
                return {
                    slug: item.slug,
                    name: item.name,
                    origin_name: item.origin_name,
                    poster_url: item.poster_url?.startsWith("http") 
                        ? item.poster_url 
                        : `${process.env.API_IMAGE_URL}/${item.poster_url}`,
                    thumb_url: item.thumb_url?.startsWith("http") 
                        ? item.thumb_url 
                        : `${process.env.API_IMAGE_URL}/${item.thumb_url}`,
                    year: item.year,
                    category: Array.isArray(item.category) 
                        ? item.category.map(c => c.name).join(", ")  
                        : "",
                    country: Array.isArray(item.country) && item.country.length > 0 
                        ? item.country[0].name  
                        : "",
                    modified_time: new Date(item.modified.time),
                };
            }).filter(Boolean);
        } catch (error) {
            console.error("Error fetching movies:", error.message);
            return [];
        }
    }

    static async fetchMoviesGenres({ type_list }) {
        try {
            const apiUrl = `${process.env.API_URL}/the-loai/${type_list}`;
            console.log(`Fetching movies from: ${apiUrl}`);
    
            const { data } = await axios.get(apiUrl);
            if (!data || !data.data || !data.data.items) return [];
    
            return data.data.items.map((item) => {
                if (!item.name) {
                    console.log(`Skipped movie: Missing name`);
                    return null;
                }
    
                console.log(`Saved movie: ${item.name}`);
    
                return {
                    slug: item.slug,
                    name: item.name,
                    origin_name: item.origin_name,
                    poster_url: item.poster_url?.startsWith("http") 
                        ? item.poster_url 
                        : `${process.env.API_IMAGE_URL}/${item.poster_url}`,
                    thumb_url: item.thumb_url?.startsWith("http") 
                        ? item.thumb_url 
                        : `${process.env.API_IMAGE_URL}/${item.thumb_url}`,
                    year: item.year,
                    category: Array.isArray(item.category) 
                        ? item.category.map(c => c.name).join(", ")  
                        : "",
                    country: Array.isArray(item.country) && item.country.length > 0 
                        ? item.country[0].name  
                        : "",
                    modified_time: new Date(item.modified.time),
                };
            }).filter(Boolean);
        } catch (error) {
            console.error("Error fetching movies:", error.message);
            return [];
        }
    }
     

    static async saveMovies(movies) {
        for (const movie of movies) {
            try {
                const existingMovie = await Movie.findOne({ slug: movie.slug });

                if (!existingMovie) {
                    await Movie.create(movie);
                    console.log(`Saved new movie: ${movie.name}`);
                } else if (new Date(movie.modified_time) > existingMovie.modified_time) {
                    await Movie.updateOne({ slug: movie.slug }, movie);
                    console.log(`Updated movie: ${movie.name}`);
                } else {
                    console.log(`Skipped (No changes): ${movie.name}`);
                }
            } catch (error) {
                console.error(`Error saving movie ${movie.name}:`, error.message);
            }
        }
    }
    static async fetchAndStoreMovie(slug) {
        console.log(`Đang fetch phim: ${slug}`);
        try {
            const response = await axios.get(`${process.env.API_URL_DETAIL}/${slug}`);

            if (!response.data || !response.data.movie) {
                console.log(`Không tìm thấy phim: ${slug}`);
                return;
            }

            const movieData = response.data.movie;

            const episodesData = response.data.episodes || [];

            let episodes = episodesData.map(server => ({
                server_name: server.server_name,
                server_data: server.server_data || []
            }));       

            const movieDetail = {
                _id: movieData._id,
                name: movieData.name,
                slug: movieData.slug,
                origin_name: movieData.origin_name,
                content: movieData.content,
                type: movieData.type,
                status: movieData.status,
                poster_url: movieData.poster_url,
                thumb_url: movieData.thumb_url,
                trailer_url: movieData.trailer_url,
                time: movieData.time,
                episode_current: movieData.episode_current,
                episode_total: parseInt(movieData.episode_total, 10) || 0,
                quality: movieData.quality,
                lang: movieData.lang,
                year: movieData.year,
                actor: movieData.actor || [],
                director: movieData.director || [],
                category: movieData.category || [],
                country: movieData.country || [],
                episodes: episodes,
            };
            await MovieDetail.findOneAndUpdate(
                { slug: movieData.slug },
                movieDetail,
                { upsert: true, new: true }
            );

            console.log(`Lưu nội dung phim ${movieData.name} thành công`);
        } catch (error) {
            console.error(`Lỗi khi lấy phim ${slug}:`, error.message);
        }
    }
}
    
module.exports = MovieService;
