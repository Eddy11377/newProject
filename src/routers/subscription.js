const { Router } = require('express')
const router = Router()
const subscriptionController = require('../controllers/subscription')

router.get('/:username', subscriptionController.getSubscriptionsByUsername)
router.get('/username/subscribers', subscriptionController.getSubscribersByUsername)
router.post('/', subscriptionController.subscribe)
router.patch('/', subscriptionController.unsubscribe)

module.exports = router