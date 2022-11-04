const express = require('express');
const router = new express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getJWT = (user) => {
    const payload = { _id: user._id, email: user.email }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 100800
    })
}

//Create an account
router.post('/register', async (req, res) => {
    const {email, name, password } = req.body
    const foundUser = await User.findOne({ email: email })

    if (!foundUser) {
        const hash = await bcrypt.hash(password, 10)

        if (hash) {
            const newUser = new User({
                email: email,
                name: name,
                password: hash,
                watchlist: []
            })
            try {
                const result = await newUser.save()

                const jwt = getJWT(result)

                res.status(200).send({
                    success: true,
                    jwt: jwt,
                    user: result
                })
            }
            catch(err) {
                res.status(400).send({
                    success: false
                })
            }
        }
    }
    else {
        res.status(400).send({
            success: false
        })
    }
});

//Log in
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const foundUser = await User.findOne({ email: email })

    if (foundUser) {
        const matchedPasswords = await bcrypt.compare(password, foundUser.password)

        if (matchedPasswords) {
            const jwt = getJWT(foundUser)

            res.status(200).send({
                success: true,
                jwt: jwt,
                user: foundUser
            })
        }
        else {
            res.status(400).send({
                success: false
            })
        }
    }
    else {
        res.status(400).send({
            success: false
        })
    }
    
})

module.exports = router