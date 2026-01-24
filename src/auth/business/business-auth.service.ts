import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto, RegisterDto, UpdateMe } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../../company/entities/company.entity';
import { Model } from 'mongoose';
import { AuthService } from '../auth.service';

@Injectable()
export class BusinessAuthService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    private readonly authService: AuthService,
  ) {}

  async register(body: RegisterDto) {
    const company = await this.companyModel.create(body);

    return this.authService.createToken(company._id.toString());
  }

  async login(body: LoginDto) {
    const company = await this.companyModel.findOne({ name: body.name });
    if (!company) throw new NotFoundException('Not Found');

    await this.authService.comparePassword(body.password, company.passwordHash);

    return this.authService.createToken(company._id.toString());
  }

  async verify(token: string): Promise<boolean> {
    return !!token;
  }

  async me(id: string) {
    return this.companyModel.findById(id).lean();
  }

  async updateMe(id: string, body: UpdateMe) {
    return this.companyModel.findByIdAndUpdate(id, body).lean();
  }
}
