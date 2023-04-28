const express = require('express');
const UserController = require('../controllers/user.controller');
const tokenValidation = require('../middlewares/tokenValidation');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/', validateUser, UserController.createUser);

router.use(tokenValidation);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.delete('/me', UserController.deleteUser);

module.exports = router;