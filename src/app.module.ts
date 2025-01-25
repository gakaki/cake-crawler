import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand.module';
import { Brand } from './entities/brand';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';
import { databaseConfig } from './config/database';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    BrandModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})

export class AppModule {}

