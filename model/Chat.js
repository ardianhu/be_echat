const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
  user_id_1: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  user_id_2: {
    type: String,
    required: true,
    minlength: 3,
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

module.exports = Chat = mongoose.model('chat', ChatSchema)