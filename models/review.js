const { number } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.schema;

const reviewSchema= new Schema({
      body:String,
      rating:number
});

module.exports = mongoose.model('Review',reviewSchema);