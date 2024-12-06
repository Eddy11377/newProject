const postRepository = require('../repositories/post');

class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  async getPosts(offset, limit) {
    try {
      return await this.postRepository.getPosts(offset, limit);
    } catch (error) {
      console.log(error);
      throw new Error('не удалось получить post');
    }
  }

  async getPostById(id) {
    try {
      const post = await this.postRepository.getPostById(id)
      if (!post) {
        throw new Error('Поста с таким ID не существует')
      }
      return post
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось получить пост по ID')
    }
  }


  async createPost(username, text) {
    try {
      const createdPost = await this.postRepository.createPost(username, text)
      return createdPost
    } catch (error) {
      console.log(error);
      throw new Error('не удалось создать пост')
    }
  }

  async updatePost(id, text) {
    try {
      const post = await this.postRepository.getPostById(id)
      if (!post) {
        throw new Error('Поста с таким ID не существует')
      }
      const updatedPost = await this.postRepository.updatePost(text, id)
      return updatedPost
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось обновить post')
    }
  }

  async deletePost(id) {
    try {
      const post = await postRepository.getPostById(id)
      if (!post) {
        throw new Error('Поста с таким ID не существует')
      }
      await this.postRepository.deletePost(id)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось удалить пост')
    }
  }
}

module.exports = new PostService(postRepository);