import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async paginate(page: number = 1, take: number = 10): Promise<any> {
    const { data, meta } = await super.paginate(page, take);
    return {
      meta,
      data: data.map((user) => {
        //omitting password
        const { password, ...rest } = user;
        return rest;
      }),
    };
  }
}
