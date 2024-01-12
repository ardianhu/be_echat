const express = require('express')
require('dotenv').config()
const { connect } = require('mongoose')
const connectDB = require('./config/db')
const routes = require('./routes/api/user')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors({origin: true, credentials: true}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/user', routes)

connectDB()

app.get('/', (req, res) => res.json({message: 'server is online'}))

const port = process.env.PORT

app.listen(port, () => console.log(`Server running on port ${port}`))

