import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UserCreateDto } from '@app/shared/dist/dtos';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class UserService {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  async exists(email: string): Promise<boolean> {
    if (!email) {
      throw new Error('Invalid email address');
    }

    const response = await lastValueFrom(
      this.httpService.get(`${this.configService.get().PROFILE_SERVICE}/user/exists/${email}`),
    );

    return response.data;
  }

  async create(userCreateDto: UserCreateDto): Promise<UserCreateDto> {
    const response = await lastValueFrom(
      this.httpService.post(`${this.configService.get().PROFILE_SERVICE}/user/create`, userCreateDto),
    );

    return response.data;
  }
}
