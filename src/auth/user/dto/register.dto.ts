import { PartialType } from '@nestjs/mapped-types';

export class RegisterDto {
  name: string;
  about?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  rating: number;
}

export class LoginDto {
  email?: string;
  phone?: string;
  password: string;
}

export class UpdateMe extends PartialType<RegisterDto> {}
