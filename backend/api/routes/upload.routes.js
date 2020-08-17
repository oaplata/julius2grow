'use strict'

const { Router } = require('express')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

module.exports = function ({ config }) {
  const router = Router()

  router.post('/', async (req, res) => {
    aws.config.update(config.aws.s3)
    const s3 = new aws.S3()
    let path

    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: config.aws.s3.bucket,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (_req, file, cb) {
          cb(null, { fieldName: file.fieldname })
        },
        key: function (_req, file, cb) {
          const newFileName = Date.now() + '-' + file.originalname
          path = `images/${newFileName}`
          cb(null, path)
        }
      })
    })

    const singleUpload = upload.single('file')

    singleUpload(req, res, function (err) {
      if (err) {
        return res.json({ err: { message: err.message } })
      }

      if (!path) {
        return res.json({ err: { message: 'file_not_found' } })
      }

      return res.json({ url: `${config.aws.s3.bucketUrl}${path}` })
    })
  })

  return router
}
