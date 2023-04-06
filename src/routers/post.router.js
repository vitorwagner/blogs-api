const express = require('express');
const PostController = require('../controllers/post.controller');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', tokenValidation, PostController.createPost);

module.exports = router;