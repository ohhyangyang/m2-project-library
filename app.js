require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const erv = require("express-react-views");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const authRouter = require("./routes/authRouter");
const siteRouter = require("./routes/siteRouter");
const privateRouter = require("./routes/privateRouter");
const booksRouter = require("./routes/booksRouter");

const app = express();

// DB CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the DB."))
  .catch((err) => console.log(err));

// VIEW ENGINE SETUP
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", erv.createEngine());

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// SESSIONS MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // cookie: { maxAge: 3600000 * 1 },	// 1 hour // Time after which the cookie saved on the browser expires
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 7,
      // `ttl` Time to live - after which the session document saved
      // in the DB expires - 7 days (14 days is the default if the option is not explicityl set)
    }),
  })
);

// ROUTES
app.use("/auth", authRouter);
app.use("/books", booksRouter);
app.use("/private", privateRouter);
app.use("/", siteRouter);

/* GET home page. */
app.get("/", (req, res, next) => {
  res.render("Home");
});

module.exports = app;
