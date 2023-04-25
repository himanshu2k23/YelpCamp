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
router.post('/',isLoggedIn,validateCampground, catchAsync(campgroundControllers.postCampground))

//DETAILS
router.get('/:id', catchAsync(campgroundControllers.renderDetails))

//EDIT 
router.route('/:id/edit')
.get(isLoggedIn,isAuthor, catchAsync(campgroundControllers.renderEditForm))
.patch(isLoggedIn,isAuthor, validateCampground, catchAsync(campgroundControllers.patchCampground))

//DELETE
router.delete('/:id/delete',isLoggedIn,isAuthor, catchAsync(campgroundControllers.deleteCampground))

//EXPORT
module.exports=router;