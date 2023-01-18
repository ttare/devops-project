import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['DATABASE_SERVER_URL'],
  port: 5432,
  username: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
  synchronize: false,
  logging: false,
  migrations: ['migrations/**.ts'],
  entities: ['src/**/*.model.ts'],
});
