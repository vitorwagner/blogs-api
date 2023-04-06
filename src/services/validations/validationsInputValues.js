const { newUserSchema, newPostSchema, updatedPostSchema } = require('./schema');

const validateNewUser = (user) => {
  const { error } = newUserSchema.validate(user);

  if (error) {
    return {
      type: error.message.includes('is required')
        ? 'IS_REQUIRED'
        : 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

const validateNewPost = (post) => {
  const { error } = newPostSchema.validate(post);

  if (error) {
    return {
      type: error.message.includes('is required')
        ? 'IS_REQUIRED'
        : 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

const validateUpdatedPost = (post) => {
  const { error } = updatedPostSchema.validate(post);

  if (error) {
    return {
      type: error.message.includes('is required')
        ? 'IS_REQUIRED'
        : 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateNewUser,
  validateNewPost,
  validateUpdatedPost,
};
