import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const option = {
      type: configService.get('db.type', 'postgres'),
      host: configService.get('db.host'),
      port: configService.get('db.port'),
      username: configService.get('db.username'),
      password: configService.get('db.password'),
      database: configService.get('db.database', 'board-app'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: configService.get('db.synchronize'),
    };

    return option;
  },
};
