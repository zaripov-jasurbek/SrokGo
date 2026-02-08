import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from '../../company/entities/company.entity';

export type PackageDocument = HydratedDocument<Package>;

@Schema({ timestamps: true, versionKey: false })
export class Package {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, default: null })
  photo: string;

  @Prop({ type: String, default: null })
  description: string;

  @Prop({ type: String, required: true, index: true })
  category: string;

  @Prop({ type: Number, required: true, min: 0 })
  count: number;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: Number, required: true })
  getTime: number;

  @Prop({ type: Number, required: true })
  closeTime: number;

  @Prop({ type: Boolean, default: true, index: true })
  active: boolean;

  @Prop({ type: Number, default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({
    type: Types.ObjectId,
    ref: Company.name,
    required: true,
    index: true,
  })
  company: Types.ObjectId;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
