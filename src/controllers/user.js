const userService = require('../services/user')
class UserController {
  constructor(userService) {
    this.userService = userService
  }
  getUsers = async (req, res) => {
    try {
      const { offset, limit } = req.query
      const result = this.userService.getUsers(offset, limit)
      res.status(200).json(result)
    } catch (error) {
      console.log(error);
      res.status(500).json('something went wrong')
    }
  }

  getUserByUsername = async (req, res) => {
    try {
      const result = userService.getUserByUsername(req.params.username)
      res.status(200).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  createUser = async (req, res) => {
    try {
      const result = this.userService.createUser(req.body)
      res.status(201).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  updateUser = async (req, res) => {
    try {
      const result = userService.updateUser(req.body)
      res.status(200).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  deleteUser = async (req, res) => {
    try {
      this.userService.deleteUser(req.params.username)
      res.status(204).send()
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }
}



module.exports = new UserController(userService)