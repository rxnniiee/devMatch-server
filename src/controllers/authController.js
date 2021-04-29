const AuthService = require('../services/auth/AuthService')

const login = async (req, res, next) => {
  const { login, password } = req.body
  try {
    await AuthService.login(login, password)
    res.sendStatus(200)
    next()
  } catch (err) {
    console.error(err.message)
    res.sendStatus(400)
    next()
  }
}

const register = async (req, res, next) => {
  const { login, password, email } = req.body
  try {
    await AuthService.register(login, password, email)
    res.sendStatus(200)
    next()
  } catch (err) {
    console.error(err.message)
    res.sendStatus(400)
    next()
  }
}

module.exports = {
  login,
  register,
}
