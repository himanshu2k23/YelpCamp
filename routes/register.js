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
    res.send(req.body)
}))

module.exports=router;
