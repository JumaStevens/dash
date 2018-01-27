const router = require('express').Router()
const test = require('./test')
//const firebase = require('./firebase')

//router.use(firebase)
router.use(test)

// export
module.exports = router
