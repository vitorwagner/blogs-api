const LoginService = require('../services/login.services');

async function login(req, res) {
  const { email, password } = req.body;

  const token = await LoginService.login(email, password);

  return res.status(200).json({ token });
}

module.exports = {
  login,
};