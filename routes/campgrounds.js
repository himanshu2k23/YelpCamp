//CONST DECLARATION
const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {campgroundSchema} =require('../schema');
const catchAsync = require('../utils/catchAsync');
const flash = require('connect-flash');
const {isLoggedIn} = require('../utils/middleware');

const validateCampground= (req,res,next)=>{
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

//INDEX
router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('../views/campground/index.ejs', { campgrounds, pageTitle: "Index" })
}))

//POST
router.get('/new',isLoggedIn, (req, res) => {
    res.render('../views/campground/new.ejs', { pageTitle: "Add" })
})
router.post('',isLoggedIn,validateCampground, catchAsync(async (req, res) => {
    //console.log(req.body)
    const newCampground = new Campground(req.body.campground);
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash('success','Successfully added a new campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
}))

//DETAILS
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews').populate('author');
    //console.log(campground);
    if (!campground) {
        req.flash('error','Campground not found');
        res.redirect('/campgrounds')        
    }
    res.render('../views/campground/details.ejs', { campground, pageTitle: "Details" })
}))

//EDIT 
router.get('/:id/edit',isLoggedIn, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error','Campground not found');
        res.redirect('/campgrounds')        
    }
    res.render('../views/campground/edit.ejs', { campground, pageTitle: "Edit" })
}))
router.patch('/:id/edit',isLoggedIn,validateCampground, catchAsync(async (req, res) => {
    //console.log(req.body)
    const { id } = req.params;
    const newCampground = await Campground.findByIdAndUpdate(id, req.body.campground);
    req.flash('success','Successfully made changes in the campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
}))

//DELETE
router.delete('/:id/delete',isLoggedIn, catchAsync(async (req, res) => {
    //console.log(req.body)
    const { id } = req.params;
    const newCampground = await Campground.findByIdAndDelete(id);
    req.flash('success','Campground deleted');
    res.redirect(`/campgrounds`);
}))

//EXPORT
module.exports=router;