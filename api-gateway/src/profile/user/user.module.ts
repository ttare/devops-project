import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
