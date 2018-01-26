const router = require('express').Router()

// view at http://localhost:8080 || http://www.dash.com
router.get('/', function (req, res, next) {
  res.send('whaqqqq!')
})

// export
module.exports = router
