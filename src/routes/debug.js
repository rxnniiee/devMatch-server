const router = require('express').Router()

const debugController = require('../controllers/debugController')

router.get('/talents', debugController.talents)
router.get('/employers', debugController.employers)

module.exports = router
module.exports.meta = {
  path: '/debug',
}
