const postService = require('../services/post');
class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  getPosts = async (req, res) => {
    try {
      const { offset, limit } = req.query;
      const result = this.postService.getPosts(offset, limit);
      res.status(200).json(result);

    } catch (error) {
      console.log(error);
      res.status(500).send('something went wrong');
    }
  };

  getPostById = (req, res) => {
    try {
      const id = req.params.id
      const result = postService.getPostById(id)
      res.status(200).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ "message": error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  createPost = async (req, res) => {
    try {
      const data = req.body;
      const result = this.postService.createPost(data);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('something went wrong');
    }
  };
  updatePost = async (req, res) => {
    try {
      const data = req.body
      const result = this.postService.updatePost(data)
      res.status(200).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: "Поста с таким ID не существует" })
      }
      res.status(500).send('something went wrong')
    }
  }
  deletePost = async (req, res) => {
    try {
      const id = req.params.id
      this.postService.deletePost(id)
      res.status(204).send()
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }
}



module.exports = new PostController(postService);