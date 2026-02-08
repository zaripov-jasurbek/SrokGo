import { OmitType } from '@nestjs/mapped-types';
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto extends OmitType(Comment, [
  '_id',
  'createdAt',
  'updatedAt',
]) {}

export class ReactionDto {
  user: string;
  name: string;
  type: 'like' | 'dislike';
}

export class UpdateCommentTextDto {
  text: string;
}
