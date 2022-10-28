const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
    }
},
{ timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);