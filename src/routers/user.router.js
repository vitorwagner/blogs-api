const express = require('express');
const UserController = require('../controllers/user.controller');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', UserController.createUser);

router.use(tokenValidation);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.delete('/me', UserController.deleteUser);

module.exports = router;