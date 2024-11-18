const { Router } = require('express');
const router = Router();
const postController = require('../controllers/post');

router.get('/:id', postController.getPostById)
router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.patch('/', postController.updatePost);
router.delete('/:id', postController.deletePost)


module.exports = router;