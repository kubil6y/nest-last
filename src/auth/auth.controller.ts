import argon2 from 'argon2';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: any) {
    body.password = await argon2.hash(body.password);
    return this.userService.create(body);
  }
}
