var express = require("express");
const Book = require("../models/Book.model");
const User = require("../models/User.model");
var booksRouter = express.Router();
const session = require("express-session");
const parser = require('./../config/cloudinary'); 


//GET /books/library
booksRouter.get("/library", (req, res, next) => {
  const session = req.session.currentUser;
  const userIsLoggedIn = Boolean(req.session.currentUser)
 
  const id = req.session.currentUser._id;

  Book.find()
  .populate("owner")
  .then((findBooks)=>{

    let userLibrary = [];
    findBooks.forEach((book, i) =>{
  
    if (book.owner._id != id )  {
   
      userLibrary.push(book)
    } else { 
    }
    })
  const props = {userLibrary: userLibrary, userIsLoggedIn, username:session.username};

  res.render("Library", props)
  })

});

//GET /books/library/category/:category
booksRouter.get('/library/category/:category',(req,res,next)=>{
  const category = req.params.category;

  Book.find({category:category})
  .then((booksFound)=>{


    const props = {categoryBooks:booksFound}
    res.render("Library",props);
  })

  
})

//GET    /books/library/:bookId //BORROW
booksRouter.get("/library/:bookid", (req, res, next) => {
  // User logged in?
  //const owner = req.params.owner 
  const {bookid} = req.params;
  Book.findById(bookid)
  .then((foundBook) => {
 
    if (foundBook.gift === true) {
      Book.findOneAndUpdate({_id: bookid}, {$set: {status: "pending", borrower: req.session.currentUser._id}}, {new: true})
      .then((updatedBook) =>{
      
        // BUTTON HAS TO CHANGE  
        res.redirect("/books/library")
      })
    }
    if (foundBook.gift === false) {
    Book.findOneAndUpdate({_id: bookid}, {$set: {status: "pending", borrower: req.session.currentUser._id}}, {new: true})
    .then((updatedBook) =>{
  
      // BUTTON HAS TO CHANGE 
      res.render("Library")
    })
    }
  })
})

// GET     /books/add
booksRouter.get("/add", (req, res, next) => {
  res.render("AddBook");
});

// POST    /books/add
booksRouter.post("/add", parser.single('bookcoverimage'), (req, res, next) => {
  const { title, author, category, rating, gift } = req.body;

  const imageUrl = req.file.secure_url;
  // EX: title: 1984, author: George Orwell, category: fiction, gift: yes
  // If any fields are empty, display error message
  if (title === "" || author === "" || category === "" || rating === "" || gift === "") {
    const props = { errorMessage: "Please enter all the information" };

    res.render("AddBook", props);
    return;
  }
  // if input is given, create the book
  Book.create({ title: title, author: author, category: category, rating: rating, gift: gift, imageURL: imageUrl, status: "available", owner: req.session.currentUser._id })
    .then((createdBook) => {
    
      res.redirect("/books/library");
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET /books/library/:ownderID
booksRouter.get("/library/:username", (req, res, next) => {
  const { username } = req.query.username;
  User.findById(username).then((username) => {
    res.redirect("/profile/username")
  });
});

//DELETE /books/delete
booksRouter.get("/delete/:bookid", (req, res, next) => {
  const { bookid } = req.params;
 
  Book.findByIdAndDelete(bookid)
    .then((x) => {
   
      res.redirect(`/private/profile/${req.session.currentUser.username}`);
    })
    .catch((error) => {
      console.log("error", err);
    });
});

//EDIT /books/edit
booksRouter.get("/edit", (req, res, next) => {
  const {bookid} = req.query  


  Book.findOne({_id:bookid})
  .populate("owner")
  .then((oneBook)=>{

    const props = { oneBook: oneBook };
  
    res.render("UpdateBook", props);
  })

});

//POST /books/edit
booksRouter.post("/edit", (req, res, next) => {
  // get the book id from the query

  const { bookid } = req.query;
 
  const { title, author, rating, category } = req.body;
  Book.findByIdAndUpdate(
    bookid,
    { title, author, rating, category },
    { new: true }
  )
    .then((updatedBook) => {
 
      res.redirect("/books/library");
    })
    .catch((error) => {
      console.log("error", error);
    });
});

module.exports = booksRouter;
