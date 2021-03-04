import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { APP_ORIGIN, PORT } from './config/constants';
import { TrimBodyPipe } from './utils/trim-body.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new TrimBodyPipe());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: APP_ORIGIN,
    credentials: true, //pass cookies back and forth for every request
  });
  await app.listen(PORT);
}
bootstrap();
