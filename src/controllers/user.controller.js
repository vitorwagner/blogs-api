const UserService = require('../services/user.services');
const { createToken } = require('../utils/jwt.utils');
const errorMap = require('../utils/errorMap');

async function createUser(req, res) {
  const user = req.body;

  const newUser = await UserService.createUser(user);

  if (newUser.type) {
    return res.status(errorMap.mapError(newUser.type)).json({ message: newUser.message });
  }

  const token = createToken(newUser);

  return res.status(201).json({ token });
}

async function getAllUsers(req, res) {
  const users = await UserService.getAllUsers();

  return res.status(200).json(users);
}

module.exports = {
  createUser,
  getAllUsers,
};
