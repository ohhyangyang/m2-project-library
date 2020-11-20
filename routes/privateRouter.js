var express = require("express");
var privateRouter = express.Router();

// Your routes
// GET /profile
privateRouter.get("/profile", (req,res,next)=>{
    res.render("Profile")

})
// GET /
privateRouter.get("/edit-profile", (req,res,next)=>{
    res.render("UpdateProfile")
})

privateRouter.post("/edit-profile", (req,res,next)=>{

})

module.exports = privateRouter;
