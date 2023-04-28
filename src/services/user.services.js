const { User } = require('../models');
const { createToken } = require('../utils/jwt.utils');
const GenerateError = require('../utils/generateError');

async function createUser(user) {
  const userCheck = await User.findOne({ where: { email: user.email } });

  if (userCheck) {
    throw GenerateError(409, 'User already registered');
  }

  const newUser = await User.create(user);

  const token = createToken(newUser);

  return token;
}

async function getAllUsers() {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
}

async function getUserById(id) {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    throw GenerateError(404, 'User does not exist');
  }

  return user;
}

async function deleteUser(id) {
  await User.destroy({ where: { id } });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};