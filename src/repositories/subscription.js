const subscriptionModel = require('../db/models/subscription')

class SubscriptionRepository {
  constructor(subscriptionModel) {
    this.subscriptionModel = subscriptionModel
  }

  async getSubscriptionsByUsername(username) {
    return await this.subscriptionModel.findAll({
      where: {
        username: username
      }
    })
  }

  async findSubscription(username, subscriber) {
    return await this.subscriptionModel.findOne({
      where: {
        subscriber: subscriber,
        username: username
      }
    })
  }

  async createSubscription(username, subscriber) {
    return await this.subscriptionModel.create({ username: username, subscriber: subscriber })
  }

  async unsubscribe(username, subscriber) {
    return await this.subscriptionModel.destroy({
      where: {
        username: username,
        subscriber: subscriber
      }
    })
  }

  async getSubscribers(username) {
    return await this.subscriptionModel.findAll({
      where: {
        username: username
      }
    })
  }
}

module.exports = new SubscriptionRepository(subscriptionModel)