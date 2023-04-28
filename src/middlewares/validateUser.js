const { newUserSchema } = require('../services/validations/schema');
const GenerateError = require('../utils/generateError');

const validateUser = (req, _res, next) => {
  const { error } = newUserSchema.validate(req.body);
  if (error) {
    throw GenerateError(400, error.details[0].message);
  }
  next();
};

module.exports = validateUser;