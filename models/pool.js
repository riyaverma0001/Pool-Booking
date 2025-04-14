const mongoose = require('mongoose');

const poolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  aboutPool: {
    type: String,
    required: true
  },
  backyardPrivacy: {
    type: String,
    description: String,
    required: true
  },
  amenities: [{
    name: String,      
    price: Number,     
    description: String, 
    isAvailable: Boolean 
  }],
  aboutHost: {
    type: String,
    required: true
  }
});

const Pool = mongoose.model('Pool', poolSchema);
module.exports = Pool;