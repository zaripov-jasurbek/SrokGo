import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BusinessAuthService } from './business-auth.service';
import { LoginDto, RegisterDto, UpdateMe } from './dto/register.dto';

@Controller('auth/business')
export class BusinessAuthController {
  constructor(private readonly businessService: BusinessAuthService) {}

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
}
