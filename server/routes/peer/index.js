const peer = (server) => {

  server.on('connection', (id) => {
    // console.log('<< peer connection >> ', id)
    // console.log('<< peer connection -- clients >> ', server._clients)
  })

  server.on('disconnect', (id) => {
    // console.log('<< peer disconnect >>', id)
  })
}

// export
module.exports = peer
