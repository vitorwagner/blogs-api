const { Category } = require('../models');

async function createCategory(name) {
  const newCategory = await Category.create({ name });
  return newCategory.dataValues;
}

module.exports = {
  createCategory,
};