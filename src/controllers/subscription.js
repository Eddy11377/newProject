const subscriptionService = require('../services/subscription')

class SubscriptionController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService
  }

  getSubscriptionsByUsername = async (req, res) => {
    try {
      const { username } = req.params
      const foundSubscriptions = await this.subscriptionService.getSubscriptionsByUsername(username)
      res.status(200).json(foundSubscriptions)
    } catch (error) {
      if (error.message) {
        return res.status(400).send(error.message)
      }
      res.status(500).send('something went wrong')
    }
  }

  getSubscribersByUsername = async (req, res) => {
    try {
      const { username } = req.params
      const foundSubscribers = await this.subscriptionService.getSubscribers(username)
      res.status(200).json(foundSubscribers)
    } catch (error) {
      if (error.message) {
        res.status(400).send(error.message)
      }
      res.status(500).send('something went wrong')
    }
  }

  subscribe = async (req, res) => {
    try {
      const { username, subscriber } = req.body
      const createdSubscription = await this.subscriptionService.subscribe(username, subscriber)
      res.status(201).json(createdSubscription)
    } catch (error) {
      if (error.message) {
        return res.status(400).send(error.message)
      }
      res.status(500).send('something went wrong');
    }
  }

  unsubscribe = async (req, res) => {
    try {
      const { username, subscriber } = req.query
      await this.subscriptionService.unsubscribe(username, subscriber)
      res.status(200).send('OK')
    } catch (error) {
      if (error.message) {
        return res.status(400).send(error.message)
      }
      res.status(500).send('something went wrong')
    }
  }
}

module.exports = new SubscriptionController(subscriptionService)