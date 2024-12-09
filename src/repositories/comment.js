const commentModel = require('../db/models/comment')

class CommentRepository {
  constructor(commentModel) {
    this.commentModel = commentModel
  }

  async getComments(offset = 0, limit = 10) {
    return this.commentModel.findAll({
      offset,
      limit
    })
  }

  async getCommentById(id) {
    return this.commentModel.findOne({ where: { id } })
  }

  async createComment(username, postId, text) {
    return this.commentModel.create({
      username,
      postId,
      text
    })
  }

  async updateComment(text, id) {
    return this.commentModel.update({ text }, { where: { id } })
  }

  async deleteComment(id) {
    this.commentModel.destroy({ where: { id } })
  }
}

module.exports = new CommentRepository(commentModel)