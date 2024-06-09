const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
  if(plainPassword === this.password) {
    callback(null, true);
  } else {
    callback(null, false);
  }
  return callback({err: 'error'})
}

const User = mongoose.model('User', userSchema);

module.exports = User;