const router = require('express').Router()
const test = require('./test')

router.use(test)

// export
module.exports = router
