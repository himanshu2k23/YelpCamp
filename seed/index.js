//VARIABLE DECLARATION
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { title } = require('process');
const cities = require(path.join(__dirname,'/cities.js'));
const { places,descriptors }= require(path.join(__dirname,'/seedhelpers.js'));
//console.log({places,descriptors});
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

const sample = array => array[Math.floor(Math.random() * array.length)];
//console.log(sample([1,2,3,4]));

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
    
}

seedDB().then(()=> mongoose.connection.close());
