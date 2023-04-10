//VARIABLE DECLARATION
const express=require('express');
const app=express();
const path= require('path');
const mongoose=require('mongoose')
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
            console.log(err)
        })
}

//app.SET
app.set('view engine','ejs');



//app.LISTEN
app.listen( '3001', ()=>{
    console.log("LISTENING ON PORT 30001");
} )