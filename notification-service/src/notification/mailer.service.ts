import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '../../config/config.service';

type MailData = Omit<sgMail.MailDataRequired, 'from'>;

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(this.configService.get().SENDGRID_API_KEY);
  }

  async send(data: MailData) {
    const mailData = {
      ...data,
      from: this.configService.get().SENDGRID_VERIFIED_SENDER,
    } as sgMail.MailDataRequired;
    try {
      await sgMail.send(mailData);
    } catch (e) {
      console.log('Error while sending email to', data.to);

      throw e;
    }
  }
}
