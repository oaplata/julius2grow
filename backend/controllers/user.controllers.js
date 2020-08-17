'use strict'

class UserController {
  constructor ({ userModel, crypto, tryCatch, authentication }) {
    this._userModel = userModel
    this._crypto = crypto
    this._tryCatch = tryCatch
    this._authentication = authentication
  }

  _verifyProperty ({ data, label }) {
    if (!data) throw new Error(label)
  }

  getAll () {
    return this._userModel.getAll()
  }

  async validateEmailDuplicate ({ email }) {
    const user = await this._userModel.getByEmail({ email })
    if (user) throw new Error('email_duplicate')
  }

  async beforeRegister ({ user }) {
    this._verifyProperty({ data: user.email, label: 'email_required' })
    this._verifyProperty({ data: user.password, label: 'password_required' })
    this._verifyProperty({ data: user.name, label: 'name_required' })
    await this.validateEmailDuplicate({ email: user.email })
  }

  async register ({ user }) {
    return this._tryCatch(async () => {
      await this.beforeRegister({ user })
      user.password = await this._crypto.encryptPassword({ password: user.password })
      const userCreted = await this._userModel.register({ user })
      return userCreted
    })
  }

  async comparePassword ({ user, credentials }) {
    if (!user) throw Error('login_failed')
    const isPasswordValid = await this._crypto.comparePassword({ password: credentials.password, encryptedPassword: user.password })
    if (!isPasswordValid) throw new Error('login_failed')
  }

  generateUserToken ({ user }) {
    const payload = {
      email: user.email,
      _id: user._id
    }

    return this._authentication.sing({ payload })
  }

  beforeLogin ({ credentials }) {
    this._verifyProperty({ data: credentials.email, label: 'email_required' })
    this._verifyProperty({ data: credentials.password, label: 'password_required' })
  }

  async login ({ credentials }) {
    return this._tryCatch(async () => {
      this.beforeLogin({ credentials })
      const user = await this._userModel.getByEmail({ email: credentials.email })
      await this.comparePassword({ user, credentials })
      const token = this.generateUserToken({ user })
      const jsonUser = user.toJSON()
      delete jsonUser.password
      delete jsonUser.__v
      jsonUser.token = token
      return jsonUser
    })
  }

  async _validateEmailBeforeUpdate ({ userRegister, user, id }) {
    if (user.email && userRegister.email !== user.email) {
      const userInDataBase = await this._userModel.getByEmail({
        email: user.email
      })
      if (userInDataBase && userInDataBase._id !== id) throw new Error('email_duplicate')
    }
  }

  async _validatePasswordBeforeUpdate ({ userRegister, user }) {
    if (user.password) {
      this._verifyProperty({ data: user.currentPassword, label: 'current_password_required' })
      await this.comparePassword({
        credentials: {
          password: user.currentPassword
        },
        user: userRegister
      })
      user.password = await this._crypto.encryptPassword({ password: user.password })
    }
  }

  async beforeUpdate ({ userRegister, user, id }) {
    this._verifyProperty({ data: userRegister, label: 'user_not_found' })
    await this._validateEmailBeforeUpdate({ userRegister, user, id })
    await this._validatePasswordBeforeUpdate({ userRegister, user })
  }

  async update ({ id, user }) {
    return this._tryCatch(async () => {
      const userRegister = await this._userModel.getById({ id })
      await this.beforeUpdate({ userRegister, user, id })
      return this._userModel.update({ id, data: user })
    })
  }
}

module.exports = UserController
