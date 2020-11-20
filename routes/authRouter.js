var express = require("express");
var authRouter = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const saltRounds = 10; //⚠️⚠️ for hashing
const zxcvbn = require("zxcvbn");
const isLoggedIn = require("../utils/isLoggedIn");

//GET  /auth/signup
authRouter.get("/signup", (req, res, next) => {
  res.render("Signup");
});

//POST //auth/singup
authRouter.post("/signup", (req, res, next) => {
  const { username, email, password, repeatPassword } = req.body;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    repeatPassword === ""
  ) {
    const props = { errorMessage: "Enter username, email and password" };
    res.render("Signup", props);
    return;
  }

  if (password !== repeatPassword) {
    const props = { errorMessage: "Password must match" };
    res.render("Signup", props);
    return;
  }

  if (password === repeatPassword && zxcvbn(password).score < 1) {
    const props = { errorMessage: "Password is too weak" };
    res.render("Signup", props);
    return;
  }

  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  const emailtesting = emailRegEx.test(email);
  if(!emailtesting){
    const props = { errorMessage: "Enter a valid email address" };
    res.render("Signup", props);
    return;
  }
  User.findOne({ username })
    .then((user) => {
      console.log(user);
      if (user) {
        const props = { errorMessage: "The username already exists" };
        res.render("Signup", props);
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ username: username, email:email, password: hashedPassword })
        .then((createdUser) => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET  /auth/login
authRouter.get("/login", (req, res, next) => {
  res.render("Login");
});

// POST /auth/login 
authRouter.post('/login', (req,res,next) => {
    const {username, password} = req.body;

    if (username === "" || password === "") 
    {
        const props = { errorMessage: "Enter username and password" };
        res.render("Login", props);
        return;
      }
    
    User.findOne({username: username})
    .then((user) => {
    if(!user){
        const props = { errorMessage: "User does not exist. Please sign up" };
        res.render("Login", props);
        return;
    }

    const passwordCorrect = bcrypt.compareSync(password, user.password);
    if(passwordCorrect){
        req.session.currentUser=user;
        res.redirect('/');
    }else{
        const props = { errorMessage: "Incorrect password" };
        res.render("Login", props);
        return; //stop codes run
    }
    })
})

// GET /auth/logout
authRouter.get('/logout',isLoggedIn, (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            res.render('Error')
        }
        else{
            
            res.render('/',props)
        }
    })
})


module.exports = authRouter;
