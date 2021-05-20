const assert = require('assert')
const bcrypt = require('bcrypt')
const Database = require('../database/DatabaseService')
const AccountType = require('../../common/AccountType')
const EmploymentType = require('../../common/EmploymentType')
const ObjectSearcher = require('../../utils/ObjectSearcher')
const uidGenerator = require('../../utils/uidGenerator')
const DB_QUERIES = require('../database/queries')
const { CODES, MESSAGES } = require('../../common/ErrorCodes')

// hash iterations 2^10
const BCRYPT_COST = 10

const getPasswordHash = async (password) => {
  return await bcrypt.hash(password, BCRYPT_COST)
}

const validatePasswordHash = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

const login = async (login, password) => {
  assert(!!login, 'login can not be null')
  assert(!!password, 'password can not be null')

  const hashedPassword = await getPasswordHash(password)

  console.log(`[AuthService - Login] ${login}:${hashedPassword}`)
}

const register = async (accountType, props) => {
  try {
    assert(!!accountType, 'Missing field: accountType')
    assert(!!props?.login, 'Missing field: login')
    assert(!!props?.password, 'Missing field: password')
    assert(
      Object.values(AccountType).includes(accountType),
      'invalid accountType supplied'
    )

    if (accountType == AccountType.TALENT) {
      assert(!!props?.first_name, 'Missing field: first_name')
      assert(!!props?.last_name, 'Missing field: last_name')
      assert(
        !!props?.preferred_employment_type,
        'Missing field: preferred_employment_type'
      )
      assert(
        Object.values(EmploymentType).includes(
          +props?.preferred_employment_type
        ),
        `Invalid value in field: employment_type (options: ${Object.values(
          EmploymentType
        )})`
      )
      assert(!!props?.city, 'Missing field: city')
    } else {
      assert(!!props?.company_name, 'Missing field: company_name')
      assert(!!props?.company_logo_path, 'Missing field: company_logo_path')
    }
  } catch (err) {
    throw MESSAGES.BAD_REQUEST(err.message)
  }

  const existingTalent = await Database.query(
    DB_QUERIES.talent.exists,
    props.login
  )

  const existingEmployer = await Database.query(
    DB_QUERIES.employer.exists,
    props.login
  )

  if (existingTalent.length > 0 || existingEmployer.length > 0) {
    // email already registered as either a talent or employer
    // throw new Error('Email address is already in use')
    throw MESSAGES.CONFLICT('Email address is already in use')
  }

  if (accountType == AccountType.TALENT) {
    // register talent
    const result = await Database.query(DB_QUERIES.talent.create, [
      await uidGenerator.generate(),
      props.login,
      await getPasswordHash(props.password),
      props.first_name,
      props.last_name,
      props.preferred_employment_type,
      props.city,
      Math.floor(Date.now() / 1000),
    ])
    if (result.affectedRows !== 1) {
      throw new Error('registration failed for an unknown reason')
    }
    return
  } else {
    // register employer
    const result = await Database.query(DB_QUERIES.employer.create, [
      await uidGenerator.generate(),
      props.login,
      await getPasswordHash(props.password),
      props.company_name,
      props.company_logo_path,
      Math.floor(Date.now() / 1000),
    ])
    if (result.affectedRows !== 1) {
      throw MESSAGES.SERVER_ERROR(
        'Something went wrong, please try again later'
      )
    }
    return
  }
}

module.exports = {
  login,
  register,
}
