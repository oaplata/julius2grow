const awilix = require('awilix')
const config = require('./config/environments')
const Server = require('./api/server')
const Logger = require('./logger')
const {
    asValue,
    asClass
} = awilix

const container = awilix.createContainer()

container.register({
    config: asValue(config),
    server: asClass(Server).singleton(),
    logger: asClass(Logger).singleton()
})

module.exports = container
