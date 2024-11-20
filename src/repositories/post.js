const PostModel = require('../models/post');
const database = [];

class PostRepository {
  constructor(database) {
    this.database = database;
    this.createdPost
    this.id = 1;
  }
  getPosts(offset = 0, limit = 5) {
    return this.database.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  }

  getPostById(id) {
    return this.database.find(el => Number(id) === Number(el.id))
  }

  createPost(username, text) {
    this.createdPost = new PostModel(this.id, username, text);
    this.database.push(this.createdPost);
    this.id += 1
    return this.createdPost;
  }
  updatePost(data, id) {
    const foundIndex = database.findIndex(el => Number(id) === Number(el.id))
    database[foundIndex] = data
    return data
  }

  deletePost(id) {
    const foundIndex = database.findIndex(el => Number(el.id) === Number(id))
    database.splice(foundIndex, 1)
  }
}
module.exports = new PostRepository(database);