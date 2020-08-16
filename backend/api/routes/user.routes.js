const { Router } = require('express')

module.exports = function ({ userControllers }) {
  const router = Router()

  router.get('/', (req, res) => {
    console.log({
      test: 'test',
      obj: {
        obj: {
          test: 'test'
        }
      }
    })
    res.json(userControllers.getAll())
  })

  return router
}
