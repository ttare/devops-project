import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'No email provided' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'No password provided' })
  password: string;
}
