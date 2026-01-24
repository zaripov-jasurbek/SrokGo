import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './entities/company.entity';
import { Model, QueryFilter, Types } from 'mongoose';
import { FindCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyModel.create(createCompanyDto);
  }

  find(body: FindCompanyDto) {
    const query: QueryFilter<Company> = {};

    if (body.byCategory) {
      query.category = body.byCategory;
    }

    if (body.byRange) {
      query.coordination = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: body.byRange.current,
          },
          $maxDistance: body.byRange.maxDistance,
        },
      };
    }

    return this.companyModel.find(query).lean();
  }

  findAll() {
    return this.companyModel.find({}, { createAt: 1 }).lean();
  }

  findOne(id: string) {
    return this.companyModel.findById(id).lean();
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel.updateOne(
      new Types.ObjectId(id),
      updateCompanyDto,
    );
  }

  remove(id: string) {
    return this.companyModel.deleteOne(new Types.ObjectId(id));
  }
}
