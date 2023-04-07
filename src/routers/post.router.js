const express = require('express');
const PostController = require('../controllers/post.controller');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', tokenValidation, PostController.createPost);
router.get('/', tokenValidation, PostController.getAllPosts);
router.get('/search', tokenValidation, PostController.getPostsByQuery);
router.get('/:id', tokenValidation, PostController.getPostById);
router.put('/:id', tokenValidation, PostController.updatePost);
router.delete('/:id', tokenValidation, PostController.deletePost);

module.exports = router;