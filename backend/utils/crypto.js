'use strict'
const bcrypt = require('bcryptjs')

class Crypto {
  constructor ({ config }) {
    this._config = config
    this._saltRounds = bcrypt.genSaltSync(config.crypto.saltRounds)
  }

  async encryptPassword ({ password }) {
    if (!this._config.crypto.enabled) return
    return bcrypt.hash(password, this._saltRounds)
  }

  async comparePassword ({ password, encryptedPassword }) {
    if (!this._config.crypto.enabled) return
    return bcrypt.compare(password, encryptedPassword)
  }
}

module.exports = Crypto
