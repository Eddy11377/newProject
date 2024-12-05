const commentRepository = require('../repositories/comment')
const userService = require('./user')
const subscriptionService = require('./subscription')
const postService = require('./post')

class CommentService {
  constructor(commentRepository, userService, subscriptionService, postService) {
    this.commentRepository = commentRepository
    this.userService = userService;
    this.subscriptionService = subscriptionService
    this.postService = postService
  }

  async getComments(offset, limit) {
    try {
      return await this.commentRepository.getComments(offset, limit)
    } catch (error) {
      console.error('Ошибка в getComments:', error);
      throw new Error('что-то пошло не так')
    }
  }

  async getCommentById(id) {
    try {
      const comment = await this.commentRepository.getCommentById(id)
      if (!comment) {
        throw new Error('Комментария с таким ID не существует')
      }
      return comment
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось получит комментарий по его ID')
    }
  }

  async сreateComment(username, postId, text) {
    try {
      const post = await this.postService.getPostById(postId)
      const postAuthor = post.username
      console.log('пост автор такой ' + postAuthor);
      const isOnlySubscriberCanWrite = await this.userService.checkSettingWriteComment(postAuthor)
      if (isOnlySubscriberCanWrite) {
        const subscribed = await this.subscriptionService.checkSubscription(username, postAuthor)
        if (subscribed) {
          return await this.commentRepository.createComment(username, postId, text)
        } else {
          throw new Error('Только подписчики могут оставлять комментарии. Подпишитесь.')
        }
      }
      return await this.commentRepository.createComment(username, postId, text)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось создать комментарии')
    }
  }

  async updateComment(text, id) {
    try {
      const comment = await this.commentRepository.getCommentById(id)
      if (!comment) {
        throw new Error('Комментария с таким ID не существует')
      }
      return await this.commentRepository.updateComment(text, id)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось обновить комментарий')
    }
  }

  async deleteComment(id) {
    try {
      const comment = await this.commentRepository.getCommentById(id)
      if (!comment) {
        throw new Error('Комментария с таким ID не существует')
      }
      return await this.commentRepository.deleteComment(id)
    } catch (error) {
      if (error.message) {
        throw error
      }
    }
  }
}

module.exports = new CommentService(commentRepository, userService, subscriptionService, postService)