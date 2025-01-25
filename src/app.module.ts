import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand.module';
import { Brand } from './entities/brand';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "db.yugyfhvjowebnuhdupgf.supabase.co",
      port: 5432,
      username: "postgres",
      password: "ilovePs5",
      database: "postgres",
      entities: [Brand],
    }),
    BrandModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})

export class AppModule {}

