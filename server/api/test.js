import { Router } from 'express'
const router = Router()

// view at http://localhost:8080 || http://www.dash.com
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/../../index.html'))
})

export default router
