import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor() {}

  async send(data) {
    return true;
  }
}
