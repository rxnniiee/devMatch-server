const router = require('express').Router()
const authorization = require('../middlewares/authorization')

const userController = require('../controllers/userController')

router.get('/self', authorization, userController.getUserData)

module.exports = router
module.exports.meta = {
  path: '/user',
}
