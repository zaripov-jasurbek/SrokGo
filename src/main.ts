import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { type TConfig } from './common/config/schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableShutdownHooks();

  const config = app.get(ConfigService<TConfig>);
  const PORT = config.getOrThrow<number>('PORT');
  const HOST = config.getOrThrow<string>('HOST');
  await app.listen(PORT, HOST);
  new Logger().log(`Server is running on ${HOST}:${PORT}`);
}
void bootstrap();
