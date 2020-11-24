var express = require("express");
const books = require("../bin/books-mock-data");
const Book = require("../models/Book.model");
const User = require("../models/User.model");
var privateRouter = express.Router();
const parser = require("./../config/cloudinary");

// GET /profile
privateRouter.get("/profile/:username", (req, res, next) => {
  const session = req.session.currentUser;
  const userIsLoggedIn = Boolean(req.session.currentUser);
  const username = req.params.username;
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

        // Response from requests you have sent
        User.findById(session._id).then((foundUser) => {
          const messages = foundUser.message;
          let messagesUnseen = [];
          messages.forEach((message, i) => {
            if (message && message.status === "unseen") {
              //console.log("message", message)
              messagesUnseen.push(message);
            }
          });

          // Your library
          Book.find({ status: "available" })
            .populate("owner")
            .then((availableBooks) => {
              let userLibrary = [];
              availableBooks.forEach((book, i) => {
                if (book.owner.username === username) {
                  userLibrary.push(book);
                }
              });

              Book.find({ status: "borrowed" }).then((borrowedBooks) => {
                console.log("borrowedBooks", borrowedBooks);
                console.log("session._id", session._id);

                let borrowedLibrary = [];
                borrowedBooks.forEach((book, i) => {
                  if (book.borrower == session._id) {
                    console.log("book.borrower", book.borrower);
                    console.log("session._id", session._id);

                    borrowedLibrary.push(book);
                  }
                });

                // return the array of books that are pending and waiting for davids approval
                const props = {
                  booksOwnedbyTheUser: booksOwnedByTheUser,
                  userLibrary: userLibrary,
                  userIsLoggedIn,
                  session,
                  messagesUnseen: messagesUnseen,
                  user: req.params.username,
                  borrowedLibrary: borrowedLibrary,
                  username:session.username

                };

                console.log("props", props);
                res.render("Profile", props);
              });
            });
        });
      });
  } else {
    Book.find({ status: "available" })
      .then((availableBooks) => {
        let userLibrary = [];
        availableBooks.forEach((book, i) => {
          //console.log("availableBooks", availableBooks)
          if (book.owner.username == req.params.username) {
            userLibrary.push(book);
          }
        });
          Book.find({status:"borrowed"})
          .populate("borrower")
          .then((borrowedBooks) =>{
          let borrowedLibrary = [];
          borrowedBooks.forEach((book, i) => {
          if (book.borrower.username == req.params.username) {
            console.log("req.params", req.params)
            borrowedLibrary.push(book);
              }
          })
            const props = {
              userLibrary: userLibrary,
              userIsLoggedIn,
              session,
              user: req.params.username,
              username:session.username,
              borrowedLibrary: borrowedLibrary
            };
            console.log("props", props)
            res.render("Profile", props);
        });
      })
      };
});

privateRouter.post("/profile/:username/:bookid", (req, res, next) => {
  const session = req.session.currentUser;
  const email = req.session.currentUser.email;
  const userIsLoggedIn = Boolean(req.session.currentUser);
  //console.log("session", session)
  //console.log("req.username",req.session.currentUser.username )
  const { bookid, username } = req.params;
  //console.log("bookid", bookid);
  //console.log("req.params", req.params);
  //console.log("req.body.statusBorrowed", req.body.statusBorrowed);
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
          // borrower --> owner
          // borrower = owner
          res.redirect(`/private/profile/${username}`);
          console.log("The deleted item", deletedBook);
        });
      } else if (foundBook.gift === true && statusBorrowed === "no") {
        //console.log("This book is going back to my shelf");
        Book.findByIdAndUpdate(
          bookid,
          { status: "available" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
          //console.log("updated Book", updatedBook);
        });
      }
      // It's not a gift and the user says yes
      else if (foundBook.gift === false && statusBorrowed === "yes") {
        console.log("I am going to lend this book to someone else");
        Book.findByIdAndUpdate(
          bookid,
          { status: "borrowed" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
          //console.log("updated Book", updatedBook);
          // update message box with the info displaying in the borrower profile
          const borrowerId = updatedBook.borrower;
          User.findByIdAndUpdate(
            { _id: borrowerId },
            {
              $push: {
                message: {
                  content: `${username} has approved the request for ${updatedBook.title}, Email: ${email}`,
                  status: "unseen",
                  bookId: updatedBook._id,
                },
              },
            },
            { new: true }
          ).then((x) => {
            console.log("It worked");
          });
        });
      }
      // It's not a gift and the user says no
      else if (foundBook.gift === false && statusBorrowed === "no") {
        //console.log("I am not going to lend this book to someone else");
        Book.findByIdAndUpdate(
          bookid,
          { status: "available" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
          //console.log("updated Book", updatedBook);
        });
      }
    });
});

//GET ROUTE - approving the confirmation

privateRouter.get(
  "/profile/message/:messageid/:messageindex",
  (req, res, next) => {
    const { messageid, messageindex } = req.params;
    //console.log("req.params", req.params);
    User.find({ "message._id": messageid }).then((foundUser) => {
      console.log("foundUser", foundUser);
      console.log("foundUser.username", foundUser[0].username);
      User.update(
        { username: foundUser[0].username },
        {
          $pull: {
            message: { _id: messageid },
          },
        }
      ).then(() => {
        res.redirect(`/private/profile/uros`);
      });
    });
  }
);

// GET /
privateRouter.get("/edit-profile", (req, res, next) => {
  const userIsLoggedIn = Boolean(req.session.currentUser);
  const props = { userIsLoggedIn };
  const { username } = req.session.currentUser;
  User.findOne({ username: username }).then((foundUser) => {
    //console.log("foundUser", foundUser)
    const props = { foundUser: foundUser };
    res.render("UpdateProfile", props);
  });
});

privateRouter.post(
  "/edit-profile",
  parser.single("userimage"),
  (req, res, next) => {
    const { username, description, imageURL } = req.body;
    const imageUrl = req.file.secure_url;
    const userId = req.session.currentUser._id;
    User.findByIdAndUpdate(
      userId,
      { username, description, imageURL: imageUrl },
      { new: true }
    ).then((updatedUser) => {
      //console.log("updatedUser", updatedUser);
      res.redirect(`/private/profile/${username}`);
    });
  }
);

module.exports = privateRouter;
