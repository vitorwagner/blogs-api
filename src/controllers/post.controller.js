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

module.exports = {
  createPost,
};
