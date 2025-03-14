const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    title: String,
    category: { type: [String], default: [] }, 
    name: String,
    country: String,
    language: String,
    origin_name: String,
    poster_url: String,
    thumb_url: String,
    year: Number,
    modified_time: { type: Date, default: Date.now }, 
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);
