import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// TODO: orderga uzgartish kere
export class OrderHistory {}

@Schema({ timestamps: true, versionKey: false })
export class User {
  _id: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  about?: string;

  @Prop({ type: String })
  avatar?: string;

  @Prop({ type: String })
  email?: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: Number, default: 10 })
  rating: number;

  @Prop({ type: [Types.ObjectId], ref: OrderHistory.name })
  orderHistory: Types.ObjectId[];

  @Prop({ type: String })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
