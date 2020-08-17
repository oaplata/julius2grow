'use strict'

const mongoose = require('mongoose')

class UserModel {
  constructor () {
    this._userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'name_required']
      },
      email: {
        type: String,
        required: [true, 'email_required'],
        unique: [true, 'email_duplicate']
      },
      password: {
        type: String,
        required: [true, 'password_required']
      }
    }, { timestamps: {} })
    this._userModel = mongoose.model('user', this._userSchema)
  }

  getAll () {
    return this._userModel.find().exec()
  }

  register ({ user }) {
    const newUser = new this._userModel(user)
    return newUser.save()
  }

  async getByEmail ({ email }) {
    return this._userModel.findOne({ email }).exec()
  }

  async getById ({ id }) {
    return this._userModel.findById(id).exec()
  }

  async update ({ id, data }) {
    return this._userModel.findOneAndUpdate({ _id: id }, data, { new: true })
  }
}

module.exports = UserModel
