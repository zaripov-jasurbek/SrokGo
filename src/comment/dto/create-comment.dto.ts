import { OmitType } from '@nestjs/mapped-types';
import { Comment, CommentReaction } from '../entities/comment.entity';

export class CreateCommentDto extends OmitType(Comment, ['_id', 'createdAt', 'updatedAt']) {}

export class ReactionDto extends OmitType(CommentReaction, ['_id', 'createdAt', 'updatedAt']) {}

export class UpdateCommentTextDto {
  text: string;
}
