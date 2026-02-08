import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Package } from '../../package/entities/package.entity';
import { Company } from '../../company/entities/company.entity';

@Schema({ timestamps: true, lean: true, versionKey: false })
export class Comment {
  _id: Types.ObjectId;

  createAt: Date;

  updateAt: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Package.name, default: null })
  package: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: Company.name, default: null })
  company: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: Comment.name, default: null })
  parentId: Types.ObjectId | null;

  @Prop({ type: String })
  text: string;

  @Prop({
    type: Types.Map,
    of: { type: String, enum: ['like', 'dislike'] },
    default: {},
  })
  reactions: Map<string, 'like' | 'dislike'>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
