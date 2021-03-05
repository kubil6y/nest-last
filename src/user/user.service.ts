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

  async paginate(page: number = 1, take: number = 10): Promise<any> {
    const [data, total] = await this.userRepository.findAndCount({
      take,
      skip: take * (page - 1),
    });

    return {
      meta: {
        total,
        currentPage: page,
        lastPage: Math.ceil(total / take),
      },
      data: data.map((user) => {
        //omitting password
        const { password, ...rest } = user;
        return rest;
      }),
    };
  }

  async findOne(by: any): Promise<User> {
    return this.userRepository.findOne(by);
  }

  async create(data): Promise<User> {
    return await this.userRepository.save(data);
  }

  async update(id: number, data): Promise<any> {
    await this.userRepository.update({ id }, data);
    return this.findOne({ id });
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete({ id });
  }
}
