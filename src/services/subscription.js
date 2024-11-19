const subscriptionRepository = require('../repositories/subscription')

class SubscriptionService {
  constructor(subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  getSubscriptionsByUsername(username) {
    try {
      const foundSubscriptions = subscriptionRepository.getSubscriptionsByUsername(username)
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

  subscribe(username, subscriber) {
    try {
      const isSubscriptionExist = subscriptionRepository.findSubscription(username, subscriber)
      if (isSubscriptionExist) {
        throw new Error('Вы уже подписаны на этого пользователя')
      }
      return subscriptionRepository.createSubscription(username, subscriber)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось подписаться')
    }
  }

  unsubscribe(username, subscriber) {
    try {
      const isSubscriptionExist = subscriptionRepository.findSubscription(username, subscriber)
      if (!isSubscriptionExist) {
        throw new Error('Вы не подписаны на пользователя. Отписаться не получилось')
      }
      return subscriptionRepository.unsubscribe(username, subscriber)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось отписаться')
    }
  }

  getSubscribers(username) {
    try {
      return subscriptionRepository.getSubscribers(username)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось получить подписчиков. Что-то пошло не так.')
    }
  }
}

module.exports = new SubscriptionService(subscriptionRepository)