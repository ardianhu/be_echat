const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  chatId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
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

module.exports = Message = mongoose.model('message', MessageSchema)