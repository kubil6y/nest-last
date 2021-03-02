import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  usernameOrEmail: string;

  @IsNotEmpty()
  password: string;
}
