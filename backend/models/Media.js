const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({
    title: String,
    year: Number,
    age: String,
    rottenTomatoes: String,
    platforms: [String],
    type: String,
    imageURL: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Media", MediaSchema);