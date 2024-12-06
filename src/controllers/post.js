const postService = require('../services/post');
class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  getPosts = async (req, res) => {
    try {
      const { offset, limit } = req.query;
      const result = await this.postService.getPosts(offset, limit);
      res.status(200).json(result);

    } catch (error) {
      console.log(error);
      res.status(500).send('something went wrong');
    }
  };

  getPostById = async (req, res) => {
    try {
      const { id } = req.params
      const post = await this.postService.getPostById(id)
      res.status(200).json(post)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ "message": error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  createPost = async (req, res) => {
    try {
      const { username, text } = req.body;
      const createdPost = await this.postService.createPost(username, text);
      res.status(201).json(createdPost);
    } catch (error) {
      console.log(error);
      res.status(500).send('something went wrong');
    }
  };
  updatePost = async (req, res) => {
    try {
      const { id, text } = req.body
      const updatedPost = await this.postService.updatePost(id, text)
      res.status(200).json(updatedPost)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }
  deletePost = async (req, res) => {
    try {
      await this.postService.deletePost(req.params.id)
      res.status(204).send('OK')
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }
}



module.exports = new PostController(postService);