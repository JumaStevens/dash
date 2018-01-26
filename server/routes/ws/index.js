const router = require('express').Router()
const chat = require('./chat')

router.use(chat)

// export
module.exports = router
