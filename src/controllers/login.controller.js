const LoginService = require('../services/login.services');
const { createToken } = require('../utils/jwt.utils');

async function login(req, res) {
  const { email, password } = req.body;

  const user = await LoginService.login(email, password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = createToken(user);

  return res.status(200).json({ token });
}

module.exports = {
  login,
};