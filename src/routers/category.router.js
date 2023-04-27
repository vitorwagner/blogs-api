const express = require('express');
const CategoryController = require('../controllers/category.controller');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.use(tokenValidation);

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

module.exports = router;