const UserService = require('../services/user.services');

async function createUser(req, res) {
  const user = req.body;

  const token = await UserService.createUser(user);  

  return res.status(201).json({ token });
}

async function getAllUsers(req, res) {
  const users = await UserService.getAllUsers();

  return res.status(200).json(users);
}

async function getUserById(req, res) {
  const { id } = req.params;

  const user = await UserService.getUserById(id);

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
