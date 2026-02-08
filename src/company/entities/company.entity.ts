import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Company {
  _id: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  photo: string;

  @Prop({ type: Date })
  OpenTime: Date;

  @Prop({ type: Date })
  CloseTime: Date;

  @Prop({ type: String })
  category: string;

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: [Number] })
  coordination: [number, number];

  @Prop({ type: String })
  passwordHash: string;

  @Prop({ type: String })
  region: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
