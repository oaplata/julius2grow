const { Router } = require('express')

module.exports = function ({ userControllers }) {
  const router = Router()

  router.get('/', (req, res) => {
    res.json(userControllers.getAll())
  })

  return router
}
