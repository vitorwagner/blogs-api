const Joi = require('joi');

const newUserSchema = Joi.object({
  displayName: Joi.string().min(8).required().label('displayName'),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().label('password'),
  image: Joi.string(),
});

const newPostSchema = Joi.object({
  title: Joi.string().required().label('title'),
  content: Joi.string().required().label('content'),
  categoryIds: Joi.array().items(Joi.number()).required().label('categoryIds'),
  userId: Joi.number().required().label('userId'),
});

const updatedPostSchema = Joi.object({
  title: Joi.string().required().label('title'),
  content: Joi.string().required().label('content'),
});

module.exports = {
  newUserSchema,
  newPostSchema,
  updatedPostSchema,
};
