const { asFunction } = require('awilix')
const { Routes, UserRoutes } = require('../api/routes')

module.exports = {
  routes: asFunction(Routes).singleton(),
  userRoutes: asFunction(UserRoutes).singleton()
}
