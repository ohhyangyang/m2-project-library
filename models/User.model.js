const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./Book.model');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password:{type: String, required:true},
    imageURL:{type: String},
    description: {type: String, maxLength: 280},
    booksLiked: [{type:Schema.Types.ObjectId, ref:"Book"}],
    booksOffered:  [{type:Schema.Types.ObjectId, ref:"Book"}],
    booksBorrowed: [{type:Schema.Types.ObjectId, ref:"Book"}]
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User

