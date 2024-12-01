const { Router } = require('express')
const router = Router()
const chatController = require('../controllers/chat')
router.get('/', chatController.getChats)
router.post('/', chatController.createChat)

module.exports = router