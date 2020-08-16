'use strict'

const { asClass, asValue } = require('awilix')
const { Crypto, tryCatch, Authentication } = require('../utils')

module.exports = {
  crypto: asClass(Crypto).singleton(),
  tryCatch: asValue(tryCatch),
  authentication: asClass(Authentication).singleton()
}
