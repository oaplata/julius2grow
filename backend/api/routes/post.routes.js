'use strict'

const { Router } = require('express')

module.exports = function ({ postControllers, authorizationMiddleware }) {
  const router = Router()

  router.use(authorizationMiddleware.authenticate.bind(authorizationMiddleware))
  
  router
    .post('/', async (req, res) => {
      const post = req.body
      const newPost = await postControllers.create({ post, user: req.user })
      res.json(newPost)
    })
    .put('/:id', async (req, res) => {
      const id = req.params.id
      const post = req.body
      const user = req.user
      const newPost = await postControllers.update({ id, post, user })
      res.json(newPost)
    })
    .get('/:user', async (req, res) => {
      const page = req.headers.page
      const rowsPerPage = req.headers['rows-per-page']
      const user = req.params.user
      const query = req.query.query

      let result

      if (query) {
        result = await postControllers.searchPost({ page, rowsPerPage, user, query })
      } else {
        result = await postControllers.listPost({ page, rowsPerPage, user })
      }

      if (result.err) {
        return res.json(result)
      }
      res.setHeader('total-rows', result.count)
      res.json(result.rows)
    })
    .delete('/:id', async (req, res) => {
      const id = req.params.id
      const user = req.user
      const result = await postControllers.delete({ id, user })
      res.json(result)
    })

  return router
}
