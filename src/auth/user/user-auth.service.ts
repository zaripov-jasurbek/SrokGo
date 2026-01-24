import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto, RegisterDto, UpdateMe } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async register(body: RegisterDto) {
    const user = await this.userModel.create(body);

    return this.authService.createToken(user._id.toString());
  }

  async login(body: LoginDto) {
    const query: QueryFilter<User> = {};

    if (body.phone) {
      query.phone = body.phone;
    } else if (body.email) {
      query.email = body.email;
    }

    const user = await this.userModel.findOne(query);
    if (!user) throw new NotFoundException('Not Found');

    await this.authService.comparePassword(body.password, user.passwordHash);

    return this.authService.createToken(user._id.toString());
  }

  async verify(token: string): Promise<boolean> {
    return !!token;
  }

  async me(id: string) {
    return this.userModel.findById(id).lean();
  }

  async updateMe(id: string, body: UpdateMe) {
    return this.userModel.findByIdAndUpdate(id, body).lean();
  }

  async avatar(id: string, file: Express.Multer.File) {
    // TODO safe file function
  }
}
