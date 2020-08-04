const User = require('../models/user')
const bcrypt = require('bcryptjs')
const helper = require('../utils/helper')

const getAll = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const getId = async (id) => {
  const user = await User.findById(id)
  return user.toJSON()
}

const create = async (obj) => {
  if (obj.name.length < 3) {
    helper.validationErrorMessage('minimal name length 3')
  }

  if (!obj.name) {
    helper.validationErrorMessage('name is missing')
  }

  if (!obj.username) {
    helper.validationErrorMessage('username is missing')
  }

  if (obj.username.length < 3) {
    helper.validationErrorMessage('minimal username length 3')
  }

  if (!obj.password) {
    helper.validationErrorMessage('password is missing')
  }

  if (obj.password.length < 10) {
    helper.validationErrorMessage('minimal password length 10')
  }

  let salt = bcrypt.genSaltSync(10)
  let passwordHash = bcrypt.hashSync(obj.password, salt)

  const user = new User({
    name: obj.name,
    username: obj.username,
    passwordHash,
  })

  const userSaved = await user.save()

  return userSaved.toJSON()
}

module.exports = {
  getAll,
  getId,
  create,
}
