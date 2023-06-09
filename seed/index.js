
require('dotenv').config({path: '../.env'});
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { title } = require('process');
const cities = require(path.join(__dirname,'/cities.js'));
const { places,descriptors }= require(path.join(__dirname,'/seedhelpers.js'));
//console.log(process.env.MONGODB_URI);
const Campground = require(path.join(__dirname, '../models/campground'));
//CONNECTING DATABASE
mongoose.set('strictQuery', false);
console.log(main());
async function main() {
    await mongoose.connect(process.env.MONGODB_URI)
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
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author:'64439d9f1300686e0f15c1fb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:[
                {
                  url: 'https://res.cloudinary.com/dtgiodduq/image/upload/v1682785185/YelpCamp/stvvnglpms2ngdmxaqm1.avif',
                  name:'stvvnglpms2ngdmxaqm1.avif'
                
                },
                {
                  url: 'https://res.cloudinary.com/dtgiodduq/image/upload/v1682785187/YelpCamp/nbdbnep3nw6caig2bb53.avif',
                  name:'nbdbnep3nw6caig2bb53.avif'
                }
            ],
            price: Math.floor(Math.random() * 20),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin, sem vitae varius tincidunt, augue sapien tempor dui, a vulputate nisl risus ac nisl. Integer id eros eu mi interdum suscipit sed quis risus. Sed pharetra, enim eu gravida lacinia, neque odio accumsan mauris, nec aliquam lectus mauris et lectus. Praesent blandit enim eu luctus faucibus. Nulla facilisi. Sed vestibulum justo vitae sapien vestibulum, a ultrices leo fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris at felis lectus. Nulla facilisi. Sed vel est ac tellus ullamcorper ultrices. Sed interdum augue nec leo aliquet, id tincidunt magna convallis. Suspendisse eget est quis turpis facilisis volutpat.'
        })
        await camp.save();
    }
    
}

seedDB().then(()=> mongoose.connection.close());
