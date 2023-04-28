const express = require('express');
const PostController = require('../controllers/post.controller');
const tokenValidation = require('../middlewares/tokenValidation');
const validateNewPost = require('../middlewares/validateNewPost');
const validateUpdatedPost = require('../middlewares/validateUpdatedPost');

const router = express.Router();

router.use(tokenValidation);

router.post('/', validateNewPost, PostController.createPost);
router.get('/', PostController.getAllPosts);
router.get('/search', PostController.getPostsByQuery);
router.get('/:id', PostController.getPostById);
router.put('/:id', validateUpdatedPost, PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;