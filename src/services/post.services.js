const Sequelize = require('sequelize');
const config = require('../config/config');
const schema = require('./validations/validationsInputValues');
const { User, BlogPost, Category, PostCategory } = require('../models');

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

async function createPost(post) {
  const { categoryIds } = post;
  const categoryCheck = await Category.count({ where: { id: categoryIds } });
  if (categoryCheck !== categoryIds.length) {
    return { type: 'INVALID_VALUE', message: 'one or more "categoryIds" not found' };
  }
  const error = schema.validateNewPost(post);
  if (error.type) {
    return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };
  }
  const newPost = await sequelize.transaction(async (transaction) => {
    const postCreated = await BlogPost.create(post, { transaction });

    const postCategories = categoryIds.map((categoryId) => ({
      postId: postCreated.id, categoryId,
    }));

    await PostCategory.bulkCreate(postCategories, { transaction });
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
  return post;
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
