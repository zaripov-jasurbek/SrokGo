import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  ReactionDto,
  UpdateCommentTextDto,
} from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /* ================= COMMENTS ================= */

  @Post()
  create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }

  @Patch(':id/text')
  updateText(@Param('id') id: string, @Body() dto: UpdateCommentTextDto) {
    return this.commentService.editText(id, dto.text);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }

  /* ================= REACTIONS ================= */

  @Post(':id/reaction')
  react(@Param('id') commentId: string, @Body() dto: ReactionDto) {
    return this.commentService.reaction(commentId, dto);
  }

  /* ================= QUERIES ================= */

  @Get('package/:id')
  getByPackage(@Param('id') packageId: string) {
    return this.commentService.getByPackage(packageId);
  }

  @Get('company/:id')
  getByCompany(@Param('id') companyId: string) {
    return this.commentService.getByCompany(companyId);
  }

  @Get(':id/children')
  getChildren(@Param('id') parentId: string) {
    return this.commentService.getChild(parentId);
  }
}
