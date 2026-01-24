import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from '../package/entities/package.entity';
import { Company, CompanySchema } from './entities/company.entity';

@Module({
  imports:[ MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
