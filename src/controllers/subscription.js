const subscriptionService = require('../services/subscription')

class SubscriptionController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService
  }

  getSubscriptionsByUsername = async (req, res) => {
    try {
      const result = await this.subscriptionService.getSubscriptionsByUsername(req.params.username)
      res.status(200).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).send(error.message)
      }
      res.status(500).send('something went wrong')
    }
  }

  getSubscribersByUsername = async (req, res) => {
    try {
      const result = await this.subscriptionService.getSubscribers(req.params.username)
      res.status(200).json(result)
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
      const result = await this.subscriptionService.subscribe(username, subscriber)
      res.status(201).json(result)
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
      res.status(200).json({ text: "Вы отписались от пользователя" })
    } catch (error) {
      if (error.message) {
        return res.status(400).send(error.message)
      }
      res.status(500).send('something went wrong')
    }
  }
}

module.exports = new SubscriptionController(subscriptionService)