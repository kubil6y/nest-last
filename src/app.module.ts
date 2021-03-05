import Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //no need to import ConfigModule in other modules, just inject ConfigService
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

/*
const randomString = [...Array(32)]
  .map(() => Math.round(Math.random() * 16).toString(16))
  .join('');
*/
