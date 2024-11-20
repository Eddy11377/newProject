const userRepository = require('../repositories/user');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  getUsers(offset, limit) {
    try {
      return this.userRepository.getUsers(offset, limit)
    } catch (error) {
      console.log(error);
      throw new Error('Ошибка получения пользователей')
    }
  }

  getUserByUsername(username) {
    try {
      const user = userRepository.getUserByUsername(username)
      if (!user) {
        throw new Error('Пользователя не существует')
      }
      return user
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Ошибка получения пользователя')
    }
  }

  createUser(data) {
    try {
      const { username, password, settings } = data
      const userExist = this.userRepository.getUserByUsername(username)
      if (userExist) {
        throw new Error('Не удалось создать пользователя. Пользователь с таким username уже существует')
      }
      const result = this.userRepository.createUser(username, password, settings)
      const user = { ...result }
      delete user.password
      return user
    } catch (error) {
      console.log(error);
      if (error.message) {
        throw error
      }
      throw new Error('Ошибка создания пользователя')
    }
  }

  updateUser(username) {
    try {
      const foundUser = this.userRepository.getUserByUsername(username)
      if (!foundUser) {
        throw new Error('Пользователя не существует')
      }
      const user = { ...this.userRepository.updateUser(data, username) }
      delete user.password
      return user
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Ошибка при обновлении пользователя')

    }
  }

  deleteUser(username) {
    try {
      const user = this.userRepository.getUserByUsername(username)
      if (!user) {
        throw new Error('Пользователя с таким username не существует')
      }
      return this.userRepository.deleteUser(username)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось удалить пользователя')
    }
  }

  checkSettingWriteComment(username) {
    return this.userRepository.isOnlySubscribersCanWriteComments(username)
  }
}

module.exports = new UserService(userRepository)