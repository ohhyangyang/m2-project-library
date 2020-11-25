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
                

                let borrowedLibrary = [];
                borrowedBooks.forEach((book, i) => {
                  if (book.borrower == session._id) {
                    

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
                  username: session.username,
                  visitedUser:{}
                };

                
                res.render("Profile", props);
              });
            });
        });
      });
  } else {
    Book
    .find({ status: "available" })
    .then((availableBooks) => {

      let userLibrary = [];

      availableBooks.forEach((book, i) => {
        
        if (book.owner.username == req.params.username) {
          userLibrary.push(book);
        }
      });


      Book.find({ status: "borrowed" })
        .populate("borrower")
        .then((borrowedBooks) => {

          let borrowedLibrary = [];

          borrowedBooks.forEach((book, i) => {
              
            if (book.borrower && (book.borrower.username == req.params.username)) {
              
              borrowedLibrary.push(book);
            }

          });

          User.find({username:req.params.username})
          .then((foundUser)=>{
            
            
            const props = {
              userLibrary: userLibrary,
              userIsLoggedIn,
              session,
              user: req.params.username,
              username: session.username,
              borrowedLibrary: borrowedLibrary,
              visitedUser:foundUser[0]
  
            };
  
            
            res.render("Profile", props);
          })

          
        });
    });
  }
});
//POST  `/private/profile/:username/:bookid`
privateRouter.post("/profile/:username/:bookid", (req, res, next) => {
  const session = req.session.currentUser;
  const email = req.session.currentUser.email;
  const userIsLoggedIn = Boolean(req.session.currentUser);
 
  const { bookid, username } = req.params;

  const { statusBorrowed } = req.body;
  
  Book.findById(bookid)
    .populate("owner")
    .then((foundBook) => {
      // It's a gift and the user says yes
      


      if (foundBook.gift === true && statusBorrowed === "yes") {
     
        Book.findByIdAndUpdate(
          bookid,
          { status: "borrowed" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
         
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
          
          });
        });



      } else if (foundBook.gift === true && statusBorrowed === "no") {
      
        Book.findByIdAndUpdate(
          bookid,
          { status: "available" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
         
        });
      }
      // It's not a gift and the user says yes
      else if (foundBook.gift === false && statusBorrowed === "yes") {

        Book.findByIdAndUpdate(
          bookid,
          { status: "borrowed" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);

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
      
          });
        });
      }
      // It's not a gift and the user says no
      else if (foundBook.gift === false && statusBorrowed === "no") {

        Book.findByIdAndUpdate(
          bookid,
          { status: "available" },
          { new: true }
        ).then((updatedBook) => {
          res.redirect(`/private/profile/${username}`);
     
        });
      }
    });
});

//GET ROUTE - approving the confirmation

privateRouter.get(
  "/profile/message/:messageid/:messageindex",
  (req, res, next) => {
    const { messageid, messageindex } = req.params;
  
    User.find({ "message._id": messageid }).then((foundUser) => {

      User.update(
        { username: foundUser[0].username },
        {
          $pull: {
            message: { _id: messageid },
          },
        }
      ).then(() => {
        res.redirect(`/private/profile/${foundUser[0].username}`);
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

    const props = { foundUser: foundUser };
    res.render("UpdateProfile", props);
  });
});

privateRouter.post(
  "/edit-profile",
  parser.single("userimage"),
  (req, res, next) => {
    const { username, description, imageURL } = req.body;

    const oldImageURL = req.session.currentUser.imageURL;

    let imageUrl;

    req.file? (imageUrl = req.file.secure_url):(imageUrl = oldImageURL)
    
    const userId = req.session.currentUser._id;
    User.findByIdAndUpdate(
      userId,
      { username, description, imageURL: imageUrl },
      { new: true }
    ).then((updatedUser) => {
    
      req.session.currentUser=updatedUser
      res.redirect(`/private/profile/${username}`);
    });
  }
);

module.exports = privateRouter;
