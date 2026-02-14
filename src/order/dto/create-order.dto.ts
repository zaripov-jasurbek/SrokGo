import { OmitType } from '@nestjs/mapped-types';
import { Order } from '../entities/order.entity';

export class CreateOrderDto extends OmitType(Order, ['createdAt', 'updatedAt', '_id', 'price']) {}
