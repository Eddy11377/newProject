const SubscriptionModel = require('../models/subscription')
const database = []

class SubscriptionRepository {
  constructor(database) {
    this.database = database
  }

  getSubscriptionsByUsername(username) {
    const subscriptions = this.database.filter(el => String(el.username) === String(username))
    return subscriptions
  }

  findSubscription(subscriber, username ) {
    const result = this.database.find(el => String(el.username) === String(username) && String(el.subscriber) === String(subscriber))
    return result
  }

  createSubscription(username, subscriber) {
    const model = new SubscriptionModel(username, subscriber)
    this.database.push(model)
    return model
  }

  unsubscribe(username, subscriber) {
    const foundIndex = database.findIndex((el) => String(el.username) === String(username) && String(el.subscriber) === String(subscriber))
    database.splice(foundIndex, 1)
  }

  getSubscribers(username) {
    return database.filter(el => String(username) === String(el.subscriber))
  }
}



module.exports = new SubscriptionRepository(database)