const express = require('express')
const routes = require('./routes')
require('dotenv').config()

// express instance
const app = express()
const server = require('http').createServer(app)

// attach socket.io to server
const io = require('socket.io')(server)
const ws = require('./routes/ws')(io)

// attach peer to server
const peerOptions = { host: 'localhost', port: 4000, path: '/peerjs', debug: true, proxied: true, allow_discovery: true }
const peerServer = require('peer').ExpressPeerServer(server, peerOptions)
const peer = require('./routes/peer')(peerServer)
app.use('/peerjs', peerServer)


// routes
app.use(routes)

// public assets
app.use(express.static(__dirname + '/public'))

// server config
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 4000

// start server
server.listen(port, () => {
  console.log(`Serving listening on port: ${port}`)
})
