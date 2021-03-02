import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './constants';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//type: 'postgres',
export const typeOrmConfig: TypeOrmModuleOptions = {
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
};
