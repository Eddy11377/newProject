const postModel = require('../db/models/post');

class PostRepository {
  constructor(postModel) {
    this.postModel = postModel;
  }
  async getPosts(offset = 0, limit = 10) {
    return await this.postModel.findAll({
      offset: offset,
      limit: limit
    })
  }

  async getPostById(id) {
    return this.postModel.findOne({
      where: {
        id: id
      }
    })
  }

  async createPost(username, text) {
    return this.postModel.create({
      username: username,
      text: text
    })
  }

  async updatePost(text, id) {
    return this.postModel.update({
      text: text
    }, {
      where: {
        id: id
      }
    })
  }

  async deletePost(id) {
    return this.postModel.destroy({
      where: {
        id: id
      }
    })
  }
}
module.exports = new PostRepository(postModel);