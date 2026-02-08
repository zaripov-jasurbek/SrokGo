import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentReaction } from './entities/comment.entity';
import { CreateCommentDto, ReactionDto } from './dto/create-comment.dto';
import { toObjectId } from '../common/common.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,

    @InjectModel(CommentReaction.name)
    private readonly reactionModel: Model<CommentReaction>,
  ) {}

  /* ================= COMMENTS ================= */

  async create(dto: CreateCommentDto) {
    return this.commentModel.create(dto);
  }

  async editText(id: string, text: string) {
    const res = await this.commentModel.updateOne(
      { _id: toObjectId(id) },
      { $set: { text } },
    );
  }

  async remove(id: string) {
    const _id = toObjectId(id);

    await this.reactionModel.deleteMany({ commentId: _id });
    await this.commentModel.deleteOne({ _id });
  }

  /* ================= REACTIONS ================= */

  async reaction(commentId: string, dto: ReactionDto) {
    const commentObjectId = toObjectId(commentId);
    const userId = toObjectId(dto.user);

    const commentExists = await this.commentModel.exists({
      _id: commentObjectId,
    });

    if (!commentExists) {
      throw new NotFoundException('Comment not found');
    }

    const existing = await this.reactionModel.findOne({
      commentId: commentObjectId,
      userId,
    });

    // toggle off
    if (existing && existing.reaction === dto.type) {
      await this.reactionModel.deleteOne({ _id: existing._id });

      await this.commentModel.updateOne(
        { _id: commentObjectId },
        {
          $inc:
            dto.type === 'like' ? { likesCount: -1 } : { dislikesCount: -1 },
        },
      );

      return;
    }

    // replace reaction
    if (existing) {
      await this.reactionModel.updateOne(
        { _id: existing._id },
        { reaction: dto.type },
      );

      await this.commentModel.updateOne(
        { _id: commentObjectId },
        {
          $inc:
            dto.type === 'like'
              ? { likesCount: 1, dislikesCount: -1 }
              : { likesCount: -1, dislikesCount: 1 },
        },
      );

      return;
    }

    // new reaction
    await this.reactionModel.create({
      commentId: commentObjectId,
      userId,
      reaction: dto.type,
    });

    await this.commentModel.updateOne(
      { _id: commentObjectId },
      {
        $inc: dto.type === 'like' ? { likesCount: 1 } : { dislikesCount: 1 },
      },
    );
  }

  /* ================= QUERIES ================= */

  getByPackage(packageId: string) {
    return this.commentModel
      .find({ package: toObjectId(packageId), parentId: null })
      .sort({ createdAt: -1 });
  }

  getByCompany(companyId: string) {
    return this.commentModel
      .find({ company: toObjectId(companyId), parentId: null })
      .sort({ createdAt: -1 });
  }

  getChild(parentId: string) {
    return this.commentModel
      .find({ parentId: toObjectId(parentId) })
      .sort({ createdAt: 1 });
  }
}
