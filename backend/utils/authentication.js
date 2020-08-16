'use strict'
const jwt = require('jsonwebtoken')

class Authentication {
  constructor ({ config }) {
    this._config = config
  }

  sing ({ payload }) {
    return jwt.sign(
      payload,
      this._config.authentication.secret,
      {
        expiresIn: this._config.authentication.expires
      }
    )
  }

  verify ({ token }, cb) {
    return jwt.verify(token, this._config.authentication.secret, cb)
  }
}

module.exports = Authentication
