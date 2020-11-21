const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");
const Book = require('./Book.model');

const commentSchema = new Schema(
  {
    comment: { type: String, maxLength: 100 },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  }
);

const Comment = mongoose.model("Comment",commentSchema);
module.exports=Comment;
