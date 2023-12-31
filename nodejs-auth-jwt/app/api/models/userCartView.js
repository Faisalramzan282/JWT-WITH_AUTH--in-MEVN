const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const userCart = new Schema({
  movieName: {
  type: String,
  trim: true,  
  required: true,
 },
  releaseDate: {
  type: Date,
  trim: true,
  required: true
 },
 tickets:{
  type: Number,
  required: true, 
  min : 1
},
userID:{
    type: String,
    required: true
}
});
module.exports = mongoose.model('userCart', userCart )