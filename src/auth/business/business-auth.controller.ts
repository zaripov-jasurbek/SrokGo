import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { BusinessAuthService } from './business-auth.service';
import {
  businessLoginSchema,
  businessRegisterSchema,
  businessUpdateMeSchema,
} from './dto/register.dto';
import type { LoginDto, RegisterDto, UpdateMe } from './dto/register.dto';
import { type Response } from 'express';
import { AuthService } from '../auth.service';
import { Cookie } from '../../decorator/cookie.decorator';
import { Public } from '../../decorator/public-api.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('auth/business')
export class BusinessAuthController {
  constructor(
    private readonly businessService: BusinessAuthService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/register')
  async register(
    @Body(new ZodValidationPipe(businessRegisterSchema)) body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken } = await this.businessService.register(body);

    this.authService.setCookieRefreshToken(res, refreshToken, 'auth/business/refresh');

    return { accessToken };
  }

  @Public()
  @Post('/login')
  async login(
    @Body(new ZodValidationPipe(businessLoginSchema)) body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken } = await this.businessService.login(body);

    this.authService.setCookieRefreshToken(res, refreshToken, 'auth/business/refresh');

    return { accessToken };
  }

  @Public()
  @Post('/refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Cookie('refreshToken') refreshCookieToken: string,
  ) {
    const { refreshToken, accessToken } =
      await this.businessService.refreshToken(refreshCookieToken);

    this.authService.setCookieRefreshToken(res, refreshToken, 'auth/business/refresh');

    return { accessToken };
  }

  @Get('/me')
  me(@Query('id') id: string) {
    return this.businessService.me(id);
  }

  @Post('/me')
  updateMe(
    @Body(new ZodValidationPipe(businessUpdateMeSchema)) body: UpdateMe,
    @Query('id') id: string,
  ) {
    return this.businessService.updateMe(id, body);
  }

  @Public()
  @Get('/verify')
  verify(@Query('token') token: string) {
    // TODO: EMAIL CHECK TOKEN
    return this.businessService.verify(token);
  }
}
