import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import baseConfig from '../config/base-configuration';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    TypeOrmCoreModule.forRootAsync(typeORMConfig),
    BoardsModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [baseConfig, configuration],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
