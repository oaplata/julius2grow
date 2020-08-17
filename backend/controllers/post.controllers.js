'use strict'

class PostControllers {
  constructor ({ postModel, tryCatch, userModel, config }) {
    this._postModel = postModel
    this._userModel = userModel
    this._tryCatch = tryCatch
    this._config = config
  }

  _verifyProperty ({ data, label }) {
    if (!data) throw new Error(label)
  }

  async beforeCreate ({ post, userRegister }) {
    this._verifyProperty({ data: post.title, label: 'title_required' })
    this._verifyProperty({ data: post.content, label: 'content_required' })
    this._verifyProperty({ data: post.image, label: 'image_required' })
    this._verifyProperty({ data: userRegister, label: 'user_not_found' })
  }

  async create ({ post, user }) {
    return this._tryCatch(async () => {
      const userRegister = await this._userModel.getById({ id: user._id })
      await this.beforeCreate({ post, userRegister })
      post.user = user._id
      return this._postModel.create({ post })
    })
  }

  async beforeUpdate ({ postRegister }) {
    this._verifyProperty({ data: postRegister, label: 'post_not_found' })
  }

  async update ({ post, id, user }) {
    return this._tryCatch(async () => {
      const postRegister = await this._postModel.getById({ id, user: user._id })
      await this.beforeUpdate({ postRegister })
      return this._postModel.update({ id, post, user: user._id })
    })
  }

  beforeListPost (data) {
    data.page = data.page || 1
    data.rowsPerPage = data.rowsPerPage || this._config.pagination.rowsPerPage
  }

  async listPost (data) {
    return this._tryCatch(async () => {
      this.beforeListPost(data)
      const { user, page, rowsPerPage } = data
      return this._postModel.getByUser({ user, page, rowsPerPage })
    })
  }

  async searchPost (data) {
    return this._tryCatch(async () => {
      this.beforeListPost(data)
      const { user, page, rowsPerPage, query } = data
      return this._postModel.searchByUser({ user, page, rowsPerPage, query })
    })
  }

  async delete ({ user, id }) {
    return this._tryCatch(async () => {
      const postRegister = await this._postModel.getById({ user: user._id, id })
      this._verifyProperty({ data: postRegister, label: 'post_not_found' })
      return this._postModel.delete({ user: user._id, id })
    })
  }
}

module.exports = PostControllers
