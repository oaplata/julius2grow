'use strict'

const mongoose = require('mongoose')

class PostModel {
  constructor ({ config }) {
    this._config = config
    this._postSchema = new mongoose.Schema({
      title: {
        type: String,
        required: [true, 'title_required']
      },
      content: {
        type: String,
        required: [true, 'content_required']
      },
      image: {
        type: String,
        required: [true, 'image_required']
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'user_required']
      }
    }, { timestamps: {} })
    this._postSchema.index({ title: 'text', content: 'text' })
    this._postModel = mongoose.model('post', this._postSchema)
  }

  _validateObjectId ({ id, label }) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error(label)
  }

  async getById ({ id, user }) {
    this._validateObjectId({ id, label: 'id_not_valid' })
    return this._postModel.findOne({ _id: id, user }).exec()
  }

  async create ({ post }) {
    const newPost = new this._postModel(post)
    return newPost.save()
  }

  async update ({ id, user, post }) {
    this._validateObjectId({ id, label: 'id_not_valid' })
    return this._postModel.updateOne({ _id: id, user }, post, { new: true })
  }

  async getByUser ({ user, page, rowsPerPage }) {
    this._validateObjectId({ id: user, label: 'user_not_valid' })
    const count = await this._postModel.countDocuments({ user }).exec()
    const rows = await this._postModel
      .find({ user })
      .limit(rowsPerPage)
      .skip((rowsPerPage * page) - rowsPerPage)

    return {
      rows,
      count,
      page,
      rowsPerPage
    }
  }

  async searchByUser ({ user, query, page, rowsPerPage }) {
    this._validateObjectId({ id: user, label: 'user_not_valid' })
    const count = await this._postModel
      .countDocuments({
        user,
        $text: {
          $search: query,
          $caseSensitive: false
        }
      })
      .exec()
    const rows = await this._postModel
      .find({
        user,
        $text: {
          $search: query,
          $caseSensitive: false
        }
      })
      .limit(rowsPerPage)
      .skip((rowsPerPage * page) - rowsPerPage)
      .exec()

    return {
      rows,
      count,
      page,
      rowsPerPage
    }
  }

  async delete ({ user, id }) {
    this._validateObjectId({ id, label: 'id_not_valid' })
    const result = await this._postModel.deleteOne({ user, _id: id }).exec()
    return {
      ok: !!result.ok,
      count: result.deletedCount
    }
  }
}

module.exports = PostModel
