const router = require('express').Router()
const entry = require('./entry')
const api = require('./api')


router.use(entry)
router.use('/api', api)

// export
module.exports = router
