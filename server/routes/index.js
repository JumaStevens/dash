const router = require('express').Router()
const entry = require('./entry')
const api = require('./api')
const ws = require('./ws')


router.use(entry)
router.use('/api', api)
router.use('/ws', ws)

// export
module.exports = router
