const router = require('express').Router()

const mockUserController = require('../controllers/mockUserController')

router.get('/profile', mockUserController.profile)
router.get('/queue', mockUserController.queue)
router.get('/matches', mockUserController.matches)

module.exports = router
module.exports.meta = {
  path: '/mock/user',
}
