import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackageModule } from './package/package.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { BusinessAuthModule } from './auth/business/business-auth.module';
import { UserAuthModule } from './auth/user/user-auth.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/?authSource=admin',
    ),
    PackageModule,
    CompanyModule,
    UserModule,
    BusinessAuthModule,
    UserAuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
