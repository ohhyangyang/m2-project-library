var express = require("express");
const books = require("../bin/books-mock-data");
const Book = require("../models/Book.model");
var privateRouter = express.Router();

// Your routes
// GET /profile
privateRouter.get("/profile/:username", (req, res, next) => {
  // EXAMPLE /profile/david
  const session = req.session.currentUser;
  const userIsLoggedIn = Boolean(req.session.currentUser);
  console.log("userIsLoggedIn", userIsLoggedIn);
  console.log("session", session);
  const username = req.params.username;
  console.log("req.username", req.session.currentUser.username);

  //if username matches the user being logged in
  if (session.username === req.params.username) {
    Book.find({ status: "pending" })
      .populate("owner")
      .then((pendingBooks) => {
        let booksOwnedByTheUser = [];
        pendingBooks.forEach((book, i) => {
          if (book.owner.username === username) {
            booksOwnedByTheUser.push(book);
          }
        });
        Book.find({ status: "available" })
          .populate("owner")
          .then((availableBooks) => {
            let userLibrary = [];
            availableBooks.forEach((book, i) => {
              if (book.owner.username === username) {
                userLibrary.push(book);
              }
            });
            // return the array of books that are pending and waiting for davids approval
            const props = {
              booksOwnedbyTheUser: booksOwnedByTheUser,
              userLibrary: userLibrary,
              userIsLoggedIn,
              session,
            };
            //console.log("props",props)
            res.render("Profile", props);
          });
        
      });
      
  } else {
    Book.find({ status: "available" })
    .populate("owner")
    .then((availableBooks) =>{
    let userLibrary = [];
    availableBooks.forEach((book,i) =>{
        if (book.owner.username === username) {
            userLibrary.push(book);
          } 
    });
    const props = {
        userLibrary: userLibrary,
        userIsLoggedIn,
        session,
      };
      //console.log("props",props)
      res.render("Profile", props);
    })

  }
});

privateRouter.post("/profile/:username/:bookid", (req, res, next) => {
  const session = req.session.currentUser;
  const userIsLoggedIn = Boolean(req.session.currentUser);
  //console.log("session", session)
  //console.log("req.username",req.session.currentUser.username )
  const { bookid, username } = req.params;
  console.log("bookid", bookid);
  console.log("req.params", req.params);
  console.log("req.body.statusBorrowed", req.body.statusBorrowed);
  const { statusBorrowed } = req.body;
  //const username = req.params.username;
  //console.log("username in the url", username); //david
  Book.findById(bookid)
    .populate("owner")
    .then((foundBook) => {
      // It's a gift and the user says yes
      console.log("foundBook", foundBook);
      if (foundBook.gift === true && statusBorrowed === "yes") {
        console.log("This book should be deleted");
        Book.deleteOne({ _id: bookid }).then((deletedBook) => {
          res.redirect(`/private/profile/${username}`);
          console.log("The deleted item", deletedBook);
        });
      }
      // It's a gift and the user says no
      else if (foundBook.gift === true && statusBorrowed === "no") {
        console.log("This book is going back to my shelf");
        Book.findByIdAndUpdate(
          bookid,
          { status: "available" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
          console.log("updated Book", updatedBook);
        });
      }
      // It's not a gift and the user says yes
      else if (foundBook.gift === false && statusBorrowed === "yes") {
        console.log("I am going to lend this book to someone else");
        // add it to the array booksBorrowed
        Book.findByIdAndUpdate(
          bookid,
          { status: "borrowed" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
          console.log("updated Book", updatedBook);
        });
      }
      // It's not a gift and the user says no
      else if (foundBook.gift === false && statusBorrowed === "no") {
        console.log("I am not going to lend this book to someone else");
        Book.findByIdAndUpdate(
          bookid,
          { status: "available" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
          console.log("updated Book", updatedBook);
        });
      }
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
