const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.status(418).send(`(ง'̀-'́)ง I'm working here!`)
})

module.exports = router
