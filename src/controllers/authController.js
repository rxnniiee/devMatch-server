const AuthService = require('../services/auth/AuthService')
const { CODES } = require('../common/ErrorCodes')

const login = async (req, res, next) => {
  const { login, password } = req.body
  try {
    const result = JSON.parse(await AuthService.login(login, password))
    res.status(CODES.OK).json(result)
    return next()
  } catch (err) {
    if (!!err.type && !!err.code) {
      res.status(err.code).send(err)
      return next()
    }
    res.sendStatus(400)
    next()
  }
}

const register = async (req, res, next) => {
  const { account_type } = req.body
  try {
    await AuthService.register(account_type, req.body)
    res.sendStatus(201)
    next()
  } catch (err) {
    if (!!err.type && !!err.code) {
      res.status(err.code).send(err)
      return next()
    }
    res.sendStatus(400)
    next()
  }
}

module.exports = {
  login,
  register,
}
