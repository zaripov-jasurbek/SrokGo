import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { AuthService } from '../auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, AuthService],
})
export class UserAuthModule {}
