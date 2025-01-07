// utils/validate.js

const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const videoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  thumbnailUrl: Joi.string().uri(),
  channelId: Joi.string().required(),
});

const channelSchema = Joi.object({
  channelName: Joi.string().required(),
  description: Joi.string(),
});

const commentSchema = Joi.object({
  text: Joi.string().required(),
  videoId: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  videoSchema,
  channelSchema,
  commentSchema,
};