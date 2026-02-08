import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto, ReactionDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
import { toObjectId } from '../common/common.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  create(body: CreateCommentDto) {
    return this.commentModel.create(body);
  }

  editText(id: string, text: string) {
    return this.commentModel.updateOne({ _id: toObjectId(id) }, { text });
  }

  async reaction(commentId: string, dto: ReactionDto) {
    const userId = dto.user;
    const path = `reactions.${userId}`;

    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with id ${commentId} not found`);
    }

    const currentReaction = comment.reactions?.get(userId);

    if (currentReaction === dto.type) {
      // toggle off
      await this.commentModel.updateOne(
        { _id: commentId },
        { $unset: { [path]: '' } },
      );

      comment.reactions?.delete(userId);
      return comment.reactions;
    }

    // add or replace
    await this.commentModel.updateOne(
      { _id: commentId },
      { $set: { [path]: dto.type } },
    );

    comment.reactions.set(userId, dto.type);
    return comment.reactions;
  }
  remove(id: string) {
    return this.commentModel.deleteOne({
      _id: toObjectId(id),
    });
  }

  getByPackage(packageId: string) {
    return this.commentModel.find({ package: toObjectId(packageId) });
  }

  getByCompany(company: string) {
    return this.commentModel.find({ company: toObjectId(company) });
  }

  getChild(parentId: string) {
    return this.commentModel.find({ parentId: toObjectId(parentId) });
  }
}
