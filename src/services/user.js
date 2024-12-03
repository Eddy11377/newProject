const userRepository = require('../repositories/user');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async getUsers(offset, limit) {
    try {
      return await this.userRepository.getUsers(offset, limit)
    } catch (error) {
      console.log(error);
      throw new Error('Ошибка получения пользователей')
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await this.userRepository.getUserByUsername(username)
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

  async createUser(username, password, settings) {
    try {
      const userExist = await this.userRepository.getUserByUsername(username)
      if (userExist) {
        throw new Error('Не удалось создать пользователя. Пользователь с таким username уже существует')
      }
      const result = await this.userRepository.createUser(username, password, settings)
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

  async updateUser(username) {
    try {
      const foundUser = await this.userRepository.getUserByUsername(username)
      if (!foundUser) {
        throw new Error('Пользователя не существует')
      }
      const user = { ... await this.userRepository.updateUser(settings, username) }
      delete user.password
      return user
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Ошибка при обновлении пользователя')

    }
  }

  async deleteUser(username) {
    try {
      const user = await this.userRepository.getUserByUsername(username)
      if (!user) {
        throw new Error('Пользователя с таким username не существует')
      }
      return await this.userRepository.deleteUser(username)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось удалить пользователя')
    }
  }

  async checkSettingWriteComment(username) {
    return await this.userRepository.isOnlySubscribersCanWriteComments(username)
  }
}

module.exports = new UserService(userRepository)