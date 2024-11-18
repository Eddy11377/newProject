const subscriptionRepository = require('../repositories/subscription')

class SubscriptionService {
  constructor(subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }
  
  getSubscriptionsByUsername(username) {
    try {
      const foundSubscription = subscriptionRepository.getSubscriptionsByUsername(username)
      if (!foundSubscription) {
        throw new Error('Подписки с таким username не существует')
      }
      return foundSubscription
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось получить подписку по username')
    }
  }

  subscribe(data) {
    try {
      const { username, subscriber } = data // ?сюда можно было бы добавить проверку, на предмет, существует ли юзернейм такой,чтобы нельзя было подписываться на несуществующий юзернейм
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

  unsubscribe(data) {
    try {
      const {username, subscriber} = data
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

  checkSubscription(writer, postAuthor) {
    try {
      return subscriptionRepository.checkSubscription(writer, postAuthor)
    } catch (error) {
      throw new Error('Не удалось проверить подписку. Что-то пошло не так')
    }
  }

}

module.exports = new SubscriptionService(subscriptionRepository)