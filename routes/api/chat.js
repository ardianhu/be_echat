const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/auth-middleware')
require('dotenv').config()

const Chat = require('../../model/Chat')

router.post('/', checkAuth, async (req, res) => {
  try {
    const {user_id_1, user_id_2} = req.body
    if (!user_id_1 || !user_id_2) {
      return res.status(400).json({message: 'Please enter all fields'})
    }
    const chat = new Chat({user_id_1, user_id_2})
    await chat.save()
    res.status(201).json({message: 'Chat created'})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})
router.get('/', (req, res) => {
  Chat.find()
  .then(chat => (chat.length > 0) ? res.status(200).json(chat) : res.status(404).json({message: 'No chats found'}))
  .catch(err => res.status(500).json({message: err.message}))
})

module.exports = router