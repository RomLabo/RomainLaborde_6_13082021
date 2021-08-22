const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;


const userSchema = mongoose.Schema({
  email: { 
    type: String,
    required: [true,"Veuillez indiquez une adresse email"], 
    unique: true,
    match: [emailRegex, "Veuillez indiquer une adresse email valide"]
  },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);