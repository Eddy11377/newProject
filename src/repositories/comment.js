const commentModel = require('../db/models/comment')

class CommentRepository {
  constructor(commentModel) {
    this.commentModel = commentModel
  }

  async getComments(offset = 0, limit = 10) {
    return await this.commentModel.findAll({
      offset: offset,
      limit: limit
    })
  }

  async getCommentById(id) {
    return await this.commentModel.findOne({ where: { id: id } })
  }

  async createComment(username, postId, text) {
    return await this.commentModel.create({
      username: username,
      postId: postId,
      text: text
    })
  }

  async updateComment(text, id) {
    return await this.commentModel.update({ text: text }, { where: { id: id } })
  }

  async deleteComment(id) {
    await this.commentModel.destroy({ where: { id: id } })
  }
}

module.exports = new CommentRepository(commentModel)