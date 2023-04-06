const PostService = require('../services/post.services');
const errorMap = require('../utils/errorMap');

async function createPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  console.log(req.user, userId);
  const post = await PostService.createPost({
    title,
    content,
    categoryIds,
    userId,
  });

  if (post.type) {
    return res
      .status(errorMap.mapError(post.type))
      .json({ message: post.message });
  }

  return res.status(201).json(post);
}

async function getAllPosts(req, res) {
  const posts = await PostService.getAllPosts();

  return res.status(200).json(posts);
}

async function getPostById(req, res) {
  const { id } = req.params;

  const post = await PostService.getPostById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
