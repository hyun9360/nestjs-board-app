import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmCoreModule.forRoot(typeORMConfig), BoardsModule],
})
export class AppModule {}
