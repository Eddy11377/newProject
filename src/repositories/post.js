const { where } = require('sequelize');
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
    return await this.postModel.findOne({
      where: {
        id: id
      }
    })
  }

  async createPost(username, text) {
    return await this.postModel.create({
      username: username,
      text: text
    })
  }

  async updatePost(text, id) {
    return await this.postModel.update({
      text: text
    }, {
      where: {
        id: id
      }
    })
  }

  async deletePost(id) {
    await this.postModel.destroy({
      where: {
        id: id
      }
    })
  }
}
module.exports = new PostRepository(postModel);