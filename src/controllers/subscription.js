const subscriptionService = require('../services/subscription')

class SubscriptionController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService
  }
  getSubscriptionByUsername = async (req, res) => {
    try {
      const result = subscriptionService.getSubscriptionsByUsername(req.params.username)
      res.status(200).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(400).send(error.message)
      }
      res.status(500).send('something went wrong')
    }
  }
  getSubscriptions(req, res) {

  }

  subscribe = async (req, res) => {
    try {
      const data = req.body
      const result = subscriptionService.subscribe(data)
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
      const data = req.body
      const result = subscriptionService.unsubscribe(data)
      res.status(200).send('Вы отписались от пользователя')
    } catch (error) {
      if (error.message) {
        return res.status(400).send(error.message)
      }
      res.status(500).send('something went wrong')
    }
  }

}

module.exports = new SubscriptionController(subscriptionService)