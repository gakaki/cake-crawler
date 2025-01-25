import { Test, TestingModule } from '@nestjs/testing';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from './entities/brand';
import { Repository } from 'typeorm';
import { vi,expect,it,describe,afterAll,beforeEach, vitest } from 'vitest';

describe('BrandController', () => {
  let controller: BrandController;
  let mockBrandRepository: Partial<Repository<Brand>>;

  beforeEach(async () => {
    mockBrandRepository = {
      find: vitest.fn().mockResolvedValue([
        { 
          id: 1, 
          name: 'WentingG', 
          appId: 'wx50d13a67c1b59969', 
          kdtId: '177397716' 
        }
      ]),
      findOne: vitest.fn().mockResolvedValue({ 
        id: 1, 
        name: 'WentingG', 
        itemGroups: [{ id: 1, title: 'Test Group' }] 
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [
        BrandService,
        {
          provide: getRepositoryToken(Brand),
          useValue: mockBrandRepository
        }
      ]
    }).compile();

    controller = module.get<BrandController>(BrandController);
  });

  it('should get all brands', async () => {
    const brands = await controller.getAllBrands();
    expect(brands.length).toBeGreaterThan(0);
    expect(brands[0].name).toBe('WentingG');
  });

  it('should get brand by name', async () => {
    const brand = await controller.getBrandByName('WentingG');
    expect(brand?.name).toBe('WentingG');
  });

  it('should get brand items', async () => {
    const items = await controller.getBrandItems('WentingG');
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].title).toBe('Test Group');
  });
});