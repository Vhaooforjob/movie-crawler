const mongoose = require('mongoose');
const dotenv = require('dotenv');
const os = require('os');

dotenv.config();

const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Failed:', err);
        process.exit(1);
    }
};


module.exports = connectDB;
