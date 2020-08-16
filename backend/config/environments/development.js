const config = {
  PORT: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI
  }
}

module.exports = config
