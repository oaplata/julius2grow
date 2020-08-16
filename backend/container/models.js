const { asClass } = require('awilix')

const { UserModel } = require('../models')

module.exports = {
  userModel: asClass(UserModel).singleton()
}
