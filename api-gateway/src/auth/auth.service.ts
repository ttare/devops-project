import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from '@app/shared/dist/dtos';
import { ConfigService } from '../../config/config.service';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  async login(loginDto: LoginDto): Promise<HttpException> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.configService.get().PROFILE_SERVICE}/auth/login`, loginDto),
    );

    return response.data;
  }
}
