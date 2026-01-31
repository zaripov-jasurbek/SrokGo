import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from '../../company/entities/company.entity';

export type PackageDocument = HydratedDocument<Package>;

@Schema({ timestamps: true, lean: true, versionKey: false })
export class Package {
  _id: Types.ObjectId;

  createAt: Date;

  updateAt: Date;

  @Prop()
  name: string;

  @Prop()
  photo: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  count: number;

  @Prop()
  price: number;

  @Prop()
  getTime: number;

  @Prop()
  closeTime: number;

  @Prop()
  active: boolean;

  @Prop()
  rating: number;

  @Prop({ type: Types.ObjectId, ref: Company.name })
  company: Types.ObjectId;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
