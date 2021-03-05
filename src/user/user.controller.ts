import argon2 from 'argon2';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserCreateDTO } from './dtos/user-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateDTO } from './dtos/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
//@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  all(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<User[]> {
    if (page < 0 || take < 0) throw new BadRequestException('are you dumb?');
    return this.userService.paginate(page, take);
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

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() userUpdate: UserUpdateDTO,
  ): Promise<any> {
    return this.userService.update(id, userUpdate);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
