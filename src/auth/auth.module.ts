import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}
