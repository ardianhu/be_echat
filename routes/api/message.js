const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/auth-middleware')
require('dotenv').config()

const Message = require('../../model/Message')

router.post('/', checkAuth, async (req, res) => {
  try {
    const {senderId, message, chatId} = req.body
    if (!senderId || !message || !chatId) {
      return res.status(400).json({message: 'No sender or message found'})
    }
    const messages = new Message({senderId, message, chatId})
    await messages.save()
    res.status(201).json({message: 'Message created'})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// router.get('/', checkAuth, (req, res) => {
//   Message.find()
//   .then(message => (message.length > 0) ? res.status(200).json({message: "succes", message: message}) : res.status(404).json({message: 'No messages found'}))
//   .catch(err => res.status(500).json({message: err.message}))
// })

router.get('/:chat_id', checkAuth, async (req, res) => {
  // const chatId = req.params.chat_id
  try {
    const chatId = req.params.chat_id;
    console.log(chatId)
    const messages = await Message.find({ chatId: chatId });

    if (messages.length > 0) {
      res.status(200).json({ status: "success", messages: messages });
    } else {
      res.status(404).json({ status: 'fail', message: 'No messages found for the specified chatId' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
})

module.exports = router