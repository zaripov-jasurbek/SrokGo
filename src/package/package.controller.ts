import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  create(@Body() dto: CreatePackageDto) {
    return this.packageService.create(dto);
  }

  @Get('/by-company/:companyId')
  findAllByCompany(@Param('companyId') companyId: string) {
    return this.packageService.findAllByCompany(companyId);
  }

  @Get('/filter')
  findFiltered(
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('active') active?: boolean,
    @Query('skip') skip = 0,
    @Query('limit') limit = 10,
  ) {
    return this.packageService.findFiltered({
      category,
      minPrice,
      maxPrice,
      active,
      skip: Number(skip),
      limit: Number(limit),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePackageDto) {
    return this.packageService.update(id, dto);
  }

  @Patch(':id/activate')
  toggleActive(@Param('id') id: string, @Body('active') active: boolean) {
    return this.packageService.toggleActive(id, active);
  }

  @Patch(':id/rating')
  updateRating(@Param('id') id: string, @Body('rating') rating: number) {
    return this.packageService.updateRating(id, rating);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(id);
  }
}
