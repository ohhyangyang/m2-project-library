var express = require("express");
var siteRouter = express.Router();

siteRouter.get('/',(req,res,next)=>{
    res.render("Home")
})

module.exports = siteRouter; 
