const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema ({
    
username: {
    type: String,
    required: true
},
email: {
    type: String,
    lowercase: true,
    required: true,
},
mobileNumber: {
    type: Number,
    required: true
},
password: {
    type: String,
    required: true
},
birthDate: {
    type: Date,
    required: true
},
gender: {
    type: String,
    required: true
},
});

UserSchema.path('email').validate(()=> {
  return true
},'Email exists')

const User  = mongoose.model('User', UserSchema);
module.exports = User;
