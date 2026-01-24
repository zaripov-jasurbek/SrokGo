import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from './entities/package.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name) private readonly packageModel: Model<Package>,
  ) {}

  create(createPackageDto: CreatePackageDto) {
    return this.packageModel.create(createPackageDto);
  }

  findAll(companyId: string) {
    return this.packageModel.find({
      'company._id': new Types.ObjectId(companyId),
    });
  }

  findOne(id: string) {
    return this.packageModel.findById(new Types.ObjectId(id));
  }

  update(id: string, updatePackageDto: UpdatePackageDto) {
    return this.packageModel.updateOne(
      new Types.ObjectId(id),
      updatePackageDto,
    );
  }

  remove(id: string) {
    return this.packageModel.deleteOne(new Types.ObjectId(id));
  }
}
