const Database = require('../services/database/DatabaseService')
const DB_QUERIES = require('../services/database/queries')
const { MESSAGES } = require('../common/ErrorCodes')
const EmploymentType = require('../common/EmploymentType')
const ObjectSearcher = require('../utils/ObjectSearcher')

const getUserData = async (req, res, next) => {
  const { uid, account_type } = req.user

  const result = await Database.query(DB_QUERIES[account_type].get_by_uid, [
    uid,
  ])

  if (!result || result.length === 0) {
    const error = MESSAGES.GONE('User data not available')
    return res.status(error.code).json(error)
  }

  const user = result[0]

  user.preferred_employment_type = ObjectSearcher(
    EmploymentType,
    user.preferred_employment_type
  )

  user.account_type = account_type

  res.status(200).json(user)
}

module.exports = {
  getUserData,
}
