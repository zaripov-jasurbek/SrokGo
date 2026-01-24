import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { LoginDto, RegisterDto, UpdateMe } from './dto/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth/user')
export class UserAuthController {
  constructor(private readonly businessService: UserAuthService) {}

  @Post('/register')
  register(@Body() body: RegisterDto) {
    return this.businessService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.businessService.login(body);
  }

  @Get('/me')
  me(@Query('id') id: string) {
    return this.businessService.me(id);
  }

  @Post('/me')
  updateMe(@Body() body: UpdateMe, @Query('id') id: string) {
    return this.businessService.updateMe(id, body);
  }

  @Get('/verify')
  verify(@Query('token') token: string) {
    // TODO: EMAIL CHECK TOKEN
    return this.businessService.verify(token);
  }

  @Post('/me/avatar')
  @UseInterceptors(FileInterceptor('file'))
  avatar(@UploadedFile() file: Express.Multer.File, @Query('id') id: string) {
    return this.businessService.avatar(id, file);
  }
}
