const router = require('express').Router()
const path = require('path')

// view at http://localhost:4000 || http://www.placeholder.com
router.get('/', function (req, res, next) {
  console.log('/ route requested')
})

// export
module.exports = router
