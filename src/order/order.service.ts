import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { OrderFilter } from './dto/order.dto';
import { toObjectId } from '../common/common.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  create(body: CreateOrderDto) {
    return this.orderModel.create(body);
  }

  find(params: OrderFilter) {
    return this.orderModel.find({
      user: params.user,
      company: params.company,
    });
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.updateOne(toObjectId(id), updateOrderDto);
  }

  remove(id: string) {
    return this.orderModel.deleteOne(toObjectId(id));
  }
}
