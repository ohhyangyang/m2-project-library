var express = require("express");
var siteRouter = express.Router();

siteRouter.get('/',(req,res,next)=>{
    const userIsLoggedIn = Boolean(req.session.currentUser)
    console.log(userIsLoggedIn)
    const props = {userIsLoggedIn};
    res.render("Home",props)
})

siteRouter.get("/about", (req, res, next) => {
    res.render("About");
  });


siteRouter.get("/error", (res,req,next) =>{
    res.render("Error")
})  
module.exports = siteRouter; 
