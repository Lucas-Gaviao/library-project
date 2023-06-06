const express = require('express');
const router = express.Router();

const Book = require('../models/Book.model');

// GET /books 
router.get("/books", (req, res, next) => {

    Book.find()
        .then((booksFromDB) =>{
            //console.log(booksFromDB)

            const data = {
                books: booksFromDB
            }
            res.render('books/books-list', data ) // res.render('books/books-list', {books: booksFromDB})
        })
        .catch((err) => {
            console.log("there was na error getting the list of books", err);
            next(err); //sending a response to the client in case there's any errors.
        })

});

// GET /books/create
router.get("/books/create", (req, res, next) => {
    res.render("books/book-create")

})

// POST /books/create
router.post("/books/create", (req, res, next) => {
    const newBook = {
        title: req.body.title,
        description: req.body.descrition,
        author: req.body.author,
        rating: req.body.rating
    } //create this object to get the exact info we want from the user.
       
    
    Book.create(newBook)
            .then((newBook) => {
                res.redirect("/books");
            })
            .catch((err) => {
                console.log("Ops, error creating new book :(", err);
                next(err)
            })
})
// GET /books/:bookId
router.get("/books/:bookId", (req, res, next) => {

    const id = req.params.bookId;

    // console.log(id)

    Book.findById(id)
        .then( data => {
            res.render("books/book-details", data)
            //console.log({data})
        })
        .catch((err) => {
            console.log("Ops, something wrong", err);
            next(err);
        })
})

router.get("/books/:bookId/edit", (req, res, next) => {
    const bookId = req.params.bookId;
           Book.findById(bookId)
             .then((bookToEdit) => {
                res.render("books/book-edit", {book: bookToEdit})
            })
             .catch((err) => {
                console.log("Ops, something wrong updating the book", err);
                next(err);
            }) 
})

router.post("/books/:bookId/edit", (req, res, next) => {
    const id = req.params.bookId
   
    const updateBook = {
        title: req.body.title,
        description: req.body.descrition,
        author: req.body.author,
        rating: req.body.rating
    }

    Book.findByIdAndUpdate(id, updateBook, { new: true })
        .then((updatedBook) => {
            //console.log(updatedBook)
            res.redirect(`books/${updatedBook.id}`)
        })
        .catch((err) => {
            console.log("Ops, something wrong updating the book", err);
            next(err);
        }) 
})

router.get("/books/:bookId/delete", (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .then((bookToDelete) => {
            res.render("books/book-delete", {bookToDelete})
        })
        .catch((err) => {
            console.log("Ops, something wrong deleting the book", err);
            next(err);
        }) 
})

router.post("/books/:bookId/delete", (req, res, next) => {
    const bookId = req.params.bookId;

    Book.findByIdAndDelete(bookId)
        .then(() => res.redirect('/books'))
        .catch((err) => {
            console.log("Ops, something wrong deleting the book", err);
            next(err);
        }) 
})


module.exports = router;
