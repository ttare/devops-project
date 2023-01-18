import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  PROFILE_SERVICE: Joi.string().default('http://localhost:3001'),
  CHAT_SERVICE: Joi.string().default('http://localhost:3002'),
  NOTIFICATION_SERVICE: Joi.string().default('http://localhost:3003'),
});
