import argon2 from 'argon2';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from './types/jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDTO): Promise<User> {
    if (registerDto.password !== registerDto.passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }
    registerDto.password = await argon2.hash(registerDto.password);
    try {
      return await this.userService.create(registerDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const { email, password } = loginDto;

    const user = await this.userService.findOne({ email });
    if (!user?.id) throw new NotFoundException('User not found');

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const payload: JwtPayload = { id: user.id };
    const token = await this.jwtService.signAsync(payload);
    res.cookie('jwt', token, { httpOnly: true });

    return user;
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async me(@GetUser() user: User) {
    console.log(user);
    return user;
  }
}
