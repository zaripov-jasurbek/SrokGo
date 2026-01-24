import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './entities/company.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyModel.create(createCompanyDto);
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
