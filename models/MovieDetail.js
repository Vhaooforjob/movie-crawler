const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    _id: String,
    name: String,
    slug: String,
    origin_name: String,
    content: String,
    type: String,
    status: String,
    poster_url: String,
    thumb_url: String,
    trailer_url: String,
    time: String,
    episode_current: String,
    episode_total: Number,
    quality: String,
    lang: String,
    year: Number,
    actor: [String],
    director: [String],
    category: [{ id: String, name: String, slug: String }],
    country: [{ id: String, name: String, slug: String }],
    episodes: [
        {
            server_name: String,
            server_data: [
                {
                    name: String,
                    slug: String,
                    filename: String,
                    link_embed: String,
                    link_m3u8: String
                }
            ]
        }
    ]
});

module.exports = mongoose.model('MovieDetail', MovieSchema);
