const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const { userSchema } = require('../schema');
const catchAsync = require('../utils/catchAsync');
const flash = require('connect-flash');

router.get('/register', (req, res) => {
    res.render('../views/user/register', { pageTitle: "Register" })
})
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registerUser = await User.register(user, password);
        //console.log({registerUser});
        req.flash('success', 'Welcome to yelp camp');
        res.redirect('/campgrounds');
    }
    catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req,res)=>{
    res.render('../views/user/login', { pageTitle: "Login" })
})
module.exports = router;
