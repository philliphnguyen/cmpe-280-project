const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const Media = mongoose.model("Media");

router.get('/', async (req, res) => {
    try {
        const media = await Media.find({})

        res.status(200).send({
            success: true,
            media: media
        })
    }
    catch {
        res.status(400).send({
            success: false
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id).populate({ path: 'comments', 
            populate: { path: 'user',  select: 'name'}})

        res.status(200).send({
            success: true,
            media: media
        })
    }
    catch {
        res.status(400).send({
            success: false
        })
    }
})

module.exports = router