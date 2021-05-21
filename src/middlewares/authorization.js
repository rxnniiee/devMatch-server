const jwt = require('jsonwebtoken')
const { CODES } = require('../common/ErrorCodes')

const authorize = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.sendStatus(CODES.UNAUTHORIZED)
  }

  try {
    const TOKEN = await jwt.verify(authorization, process.env.JWT_SECRET)
    req.uid = TOKEN.uid
    req.user = {
      uid: TOKEN.uid,
      account_type: TOKEN.account_type,
    }
  } catch (err) {
    return res.sendStatus(CODES.UNAUTHORIZED)
  }

  next()
}

module.exports = authorize
