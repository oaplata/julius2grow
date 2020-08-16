class UserController {
  constructor ({ userModel }) {
    this._userModel = userModel
  }

  getAll () {
    return this._userModel.getAll()
  }

}

module.exports = UserController