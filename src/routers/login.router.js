const express = require('express');
const loginController = require('../controllers/login.controller');
const loginValidation = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/', loginValidation, loginController.login);

module.exports = router;