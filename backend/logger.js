class Logger {
    constructor ({ config }) {
        this._config
    }

    log (...agrs) {
        console.log(...agrs)
    }
}

module.exports = Logger
