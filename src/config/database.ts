
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Brand } from '../entities/brand';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db.yugyfhvjowebnuhdupgf.supabase.co',
  port: 5432,
  username: 'postgres',
  password: 'ilovePs5',
  database: 'postgres',
  entities: [Brand],
  synchronize: false,
  logging: false
};