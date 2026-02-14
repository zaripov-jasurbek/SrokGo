import { Module } from '@nestjs/common';
import { BusinessAuthService } from './business-auth.service';
import { BusinessAuthController } from './business-auth.controller';
import { AuthService } from '../auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../../company/entities/company.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  controllers: [BusinessAuthController],
  providers: [BusinessAuthService, AuthService],
})
export class BusinessAuthModule {}
