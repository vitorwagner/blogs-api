const { updatedPostSchema } = require('../services/validations/schema');
const GenerateError = require('../utils/generateError');

const validateUpdatedPost = (req, _res, next) => {
  const { error } = updatedPostSchema.validate(req.body);
  if (error) {
    throw GenerateError(400, 'Some required fields are missing');
  }
  next();
};

module.exports = validateUpdatedPost;