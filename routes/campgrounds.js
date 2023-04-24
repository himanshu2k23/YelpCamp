//CONST DECLARATION
const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const campgroundControllers=require('../controllers/campground')
const {isLoggedIn,isAuthor,validateCampground} = require('../utils/middleware');


//INDEX
router.get('/', catchAsync(campgroundControllers.renderIndex))

//POST
router.get('/new',isLoggedIn, campgroundControllers.renderPostForm)
router.post('',isLoggedIn,validateCampground, catchAsync(campgroundControllers.postCampground))

//DETAILS
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({path:'reviews',populate:{ path:'author'}}).populate('author');
    //console.log(campground);
    if (!campground) {
        req.flash('error','Campground not found');
        res.redirect('/campgrounds')        
    }
    res.render('../views/campground/details.ejs', { campground, pageTitle: "Details" })
}))

//EDIT 
router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error','Campground not found');
        res.redirect('/campgrounds')        
    }
    res.render('../views/campground/edit.ejs', { campground, pageTitle: "Edit" })
}))
router.patch('/:id/edit',isLoggedIn,isAuthor, validateCampground, catchAsync(async (req, res) => {
    //console.log(req.body)
    const { id } = req.params;
    const newCampground = await Campground.findByIdAndUpdate(id, req.body.campground);
    req.flash('success','Successfully made changes in the campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
}))

//DELETE
router.delete('/:id/delete',isLoggedIn,isAuthor, catchAsync(async (req, res) => {
    //console.log(req.body)
    const { id } = req.params;
    const newCampground = await Campground.findByIdAndDelete(id);
    req.flash('success','Campground deleted');
    res.redirect(`/campgrounds`);
}))

//EXPORT
module.exports=router;