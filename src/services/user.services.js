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

module.exports = {
  createUser,
};