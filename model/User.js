const mongoose = require('mongoose')

const UserChema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 250
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 250
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', UserChema)