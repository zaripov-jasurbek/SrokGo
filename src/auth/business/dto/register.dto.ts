import { PartialType } from '@nestjs/mapped-types';

export class RegisterDto {
  name: string;
  photo: string;
  OpenTime: Date;
  CloseTime: Date;
  category: string;
  rating: number;
  coordination: [number, number];
}

export class LoginDto {
  name: string;
  password: string;
}

export class UpdateMe extends PartialType<RegisterDto> {}
