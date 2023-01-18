import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '@app/shared/dist/dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (e) {
      console.log('AuthControler.login', e);
      throw e;
    }
  }
}
