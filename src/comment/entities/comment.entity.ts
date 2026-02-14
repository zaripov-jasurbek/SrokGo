import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Package } from '../../package/entities/package.entity';
import { Company } from '../../company/entities/company.entity';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true, versionKey: false })
export class Comment {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Package.name, default: null, index: true })
  package: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: Company.name, default: null, index: true })
  company: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: Comment.name, default: null, index: true })
  parentId: Types.ObjectId | null;

  @Prop({ type: String })
  text: string;

  @Prop({ type: Number, default: 0 })
  likesCount: number;

  @Prop({ type: Number, default: 0 })
  dislikesCount: number;

  @Prop({ type: Number, min: 1, max: 5, default: null })
  rating: number; // оценка отзыва (звёзды)
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

///////////////// REACTION /////////////////
export type CommentReactionDocument = HydratedDocument<CommentReaction>;

@Schema({ timestamps: true, versionKey: false })
export class CommentReaction {
  _id: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: Comment.name, index: true })
  commentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, index: true })
  userId: Types.ObjectId;

  @Prop({ enum: ['like', 'dislike'] })
  reaction: 'like' | 'dislike';
}

export const CommentReactionSchema = SchemaFactory.createForClass(CommentReaction);
