import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AxiosError } from 'axios';
import { LoginDto } from '@app/shared/dist/dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
      // @ts-ignore
    } catch (e: AxiosError) {
      return new HttpException(e.response.statusText, e.response.status);
    }
  }
}
