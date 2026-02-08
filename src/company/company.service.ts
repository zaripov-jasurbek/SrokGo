import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './entities/company.entity';
import { Model, QueryFilter } from 'mongoose';
import { FindCompanyDto } from './dto/company.dto';
import { toObjectId } from '../common/common.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  create(body: CreateCompanyDto) {
    return this.companyModel.create(body);
  }

  find(body: FindCompanyDto) {
    const query: QueryFilter<CompanyDocument> = {};

    if (body.byCategory) {
      query.category = body.byCategory;
    }

    if (body.region) {
      query.region = body.region;
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

    return this.companyModel.find(query, null, { createdAt: -1 }).lean();
  }

  findAll() {
    return this.companyModel.find({}, { createdAt: 1 }).lean();
  }

  findOne(id: string) {
    return this.companyModel.findById(id).lean();
  }

  update(id: string, body: UpdateCompanyDto) {
    return this.companyModel.findByIdAndUpdate(toObjectId(id), body);
  }

  remove(id: string) {
    return this.companyModel.deleteOne(toObjectId(id));
  }
}
