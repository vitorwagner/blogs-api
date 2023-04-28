const { newPostSchema } = require('../services/validations/schema');
const GenerateError = require('../utils/generateError');

const validateNewPost = (req, _res, next) => {
  const { error } = newPostSchema.validate(req.body);
  if (error) {
    throw GenerateError(400, 'Some required fields are missing');
  }
  next();
};

module.exports = validateNewPost;