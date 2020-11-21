var express = require("express");
var privateRouter = express.Router();

// Your routes
// GET /profile
privateRouter.get("/profile", (req,res,next)=>{
    const userIsLoggedIn = Boolean(req.session.currentUser)
    const props = {userIsLoggedIn}
    res.render("Profile", props)

})
// GET /
privateRouter.get("/edit-profile", (req,res,next)=>{
    const userIsLoggedIn = Boolean(req.session.currentUser)
    const props = {userIsLoggedIn}
    res.render("UpdateProfile", props)
})

privateRouter.post("/edit-profile", (req,res,next)=>{

})

module.exports = privateRouter;
