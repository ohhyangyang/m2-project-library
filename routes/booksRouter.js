var express = require("express");
var booksRouter = express.Router();

// Your routes
booksRouter.get("/library", (req,res,next)=>{
    res.render("Library")
})

booksRouter.get("/library/:bookId", (req,res,next)=>{
    
})

booksRouter.get("/add", (req,res,next)=>{
    res.render("AddBook")
})

booksRouter.post("/add", (req,res,next)=>{
    
})

booksRouter.post("/library/:ownderID", (req,res,next)=>{
    
})

booksRouter.delete("/delete", (req,res,next)=>{
    
})

booksRouter.get("/edit", (req,res,next)=>{
    res.render("UpdateBook")
})

booksRouter.post("/edit", (req,res,next)=>{
    
})

module.exports = booksRouter;
