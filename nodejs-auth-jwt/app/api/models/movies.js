const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
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
moviePrice:{
  type: Number,
  required: true
}
});
module.exports = mongoose.model('Movie', MovieSchema)