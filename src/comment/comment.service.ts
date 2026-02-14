import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Comment,
  CommentDocument,
  CommentReaction,
  CommentReactionDocument,
} from './entities/comment.entity';
import { CreateCommentDto, ReactionDto } from './dto/create-comment.dto';
import { toObjectId } from '../common/common.service';
import { Company, CompanyDocument } from '../company/entities/company.entity';
import { Package, PackageDocument } from '../package/entities/package.entity';
import { User, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,

    @InjectModel(CommentReaction.name)
    private readonly reactionModel: Model<CommentReactionDocument>,

    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,

    @InjectModel(Package.name)
    private readonly packageModel: Model<PackageDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /* ================= COMMENTS ================= */

  async create(dto: CreateCommentDto) {
    const createdComment = await this.commentModel.create(dto);
    await this.recalculateTargetRatings(createdComment);
    return createdComment;
  }

  async editText(id: string, text: string) {
    return await this.commentModel.findByIdAndUpdate(
      toObjectId(id),
      {
        $set: { text },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    const _id = toObjectId(id);
    const comment = await this.commentModel.findById(_id);

    await this.reactionModel.deleteMany({ commentId: _id });
    await this.commentModel.deleteOne({ _id });

    if (comment) {
      await this.recalculateTargetRatings(comment);
    }
  }

  /* ================= REACTIONS ================= */

  async reaction(commentId: string, dto: ReactionDto) {
    const commentObjectId = toObjectId(commentId);
    const userId = toObjectId(dto.userId.toString());

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
    if (existing && existing.reaction === dto.reaction) {
      await this.reactionModel.deleteOne({ _id: existing._id });

      await this.commentModel.updateOne(
        { _id: commentObjectId },
        {
          $inc:
            dto.reaction === 'like'
              ? { likesCount: -1 }
              : { dislikesCount: -1 },
        },
      );

      return;
    }

    // replace reaction
    if (existing) {
      await this.reactionModel.updateOne(
        { _id: existing._id },
        { reaction: dto.reaction },
      );

      await this.commentModel.updateOne(
        { _id: commentObjectId },
        {
          $inc:
            dto.reaction === 'like'
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
      reaction: dto.reaction,
    });

    await this.commentModel.updateOne(
      { _id: commentObjectId },
      {
        $inc:
          dto.reaction === 'like' ? { likesCount: 1 } : { dislikesCount: 1 },
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

  private async recalculateTargetRatings(comment: CommentDocument) {
    if (comment.company) {
      await this.updateCompanyRating(comment.company);
    }

    if (comment.package) {
      await this.updatePackageRating(comment.package);
    }

    if (comment.user) {
      await this.updateUserRating(comment.user);
    }
  }

  private async updateCompanyRating(companyId: CommentDocument['company']) {
    if (!companyId) {
      return;
    }

    const [stats] = await this.commentModel.aggregate<{ avg: number }>([
      {
        $match: {
          company: companyId,
          parentId: null,
          rating: { $ne: null },
        },
      },
      { $group: { _id: null, avg: { $avg: '$rating' } } },
    ]);

    await this.companyModel.updateOne(
      { _id: companyId },
      { $set: { rating: stats?.avg ?? 0 } },
    );
  }

  private async updatePackageRating(packageId: CommentDocument['package']) {
    if (!packageId) {
      return;
    }

    const [stats] = await this.commentModel.aggregate<{ avg: number }>([
      {
        $match: {
          package: packageId,
          parentId: null,
          rating: { $ne: null },
        },
      },
      { $group: { _id: null, avg: { $avg: '$rating' } } },
    ]);

    await this.packageModel.updateOne(
      { _id: packageId },
      { $set: { rating: stats?.avg ?? 0 } },
    );
  }

  private async updateUserRating(userId: CommentDocument['user']) {
    if (!userId) {
      return;
    }

    const [stats] = await this.commentModel.aggregate<{ avg: number }>([
      {
        $match: {
          user: userId,
          parentId: null,
          rating: { $ne: null },
        },
      },
      { $group: { _id: null, avg: { $avg: '$rating' } } },
    ]);

    await this.userModel.updateOne(
      { _id: userId },
      { $set: { rating: stats?.avg ?? 0 } },
    );
  }
}
