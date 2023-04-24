const Campground = require('../models/campground');


module.exports.renderIndex=async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('../views/campground/index.ejs', { campgrounds, pageTitle: "Index" })
};

module.exports.renderPostForm= (req, res) => {
    res.render('../views/campground/new.ejs', { pageTitle: "Add" })
}

module.exports.postCampground=async (req, res) => {
    //console.log(req.body)
    const newCampground = new Campground(req.body.campground);
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash('success','Successfully added a new campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
}


