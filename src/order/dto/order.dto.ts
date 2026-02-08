import { OmitType } from '@nestjs/mapped-types';
import { Order } from '../entities/order.entity';

export class OrderFilter extends OmitType(Order, [
  '_id',
  'createdAt',
  'updatedAt',
  'status',
]) {}
