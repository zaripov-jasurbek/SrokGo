import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';
import { Package } from '../../package/entities/package.entity';

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Ready = 'ready',
  Cancelled = 'cancelled',
  NoShow = 'noShow',
  Completed = 'completed',
}

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, versionKey: false })
export class Order {
  _id: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: Package.name, index: true })
  package: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Company.name, index: true })
  company: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  user: Types.ObjectId;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, min: 1, required: true })
  count: number;

  @Prop({ type: [Number] })
  coordination: [number, number];

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.Pending,
    index: true,
  })
  status: OrderStatus;

  @Prop({ type: Number, min: 0, required: true })
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
