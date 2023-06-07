const express = require('express');
const bcryptjs = require("bcryptjs");

const User = require('../models/User.model');

const router = express.Router();

const saltRounds = 10;


// GET /signup
router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

// POST /signup
router.post("/signup", (req, res, next) => {
    //const email = req.body.email;
    //const pw = req.body.password;

    const {email, password} = req.body;

    bcryptjs.genSalt(saltRounds)
        .then((salt) => {
            //console.log(salt)
            return bcryptjs.hash(password, salt)
        })
        .then( (hash) => {
            const newUser = {
                email: email,
                passwordHash: hash
            }
            return User.create(newUser)
        })
        .then( (userFromDB) => {
            console.log("your user was created....")
        })
        .catch((err) => {
            console.log("error", err)
            next(err)
        })



})

module.exports = router;