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

@Schema({ timestamps: true, lean: true, versionKey: false })
export class Order {
  _id: Types.ObjectId;

  createAt: Date;

  updateAt: Date;

  @Prop({ type: Types.ObjectId, ref: Package.name })
  package: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Company.name })
  company: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  count: number;

  @Prop()
  coordination: [number, number];

  @Prop({ default: OrderStatus.Pending })
  status: string;

  @Prop()
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
