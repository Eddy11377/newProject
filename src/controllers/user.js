const userService = require('../services/user')
class UserController {
  constructor(userService) {
    this.userService = userService
  }

  getUsers = async (req, res) => {
    try {
      const { offset, limit } = req.query
      const users = await this.userService.getUsers(offset, limit)
      res.status(200).json(users)
    } catch (error) {
      console.log(error);
      res.status(500).json('something went wrong')
    }
  }

  getUserByUsername = async (req, res) => {
    try {
      const user = await this.userService.getUserByUsername(req.params.username)
      res.status(200).json(user)
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
      const createdUser = await this.userService.createUser(username, password, settings)
      res.status(201).json(createdUser)
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
      const updatedUser = await this.userService.updateUser(username)
      res.status(200).json(updatedUser)
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { username } = req.params
      await this.userService.deleteUser(username)
      res.status(204).send('OK')
    } catch (error) {
      if (error.message) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).send('something went wrong')
    }
  }
}



module.exports = new UserController(userService)