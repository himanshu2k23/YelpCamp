const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');
const { name } = require('ejs');

module.exports.renderIndex = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('../views/campground/index.ejs', { campgrounds, pageTitle: "Index" })
};

module.exports.renderPostForm = (req, res) => {
    res.render('../views/campground/new.ejs', { pageTitle: "Add" })
}

module.exports.postCampground = async (req, res) => {
    //console.log(req.files)
    const newCampground = new Campground(req.body.campground);
    newCampground.images = req.files.map(f => ({ url: f.path, name: f.filename }))
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash('success', 'Successfully added a new campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
}

module.exports.renderDetails = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author');
    //console.log(campground);
    if (!campground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds')
    }
    res.render('../views/campground/details.ejs', { campground, pageTitle: "Details" })
}

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds')
    }
    //console.log({campground:campground.images})
    res.render('../views/campground/edit.ejs', { campground, pageTitle: "Edit" })
}

module.exports.patchCampground = async (req, res) => {
    //console.log(req.body,req.body.imagesToDelete)
    const { id } = req.params;
    const newCampground = await Campground.findByIdAndUpdate(id, req.body.campground);
    const imgs = req.files.map(f => ({ url: f.path, name: f.filename }));
    newCampground.images.push(...imgs);
    await newCampground.save();
    if (req.body.imagesToDelete) {
        for (let name of req.body.imagesToDelete) {
            await cloudinary.uploader.destroy(name)
        }
        await newCampground.updateOne({ $pull: { images: { name: { $in: req.body.imagesToDelete } } } });
    }
    req.flash('success', 'Successfully made changes in the campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    //console.log(req.body)
    const { id } = req.params;
    const newCampground = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground deleted');
    res.redirect(`/campgrounds`);
}