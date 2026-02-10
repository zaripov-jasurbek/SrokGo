import { Module } from '@nestjs/common';
import { PackageModule } from './package/package.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { BusinessAuthModule } from './auth/business/business-auth.module';
import { UserAuthModule } from './auth/user/user-auth.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema, TConfig } from './common/config/schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: env => envSchema.parse(env),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<TConfig>) => ({
        uri: config.get('MONGO_URI'),
      }),
    }),
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
