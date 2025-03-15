const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();
router.get("/all-movies", async (req, res) => {
    try {
        let { limit } = req.query;
        limit = parseInt(limit) || 0;

        const totalMovie = await Movie.countDocuments(); 
        const movies = await Movie.find({}).limit(limit);
        const fetchedMovie = movies.length;
        res.json({ 
            success: true,            
            totalMovie,
            fetchedMovie,
            data: movies });
    } catch (error) {
        console.error("❌ Error fetching movies:", error);
        res.status(500).json({ success: false, message: "Error fetching movies", error: error.message });
    }
});

router.get("/movies", async (req, res) => {
    try {
        let { limit, page } = req.query;
        limit = parseInt(limit) || 10; 
        page = parseInt(page) || 1;

        if (limit <= 0 || page <= 0) {
            return res.status(400).json({ success: false, message: "Limit và page phải lớn hơn 0" });
        }

        const totalMovie = await Movie.countDocuments(); 
        const movies = await Movie.find({})
            .sort({ modified_time: -1 }) 
            .skip((page - 1) * limit) 
            .limit(limit);

        const fetchedMovie = movies.length; 
        res.json({
            success: true,
            totalMovie,
            fetchedMovie,
            currentPage: page,
            totalPages: Math.ceil(totalMovie / limit),
            data: movies,
        });
    } catch (error) {
        console.error("❌ Error fetching movies:", error);
        res.status(500).json({ success: false, message: "Error fetching movies", error: error.message });
    }
});

module.exports = router;
