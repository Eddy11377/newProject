const commentService = require('../services/comment')

class CommentController {
  constructor(commentService) {
    this.commentService = commentService
  }
  getComments = async (req, res) => {
    try {
      const { offset, limit } = req.query
      const comments = await this.commentService.getComments(offset, limit)
      res.status(200).json(comments)
    } catch (error) {
      console.log(error);
      res.status(500).send('something went wrong')
    }
  }

  getCommentById = async (req, res) => {
    try {
      const comment = await this.commentService.getCommentById(req.params.id)
      res.status(200).json(comment)
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
      const createdComment = await this.commentService.сreateComment(username, postId, text)
      res.status(201).json(createdComment)
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
      const updatedComment = await this.commentService.updateComment(text, id)
      res.status(200).json(updatedComment)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  deleteComment = async (req, res) => {
    try {
      const { id } = req.params
      await this.commentService.deleteComment(id)
      res.status(204).send('OK')
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }
}


module.exports = new CommentController(commentService)