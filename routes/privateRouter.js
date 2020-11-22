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
  console.log("session", session)
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
      const props = {booksOwnedbyTheUser: booksOwnedByTheUser, userIsLoggedIn, session}; 
      //console.log("props",props)
      res.render("Profile", props);
    });

});

privateRouter.post("/profile/:username/:bookid", (req,res,next) =>{
    const session = req.session.currentUser;
    const userIsLoggedIn = Boolean(req.session.currentUser);
    //console.log("session", session)
    //console.log("req.username",req.session.currentUser.username )
    const {bookid, username} = req.params
    console.log("bookid", bookid)
    console.log("req.params", req.params)
    console.log("req.body.statusBorrowed", req.body.statusBorrowed)
    const {statusBorrowed} = req.body
    //const username = req.params.username;
    //console.log("username in the url", username); //david
    Book.findById(bookid)
    .populate("owner")
    .then((foundBook)=>{
        // It's a gift and the user says yes
        if (foundBook.gift === true && statusBorrowed === "yes" ) {
        Book.deleteOne({_id: bookid});
        }
        // It's a gift and the user says no
        else if (foundBook.gift === true && statusBorrowed === "no" ) {
        Book.findOneAndUpdate({id: bookid}, {status: "available"})
        }
        // It's not a gift and the user says yes
        else if (foundBook.gift === false && statusBorrowed === "yes" ) {
        // find the borrower id 
        }   
        // It's not a gift and the user says no
        else if (foundBook.gift === false && statusBorrowed === "no" ) {
        Book.findOneAndUpdate({id: bookid}, {status: "available"})
        } 
    });
  
    Book.find({status: "pending" })
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
        const props = {booksOwnedbyTheUser: booksOwnedByTheUser, userIsLoggedIn, session}; 
        //console.log("props",props)
        res.render("Profile", props);
      });
})

// GET /
privateRouter.get("/edit-profile", (req, res, next) => {
  const userIsLoggedIn = Boolean(req.session.currentUser);
  const props = { userIsLoggedIn };
  res.render("UpdateProfile", props);
});

privateRouter.post("/edit-profile", (req, res, next) => {

});

module.exports = privateRouter;
