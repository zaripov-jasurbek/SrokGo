import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, lean: true, versionKey: false })
export class Company {
  _id: Types.ObjectId;

  createAt: Date;

  updateAt: Date;

  @Prop({ unique: true })
  name: string;

  @Prop()
  photo: string;

  @Prop()
  OpenTime: Date;

  @Prop()
  CloseTime: Date;

  @Prop()
  category: string;

  @Prop()
  rating: number;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
