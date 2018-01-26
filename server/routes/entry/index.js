const router = require('express').Router()
const path = require('path')

// view at http://localhost:4000 || http://www.placeholder.com
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../views/index.html'))
})

// export
module.exports = router
