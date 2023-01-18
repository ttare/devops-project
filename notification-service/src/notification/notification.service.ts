import { Inject, Injectable } from '@nestjs/common';
import { KafkaService, KafkaResponse } from '@app/shared/dist/modules/kafka';
import { ConfigService } from '../../config/config.service';
import { MailerService } from './mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.model';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('kafka') private kafkaService: KafkaService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    @InjectRepository(Notification) private notificationRepository: Repository<Notification>,
  ) {
    this.kafkaService.subscribe(this.configService.get().KAFKA_TOPIC_USER_CREATED, this.userCreated.bind(this));
  }

  async userCreated({ response }: KafkaResponse<{ email: string; userId: number }>) {
    console.log('userCreated', response);
    const { email, userId } = response;
    const notification = new Notification();
    notification.userId = userId;
    notification.type = 'welcome-email';

    try {
      await this.mailerService.send({
        subject: 'Welcome to Devops project',
        templateId: this.configService.get().SENDGRID_WELCOME_TEMPLATE_ID,
        to: email,
      });
      notification.status = 'sent';
    } catch (e) {
      notification.info = e?.toString();
      notification.status = 'error';
    }
    await this.notificationRepository.save(notification);
  }
}
