const chat = (io, socket) => {
  const currentRoom = 'default'

  // process a chat join request
  socket.on('chatJoin', (roomName) => {
    // user join room
    socket.join(currentRoom)
    // notify user of chat join success
    io.to(socket.id).emit('chatJoined', currentRoom)
    // notify room that user has joined
    socket.to(currentRoom).emit('chatNewConnection', null)
  })

  // process a chat leave request
  socket.on('chatLeave', () => {
    // user leave room
    socket.leave(currentRoom)
    // notify user of chat leave success
    io.to(socket.id).emit('chatLeave', null)
    // notify room that user has left
    socket.to(currentRoom).emit('chatLeft')
  })

  // broadcast a received message to the room
  socket.on('chatMessage', (msg) => {
    console.log('new message: ', msg)
    socket.emit('chatMessage', msg)
  })

  // broadcast a disconnection notification to the room
  socket.on('disconnect', () => {
    console.log('user disconnected')
    socket.to(currentRoom).emit('chatUserDisconnected', null)
  })
}

// export
module.exports = chat
