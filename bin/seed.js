const mongoose = require("mongoose");
const Book = require("../models/Book.model");
const User = require("../models/User.model");

const books = require("./books-mock-data");
const users = require("./users-mock-data");

const DB_NAME = "booklibrary";

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    const pr = x.connection.dropDatabase();

    return pr;
  })
  .then((foundBook) => {
    const pr = Book.create(books);

    return pr;
  })
  .then((createdBooks) => {
    console.log(`Created ${createdBooks.length} books`);

    const updatedUsers = users.map((user, i) => {
      const book = createdBooks[i];
      user.booksOffered = [book._id];

      return user;
    });

    const pr = User.create(updatedUsers);
    return pr;
  })
  .then((createdUser) => {
    console.log(`Created ${createdUser.length} users`);

    //获取users的ID加给books
    //find()找到所有books，
    const pr = User.find();
    return pr;
  })
  .then((usersFound) => {

    usersFound.forEach((user, i) => {
      console.log(user.booksOffered[0]);
      console.log(user._id);
      const pr = Book.findByIdAndUpdate(
        user.booksOffered[0],
        { $push: { owner: user._id } },
        { new: true },
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
      return pr;
    });
  })
  .then(() => {
    console.log("...");
  })
  .catch((err) => console.log(err));
