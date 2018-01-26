const router = require('express').Router()

// view at http://localhost:8080/ws/chat || http://www.dash.com/ws/chat
router.get('/', function (req, res, next) {
  console.log('req: ', req)

  const io = req.app.get('io')

  io.on('connection', (socket) => {
    console.log('a user connected!')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  res.send('websocket!')

})

// export
module.exports = router
