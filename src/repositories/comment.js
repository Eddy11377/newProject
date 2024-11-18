const commentModel = require('../models/comment')
const database = []

class CommentRepository {
  constructor(database) {
    this.database = database
    this.id = 1
  }
  getComments(offset = 0, limit = 5) {
    return this.database.slice(parseInt(offset), parseInt(offset) + parseInt(limit))
  }
  getCommentById(id) {
    return this.database.find(el => Number(id) === Number(el.id))
  }
  createComment(username, postId, text) {
    const comment = new commentModel(this.id, username, postId, text)
    this.database.push(comment)
    this.id += 1
    return comment
  }
  updateComment(text, id) {
    const foundIndex = this.database.findIndex(el => Number(el.id) === Number(id))
    database[foundIndex].text = text
    return database[foundIndex]
  }
  deleteComment(id) {
    const foundIndex = database.findIndex(el => Number(el.id) === Number(id))
    this.database.splice(foundIndex, 1)
  }
}

module.exports = new CommentRepository(database)