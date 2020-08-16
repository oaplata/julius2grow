const { Router } = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

module.exports = function ({ userRoutes }) {
  const router = Router()
  const apiRouter = Router()

  apiRouter
    .use(cors())
    .use(bodyParser.json())
    .use(compression())

  apiRouter.use('/users', userRoutes)

  router.use('/api', apiRouter)

  return router
}
