import { Controller, Get, Param } from '@nestjs/common';
import { BrandService } from './brand.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand';

@Controller('brands')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>
  ) {}

  @Get()
  async getAllBrands() {
    return this.brandRepository.find();
  }

  @Get(':name')
  async getBrandByName(@Param('name') name: string) {
    return this.brandRepository.findOne({ where: { name } });
  }

  @Get(':name/items')
  async getBrandItems(@Param('name') name: string) {
    const brand = await this.brandRepository.findOne({ 
      where: { name },
      select: ['itemGroups'] 
    });
    return brand?.itemGroups || [];
  }
}