import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Company } from '../../../company/entities/company.entity';

export class RegisterDto extends OmitType(Company, [
  '_id',
  'createdAt',
  'updatedAt',
  'passwordHash',
]) {
  password: string;
}

export class LoginDto {
  name: string;
  password: string;
}

export class UpdateMe extends PartialType(RegisterDto) {}
