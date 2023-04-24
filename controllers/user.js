const { userSchema } = require('../schema');
const passport = require('passport');
const User = require('../models/user');


module.exports.renderRegisterationForm=(req, res) => {
    res.render('../views/user/register', { pageTitle: "Register" })
}

module.exports.registerUser=async (req, res) => {
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
}

module.exports.renderLogInForm=(req, res) => {
    res.render('../views/user/login', { pageTitle: "Login" })
}

module.exports.logInUser=async (req, res) => {
    req.flash('success', "Welcome Back!");
    //console.log(res.locals.returnTo );
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logOutUser=(req, res) => {
    req.logout((error) => {
        if (error) return next(error);
        req.flash('success', "Logged out");
        res.redirect('/campgrounds');
    })
}