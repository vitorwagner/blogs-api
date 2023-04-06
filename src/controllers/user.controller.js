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

async function getUserById(req, res) {
  const { id } = req.params;

  const user = await UserService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
}

async function deleteUser(req, res) {
  const { id } = req.user;

  await UserService.deleteUser(id);

  return res.status(204).end();
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
