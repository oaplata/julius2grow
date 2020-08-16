const { createContainer } = require('awilix')
const Routes = require('./routes')
const Config = require('./config')
const Controllers = require('./controllers')
const Models = require('./models')

const container = createContainer()


container
  .register(Config)
  .register(Routes)
  .register(Controllers)
  .register(Models)

module.exports = container
