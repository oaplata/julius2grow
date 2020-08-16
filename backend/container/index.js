const { createContainer } = require('awilix')
const Routes = require('./routes')
const Config = require('./config')

const container = createContainer()

container
  .register(Config)
  .register(Routes)

module.exports = container
