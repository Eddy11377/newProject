const { Router } = require('express')
const router = Router()
const subscriptionController = require('../controllers/subscription')

router.get('/:username', subscriptionController.getSubscriptionByUsername)
router.get('/', subscriptionController.getSubscriptions)
router.post('/', subscriptionController.subscribe)
router.patch('/', subscriptionController.unsubscribe)

module.exports = router