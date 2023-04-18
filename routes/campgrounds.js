//CONST DECLARATION
const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {campgroundSchema} =require('../schema');
const catchAsync = require('../utils/catchAsync');
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
    res.render('../views/campground/index', { campgrounds, pageTitle: "Index" })
}))

//POST
router.get('/new', (req, res) => {
    res.render('../views/campground/new.ejs', { pageTitle: "Add" })
})
router.post('',validateCampground, catchAsync(async (req, res) => {
    //console.log(req.body)
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
    res.flash('success','Successfully added a new campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
}))

//DETAILS
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    //console.log(campground);
    res.render('../views/campground/details.ejs', { campground, pageTitle: "Details" })
}))

//EDIT 
router.get('/:id/edit', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('../views/campground/edit.ejs', { campground, pageTitle: "Edit" })
}))
router.patch('/:id/edit',validateCampground, catchAsync(async (req, res) => {
    //console.log(req.body)
    const { id } = req.params;
    const newCampground = await Campground.findByIdAndUpdate(id, req.body.campground);
    res.flash('success','Successfully made changed the campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
}))

//DELETE
router.delete('/:id/delete', catchAsync(async (req, res) => {
    //console.log(req.body)
    const { id } = req.params;
    const newCampground = await Campground.findByIdAndDelete(id);
    res.flash('success','Campground deleted');
    res.redirect(`/campgrounds`);
}))

//EXPORT
module.exports=router;