import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { AuthService } from '../auth.service';

@Module({
  controllers: [UserAuthController],
  providers: [UserAuthService, AuthService],
})
export class UserAuthModule {}
