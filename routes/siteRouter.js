var express = require("express");
var siteRouter = express.Router();

siteRouter.get('/',(req,res,next)=>{
    const session = req.session.currentUser;
    console.log("session", session)
    const userIsLoggedIn = Boolean(req.session.currentUser)
    console.log(userIsLoggedIn)
    const props = {userIsLoggedIn, session};
    console.log("prop",props);
    res.render("Home",props)
})

siteRouter.get("/about", (req, res, next) => {
    const session = req.session.currentUser;
    console.log("session", session);
    const userIsLoggedIn = Boolean(req.session.currentUser)
    const props = {userIsLoggedIn,session}
    res.render("About", props);
  });


siteRouter.get("/error", (res,req,next) =>{
    res.render("Error")
})  
module.exports = siteRouter; 
