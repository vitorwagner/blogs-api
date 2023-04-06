const { validateToken } = require('../utils/jwt.utils');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = validateToken(authorization);
    req.user = decoded.data;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};