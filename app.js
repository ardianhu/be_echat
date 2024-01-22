const express = require('express')
require('dotenv').config()
const http = require('http')
const { Server } = require('socket.io')
const { connect } = require('mongoose')
const connectDB = require('./config/db')
const routes = require('./routes/api/user')
const chatRoutes = require('./routes/api/chat')
const messageRoutes = require('./routes/api/message')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
})
// const io = socketIO(server);


// app.use(cors({origin: "http://localhost:5173", methods: ["GET", "POST"], credentials: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/message', messageRoutes)
app.use('/api/user', routes)
app.use('/api/chat', chatRoutes)

connectDB()

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Example: Handle a chat message event
  socket.on('sendMessage', ({ chat_id }) => {
    // You can add your logic here to save the message to the database if needed

    // Broadcast the message to all clients in the same chat room
    io.emit(`chat_${chat_id}`, { chat_id });
  });
});

app.get('/', (req, res) => res.json({message: 'server is online'}))

const port = process.env.PORT

server.listen(port, () => console.log(`Server running on port ${port}`))

