'use strict'

const config = {
  PORT: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI
  },
  crypto: {
    saltRounds: 10,
    enabled: true
  },
  authentication: {
    secret: 'my_secret_key',
    expires: 60 * 60 * 12
  },
  pagination: {
    rowsPerPage: 10
  },
  aws: {
    s3: {
      bucket: process.env.S3_BUCKET_NAME,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      bucketUrl: process.env.S3_BUCKET_URL
    }
  }
}

module.exports = config
