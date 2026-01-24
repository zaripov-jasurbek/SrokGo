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

  @Prop()
  coordination: [number, number];

  @Prop()
  passwordHash: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
