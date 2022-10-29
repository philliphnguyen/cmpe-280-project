const express = require('express');
const router = new express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require('passport')

router.post('/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { $addToSet: { watchlist: req.params.id } })

        res.status(200).send({
            success: true
        })
    }
    catch(err) {
        res.status(400).send({
            success: false
        })
    }
})

router.delete('/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { $pull: { watchlist: req.params.id } })

        res.status(200).send({
            success: true
        })
    }
    catch(err) {
        res.status(400).send({
            success: false
        })
    }
})

router.get('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('watchlist')
        const watchlist = user.watchlist

        res.status(200).send({
            success: true,
            watchlist: watchlist
        })
    }
    catch(err) {
        res.status(400).send({
            success: false
        })
    }
})

module.exports = router