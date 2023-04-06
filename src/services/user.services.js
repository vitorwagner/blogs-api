const schema = require('./validations/validationsInputValues');
const { User } = require('../models');

async function createUser(user) {
  const error = schema.validateNewUser(user);
  if (error.type) {
    return error;
  }

  const userCheck = await User.findOne({ where: { email: user.email } });

  if (userCheck) {
    return {
      type: 'EMAIL_ALREADY_EXISTS',
      message: 'User already registered',
    };
  }

  const newUser = await User.create(user);

  return newUser.dataValues;
}

async function getAllUsers() {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
}

async function getUserById(id) {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};