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

//@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Query('page') page: number): Promise<User[]> {
    if (page < 0) throw new BadRequestException('are you dumb?');
    return this.userService.paginate(page);
  }

  @Post()
  async create(@Body() body: UserCreateDTO): Promise<User> {
    const { roleId, ...data } = body;
    const hashed = await argon2.hash('1234');
    return this.userService.create({
      ...data,
      password: hashed,
      role: {
        id: roleId,
      },
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
    const { roleId, ...data } = userUpdate;
    return this.userService.update(id, {
      ...data,
      role: {
        id: roleId,
      },
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
