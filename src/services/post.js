const postRepository = require('../repositories/post');

class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  getPosts(offset, limit) {
    try {
      return this.postRepository.getPosts(offset, limit);
    } catch (error) {
      console.log(error);
      throw new Error('не удалось получить post');
    }
  }

  getPostById(id) {
    try {
      const post = postRepository.getPostById(id)
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


  createPost(data) {
    try {
      const { username, text } = data;
      return this.postRepository.createPost(username, text)
    } catch (error) {
      console.log(error);
      throw new Error('не удалось создать пост')
    }
  }

  updatePost(data) {
    try {
      const { id } = data
      const result = this.postRepository.getPostById(id)
      if (!result) {
        throw new Error('Поста с таким ID не существует')
      }
      return this.postRepository.updatePost(data, id)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось обновить post')
    }
  }

  deletePost(id) {
    try {
      const post = postRepository.getPostById(id)
      if (!post) {
        throw new Error('Поста с таким ID не существует')
      }
      return this.postRepository.deletePost(id)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось удалить пост')
    }
  }
}

module.exports = new PostService(postRepository);