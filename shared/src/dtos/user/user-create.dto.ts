import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserCreateDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: "No email provided" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "No firstName provided" })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: "No lastName provided" })
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: "No password provided" })
  password: string;
}
