import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../company/entities/company.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { Package, PackageSchema } from '../package/entities/package.entity';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema },
    {name:Package.name, schema: PackageSchema },
  ]),],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
