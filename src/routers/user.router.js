const express = require('express');
const UserController = require('../controllers/user.controller');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', tokenValidation, UserController.getAllUsers);

module.exports = router;