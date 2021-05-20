const Database = require('../database/DatabaseService')
const DB_QUERIES = require('../database/queries')

const getTalents = async () => {
  return await Database.query(DB_QUERIES.talent.get_all)
}

const getEmployers = async () => {
  return await Database.query(DB_QUERIES.employer.get_all)
}

module.exports = {
  getTalents,
  getEmployers,
}
