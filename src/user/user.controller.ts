import { Controller, Get } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  all(): Promise<User[]> {
    return this.userService.all();
  }
}
