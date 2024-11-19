const commentService = require('../services/comment')

class CommentController {
  constructor(commentService) {
    this.commentService = commentService
  }
  getComments = async (req, res) => {
    try {
      const { offset, limit } = req.query
      const result = this.commentService.getComments(offset, limit)
      res.status(200).json(result)
    } catch (error) {
      console.log(error);
      res.status(500).send('something went wrong')
    }
  }

  getCommentById = async (req, res) => {
    try {
      const result = this.commentService.getCommentById(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  createComment = async (req, res) => {
    try {
      const { username, postId, text } = req.body
      const result = this.commentService.createComment(username, postId, text)
      res.status(201).json(result)
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  updateComment = async (req, res) => {
    try {
      const { text, id } = req.body
      const result = this.commentService.updateComment(text, id)
      res.status(200).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  deleteComment = async (req, res) => {
    try {
      this.commentService.deleteComment(req.params.id)
      res.status(204).send()
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }
}

module.exports = new CommentController(commentService)