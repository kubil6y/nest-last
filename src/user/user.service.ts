import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(by: any): Promise<User> {
    return this.userRepository.findOne(by);
  }

  async create(data): Promise<User> {
    return await this.userRepository.save(data);
  }
}
