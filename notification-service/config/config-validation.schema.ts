import * as Joi from 'joi';
import { Config } from './config.types';

export const configValidationSchema = Joi.object<Config>({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3001),

  // database configuration
  DATABASE_SERVER_URL: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),

  // kafka configuration
  KAFKA_SERVER_URL: Joi.string().required(),
  KAFKA_USERNAME: Joi.string().required(),
  KAFKA_PASSWORD: Joi.string().required(),
  KAFKA_TOPIC_USER_CREATED: Joi.string().required(),
  KAFKA_CLIENT_ID: Joi.string().required(),

  // sendgrid configuration
  SENDGRID_API_KEY: Joi.string().required(),
  SENDGRID_VERIFIED_SENDER: Joi.string().required(),
  SENDGRID_WELCOME_TEMPLATE_ID: Joi.string().required(),
});
