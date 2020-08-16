const { Router } = require('express')

module.exports = function ({ userControllers, authorizationMiddleware }) {
  const router = Router()

  router
    .post('/', async (req, res) => {
      const userBody = req.body
      const user = await userControllers.register({ user: userBody })
      res.json(user)
    })
    .post('/login', async (req, res) => {
      const credentials = req.body
      const user = await userControllers.login({ credentials })
      res.json(user)
    })
    .put('/', authorizationMiddleware.authenticate.bind(authorizationMiddleware), async (req, res) => {
      const id = req.user._id
      const user = req.body
      const newUser = await userControllers.update({ id, user })
      res.json(newUser)
    })

  return router
}
