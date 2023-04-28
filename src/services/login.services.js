const { User } = require('../models');
const GenerateError = require('../utils/generateError');
const { createToken } = require('../utils/jwt.utils');

async function login(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user || password !== user.password) {
    throw GenerateError(400, 'Invalid fields');
  }

  const token = createToken(user);

  return token;
}

module.exports = {
  login,
};