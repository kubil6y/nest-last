import argon2 from 'argon2';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserCreateDTO } from './dtos/user-create.dto';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  all(): Promise<User[]> {
    return this.userService.all();
  }

  @Post()
  async create(@Body() body: UserCreateDTO): Promise<User> {
    const hashed = await argon2.hash('1234');
    return this.userService.create({
      ...body,
      password: hashed,
    });
  }

  @Get('/:id')
  async get(@Param('id') id: number): Promise<User> {
    return this.userService.findOne({ id });
  }
}
