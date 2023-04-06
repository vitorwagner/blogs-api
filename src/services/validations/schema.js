const Joi = require('joi');

const newUserSchema = Joi.object({
  displayName: Joi.string().min(8).required().label('displayName'),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().label('password'),
  image: Joi.string(),
});

module.exports = {
  newUserSchema,
};
