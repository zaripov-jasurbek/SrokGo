import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto, UpdateMe } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { AuthService } from '../auth.service';
import { User, UserDocument } from '../../user/entities/user.entity';
import { toObjectId } from '../../common/common.service';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async register({ password, ...data }: RegisterDto) {
    const user = await this.userModel.create({
      ...data,
      passwordHash: await this.authService.generatePasswordHash(password),
    });

    return this.authService.createToken(user._id.toString());
  }

  async login(body: LoginDto) {
    const query: QueryFilter<UserDocument> = {};

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

  async refreshToken(refreshToken: string) {
    const payload = await this.authService.parseToken(refreshToken);
    const user = await this.userModel.findById(toObjectId(payload.id));
    if (!user) throw new UnauthorizedException('Not Found');

    return this.authService.createToken(user._id.toString());
  }

  async me(id: string) {
    return this.userModel.findById(id).lean();
  }

  async updateMe(id: string, body: UpdateMe) {
    return this.userModel.findByIdAndUpdate(id, body, { new: true }).lean();
  }

  async avatar(id: string, file: Express.Multer.File) {
    // TODO safe file function
  }

  async verify(token: string): Promise<boolean> {
    return !!token;
  }
}
