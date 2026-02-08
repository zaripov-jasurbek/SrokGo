import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true, versionKey: false })
export class Company {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: String, unique: true, required: true, index: true })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: String, default: '' })
  photo: string;

  @Prop({ type: Number, required: true })
  OpenTime: Number;

  @Prop({ type: Number })
  CloseTime: Number;

  @Prop({ type: String, index: true })
  category: string;

  @Prop({ type: Number, default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ type: [Number], required: true })
  coordination: [number, number];

  @Prop({ type: String, select: false })
  passwordHash: string;

  @Prop({ type: String })
  region: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
CompanySchema.index({ coordinates: '2dsphere' });
