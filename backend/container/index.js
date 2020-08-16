const { createContainer } = require('awilix')
const Config = require('./config')
const Routes = require('./routes')
const Controllers = require('./controllers')
const Models = require('./models')
const Database = require('./database')

const container = createContainer()


container
  .register(Config)
  .register(Routes)
  .register(Controllers)
  .register(Models)
  .register(Database)

module.exports = container
