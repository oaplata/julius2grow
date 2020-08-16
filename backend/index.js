const container = require('./container')

const server = container.resolve('server')
const logger = container.resolve('logger')

server.start()
  .catch(err => {
    logger.log(err.message)
    logger.log(err.stack)
    process.exit(0)
  })
