import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Company } from '../../company/entities/company.entity';
import { Package } from '../../package/entities/package.entity';
import { User } from '../../user/entities/user.entity';

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Ready = 'ready',
  Cancelled = 'cancelled',
  NoShow = 'noShow',
  Completed = 'completed',
}

@Schema({ timestamps: true, versionKey: false })
export class Order {
  _id: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: Package.name })
  package: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Company.name })
  company: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  count: number;

  @Prop({ type: [Number] })
  coordination: [number, number];

  @Prop({ type: String, default: OrderStatus.Pending })
  status: string;

  @Prop({ type: Number })
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
