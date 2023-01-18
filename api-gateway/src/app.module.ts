import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './profile/user/user.module';

@Module({
  imports: [ConfigModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
