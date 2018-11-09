const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(
  process.env.MLAB_URL,
  {
    useNewUrlParser: true
  }
)

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(cors())

app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(express.json())

app.use(require('./routes'))

const PORT = 5000
server.listen(PORT, () => {
  console.log('Server started on port 5000')
})
