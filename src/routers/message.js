const { Router } = require('express')
const router = Router()
const messageController = require('../controllers/message')

router.get('/', messageController.getMessages)
router.post('/', messageController.createMessage)

module.exports = router;