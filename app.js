//VARIABLE DECLARATION
const express=require('express');
const app=express();
const path= require('path');
const mongoose=require('mongoose')
const methodOverride=require('method-override');
const Campground=require(path.join(__dirname,'/models/campground'));
const ExpressError=require('./utils/ExpressError');
const catchAsync=require('./utils/catchAsync');
const engine=require('ejs-mate');
//CONNECTING DATABASE
console.log({catchAsync})
console.log(main());
async function main() {
    await mongoose.connect('mongodb+srv://him:himanshu@cluster0.yfpx5hl.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log("DATABASE CONNECTED!!!")
        })
        .catch(err => {
            console.log("ERROR!!!! DATABASE IS NOT CONNECTED")
            //console.log(err)
        })
}

//app.SET
app.engine('ejs',engine);
app.set('view engine','ejs');

//app.USE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extends:true}))


//INDEX
app.get('/campgrounds', catchAsync( async (req,res)=>{
    const campgrounds=await Campground.find({});
    res.render(path.join(__dirname,'views/campground/index.ejs'),{campgrounds,pageTitle:"Index"})
}))

//POST
app.get('/campgrounds/new', (req,res)=>{
    res.render(path.join(__dirname,'views/campground/new.ejs'),{pageTitle:"Add"})
})
app.post('/campgrounds', catchAsync(async (req,res)=>{
    //console.log(req.body)
    const newCampground=new Campground(req.body);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
}))

//DETAILS
app.get('/campgrounds/:id', catchAsync(async (req,res)=>{
    const {id}=req.params;
    const campgrounds=await Campground.findById(id);
    res.render(path.join(__dirname,'views/campground/details.ejs'),{campgrounds,pageTitle:"Details"}) 
}))

//EDIT 
app.get('/campgrounds/:id/edit', catchAsync(async (req,res,next)=>{
    const {id}=req.params;
    const campgrounds=await Campground.findById(id);
    res.render(path.join(__dirname,'views/campground/edit.ejs'),{campgrounds,pageTitle:"Edit"})
}))
app.patch('/campgrounds/:id/edit', catchAsync(async (req,res)=>{
    //console.log(req.body)
    const {id}=req.params;
    const newCampground=await Campground.findByIdAndUpdate(id,req.body);
    res.redirect(`/campgrounds/${newCampground._id}`);
}))

//DELETE
app.delete('/campgrounds/:id/delete', catchAsync(async (req,res)=>{
    //console.log(req.body)
    const {id}=req.params;
    const newCampground=await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
}))

//ERROR HANDLER
app.use((err,req,res,next)=>{
    res.send("error")
})


//app.LISTEN
app.listen( '3001', ()=>{
    console.log("LISTENING ON PORT 30001");
} )