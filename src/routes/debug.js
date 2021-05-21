const router = require('express').Router()
const authorization = require ('../middlewares/authorization')
const debugController = require('../controllers/debugController')

router.get('/talents', authorization, debugController.talents)
router.get('/employers', authorization, debugController.employers)

module.exports = router
module.exports.meta = {
  path: '/debug',
}
