import { Module } from '@nestjs/common';
import { BusinessAuthService } from './business-auth.service';
import { BusinessAuthController } from './business-auth.controller';
import { AuthService } from '../auth.service';

@Module({
  controllers: [BusinessAuthController],
  providers: [BusinessAuthService, AuthService],
})
export class BusinessAuthModule {}
