var express = require("express");
var siteRouter = express.Router();

siteRouter.get('/',(req,res,next)=>{
    
    res.render("Home")
})

siteRouter.get("/about", (req, res, next) => {
    const session = req.session.currentUser;
    const userIsLoggedIn = Boolean(req.session.currentUser)
    const props = {userIsLoggedIn, username:session.username}

    res.render("About",props);
  });


siteRouter.get("/error", (res,req,next) =>{
    res.render("Error")
})  
module.exports = siteRouter; 
