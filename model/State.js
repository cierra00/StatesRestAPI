const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
  stateCode: {type: String, requred: true, unique: true},
  funfacts: {type: [String], required: true} 
});

module.exports = mongoose.model('states', stateSchema);