const express = require('express');
const CategoryController = require('../controllers/category.controller');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', tokenValidation, CategoryController.createCategory);
router.get('/', tokenValidation, CategoryController.getAllCategories);

module.exports = router;