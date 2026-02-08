import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from './entities/package.entity';
import { Model } from 'mongoose';
import { toObjectId } from '../common/common.service';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name) private readonly packageModel: Model<Package>,
  ) {}

  create(createPackageDto: CreatePackageDto) {
    return this.packageModel.create(createPackageDto);
  }

  findAll(companyId: string) {
    return this.packageModel
      .find({
        'company._id': toObjectId(companyId),
      })
      .lean();
  }

  findOne(id: string) {
    return this.packageModel.findById(toObjectId(id)).lean();
  }

  update(id: string, updatePackageDto: UpdatePackageDto) {
    return this.packageModel.updateOne(toObjectId(id), updatePackageDto);
  }

  remove(id: string) {
    return this.packageModel.deleteOne(toObjectId(id));
  }
}
