const DebugService = require('../services/debug/DebugService')

const talents = async (req, res, next) => {
  res.status(200).json(await DebugService.getTalents())
  next()
}

const employers = async (req, res, next) => {
  res.status(200).json(await DebugService.getEmployers())
  next()
}

module.exports = {
  talents,
  employers,
}
