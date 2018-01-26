const express = require('express')
const routes = require('./routes')

// express instance
const app = express()

// routes
app.use(routes)

// public assets
app.use(express.static(__dirname + '/public'))

// server config
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 4000

// start server
app.listen(port)
console.log(`Serving listening on port: ${port}`)
