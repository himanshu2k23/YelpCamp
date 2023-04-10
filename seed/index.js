//VARIABLE DECLARATION
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { title } = require('process');
const cities = require(path.join(__dirname,'/cities.js'));
const { places,descriptors }= require(path.join(__dirname,'/seedhelpers.js'));
const Campground = require(path.join(__dirname, '../models/campground'));
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

const sample = array => Math.floor(Math.random() * array.lenght);

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${places[sample]} ${descriptors[sample]} `
        })
        await camp.save();
    }
    
}

seedDB().then(()=> mongoose.connection.close());
