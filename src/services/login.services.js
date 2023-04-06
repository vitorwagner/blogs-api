const { User } = require('../models');

async function login(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user || password !== user.password) {
    return null;
  }

  return user;
}

module.exports = {
  login,
};