import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '@app/shared/dist/dtos';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.get(loginDto.email);
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };
  }
}
