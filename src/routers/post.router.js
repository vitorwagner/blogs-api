const express = require('express');
const PostController = require('../controllers/post.controller');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', tokenValidation, PostController.createPost);
router.get('/', tokenValidation, PostController.getAllPosts);
router.get('/:id', tokenValidation, PostController.getPostById);

module.exports = router;