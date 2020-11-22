var express = require("express");
const books = require("../bin/books-mock-data");
const Book = require("../models/Book.model");
var privateRouter = express.Router();

// Your routes
// GET /profile
privateRouter.get("/profile/:username", (req, res, next) => {
  // EXAMPLE /profile/david

  const userIsLoggedIn = Boolean(req.session.currentUser);
  const username = req.params.username;
  console.log("req.username",req.session.currentUser.username )

  //const username = req.params.username;
  //console.log("username in the url", username); //david

  Book.find({ status: "pending" })
    .populate("owner")
    .then((pendingBooks) => {
    //console.log("pendingBooks", pendingBooks);
    //console.log("pendingBooks", typeof pendingBooks);
      let booksOwnedByTheUser = [];
      pendingBooks.forEach((book, i) => {
        //console.log("books", book)
        //console.log("book owner", book.owner.username);
        //console.log("username", username);
        if (book.owner.username === username) {  
        //console.log("book", book); 
        //console.log("The requested books have been found");
          booksOwnedByTheUser.push(book); 
        //console.log("booksOwnedByTheUser", booksOwnedByTheUser);
        } 
        else {
        //console.log("The requested books have not been found");
        }
    
      });
      // return the array of books that are pending and waiting for davids approval
      const props = {booksOwnedbyTheUser: booksOwnedByTheUser}; 
      //console.log("props",props)
      res.render("Profile", props);
    });

});

// GET /
privateRouter.get("/edit-profile", (req, res, next) => {
  const userIsLoggedIn = Boolean(req.session.currentUser);
  const props = { userIsLoggedIn };
  res.render("UpdateProfile", props);
});

privateRouter.post("/edit-profile", (req, res, next) => {});

module.exports = privateRouter;
