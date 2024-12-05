const subscriptionRepository = require('../repositories/subscription')

class SubscriptionService {
  constructor(subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async getSubscriptionsByUsername(username) {
    try {
      const foundSubscriptions = await this.subscriptionRepository.getSubscriptionsByUsername(username)
      if (!foundSubscriptions) {
        throw new Error('Подписок с таким username не существует')
      }
      return foundSubscriptions
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось получить подписку по username')
    }
  }

  async subscribe(username, subscriber) {
    try {
      const isSubscriptionExist = await this.subscriptionRepository.findSubscription(username, subscriber)
      if (isSubscriptionExist) {
        throw new Error('Вы уже подписаны на этого пользователя')
      }
      return await this.subscriptionRepository.createSubscription(username, subscriber)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось подписаться')
    }
  }

  async checkSubscription(writer, postAuthor) {
    try {
      return await this.subscriptionRepository.findSubscription(writer, postAuthor )
    } catch (error) {
      throw new Error('Не удалось проверить подписку. Что-то пошло не так')
    }
  }

  async unsubscribe(username, subscriber) {
    try {
      const isSubscriptionExist = await this.subscriptionRepository.findSubscription(username, subscriber)
      if (!isSubscriptionExist) {
        throw new Error('Вы не подписаны на пользователя. Отписаться не получилось')
      }
      return await this.subscriptionRepository.unsubscribe(username, subscriber)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось отписаться')
    }
  }

  async getSubscribers(username) {
    try {
      return await this.subscriptionRepository.getSubscribers(username)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось получить подписчиков. Что-то пошло не так.')
    }
  }
}

module.exports = new SubscriptionService(subscriptionRepository)