//CONST DECLARATION
const express = require('express');
const router = express.Router( {mergeParams: true} );
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const {reviewSchema} =require('../schema');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,validateReview,isReviewAuthor} = require('../utils/middleware');
const reviewController=require('../controllers/review')


//POST REVIEW
router.post('/',isLoggedIn,validateReview, catchAsync(reviewController.postReview))
//DELETE REVIEW
router.delete('/:reviewId/delete',isLoggedIn,isReviewAuthor, catchAsync(reviewController.deleteReview))

//EXPORT
module.exports=router;