//VARIABLE DECLARATION
const express=require('express');
const app=express();
const path= require('path');
const mongoose=require('mongoose')
const methodOverride=require('method-override');
const Campground=require(path.join(__dirname,'/models/campground'))
//CONNECTING DATABASE
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
app.set('view engine','ejs');

//app.USE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extends:true}))


//INDEX
app.get('/campgrounds', async (req,res)=>{
    const campgrounds=await Campground.find({});
    res.render(path.join(__dirname,'views/index.ejs'),{campgrounds})
})

//POST
app.get('/campgrounds/new', (req,res)=>{
    res.render(path.join(__dirname,'views/new.ejs'))
})
app.post('/campgrounds', async (req,res)=>{
    //console.log(req.body)
    const newCampground=new Campground(req.body);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
})

//DETAILS
app.get('/campgrounds/:id', async (req,res)=>{
    const {id}=req.params;
    const campgrounds=await Campground.findById(id);
    res.render(path.join(__dirname,'views/details.ejs'),{campgrounds})
})

//EDIT 
app.get('/campgrounds/:id/edit', async (req,res)=>{
    const {id}=req.params;
    const campgrounds=await Campground.findById(id);
    res.render(path.join(__dirname,'views/edit.ejs'),{campgrounds})
})
app.patch('/campgrounds/:id/edit', async (req,res)=>{
    //console.log(req.body)
    const {id}=req.params;
    const newCampground=await Campground.findByIdAndUpdate(id,req.body);
    res.redirect(`/campgrounds/${newCampground._id}`);
})

//DELETE
app.delete('/campgrounds/:id/delete', async (req,res)=>{
    //console.log(req.body)
    const {id}=req.params;
    const newCampground=await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
})





//app.LISTEN
app.listen( '3001', ()=>{
    console.log("LISTENING ON PORT 30001");
} )