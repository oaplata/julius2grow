const { asClass } = require('awilix')
const { UserControllers } = require('../controllers')

module.exports = {
  userControllers: asClass(UserControllers).singleton()
}
