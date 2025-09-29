import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ItemsModule } from './items/items.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    DatabaseModule,
    TasksModule,
    ItemsModule,    
  ],

})
export class AppModule {}
