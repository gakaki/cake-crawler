import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BrandModule } from "./brand.module";
import { ScheduleModule } from "@nestjs/schedule";
import { databaseConfig } from "./config/database";
import { YouZanModule } from "./youzan/youzan.module";
import { TaskModule } from "./task.module";
import { BrandController } from "./brand.controller";
import { GoodsController } from "./good/goods.controller";
import { Brand, Category, Good } from "./entities";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
	imports: [
		CacheModule.register({
			isGlobal: true,
			max: 100, // Maximum number of items in cache
			ttl: 60, // Default TTL in seconds
		}),
		TypeOrmModule.forRoot(databaseConfig),
		TypeOrmModule.forFeature([Good, Brand, Category]),
		forwardRef(() => BrandModule),
		forwardRef(() => YouZanModule),
		forwardRef(() => TaskModule),

		ScheduleModule.forRoot(),
	],
	controllers: [AppController, GoodsController, BrandController],
	providers: [AppService],
})
export class AppModule {}
