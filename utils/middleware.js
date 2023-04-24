const {campgroundSchema,reviewSchema} =require('../schema');
const Campground = require('../models/campground');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');


module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error',"You must log in");
        return res.redirect('/login');
    }
    next()
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isAuthor = async (req,res,next)=>{
    const { id } = req.params;
    const newCampground = await Campground.findById(id);
    if (!newCampground.author.equals(req.user._id)) {
        req.flash('error','You dont have permission to do that');
        res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    const { reviewId,id } = req.params;
    const newReview = await Review.findById(reviewId);
    //console.log({newReview})
    if (!newReview.author._id.equals(req.user._id)) {
        req.flash('error','You dont have permission to do that');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.validateCampground= (req,res,next)=>{
    //console.log(req.body)
    const {error}=campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(errorLine => errorLine.message).join(', ')
        throw new ExpressError(msg,400);
    }
    else{
        next(); 
    }
}

module.exports.validateReview= (req,res,next)=>{
    //console.log(req.body)
    const {error}=reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(errorLine => errorLine.message).join(', ')
        throw new ExpressError(msg,400);
    }
    else{
        next(); 
    }
}

