//CONST DECLARATION
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review')
const User=require('./models/user');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const { campgroundSchema } = require('./schema');
const { reviewSchema } = require('./schema');
const engine = require('ejs-mate');
const Joi = require('joi');
const campgroundsRoute = require('./routes/campgrounds');
const reviewRoute = require('./routes/review');
const registerRoute=require('./routes/register')
const session = require('express-session');
const flash = require('connect-flash');
const passport=require('passport');
const localStrategy=require('passport-local');

//SESSSION CONFIGRATION
const sessionConfig = {
    secret: "asecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
//CONNECTING DATABASE
console.log({ catchAsync })
console.log(main());
async function main() {
    await mongoose.connect('mongodb+srv://him:himanshu@cluster0.yfpx5hl.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log("DATABASE CONNECTED!!!");
        })
        .catch(err => {
            console.log("ERROR!!!! DATABASE IS NOT CONNECTED");
            //console.log(err)
        })
}

//app.
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//app.USE
app.use(session(sessionConfig));

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extends: true }));
app.use(express.static('./public'));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//FLASH MIDDLEWARE
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//CALLING ROUTES
app.use('/campgrounds', campgroundsRoute);
app.use('/campgrounds/:id/review', reviewRoute);
app.use('/register', registerRoute);


//ERROR HANDLER
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { message , statusCode} = err;
    res.status(statusCode).render(path.join(__dirname, 'views/error.ejs'), { err, pageTitle: "ERROR" });
})


//app.LISTEN
app.listen('3001', () => {
    console.log("LISTENING ON PORT 30001");
})