const express = require('express');
const router = new express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcrypt')

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
                password: hash
            })

            try {
                const result = await newUser.save()

                res.status(200).send({
                    success: true
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
            res.status(200).send({
                success: true,
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