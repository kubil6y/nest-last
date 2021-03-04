import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
