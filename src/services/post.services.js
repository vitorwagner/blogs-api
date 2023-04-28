const Sequelize = require('sequelize');
const config = require('../config/config');
const schema = require('./validations/validationsInputValues');
const { User, BlogPost, Category } = require('../models');
const GenerateError = require('../utils/generateError');

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

async function createPost(post) {
  const { categoryIds } = post;
  const categoryCheck = await Category.count({ where: { id: categoryIds } });
  if (categoryCheck !== categoryIds.length) {
    throw GenerateError(400, 'one or more "categoryIds" not found');
  }
  const error = schema.validateNewPost(post);
  if (error.type) {
    throw GenerateError(400, 'Some required fields are missing');
  }
  const newPost = await sequelize.transaction(async (transaction) => {
    const postCreated = await BlogPost.create(post, { transaction });

    await postCreated.addCategories(categoryIds, { transaction });

    return postCreated;
  });
  return newPost.dataValues;
}

async function getAllPosts() {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
}

async function getPostById(id) {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    throw GenerateError(404, 'Post does not exist');
  }

  return post;
}

async function updatePost(userId, postId, post) {
  const error = schema.validateUpdatedPost(post);
  if (error.type) {
    return {
      type: 'INVALID_VALUE',
      message: 'Some required fields are missing',
    };
  }

  const result = await getPostById(postId);

  if (!result) {
    throw GenerateError(404, 'Post does not exist');
  }

  if (result.userId !== userId) {
    throw GenerateError(401, 'Unauthorized user');
  }

  await result.update(post);

  return result;
}

async function deletePost(userId, postId) {
  const result = await getPostById(postId);

  if (!result) {
    throw GenerateError(404, 'Post does not exist');
  }

  if (result.userId !== userId) {
    throw GenerateError(401, 'Unauthorized user');
  }

  await result.destroy();
}

async function getPostsByQuery(query) {
  const posts = await BlogPost.findAll({
    where: {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: `%${query}%` } },
        { content: { [Sequelize.Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByQuery,
};
