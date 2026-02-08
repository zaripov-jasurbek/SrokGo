import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, ReactionDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/add')
  create(@Body() body: CreateCommentDto) {
    return this.commentService.create(body);
  }

  @Post('/:id')
  edit(@Param('id') id: string, @Body('text') text: string) {
    return this.commentService.editText(id, text);
  }

  @Post('/reaction/:id')
  reaction(@Param('id') id: string, @Body() body: ReactionDto) {
    return this.commentService.reaction(id, body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }

  @Get('by-package/:id')
  getByPackage(@Param('id') id: string) {
    return this.commentService.getByPackage(id);
  }

  @Get('by-company/:id')
  getByCompany(@Param('id') id: string) {
    return this.commentService.getByCompany(id);
  }

  @Get('child/:id')
  getChild(@Param('id') parentId: string) {
    return this.commentService.getChild(parentId);
  }
}
