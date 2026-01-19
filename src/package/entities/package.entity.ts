import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PackageDocument = HydratedDocument<Package>;

class Company {} // TODO companiya schemasiga almashtirish kerak!!!

@Schema({ timestamps: true, lean: true, versionKey: false })
export class Package {
  _id: Types.ObjectId;

  @Prop()
  name: string;

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
  active: boolean;

  @Prop({ type: Types.ObjectId, ref: Company.name })
  company: Company;

  createAt: Date;
  updateAt: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
