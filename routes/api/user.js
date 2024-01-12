const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAuth = require('../../middleware/auth-middleware')
require('dotenv').config()

const User = require('../../model/User')

router.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body

    if (!username || !email || !password) {
      return res.status(400).json({message: 'Please enter all fields'})
    }

    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashedPassword })
    await user.save()
    res.status(201).json({message: 'User created'})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body

    const user = await User.findOne({username})
    if (!user) {
      return res.status(400).json({message: 'Invalid username or password'})
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(400).json({message: 'Invalid username or password'})
    }
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.status(200).json({message: 'Login successful', token})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/home', checkAuth, (req, res) => {
  res.json({ message: 'Authorization successfull' })
})

module.exports = router