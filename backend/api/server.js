const express = require('express')

class Server {
    constructor ({ config, logger }) {
        this._config = config
        this._logger = logger
        this._app = express()
    }

    start () {
        return new Promise((resolve, reject) => {
            this._app.listen(this._config.PORT, () => {
                this._logger.log(`Server running on port: ${this._config.PORT}`)
                resolve()
            })
        })
    }

}

module.exports = Server
