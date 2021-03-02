import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDTO } from '../auth/dtos/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async create(registerDto: RegisterDTO): Promise<User> {
    return this.userRepository.save(registerDto);
  }
}
