const CategoryService = require('../services/category.services');

async function createCategory(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const category = await CategoryService.createCategory(name);
  return res.status(201).json(category);
}

async function getAllCategories(req, res) {
  const categories = await CategoryService.getAllCategories();
  return res.status(200).json(categories);
}

module.exports = {
  createCategory,
  getAllCategories,
};