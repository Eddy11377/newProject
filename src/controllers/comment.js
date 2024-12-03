const commentService = require('../services/comment')

class CommentController {
  constructor(commentService) {
    this.commentService = commentService
  }
  getComments = async (req, res) => {
    try {
      const { offset, limit } = req.query
      const result = await this.commentService.getComments(offset, limit)
      res.status(200).json(result)
    } catch (error) {
      console.log(error);
      res.status(500).send('something went wrong')
    }
  }

  getCommentById = async (req, res) => {
    try {
      const result = await this.commentService.getCommentById(req.params.id)
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
      const result = await this.commentService.сreateComment(username, postId, text)
      console.log(result);
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
      const result = await this.commentService.updateComment(text, id)
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
      await this.commentService.deleteComment(req.params.id)
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