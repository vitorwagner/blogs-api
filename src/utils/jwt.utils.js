const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function createToken(user) {
  return jwt.sign({ data: { email: user.email } }, process.env.JWT_SECRET, jwtConfig);
}

function validateToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, jwtConfig);
}

module.exports = {
  createToken,
  validateToken,
};