const UserModel = require('../models/user')
const database = [];

class UserRepository {
  constructor(database) {
    this.database = database
    this.tokens = 'some tokens'
  }

  getUsers(offset = 0, limit = 5) {
    return this.database.slice(parseInt(offset), parseInt(offset) + parseInt(limit))
  }

  createUser(username, password, settings) {
    const user = new UserModel(username, password, this.tokens, settings)
    this.database.push(user)
    return user
  }

  getUserByUsername(username) {
    return database.find(el => String(username) === String(el.username))
  }

  updateUser(data, username) {
    const foundIndex = database.findIndex(el => String(username) === String(el.username))
    database[foundIndex] = data
    return data
  }

  deleteUser(username) {
    const foundIndex = database.findIndex(el => String(el.username) === String(username))
    database.splice(foundIndex, 1)
  }

  checkSettingWriteComment(username) {
    const user = database.find(el => String(el.username) === String(username))
    const permissionToWriteComment = user.settings.onlySubscriberWriteComment
    return permissionToWriteComment
  }
}






module.exports = new UserRepository(database)