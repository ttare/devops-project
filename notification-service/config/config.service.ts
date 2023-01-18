import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { Config } from './config.types';
import { configValidationSchema } from './config-validation.schema';

config({
  debug: true,
});

@Injectable()
export class ConfigService {
  private readonly config: Config;

  constructor() {
    const { error, value } = configValidationSchema.validate(process.env, {
      stripUnknown: true,
    });
    if (error) {
      console.log('config validation error:', error.name, error.details);
      throw new Error('Invalid config file');
    }

    this.config = value;
  }

  get(): Config | undefined {
    if (!this.config) {
      return undefined;
    }

    return this.config;
  }
}
