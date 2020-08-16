const { Router } = require('express')

module.exports = function () {
  const router = Router()

  router.get('/', (req, res) => {
    res.json({
      message: 'Hello'
    })
  })

  return router
}
