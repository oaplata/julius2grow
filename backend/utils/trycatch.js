'use strict'

module.exports = async (fn) => {
  try {
    const result = await fn()
    return result
  } catch (error) {
    return {
      err: {
        message: error.message
      }
    }
  }
}
