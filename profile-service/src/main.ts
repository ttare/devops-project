import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '../config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get().PORT);

  console.log(`🚀 Profile service is running on: ${await app.getUrl()}`);
}
bootstrap();
