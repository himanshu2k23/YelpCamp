const {storeReturnTo} = require('../utils/middleware');
const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const { userSchema } = require('../schema');
const catchAsync = require('../utils/catchAsync');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const userControllers=require('../controllers/user')


router.get('/register',userControllers.renderRegisterationForm)
router.post('/register', catchAsync(userControllers.registerUser))
router.get('/login', userControllers.renderLogInForm )
router.post('/login',storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(userControllers.logInUser))
router.get('/logout', userControllers.logOutUser)

module.exports = router;
