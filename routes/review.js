//CONST DECLARATION
const express = require('express');
const router = express.Router( {mergeParams: true} );
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review')
const {reviewSchema} =require('../schema');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,validateReview} = require('../utils/middleware');


//POST REVIEW
router.post('/',isLoggedIn,validateReview, catchAsync(async(req,res)=>{
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
router.delete('/:reviewId/delete',isLoggedIn, catchAsync(async(req,res)=>{
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Deleted a review');
    res.redirect(`/campgrounds/${id}`);
}))

//EXPORT
module.exports=router;