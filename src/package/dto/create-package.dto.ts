import { OmitType } from '@nestjs/mapped-types';
import { Package } from '../entities/package.entity';

export class CreatePackageDto extends OmitType(Package, [
  '_id',
  'createdAt',
  'updatedAt',
  'active',
]) {}
