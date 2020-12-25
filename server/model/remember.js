const mongoose = require("mongoose")

//Data location
const RememberSchema = new mongoose.Schema({

  id: { type: String, required: true },
  username:{type: String, required: true}
  
 
  
  });
  
  const Remember = mongoose.model('user', RememberSchema);
  
  module.exports = Remember;