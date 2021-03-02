import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please enter a valid email address' })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;
}
