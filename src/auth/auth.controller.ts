import argon2 from 'argon2';
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
//import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDTO) {
    if (registerDto.password !== registerDto.passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }
    registerDto.password = await argon2.hash(registerDto.password);
    return this.userService.create(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    const { email, password } = loginDto;

    const user = await this.userService.findOne({ email });
    if (!user?.id) throw new NotFoundException('User not found');

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) throw new BadRequestException('Invalid credentials');

    return user;
  }
}
