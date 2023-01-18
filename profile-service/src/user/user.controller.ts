import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoginDto, UserCreateDto } from '@app/shared/dist/dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/exists/:email')
  async exists(@Param('email') email: string) {
    try {
      return await this.userService.exists(email);
    } catch (e) {
      console.log('UserController.exists', e);
      throw e;
    }
  }

  @Post('/create')
  async create(@Body() userCreateDto: UserCreateDto) {
    try {
      return await this.userService.create(userCreateDto);
    } catch (e) {
      console.log('UserController.create', e);
      throw e;
    }
  }
}
