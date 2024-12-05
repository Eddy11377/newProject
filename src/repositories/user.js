const { where } = require('sequelize')
const userModel = require('../db/models/user')

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel
  }

  async getUsers(offset = 0, limit = 15) {
    return this.userModel.findAll({ offset, limit })
  }

  async createUser(username, password, settings = { onlySubscriberWriteComment: false }) {
    return this.userModel.create({ username, password, settings })
  }

  async getUserByUsername(username) {
    return this.userModel.findOne({ where: { username } })
  }

  async updateUser(settings, username) {
    return this.userModel.update({ settings }, {
      where: {
        username
      }
    })
  }

  async deleteUser(username) {
    this.userModel.destroy({ where: { username } })
  }

  async isOnlySubscribersCanWriteComments(username) {
    return this.userModel.findOne({ where: { username } })
  }
}






module.exports = new UserRepository(userModel)