const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const login = async (obj) => {
  const user = await User.findOne({ username: obj.username })
  console.log(user)

  const passwordPassed =
    user === null
      ? false
      : await bcrypt.compare(obj.password, user.passwordHash)

  if (!(user && passwordPassed)) {
    throw { name: 'AuthError', message: 'Invalid username or password!' }
  }

  const userLogged = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userLogged, config.JWT_SECRET)

  return { token, name: user.name, username: user.username }
}

module.exports = { login }
