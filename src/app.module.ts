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
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService<TConfig>) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRE') },
      }),
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

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
