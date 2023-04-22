const {storeReturnTo} = require('../utils//isLoggedIn');
const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const { userSchema } = require('../schema');
const catchAsync = require('../utils/catchAsync');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');


router.get('/register', (req, res) => {
    res.render('../views/user/register', { pageTitle: "Register" })
})
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registerUser = await User.register(user, password);
        //console.log({registerUser});
        req.login(registerUser, (error)=> {
            if (error) return next(error); 
            req.flash('success', 'Welcome to yelp camp');
            res.redirect('/campgrounds');
        });
    }
    catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
}))
router.get('/login', (req, res) => {
    res.render('../views/user/login', { pageTitle: "Login" })
})
router.post('/login',storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(async (req, res) => {
    req.flash('success', "Welcome Back!");
    //console.log(res.locals.returnTo );
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}))
router.get('/logout', (req, res) => {
    req.logout((error) => {
        if (error) return next(error);
        req.flash('success', "Logged out");
        res.redirect('/campgrounds');
    })
})

module.exports = router;
