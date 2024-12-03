const userService = require('../services/user')
class UserController {
  constructor(userService) {
    this.userService = userService
  }
  getUsers = async (req, res) => {
    try {
      const { offset, limit } = req.query
      const result = await this.userService.getUsers(offset, limit)
      res.status(200).json(result)
    } catch (error) {
      console.log(error);
      res.status(500).json('something went wrong')
    }
  }

  getUserByUsername = async (req, res) => {
    try {
      const result = await this.userService.getUserByUsername(req.params.username)
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
      const { username, password, settings } = req.body
      const result = await this.userService.createUser(username, password, settings)
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
      const { username } = req.body
      const result = await this.userService.updateUser(username)
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
      await this.userService.deleteUser(req.params.username)
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