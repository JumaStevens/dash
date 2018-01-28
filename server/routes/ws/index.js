const ws = (io) => {
  io.on('connection', (socket) => {
    // console.log('a user connected!')
    // console.log(`Socket ID: ${socket.id}`)

    const chat = require('./chat')(io, socket)

  })
}

// export
module.exports = ws
