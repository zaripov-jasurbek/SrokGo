import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { LoginDto, RegisterDto, UpdateMe } from './dto/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';
import { AuthService } from '../auth.service';
import { Public } from '../../decorator/public-api.decorator';
import { Cookie } from '../../decorator/cookie.decorator';

@Controller('auth/user')
export class UserAuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken } =
      await this.userAuthService.register(body);

    this.authService.setCookieRefreshToken(
      res,
      refreshToken,
      'auth/user/refresh',
    );

    return { accessToken };
  }

  @Public()
  @Post('/login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken } =
      await this.userAuthService.login(body);

    this.authService.setCookieRefreshToken(
      res,
      refreshToken,
      'auth/user/refresh',
    );

    return { accessToken };
  }

  @Post('/refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Cookie('refreshToken') refreshCookieToken: string,
  ) {
    const { refreshToken, accessToken } =
      await this.userAuthService.refreshToken(refreshCookieToken);

    this.authService.setCookieRefreshToken(
      res,
      refreshToken,
      'auth/user/refresh',
    );

    return { accessToken };
  }

  @Get('/me')
  me(@Query('id') id: string) {
    return this.userAuthService.me(id);
  }

  @Post('/me')
  updateMe(@Body() body: UpdateMe, @Query('id') id: string) {
    return this.userAuthService.updateMe(id, body);
  }

  @Get('/verify')
  verify(@Query('token') token: string) {
    // TODO: EMAIL CHECK TOKEN
    return this.userAuthService.verify(token);
  }

  @Post('/me/avatar')
  @UseInterceptors(FileInterceptor('file'))
  avatar(@UploadedFile() file: Express.Multer.File, @Query('id') id: string) {
    return this.userAuthService.avatar(id, file);
  }
}
