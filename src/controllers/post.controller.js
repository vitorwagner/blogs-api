const PostService = require('../services/post.services');

async function createPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  const post = await PostService.createPost({
    title,
    content,
    categoryIds,
    userId,
  });

  return res.status(201).json(post);
}

async function getAllPosts(_req, res) {
  const posts = await PostService.getAllPosts();

  return res.status(200).json(posts);
}

async function getPostById(req, res) {
  const { id } = req.params;

  const post = await PostService.getPostById(id);

  return res.status(200).json(post);
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;

  const post = await PostService.updatePost(userId, id, {
    title,
    content,
  });

  return res.status(200).json(post);
}

async function deletePost(req, res) {
  const { id } = req.params;
  const { id: userId } = req.user;

  await PostService.deletePost(userId, id);

  return res.status(204).end();
}

async function getPostsByQuery(req, res) {
  const { q } = req.query;

  const posts = q ? await PostService.getPostsByQuery(q) : await PostService.getAllPosts();

  return res.status(200).json(posts);
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByQuery,
};
