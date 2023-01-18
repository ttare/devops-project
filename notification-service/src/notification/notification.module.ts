import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { NotificationService } from './notification.service';
import { MailerService } from './mailer.service';
import { Notification } from './notification.model';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Notification])],
  controllers: [],
  providers: [MailerService, NotificationService],
})
export class NotificationModule {}
