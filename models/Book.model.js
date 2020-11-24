const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");
const Comment = require("./Comment.model");

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, max:5 },
    imageURL: { type: String },
    status: { type: String, enum: ["available", "pending", "borrowed"] },
    gift: { type: Boolean },
    category: {
      type: String,
      enum: [
        "Fantasy",
        "Adventure",
        "Romance",
        "Contemporary",
        "Mystery",
        "Horror",
        "Thriller",
        "Paranormal",
        "Fiction",
        "Science Fiction",
        "Memoir",
        "Cooking",
        "Art",
        "Personal",
        "Development",
        "Motivational",
        "Health",
        "History",
        "Travel",
        "Guide",
        "Relationships",
        "Humor",
        "Children",
        "Comic",
        "Other" 
      ],
    },
    comments: [
      {
        comment: { type: Schema.Types.ObjectId, ref: "Comment" }
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    borrower: { type: Schema.Types.ObjectId, ref: "User" },
    booksLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
