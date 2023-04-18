//CONST DECLARATION
const express = require('express');
const router = express.Router( {mergeParams: true} );
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review')
const {reviewSchema} =require('../schema');
const catchAsync = require('../utils/catchAsync');
const validateReview= (req,res,next)=>{
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

//POST REVIEW
router.post('/',validateReview, catchAsync(async(req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    const review= new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Added a new review');
    res.redirect(`/campgrounds/${id}`);
}))
//DELETE REVIEW
router.delete('/:reviewId/delete', catchAsync(async(req,res)=>{
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Deleted a review');
    res.redirect(`/campgrounds/${id}`);
}))

//EXPORT
module.exports=router;