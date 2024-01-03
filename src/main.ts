import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port', 3000);

  console.log('configService:', configService);

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
