const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const {userSchema} =require('../schema');
const catchAsync = require('../utils/catchAsync');
const flash = require('connect-flash');

router.get('/',(req,res)=>{
    res.render('../views/campground/register', { pageTitle: "Add"})
})
router.post('/', catchAsync(async(req,res)=>{
    const {username,email,password}=req.body;
    const user=new User({username,email});
    const registerUser=await User.register(user,password);
    //console.log({registerUser});
    req.flash('success','Welcome to yelp camp');
    res.redirect('/campgrounds');
}))

module.exports=router;
