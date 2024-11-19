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

  getComments(offset, limit) {
    try {
      return this.commentRepository.getComments(offset, limit)
    } catch (error) {
      throw new Error('что-то пошло не так')
    }
  }

  getCommentById(id) {
    try {
      const comment = this.commentRepository.getCommentById(id)
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

  createComment(username, postId, text) {
    try {
      const post = this.postService.getPostById(postId)
      const postAuthor = post.username
      const isOnlySubscriberCanWrite = this.userService.checkSettingWriteComment(postAuthor)
      if (isOnlySubscriberCanWrite) {
        const subscribed = this.subscriptionService.checkSubscription(username, postAuthor)
        if (subscribed) {
          return this.commentRepository.createComment(username, postId, text)
        } else {
          throw new Error('Только подписчики могут оставлять комментарии. Подпишитесь.')
        }
      }
      return this.commentRepository.createComment(username, postId, text)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось создать комментарии')
    }
  }

  updateComment(text, id) {
    try {
      const comment = this.commentRepository.getCommentById(id)
      if (!comment) {
        throw new Error('Комментария с таким ID не существует')
      }
      return this.commentRepository.updateComment(text, id)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось обновить комментарий')
    }
  }

  deleteComment(id) {
    try {
      const comment = this.commentRepository.getCommentById(id)
      if (!comment) {
        throw new Error('Комментария с таким ID не существует')
      }
      return this.commentRepository.deleteComment(id)
    } catch (error) {
      if (error.message) {
        throw error
      }
    }
  }
}

module.exports = new CommentService(commentRepository, userService)