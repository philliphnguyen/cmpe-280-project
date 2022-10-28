const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const Media = mongoose.model("Media");
const Comment = mongoose.model("Comment")
const User = mongoose.model("User")
const passport = require('passport')

router.post('/:movie_id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const comment = new Comment({
        body: req.body.body,
        user: req.user._id,
        media: req.params.movie_id
    })

    try {
        const result = await comment.save()
        
        const update = await Media.findOneAndUpdate( { _id: req.params.movie_id }, { $push: { comments: result._id } })

        res.status(200).send({
            success: true,
            comment: result
        })
    }
    catch {
        res.status(400).send({
            success: false
        })
    }
})

module.exports = router