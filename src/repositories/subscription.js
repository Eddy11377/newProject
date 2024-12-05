const subscriptionModel = require('../db/models/subscription')

class SubscriptionRepository {
  constructor(subscriptionModel) {
    this.subscriptionModel = subscriptionModel
  }

  async getSubscriptionsByUsername(username) {
    return this.subscriptionModel.findAll({
      where: {
        username
      }
    })
  }

  async findSubscription(subscriber, username ) {
    return this.subscriptionModel.findOne({
      where: {
        subscriber,
        username
      }
    })
  }

  async createSubscription(username, subscriber) {
    return this.subscriptionModel.create({ username, subscriber })
  }

  async unsubscribe(username, subscriber) {
    return this.subscriptionModel.destroy({
      where: {
        username,
        subscriber
      }
    })
  }

  async getSubscribers(username) {
    return this.subscriptionModel.findAll({
      where: {
        username
      }
    })
  }
}

module.exports = new SubscriptionRepository(subscriptionModel)