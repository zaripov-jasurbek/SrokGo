import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// TODO: orderga uzgartish kere
export class OrderHistory {}

@Schema({ timestamps: true, lean: true, versionKey: false })
export class User {
  _id: Types.ObjectId;

  createAt: Date;

  updateAt: Date;

  @Prop()
  name: string;

  @Prop()
  about?: string;

  @Prop()
  avatar?: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop({ default: 10 })
  rating: number;

  @Prop({ type: [Types.ObjectId], ref: OrderHistory.name })
  orderHistory: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
