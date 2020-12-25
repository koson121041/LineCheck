const mongoose = require("mongoose")

//Data location
const UserSchema = new mongoose.Schema({

  id: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  
  });
  
  const Location = mongoose.model('location', UserSchema);
  
  module.exports = Location;