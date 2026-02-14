import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Package, PackageDocument } from './entities/package.entity';
import { Model, QueryFilter } from 'mongoose';
import { toObjectId } from '../common/common.service';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<PackageDocument>,
  ) {}

  create(createPackageDto: CreatePackageDto) {
    return this.packageModel.create(createPackageDto);
  }

  findAllByCompany(companyId: string) {
    return this.packageModel
      .find({
        company: toObjectId(companyId),
        active: true,
      })
      .sort({ createdAt: -1 })
      .lean();
  }

  findOne(id: string) {
    return this.packageModel.findById(toObjectId(id)).lean();
  }

  update(id: string, updatePackageDto: UpdatePackageDto) {
    return this.packageModel.findByIdAndUpdate(toObjectId(id), updatePackageDto, { new: true });
  }

  remove(id: string) {
    return this.packageModel.findByIdAndDelete(toObjectId(id));
  }

  findFiltered(param: {
    category: string | undefined;
    minPrice: number | undefined;
    maxPrice: number | undefined;
    active: boolean | undefined;
    skip: number;
    limit: number;
  }) {
    const query: QueryFilter<PackageDocument> = {};

    if (param.category) {
      query.category = param.category;
    }

    if (param.minPrice) {
      query.price = {
        $gte: param.minPrice,
      };
    }

    if (param.maxPrice) {
      query.price ??= {};
      query.price = {
        $lte: param.maxPrice,
      };
    }

    if (param.active) {
      query.active = param.active;
    }

    return this.packageModel.find(query, null, {
      lean: true,
      skip: param.skip,
      limit: param.limit,
    });
  }

  toggleActive(id: string, active: boolean) {
    return this.packageModel.findByIdAndUpdate(toObjectId(id), { active }, { new: true });
  }

  updateRating(id: string, rating: number) {
    if (rating < 0 || rating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }

    // TODO: packageObj.rating = (packageObj.rating * packageObj.reviewsCount + rating) / (packageObj.reviewsCount + 1);
    return this.packageModel.findByIdAndUpdate(
      toObjectId(id),
      { rating },
      {
        new: true,
      },
    );
  }
}
