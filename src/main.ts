import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('server.port');
  console.log('configService:', configService);
  await app.listen(port == undefined ? 3001 : port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
