const mongoose = require('mongoose');
const Book = require('../models/Book.model');
const User = require('../models/User.model');



const DB_NAME = "booklibrary"


mongoose
.connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
.then((x)=>{
    const pr =User.findOne({username:"Bob"})
    return pr
    
})
.then((foundBook)=>{
    console.log(foundBook);
})
