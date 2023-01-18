import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DatabaseConfig } from './database';

export const CONNECTION_POOL = 'CONNECTION_POOL';

export const {
  ConfigurableModuleClass: ConfigurableDatabaseModule,
  MODULE_OPTIONS_TOKEN: DATABASE_OPTIONS,
} = new ConfigurableModuleBuilder<DatabaseConfig>()
  .setClassMethodName('forRoot')
  .build();
