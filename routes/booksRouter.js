var express = require("express");
const Book = require("../models/Book.model");
const User = require("../models/User.model");
var booksRouter = express.Router();

//GET /books/library
booksRouter.get("/library", (req, res, next) => {
  
  Book.find()
  .then((allBooks)=> {
    console.log("allBooks", allBooks)
    const props = {books: allBooks}; 
    console.log("props", props);
    res.render("Library", props);
  })
});

//GET    /books/library/:bookId
booksRouter.get("/library/:bookId", (req, res, next) => {});

// GET     /books/add
booksRouter.get("/add", (req, res, next) => {
  res.render("AddBook");
});

// POST    /books/add
booksRouter.post("/add", (req, res, next) => {
  const { title, author, category, gift } = req.body;
  console.log("req.body", req.body);
  // EX: title: 1984, author: George Orwell, category: fiction, gift: yes
  // If any fields are empty, display error message
  if (title === "" || author === "" || category === "" || gift === "") {
    const props = { errorMessage: "Please enter all the information" };
    console.log("props", props);
    res.render("AddBook", props);
    return;
  }
  // if input is given, create the book
  Book.create({ title: title, author: author, category: category, gift: gift })
    .then((createdBook) => {
      console.log("createdBooK", createdBook);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET /books/library/:ownderID
booksRouter.post("/library/:ownerid", (req, res, next) => {
  const { ownerid } = req.query.ownerid;
  User.findById(ownerid).then((ownerid) => {});
});

//DELETE /books/library/delete
booksRouter.delete("/delete", (req, res, next) => {
  const { bookid } = req.query.bookid;
  Book.findByIdAndDelete(bookid)
    .then(() => {
      res.redirect("/library");
    })
    .catch((error) => {
      console.log("error", err);
    });
});

//EDIT /books/library/edit
booksRouter.get("/edit", (req, res, next) => {
  res.render("UpdateBook");
});

//POST /books/library/edit
booksRouter.post("/edit", (req, res, next) => {
  const { bookid } = req.query;
  const { title, author, category, gift } = req.body;
  Book.findByIdAndUpdate(
    bookid,
    { title, author, category, gift },
    { new: true }
  )
    .then((updatedBook) => {
      console.log("Updated Book", updatedBook), res.redirect("/library");
    })
    .catch((error) => {
      console.log("error", err);
    });
});

module.exports = booksRouter;
