//CONST DECLARATION
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review')
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const {campgroundSchema} =require('./schema');
const {reviewSchema} =require('./schema');
const engine = require('ejs-mate');
const Joi=require('joi');
const campgroundsRoute=require('./routes/campgrounds');
const reviewRoute=require('./routes/review');
//CONNECTING DATABASE
console.log({ catchAsync })
console.log(main());
async function main() {
    await mongoose.connect('mongodb+srv://him:himanshu@cluster0.yfpx5hl.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log("DATABASE CONNECTED!!!")
        })
        .catch(err => {
            console.log("ERROR!!!! DATABASE IS NOT CONNECTED")
            //console.log(err)
        })
}



//app.SET
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//app.USE
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extends: true }))

app.use('/campgrounds',campgroundsRoute);
app.use('/campgrounds/:id/review',reviewRoute);


//ERROR HANDLER
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { message, statusCode } = err;
    res.status(statusCode).render(path.join(__dirname, 'views/error.ejs'), { err,pageTitle:"ERROR" })
})


//app.LISTEN
app.listen('3001', () => {
    console.log("LISTENING ON PORT 30001");
})