const { Category } = require('../models');

async function createCategory(name) {
  const newCategory = await Category.create({ name });
  return newCategory.dataValues;
}

async function getAllCategories() {
  const categories = await Category.findAll();
  return categories;
}

module.exports = {
  createCategory,
  getAllCategories,
};