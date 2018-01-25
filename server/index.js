import express from 'express'
import api from './api'

// express instance
const app = express()

// import API routes
app.use('/api', api)

// public assets route
app.use(express.static('public'))

// server config
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// start server
app.listen(port, host)
console.log(`Serving listening on ${host} : ${port}`)
