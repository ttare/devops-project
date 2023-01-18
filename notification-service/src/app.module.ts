import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { KafkaModule } from '@app/shared/dist/modules/kafka';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/notification.model';

@Module({
  imports: [
    ConfigModule,
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
          entities: [Notification],
        };

        return dbConfig;
      },
    }),
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
        consumerConfig: {
          groupId: 'group-1',
        },
      },
    ]),
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
