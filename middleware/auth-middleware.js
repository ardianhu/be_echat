const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.JWT_SECRET

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, secretKey)
    req.userData = {id: decodedToken.id, email: decodedToken.email}
    next()
  } catch (err) {
    return res.status(401).json({message: 'Auth failed', error: err.message})
  }
}