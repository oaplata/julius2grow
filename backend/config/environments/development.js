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
    expires: 60 * 60 * 1
  }
}

module.exports = config
