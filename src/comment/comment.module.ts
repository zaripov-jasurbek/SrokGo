import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Comment,
  CommentReaction,
  CommentReactionSchema,
  CommentSchema,
} from './entities/comment.entity';
import { Company, CompanySchema } from '../company/entities/company.entity';
import { Package, PackageSchema } from '../package/entities/package.entity';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: CommentReaction.name, schema: CommentReactionSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Package.name, schema: PackageSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
