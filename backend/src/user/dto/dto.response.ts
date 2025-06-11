import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
