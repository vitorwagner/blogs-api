const { newUserSchema } = require('./schema');

const validateNewUser = (user) => {
  const { error } = newUserSchema.validate(user);

  if (error) {
    return {
      type: error.message.includes('is required') ? 'IS_REQUIRED' : 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateNewUser,
};
