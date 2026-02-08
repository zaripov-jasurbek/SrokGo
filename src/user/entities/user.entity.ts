import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  _id: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  about?: string;

  @Prop({ type: String, default: '' })
  avatar?: string;

  @Prop({ type: String, unique: true, sparse: true })
  email?: string;

  @Prop({ type: String, unique: true, sparse: true })
  phone?: string;

  @Prop({ type: Number, default: 5 })
  rating: number;

  @Prop({ type: String })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
