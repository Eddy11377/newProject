const { Router } = require('express')
const router = Router()
const userController = require('../controllers/user')


router.get('/:username', userController.getUserByUsername)
router.get('/', userController.getUsers)
router.post('/', userController.createUser)
router.patch('/', userController.updateUser)
router.delete('/:username', userController.deleteUser)



module.exports = router