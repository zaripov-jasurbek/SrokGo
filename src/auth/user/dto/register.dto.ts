import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from '../../../user/entities/user.entity';

export class RegisterDto extends OmitType(User, [
  '_id',
  'createdAt',
  'updatedAt',
  'passwordHash',
]) {
  password: string;
}

export class LoginDto {
  email?: string;
  phone?: string;
  password: string;
}

export class UpdateMe extends PartialType(RegisterDto) {}
