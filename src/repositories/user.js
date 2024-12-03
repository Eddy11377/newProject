const { where } = require('sequelize')
const userModel = require('../db/models/user')

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel
    this.token = 'some tokens'
  }

  async getUsers(offset = 0, limit = 15) {
    // return this.database.slice(parseInt(offset), parseInt(offset) + parseInt(limit)) 
     const users = await this.userModel.findAll({ offset: offset, limit: limit })
     console.log(users);
     return users
  }

  async createUser(username, password, settings = {onlySubscriberWriteComment: false}) {
    // const user = new UserModel(username, password, this.tokens, settings)
    // this.database.push(user)
    // return user
    const user = await this.userModel.create({ username: username, password: password, settings: settings, token: this.token })
    return user.toJSON() //или get() можно чтобы чистый объект вытащить
  }

  async getUserByUsername(username) {
    // return database.find(el => String(username) === String(el.username))
    return await this.userModel.findOne({ where: { username: username } })
  }

  async updateUser(settings, username) {
    // const foundIndex = database.findIndex(el => String(username) === String(el.username))
    // database[foundIndex] = data
    // return data
    return await this.userModel.update({ settings: settings }, {
      where: {
        username: username
      }
    })
  }

  async deleteUser(username) {
    // const foundIndex = database.findIndex(el => String(el.username) === String(username))
    // database.splice(foundIndex, 1)
    await this.userModel.destroy({ where: { username: username } })
  }

  async isOnlySubscribersCanWriteComments(username) {
    // const user = database.find(el => String(el.username) === String(username))
    // const onlySubscribersCanWriteComments = user.settings.onlySubscriberWriteComment
    // return onlySubscribersCanWriteComments
    return await this.userModel.findOne({attributes: ['onlySubscriberWriteComment'], where: {username: username}})
  }
}






module.exports = new UserRepository(userModel)