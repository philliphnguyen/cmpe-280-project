const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const Media = mongoose.model("Media");

router.get('/all', async (req, res) => {
    try {
        const media = await Media.find({})

        res.status(200).send({
            success: true,
            media: media
        })
    }
    catch(err) {
        res.status(400).send({
            success: false,
        })
    }
})

router.get('/getById/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id).populate({ path: 'comments', 
            populate: { path: 'user',  select: 'name'}})

        res.status(200).send({
            success: true,
            media: media
        })
    }
    catch(err) {
        res.status(400).send({
            success: false
        })
    }
})

router.get('/search', async (req, res) => {
    try {
        const searchCriteria = req.body.query.match(/"[^"]*"|[^\s"]+/g) 
        let media = await Media.find({}).lean()

        searchCriteria.forEach(criteria => {
            if (criteria.substring(0, 9) === 'platform:') {
                let platform = criteria.substring(9, criteria.length)
                platform = platform.charAt(0).toUpperCase() + platform.slice(1);

                if (platform === 'Prime') platform = 'Prime Video'

                media = media.filter(m => m.platforms.includes(platform))
            }
            else if (criteria.substring(0, 5) === 'year:') {
                const year = parseInt(criteria.substring(5, criteria.length))

                media = media.filter(m => m.year === year)
            }
            else if (criteria.substring(0, 6) === 'score:') {
                const score = parseInt(criteria.substring(6, criteria.length))

                media = media.filter(m => parseInt(m.rottenTomatoes.substring(0, 2)) >= score)
            }
            else if (criteria.charAt(0) === '"' && criteria.charAt(criteria.length - 1) === '"') {
                const exact = criteria.substring(1, criteria.length - 1).toLowerCase()

                media = media.filter(m => m.title.toLowerCase().includes(exact))
            }
            else {
                const word = criteria.toLowerCase()

                media = media.filter(m => m.title.toLowerCase().includes(word))
            }
        })

        res.status(200).send({
            success: true,
            media: media
        })
    }
    catch (err) {
        res.status(400).send({
            success: false,
        })
    }
})

module.exports = router