const assert = require('assert')

const login = async (login, password) => {
  assert(!!login, 'login can not be null')
  assert(!!password, 'password can not be null')

  console.log(`[AuthService - Login] ${login}:${password}`)
}

const register = async (login, password, email) => {
  assert(!!login, 'login can not be null')
  assert(!!password, 'password can not be null')
  assert(!!email, 'email can not be null')

  console.log(`[AuthService - Register] ${login}:${password}:${email}`)
}

module.exports = {
  login,
  register,
}
