import { Module } from '@nestjs/common';
import { KafkaModule } from '@app/shared/dist/modules/kafka';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from './user/user.model';

@Module({
  imports: [
    ConfigModule,
    KafkaModule.register([
      {
        name: 'kafka',
        kafkaConfig: {
          clientId: process.env['KAFKA_CLIENT_ID'],
          brokers: [process.env['KAFKA_SERVER_URL']],
          ssl: true,
          sasl: {
            mechanism: 'plain',
            username: process.env['KAFKA_USERNAME'],
            password: process.env['KAFKA_PASSWORD'],
          },
          connectionTimeout: 45000,
        },
      },
    ]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get();
        const dbConfig: PostgresConnectionOptions = {
          type: 'postgres',
          host: config.DATABASE_SERVER_URL,
          port: 5432,
          username: config.DATABASE_USERNAME,
          password: config.DATABASE_PASSWORD,
          database: config.DATABASE_NAME,
          entities: [User],
        };

        return dbConfig;
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
