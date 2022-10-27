const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({
    title: String,
    year: Number,
    age: String,
    rottenTomatoes: String,
    platforms: [String],
    type: String,
    imageURL: String
});

module.exports = mongoose.model("Media", MediaSchema);