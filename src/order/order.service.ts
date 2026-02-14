import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument, OrderStatus } from './entities/order.entity';
import { Model } from 'mongoose';
import { OrderFilter } from './dto/order.dto';
import { toObjectId } from '../common/common.service';
import { Package, PackageDocument } from '../package/entities/package.entity';

const ORDER_STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
  pending: [OrderStatus.Confirmed, OrderStatus.Cancelled],
  confirmed: [OrderStatus.Ready, OrderStatus.Cancelled],
  ready: [OrderStatus.Completed, OrderStatus.NoShow],
  completed: [],
  cancelled: [],
  noShow: [],
};

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Package.name)
    private readonly packageModel: Model<PackageDocument>,
  ) {}

  async create(body: CreateOrderDto) {
    const pkg = await this.packageModel.findById(body.package);
    if (!pkg) throw new NotFoundException('Package not found');

    return this.orderModel.create({ ...body, price: pkg.price * body.count });
  }

  find(params: OrderFilter) {
    return this.orderModel
      .find({
        user: params.user,
        company: params.company,
      })
      .lean();
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }

  async update(id: string, body: UpdateOrderDto) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException();

    if (body.status) {
      const allowed = ORDER_STATUS_FLOW[order.status];
      if (!allowed.includes(body.status)) {
        throw new BadRequestException('Invalid status transition');
      }
    }

    return this.orderModel.findByIdAndUpdate(toObjectId(id), body, {
      new: true,
      runValidators: true,
    });
  }

  remove(id: string) {
    return this.orderModel.deleteOne(toObjectId(id));
  }
}
