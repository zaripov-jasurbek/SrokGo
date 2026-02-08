import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Company } from '../../company/entities/company.entity';

@Schema({ timestamps: true, versionKey: false })
export class Package {
  _id: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  photo: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: Number })
  count: number;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  getTime: number;

  @Prop({ type: Number })
  closeTime: number;

  @Prop({ type: Boolean })
  active: boolean;

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: Types.ObjectId, ref: Company.name })
  company: Types.ObjectId;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
