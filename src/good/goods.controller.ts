import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Good } from '../entities/good.entity';

@Controller('goods')
@UseInterceptors(CacheInterceptor)
export class GoodsController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(Good)
    private goodRepository: Repository<Good>,
  ) { }

  @Get()
  @CacheKey('custom_key')
  @CacheTTL(20) // Cache for 60 seconds
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 1000,
  ) {
    const [goods, total] = await this.goodRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['category', 'brand'],
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        category: {
          id: true,
          name: true,
        },
        brand: {
          id: true,
          name: true,
        },
      },

    });

    return {
      data: goods,
      total,
      page,
      limit,
    };

  }
}