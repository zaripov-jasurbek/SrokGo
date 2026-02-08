import { Module } from '@nestjs/common';
import { PackageModule } from './package/package.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { BusinessAuthModule } from './auth/business/business-auth.module';
import { UserAuthModule } from './auth/user/user-auth.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@maindb.z1m8tmq.mongodb.net/?appName=mainDB',
    ),
    PackageModule,
    CompanyModule,
    UserModule,
    BusinessAuthModule,
    UserAuthModule,
    OrderModule,
    CommentModule,
  ],
})
export class AppModule {}
