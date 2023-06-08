const express = require('express');
const router = express.Router();

const Book = require('../models/Book.model');
const Author = require('../models/Author.model');

router.get("/authors", (req, res, next) => {
    Author.find()
        .then((authors) => {
            res.render("authors/authors-list", {authors})
        })
        .catch((e) => {
            console.log("error", e)
            next(e)
        })
})


module.exports = router;