import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto, UpdateMe } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from '../../company/entities/company.entity';
import { Model } from 'mongoose';
import { AuthService } from '../auth.service';
import { toObjectId } from '../../common/common.service';

@Injectable()
export class BusinessAuthService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    private readonly authService: AuthService,
  ) {}

  async register({ password, ...data }: RegisterDto) {
    const company = await this.companyModel.create({
      ...data,
      passwordHash: await this.authService.generatePasswordHash(password),
    });

    return this.authService.createToken(company._id.toString());
  }

  async login(body: LoginDto) {
    const company = await this.companyModel.findOne({ name: body.name });
    if (!company) throw new NotFoundException('Not Found');

    const isPasswordValid = await this.authService.comparePassword(
      body.password,
      company.passwordHash,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return this.authService.createToken(company._id.toString());
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.authService.parseRefreshToken(refreshToken);
    const company = await this.companyModel.findById(toObjectId(payload.id));
    if (!company) throw new UnauthorizedException('Not Found');

    return this.authService.createToken(company._id.toString());
  }

  async verify(token: string): Promise<boolean> {
    return !!token;
  }

  async me(id: string) {
    return this.companyModel.findById(id).lean();
  }

  async updateMe(id: string, body: UpdateMe) {
    return this.companyModel.findByIdAndUpdate(id, body, { new: true }).lean();
  }
}
